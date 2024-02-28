import useUserStats from "@hooks/useUserStats";
import { useExercises } from "@stores/useExerciseStore";
import { useEffect, useState } from "react";
import useExerciseSound from "./useExerciseSound";
import { getExercisesByLesson } from "../data/getExercises";
import { useRoute } from "@react-navigation/native";
import { renderExercise } from "../helpers/renderExercises";
import { ECONOMY } from "@config/economy";
import { useMutation } from "@tanstack/react-query";
import { query } from "@utils/graphql";
import { createLessonCompletedMutation } from "@utils/graphql/mutations/lessonsCompleted.mutations";
import { calculateTimeSpent } from "../helpers";
import useAuthStore from "@stores/useAuthStore";
import { createWorldCompletedMutation } from "@utils/graphql/mutations/worldsCompleted.mutation";
import { useLessonStore } from "@stores/useLessonStore";
export const useExerciseActions = () => {
  const state = useExercises((state) => state);
  const { isLastLesson, lessonStatus } = useLessonStore();
  const route = useRoute();
  const { isLoading, error, data } = getExercisesByLesson(route.params?.lessonId);
  const { user, updateUser } = useAuthStore();
  const { decreaseLives, decreaseMoney, increaseMoney, increaseStreak } = useUserStats();
  const { playSound } = useExerciseSound();
  const { mutate: completeLesson } = useMutation((data) => query(createLessonCompletedMutation, data));
  const { mutate: completeWorld } = useMutation((data) => query(createWorldCompletedMutation, data));

  useEffect(() => {
    // decrease money if user complete an exercise
    if (state.currentExerciseIndex === 1) {
      lessonStatus !== "completed" && decreaseMoney(ECONOMY.LESSONS_PRICE);
    }
  }, [state.currentExerciseIndex]);

  //TODO: Handle these errors in a better way
  if (isLoading || !state.exercises) {
    return { isLoading: true, isEmpty: true };
  }

  const currentExerciseData = state.exercises[state.currentExerciseIndex];
  const isLastExercise = state.currentExerciseIndex === state.exercises.length - 1;
  const currentExerciseView = renderExercise(currentExerciseData);
  const percentage = (state.correctAnswers * 100) / (state.exercises.length - state.mistakes.length);
  const profit =
    lessonStatus === "completed"
      ? ECONOMY.COMPLETED_LESSONS_PROFIT
      : (ECONOMY.LESSONS_PROFIT - ECONOMY.LESSONS_PRICE) / (state.exercises.length / (state.exercises.length - state.mistakes.length));
  const checkAnswer = async () => {
    state.setIsCheckingAnswer(true);
    const exerciseType = currentExerciseData.attributes.type;
    const answerChecker = exercisesChecker[exerciseType];

    const isCorrect = answerChecker(currentExerciseData.attributes.content, state.userAnswer);

    if (!isCorrect) {
      punishUser();
      state.setIsCheckingAnswer(false);
      return;
    }
    await playSound();
    state.setIsAnswerCorrect(true);
    state.sumCorrectAnswer();
    state.setIsCheckingAnswer(false);
  };
  const punishUser = () => {
    state.setIsAnswerCorrect(false);
    state.addMistake(currentExerciseData.id);
    state.addNewExercise(currentExerciseData);
    decreaseLives();
  };
  const saveProgress = () => {
    completeLesson({
      user: user.id,
      lesson: route.params?.lessonId,
      data: {
        user: user.id,
        lesson: route.params?.lessonId,
        timeSpent: calculateTimeSpent(state.startTime),
        mistakes: state.mistakes.length,
        errorExercises: state.mistakes,
      },
    });
    isLastLesson && completeWorld({ user: user.id, world: user.currentWorld, data: { user: user.id, world: user.currentWorld } });
    increaseStreak();
    increaseMoney(profit);
    updateUser({
      ...user,
      money: user.money + profit,
    });
    state.reset();
  };
  return {
    profit,
    checkAnswer,
    saveProgress,
    currentExerciseData,
    currentExerciseView,
    percentage,
    isLastExercise,
    isLoading,
  };
};
