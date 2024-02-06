// Import necessary dependencies
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, useNavigation } from "@react-navigation/native";

import { query, queryExercisesByLessonId } from "@utils/graphql";
import useUserStats from "@hooks/useUserStats";
import { calculateTimeSpent, exercisesChecker } from "../helpers";

import { SimpleSelectionExercise, CompletionExercise } from "../components";
import TheoryExercise from "../components/theory-exercise";
import { useCountdownTimer, useExerciseSound } from "../hooks";
import { useExercises } from "@stores/useExerciseStore";
const initialCountdownValue = 10;
const EXERCISE_TYPES = {
  simpleSelection: (content, key) => {
    return <SimpleSelectionExercise content={content} key={key} />;
  },
  completion: (content, key) => {
    return <CompletionExercise content={content} key={key} />;
  },
  theory: (content, key) => {
    return <TheoryExercise content={content} key={key} />;
  },
};

export default useExerciseManagement = () => {
  const state = useExercises((state) => state);
  const route = useRoute();
  const navigation = useNavigation();
  const { playSound } = useExerciseSound();
  const { userLives, decreaseLives } = useUserStats();
  const { timeRemaining, startCountdownTimer, stopCountdownTimer, isCountdownActive } = useCountdownTimer();

  const { data, isLoading, error } = useQuery([`exercises-${route.params.lessonId}`], () =>
    query(queryExercisesByLessonId, {
      id: route.params.lessonId,
      start: 1,
      limit: 100,
    })
  );
  const exercises = isLoading ? [] : data?.exercisesByLesson.exercises.sort((a, b) => a.order - b.order);
  let currentExercise = exercises[state.currentExerciseIndex];

  useEffect(() => {
    handleExerciseStart();
    handleExerciseEnd();
    handleExerciseType();
  }, [state.currentExerciseIndex, isLoading]);

  useEffect(() => {
    handleUserLives();
  }, [userLives, navigation]);

  function handleExerciseStart() {
    const isFirstExercise = state.currentExerciseIndex === 0;

    if (isFirstExercise) {
      state.setStartTime();
    }
  }
  function handleExerciseEnd() {
    const isLastExercise = state.currentExerciseIndex > exercises.length - 1;

    if (isLastExercise && !isLoading) {
      navigation.replace("Congrats", {
        lessonId: route.params.lessonId,
        elapsedTime: calculateTimeSpent(state.startTime),
        errorCount: state.mistakes.length,
        errorExercises: state.mistakes,
      });

      state.reset();
    }
  }

  function handleExerciseType() {
    state.setCurrentExerciseType(currentExercise?.attributes.type);
    if (currentExercise && currentExercise.attributes.type === "completion") {
      state.setUserAnswer([]);
    } else {
      state.setUserAnswer(null);
    }
    if (currentExercise && currentExercise.attributes.type === "simpleSelection") {
      startCountdownTimer(() => {
        punishUser();
      }, initialCountdownValue);
    }
    state.setIsAnswerCorrect(null);
  }

  function handleUserLives() {
    if (userLives <= 0) {
      navigation.replace("Main", { screen: "Lessons" });
      state.reset();
    }
  }
  const checkAnswer = async () => {
    stopCountdownTimer();

    const mainAnswer = parseExerciseContent(currentExercise);

    const exerciseType = currentExercise.attributes.type;
    const answerChecker = exercisesChecker[exerciseType];

    const isCorrect = answerChecker(mainAnswer, state.userAnswer);

    if (isCorrect) {
      await playSound();
      state.setIsAnswerCorrect(true);
    } else {
      punishUser();
    }
  };
  const punishUser = () => {
    state.setIsAnswerCorrect(false);
    state.setMistakes(currentExercise.id);

    decreaseLives();
  };
  const renderExercise = () => {
    if (state.currentExerciseIndex > exercises.length - 1) {
      return;
    }

    const exerciseType = currentExercise.attributes.type;

    return EXERCISE_TYPES[exerciseType](parseExerciseContent(currentExercise), currentExercise.id);
  };

  const parseExerciseContent = (exercise) => {
    return typeof exercise.attributes.content === "string" ? JSON.parse(exercise.attributes.content) : exercise.attributes.content;
  };

  return {
    status: {
      isLoading,
      error,
    },
    handler: {
      close: () => {
        navigation.goBack();
        state.reset();
      },
      next: () => {
        state.nextExercise();
      },
      render: renderExercise,

      percentage: ((state.currentExerciseIndex + 1) * 100) / exercises.length,
    },
    checkAnswer,
    timeRemaining,
    isCountdownActive,
    initialCountdownValue,
  };
};
