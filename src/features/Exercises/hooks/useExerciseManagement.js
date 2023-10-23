// Import necessary dependencies
import { useEffect, useReducer } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, useNavigation } from "@react-navigation/native";

import { query, queryExercisesByLessonId } from "@utils/graphql";
import useUserStats from "@hooks/useUserStats";
import { calculateTimeSpent, exercisesChecker } from "../helpers";

import { SimpleSelectionExercise, CompletionExercise } from "../components";
import { useCountdownTimer, useExerciseSound } from "../hooks";
import { initialState, exerciseReducer, exerciseTypes } from "../redux/reducers/exerciseReducer";

const initialCountdownValue = 10;

export default useExerciseManagement = () => {
  const [state, dispatch] = useReducer(exerciseReducer, initialState);
  const route = useRoute();
  const navigation = useNavigation();
  const { playSound } = useExerciseSound();
  const { userLives, decreaseLives } = useUserStats();
  const { timeRemaining, startCountdownTimer, stopCountdownTimer, isCountdownActive } = useCountdownTimer();

  const { data, isLoading, error } = useQuery([`exercises${route.params.lessonId}`], () =>
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
      dispatch({ type: exerciseTypes.SET_START_TIME });
      dispatch({ type: exerciseTypes.SET_EXERCISES, payload: exercises });
      dispatch({ type: exerciseTypes.SET_CURRENT_EXERCISE, payload: data?.exercisesByLesson.exercises[0] });
    }
  }
  function handleExerciseEnd() {
    const isLastExercise = state.currentExerciseIndex > exercises.length - 1;
    if (isLastExercise && !isLoading) {
      dispatch({ type: exerciseTypes.SET_END_TIME });
      navigation.replace("Congrats", {
        lessonId: route.params.lessonId,
        elapsedTime: calculateTimeSpent(state.startTime),
        errorCount: state.mistakes.length,
        errorExercises: state.mistakes,
      });
    }
  }

  function handleExerciseType() {
    if (currentExercise && currentExercise.attributes.type === "completion") {
      dispatch({ type: exerciseTypes.SET_USER_ANSWER, payload: [] });
    } else {
      dispatch({ type: exerciseTypes.SET_USER_ANSWER, payload: null });
    }
    if (currentExercise && currentExercise.attributes.type !== "completion") {
      startCountdownTimer(() => {
        punishUser();
      }, initialCountdownValue);
    }
    dispatch({ type: exerciseTypes.SET_IS_ANSWER_CORRECT, payload: null });
  }

  function handleUserLives() {
    if (userLives <= 0) {
      navigation.replace("Main", { screen: "Lessons" });
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
      dispatch({ type: exerciseTypes.SET_IS_ANSWER_CORRECT, payload: true });
    } else {
      punishUser();
    }
  };
  const punishUser = () => {
    dispatch({ type: exerciseTypes.SET_IS_ANSWER_CORRECT, payload: false });
    dispatch({ type: exerciseTypes.SET_MISTAKES, payload: currentExercise.id });
    decreaseLives();
  };
  const renderExercise = () => {
    if (state.currentExerciseIndex > exercises.length - 1) {
      return;
    }

    return currentExercise.attributes.type === "simpleSelection" ? (
      <SimpleSelectionExercise
        content={parseExerciseContent(currentExercise)}
        setUserAnswer={(value) => dispatch({ type: exerciseTypes.SET_USER_ANSWER, payload: value })}
        userAnswer={state.userAnswer}
        isAnswerCorrect={state.isAnswerCorrect}
        key={state.currentExerciseIndex}
      />
    ) : (
      <CompletionExercise
        content={parseExerciseContent(currentExercise)}
        setUserAnswer={(value) => dispatch({ type: exerciseTypes.SET_USER_ANSWER, payload: value })}
        userAnswer={state.userAnswer}
        isAnswerCorrect={state.isAnswerCorrect}
        key={state.currentExerciseIndex}
      />
    );
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
      next: () => dispatch({ type: exerciseTypes.NEXT_EXERCISE }),
      close: () => navigation.goBack(),
      render: renderExercise,
      currentExercise: state.currentExerciseIndex,
      percentage: ((state.currentExerciseIndex + 1) * 100) / exercises.length,
    },
    answer: {
      userAnswer: state.userAnswer,
      isCorrect: state.isAnswerCorrect,
      setUserAnswer: (value) => dispatch({ type: exerciseTypes.SET_USER_ANSWER, payload: value }),
      check: checkAnswer,
      setIsAnswerCorrect: (value) => dispatch({ type: exerciseTypes.SET_IS_ANSWER_CORRECT, payload: value }),
    },
    countdown: timeRemaining,
    isCountdownActive,
    initialCountdownValue,
  };
};
