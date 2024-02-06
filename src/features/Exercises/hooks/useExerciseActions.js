import useUserStats from "@hooks/useUserStats";
import { useExercises } from "@stores/useExerciseStore";
import { useState } from "react";
import useExerciseSound from "./useExerciseSound";
import { getExercisesByLesson } from "../data/getExercises";
import { useRoute } from "@react-navigation/native";
import { renderExercise } from "../helpers/renderExercises";
export const useExerciseActions = () => {
  const state = useExercises((state) => state);
  const route = useRoute();
  const { isLoading, error } = getExercisesByLesson(route.params?.lessonId);
  const { decreaseLives } = useUserStats();
  const { playSound } = useExerciseSound();

  //TODO: Handle these errors in a better way
  if (isLoading || !state.exercises) {
    return { isLoading: true, isEmpty: true };
  }

  const currentExerciseData = state.exercises[state.currentExerciseIndex];
  const isLastExercise = state.currentExerciseIndex === state.exercises.length - 1;
  const currentExerciseView = renderExercise(currentExerciseData);
  const percentage = (state.correctAnswers * 100) / (state.exercises.length - state.mistakes.length);

  const checkAnswer = async () => {
    const exerciseType = currentExerciseData.attributes.type;
    const answerChecker = exercisesChecker[exerciseType];

    const isCorrect = answerChecker(currentExerciseData.attributes.content, state.userAnswer);

    if (!isCorrect) {
      punishUser();
      return;
    }
    await playSound();
    state.setIsAnswerCorrect(true);
    state.sumCorrectAnswer();
  };
  const punishUser = () => {
    state.setIsAnswerCorrect(false);
    state.setMistakes(currentExerciseData.id);
    state.addNewExercise(currentExerciseData);
    decreaseLives();
  };

  return {
    checkAnswer,
    currentExerciseData,
    currentExerciseView,
    percentage,
    isLastExercise,
    isLoading,
  };
};
