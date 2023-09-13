import { StyleSheet, View } from "react-native";
import React from "react";

import Spinner from "react-native-loading-spinner-overlay";
import { CloseCircle } from "iconsax-react-native";
import { Colors } from "../../../utils/Theme";
import ProgressBar from "../components/ProgressBar";
import useExerciseManagement from "../hooks/useExerciseManagement";
const ExercisePage = ({ navigation }) => {
	const { isLoading, renderExercise, percentage } = useExerciseManagement();

	if (isLoading) {
		return <Spinner visible={isLoading} />;
	}

	return (
		<View style={styles.pageContainer}>
			<View style={styles.topBar}>
				<CloseCircle size={32} color={Colors.gray_300} onPress={navigation.goBack} />
				<ProgressBar percentage={`${percentage}%`} />
			</View>
			{renderExercise()}
		</View>
	);
};

export default ExercisePage;

const styles = StyleSheet.create({
	pageContainer: { justifyContent: "space-between", flex: 1 },
	topBar: { alignItems: "center", justifyContent: "center", flexDirection: "row", padding: 24, gap: 16 },
});
