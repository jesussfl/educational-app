import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

import { query } from "../../../utils/graphql/client/GraphQLCLient";
import { querySectionsByWorldId } from "../../../utils/graphql/queries/section.queries";
import { LessonButton } from "@components";
import { SemanticColors, Colors } from "../../../utils/Theme";
import { Flag } from "iconsax-react-native";

const WorldScreen = () => {
	const { data, isLoading, error } = useQuery(["sections"], () => query(querySectionsByWorldId, { id: 1, start: 1, limit: 10 }));

	return isLoading ? (
		<Text>Cargando...</Text>
	) : (
		<ScrollView style={{ gap: 24, backgroundColor: Colors.gray_50 }}>
			<View style={{}}>
				{data.sectionsByWorld.sections.map((section) => (
					<View key={section.id} style={{ flex: 1, gap: 24, marginVertical: 24, alignItems: "center" }}>
						<View style={{ alignSelf: "stretch", backgroundColor: Colors.gray_25, paddingVertical: 16, paddingHorizontal: 24, flexDirection: "row", alignItems: "center", gap: 16 }}>
							<Flag variant='Bold' size={32} color={Colors.gray_400} />
							<Text style={{ textAlign: "left", fontSize: 20, fontFamily: "Sora-Bold", color: Colors.gray_400 }}>{section.attributes.description}</Text>
						</View>
						{section.attributes.lessons.data.map((lesson) => (
							<LessonButton key={lesson.id} isLocked={true} />
						))}
					</View>
				))}
			</View>
		</ScrollView>
	);
};

export default WorldScreen;
