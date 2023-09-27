import { StyleSheet, View, Text } from "react-native";
import React from "react";

import { CloseCircle } from "iconsax-react-native";
import { Colors } from "../../../utils/Theme";
import Spinner from "react-native-loading-spinner-overlay";
import ProgressBar from "../components/ProgressBar";
import useExerciseManagement from "../hooks/useExerciseManagement";
const ExercisePage = ({ navigation }) => {
	const { isLoading, renderExercise, percentage, isEmpty } = useExerciseManagement();

	if (isLoading) {
		return <Spinner visible={isLoading} />;
	}
	console.log(isEmpty);
	return (
		<View style={styles.pageContainer}>
			<View style={styles.topBar}>
				<CloseCircle size={32} color={Colors.gray_300} onPress={() => navigation.replace("Main", { screen: "Lessons" })} />
				{isEmpty ? null : <ProgressBar percentage={`${percentage}%`} />}
			</View>
			{isEmpty ? <Text>Vacio</Text> : renderExercise()}
		</View>
	);
};

export default ExercisePage;

const styles = StyleSheet.create({
	pageContainer: { justifyContent: "space-between", flex: 1 },
	topBar: { alignItems: "center", justifyContent: "center", flexDirection: "row", padding: 24, gap: 16 },
});
