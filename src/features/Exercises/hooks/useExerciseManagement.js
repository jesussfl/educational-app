// Import necessary dependencies
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { query } from "@utils/graphql/client/GraphQLCLient";
import { queryExercisesByLessonId } from "@utils/graphql/queries/exercise.queries";
import { useRoute } from "@react-navigation/native";
import SimpleSelectionExercise from "../components/SimpleSelectionExercise";
import CompletionExercise from "../components/CompletionExercise";
import { useNavigation } from "@react-navigation/native";
import useUserStats from "../../../hooks/useUserStats";
import { exercisesChecker } from "../helpers/checkAnswers";
import useExerciseSound from "./useExerciseSound";
import { calculateTimeSpent } from "../helpers/calculateTimeSpent";
// Define a custom hook for exercise management
export default useExerciseManagement = () => {
  //Hooks
  const navigation = useNavigation();
  const route = useRoute();

  const { userLives, decreaseLives } = useUserStats();
  const { playSound } = useExerciseSound();

  //Fetch Data
  const { data, isLoading, error } = useQuery([`exercises${route.params.lessonId}`], () =>
    query(queryExercisesByLessonId, {
      id: route.params.lessonId,
      start: 1,
      limit: 100,
    })
  );

  //Exercise
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);

  //Answers
  const [userAnswer, setUserAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

  //Errors
  const [errorCount, setErrorCount] = useState(0);
  const [errorExercises, setErrorExercises] = useState([]);

  //Time
  const [startTime, setStartTime] = useState(null);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const initialCountdownValue = 10; // Establece el tiempo inicial de cuenta regresiva

  //Sort exercises
  const exercises = isLoading ? [] : data?.exercisesByLesson.exercises.sort((a, b) => a.order - b.order);

  //Variables
  let percentage = ((currentIndex + 1) * 100) / exercises.length;
  let endTime;
  let currentExercise = exercises[currentIndex];

  useEffect(() => {
    const isExerciseTypeCompletion = exercises[currentIndex]?.attributes?.type === "completion";
    const isFirstExercise = currentIndex === 0;
    const isLastExercise = currentIndex > exercises.length - 1;
    if (isFirstExercise) {
      setStartTime(new Date().getTime());
    }

    if (isLastExercise && !isLoading) {
      endTime = new Date().getTime();
      navigation.replace("Congrats", {
        lessonId: route.params.lessonId,
        elapsedTime: calculateTimeSpent(startTime, endTime),
        errorCount,
        errorExercises,
      });
    }

    if (currentExercise && isExerciseTypeCompletion) {
      setUserAnswer([]);
    } else {
      setUserAnswer(null);
    }
    if (currentExercise && !isExerciseTypeCompletion) {
      startCountdown();
    }
    setIsAnswerCorrect(null);
  }, [currentIndex, isLoading]);

  useEffect(() => {
    if (userLives <= 0) {
      navigation.replace("Main", { screen: "Lessons" });
      return;
    }
  }, [userLives, navigation]);
  const startCountdown = () => {
    if (currentExercise.attributes.type === "simpleSelection" && !isCountdownActive) {
      setIsCountdownActive(true);
      setCountdown(initialCountdownValue);

      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(countdownInterval);
            setIsCountdownActive(false);
            setIsAnswerCorrect(false);
            setErrorCount(errorCount + 1);
            decreaseLives();
            setErrorExercises([...errorExercises, currentExercise.id]);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
  };

  const checkAnswer = async () => {
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
        isAnswerCorrect={isAnswerCorrect}
        userAnswer={userAnswer}
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
    if (isCountdownActive) {
      setIsCountdownActive(false);
    }
    setCurrentIndex(currentIndex + 1);
  };

  const closeExercise = () => {
    navigation.goBack();
  };

  // Return the relevant data and functions as an object
  return {
    status: {
      isLoading,
      isEmpty,
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
    countdown,
    isCountdownActive,
    initialCountdownValue,
  };
};
