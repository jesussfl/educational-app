import { StyleSheet, ScrollView, View } from "react-native";
import React from "react";
import Lessons from "./Lessons";
import { Colors } from "@utils/Theme";
import Spinner from "react-native-loading-spinner-overlay";
import useWorldData from "../hooks/useWorldData";
import WorldSectionBanner from "./WorldSectionBanner";
const WorldSections = ({ handlePresentModalPress, setLessonId }) => {
	const { isLoading, worldData, lessonsCompleted } = useWorldData();
	let last_index;

	return isLoading ? (
		<Spinner visible={isLoading} />
	) : (
		<ScrollView style={styles.pageContainer}>
			<View>
				{/* Render World By Sections */}
				{worldData.sectionsByWorld.sections.map((section) => {
					return (
						<View key={section.id} style={styles.sectionContainer}>
							<WorldSectionBanner text={section.attributes.description} />
							<Lessons lessons={section.attributes.lessons.data} last_index={last_index} handlePresentModalPress={handlePresentModalPress} setLessonId={setLessonId} lessonsCompleted={lessonsCompleted}></Lessons>
						</View>
					);
				})}
			</View>
		</ScrollView>
	);
};

export default WorldSections;

const styles = StyleSheet.create({
	pageContainer: { gap: 24, backgroundColor: Colors.gray_50 },

	sectionContainer: {
		flex: 1,
		gap: 24,
		marginVertical: 24,
		alignItems: "center",
	},
});
