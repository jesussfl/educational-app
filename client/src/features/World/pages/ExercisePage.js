import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { query } from "@utils/graphql/client/GraphQLCLient";
import { queryExercisesByLessonId } from "@utils/graphql/queries/exercise.queries";
import { useRoute } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from "@react-navigation/native";
import SimpleSelection from "../components/SimpleSelection";
import Completion from "../components/Completion";
import { CloseCircle } from "iconsax-react-native";
import { Button } from "@components";
import { SemanticColors, Colors } from "../../../utils/Theme";
import ProgressBar from "../components/ProgressBar";
const ExercisePage = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const params = route.params;
	const { data, isLoading, error } = useQuery(["exercises"], () => query(queryExercisesByLessonId, { id: params.lessonId, start: 1, limit: 100 }));

	if (isLoading) {
		return <Spinner visible={isLoading} />;
	}
	const exercises = data.exercisesByLesson.exercises;
	const sortedExercises = exercises.sort((a, b) => a.order - b.order);
	let currentExercise = 0;
	let percentage = ((currentExercise + 1) * 100) / sortedExercises.length;
	return (
		<View style={{ justifyContent: "space-between", flex: 1 }}>
			<View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", padding: 24, gap: 16 }}>
				<CloseCircle size={32} color={Colors.gray_300} onPress={navigation.goBack} />
				<ProgressBar percentage={`${percentage}%`} />
			</View>
			<View>
				{sortedExercises[currentExercise].attributes.type === "Completion" && <Completion content={sortedExercises[currentExercise].attributes.content} />}

				{sortedExercises[currentExercise].attributes.type === "selection" && <SimpleSelection content={sortedExercises[currentExercise].attributes.content} />}
			</View>

			<View style={{ gap: 16, flexDirection: "row", alignItems: "center", padding: 16 }}>
				<Button text='Volver' variant='secondary' style={{ flex: 1 }} onPress={() => navigation.goBack()} />
				<Button text='Comprobar' variant='primary' style={{ flex: 1 }} onPress={() => navigation.navigate("Test")} />
			</View>
		</View>
	);
};

export default ExercisePage;

const styles = StyleSheet.create({});
