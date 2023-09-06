import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

import { query } from "@utils/graphql/client/GraphQLCLient";
import { SemanticColors, Colors } from "@utils/Theme";
import { querySectionsByWorldId } from "@utils/graphql/queries/section.queries";
import { LessonButton } from "@components";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Flag } from "iconsax-react-native";
const WorldScreen = ({ navigation }) => {
	const { data, isLoading, error } = useQuery(["sections"], () => query(querySectionsByWorldId, { id: 1, start: 1, limit: 10 }));
	const worldName = isLoading ? "Cargando..." : data.sectionsByWorld.world.name;

	useEffect(() => {
		navigation.setOptions({
			title: worldName,
		});
	}, [worldName]);

	return isLoading ? (
		<Text>Cargando...</Text>
	) : (
		<BottomSheetModalProvider>
			<ScrollView style={{ gap: 24, backgroundColor: Colors.gray_50 }}>
				<View style={{}}>
					{/* Render World By Sections */}
					{data.sectionsByWorld.sections.map((section) => (
						<View key={section.id} style={styles.sectionContainer}>
							<View style={styles.sectionBanner}>
								<Flag variant='Bold' size={24} color={Colors.gray_400} />
								<Text style={styles.sectionBannerText}>{section.attributes.description}</Text>
							</View>

							{/* Render Lessons By Section */}
							{section.attributes.lessons.data.map((lesson) => (
								<LessonButton key={lesson.id} isLocked={true} />
							))}
						</View>
					))}
				</View>
			</ScrollView>
		</BottomSheetModalProvider>
	);
};

export default WorldScreen;

const styles = StyleSheet.create({
	sectionBanner: {
		alignSelf: "stretch",
		backgroundColor: Colors.gray_25,
		paddingVertical: 16,
		paddingHorizontal: 24,
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	sectionBannerText: {
		fontSize: 14,
		fontFamily: "Sora-Bold",
		color: Colors.gray_400,
		paddingRight: 16,
	},
	sectionContainer: {
		flex: 1,
		gap: 24,
		marginVertical: 24,
		alignItems: "center",
	},
});
