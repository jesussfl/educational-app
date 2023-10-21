// Import necessary dependencies
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, useNavigation } from "@react-navigation/native";

import { query, queryExercisesByLessonId } from "@utils/graphql";
import useUserStats from "../../../hooks/useUserStats";
import { calculateTimeSpent, exercisesChecker } from "../helpers";

import { SimpleSelectionExercise, CompletionExercise } from "../components";
import { useCountdownTimer, useExerciseSound } from "../hooks";

// Define a custom hook for exercise management
export default useExerciseManagement = () => {
  //Hooks
  const navigation = useNavigation();
  const route = useRoute();
  const { timeRemaining, startCountdownTimer, stopCountdownTimer, isCountdownActive } = useCountdownTimer();
  const { userLives, decreaseLives } = useUserStats();
  const { playSound } = useExerciseSound();
  const { data, isLoading, error } = useQuery([`exercises${route.params.lessonId}`], () =>
    query(queryExercisesByLessonId, {
      id: route.params.lessonId,
      start: 1,
      limit: 100,
    })
  );

  //Exercise
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [errorCount, setErrorCount] = useState(0);
  const [errorExercises, setErrorExercises] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const initialCountdownValue = 10;

  //Sort exercises
  const exercises = isLoading ? [] : data?.exercisesByLesson.exercises.sort((a, b) => a.order - b.order);

  //Variables
  let percentage = ((currentIndex + 1) * 100) / exercises.length;
  let endTime;
  let currentExercise = exercises[currentIndex];

  useEffect(() => {
    handleExerciseStart();
    handleExerciseEnd();
    handleExerciseType();
  }, [currentIndex, isLoading]);

  // Handling user lives
  useEffect(() => {
    handleUserLives();
  }, [userLives, navigation]);

  function handleExerciseStart() {
    const isFirstExercise = currentIndex === 0;
    if (isFirstExercise) {
      setStartTime(new Date().getTime());
    }
  }

  function handleExerciseEnd() {
    const isLastExercise = currentIndex > exercises.length - 1;
    if (isLastExercise && !isLoading) {
      endTime = new Date().getTime();
      navigation.replace("Congrats", {
        lessonId: route.params.lessonId,
        elapsedTime: calculateTimeSpent(startTime, endTime),
        errorCount,
        errorExercises,
      });
    }
  }

  function handleExerciseType() {
    if (currentExercise && currentExercise.attributes.type === "completion") {
      setUserAnswer([]);
    } else {
      setUserAnswer(null);
    }
    if (currentExercise && currentExercise.attributes.type !== "completion") {
      startCountdownTimer(() => {
        setIsAnswerCorrect(false);
        setErrorCount(errorCount + 1);
        decreaseLives();
        setErrorExercises([...errorExercises, currentExercise.id]);
      }, initialCountdownValue);
    }
    setIsAnswerCorrect(null);
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

    const isCorrect = answerChecker(mainAnswer, userAnswer);

    if (isCorrect) {
      await playSound();
      setIsAnswerCorrect(true);
    } else {
      decreaseLives();
      setErrorCount(errorCount + 1);
      setErrorExercises([...errorExercises, currentExercise.id]);
      setIsAnswerCorrect(false);
    }
  };

  const renderExercise = () => {
    if (currentIndex > exercises.length - 1) {
      return;
    }

    return currentExercise.attributes.type === "simpleSelection" ? (
      <SimpleSelectionExercise
        content={parseExerciseContent(currentExercise)}
        setUserAnswer={setUserAnswer}
        userAnswer={userAnswer}
        isAnswerCorrect={isAnswerCorrect}
        key={currentIndex}
      />
    ) : (
      <CompletionExercise
        content={parseExerciseContent(currentExercise)}
        setUserAnswer={setUserAnswer}
        userAnswer={userAnswer}
        isAnswerCorrect={isAnswerCorrect}
        key={currentIndex}
      />
    );
  };

  const parseExerciseContent = (exercise) => {
    return typeof exercise.attributes.content === "string" ? JSON.parse(exercise.attributes.content) : exercise.attributes.content;
  };
  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const closeExercise = () => {
    navigation.goBack();
  };

  // Return the relevant data and functions as an object
  return {
    status: {
      isLoading,
      error,
    },
    handler: {
      next: handleNext,
      close: closeExercise,
      render: renderExercise,
      currentExercise: currentIndex,
      percentage,
    },
    answer: {
      userAnswer,
      isCorrect: isAnswerCorrect,
      setUserAnswer,
      check: checkAnswer,
      setIsAnswerCorrect,
    },
    countdown: timeRemaining,
    isCountdownActive,
    initialCountdownValue,
  };
};
