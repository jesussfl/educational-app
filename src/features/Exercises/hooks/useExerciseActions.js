import { ECONOMY } from "@config/economy";
import useUserStats from "@hooks/useUserStats";
import { useRoute } from "@react-navigation/native";
import useAuthStore from "@stores/useAuthStore";
import { useExercises } from "@stores/useExerciseStore";
import { useLessonStore } from "@stores/useLessonStore";
import { useMutation } from "@tanstack/react-query";
import { query } from "@utils/graphql";
import { createLessonCompletedMutation } from "@utils/graphql/mutations/lessonsCompleted.mutations";
import { createWorldCompletedMutation } from "@utils/graphql/mutations/worldsCompleted.mutation";
import { useEffect } from "react";
import { getExercisesByLesson } from "../data/getExercises";
import { calculateTimeSpent, exercisesChecker } from "../helpers";
import { renderExercise } from "../helpers/renderExercises";
import useExerciseSound from "./useExerciseSound";
import { calculateProfit } from "../helpers/calculateProfit";
export const useExerciseActions = () => {
  const state = useExercises();
  const route = useRoute();
  const { isLastLesson, lessonStatus } = useLessonStore();
  const { isLoading } = getExercisesByLesson(route.params?.lessonId);
  const { user } = useAuthStore();
  const { decreaseLives, decreaseMoney, increaseMoney, increaseStreak } = useUserStats();
  const { playSound, playErrorSound } = useExerciseSound();
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
  const percentage = (state.currentExerciseIndex * 100) / state.exercises.length - state.mistakes;
  const profit = calculateProfit(state.exercises.length, state.mistakes, lessonStatus);
  const checkAnswer = async () => {
    state.setIsCheckingAnswer(true);
    const exerciseType = currentExerciseData.attributes.type;
    const answerChecker = exercisesChecker[exerciseType];

    const response = answerChecker(currentExerciseData.attributes.content, state.userAnswer);

    if (!response.isCorrect) {
      punishUser();
      await playErrorSound();
      state.setCorrectAnswer(response.correctAnswer);
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
    isLastLesson && completeWorld({ user: user.id, world: user.current_world.data.id, data: { user: user.id, world: user.current_world.data.id } });
    increaseStreak();
    increaseMoney(Math.round(profit * 100) / 100);
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
