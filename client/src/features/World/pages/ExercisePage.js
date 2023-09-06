import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { query } from "@utils/graphql/client/GraphQLCLient";
import { queryExercisesByLessonId } from "@utils/graphql/queries/exercise.queries";
import { useRoute } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from "@react-navigation/native";
const ExercisePage = () => {
	const route = useRoute();
	const params = route.params;
	const navigation = useNavigation();

	const { data, isLoading, error } = useQuery(["exercises"], () => query(queryExercisesByLessonId, { id: params.lessonId, start: 1, limit: 10 }));
	return isLoading ? (
		<Spinner visible={isLoading} />
	) : (
		<View>
			{data.exercisesByLesson.exercises.map((exercise) => (
				<Text key={exercise.id}>{exercise.attributes.content}</Text>
			))}
		</View>
	);
};

export default ExercisePage;

const styles = StyleSheet.create({});
