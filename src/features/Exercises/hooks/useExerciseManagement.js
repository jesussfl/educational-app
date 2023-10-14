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
// Define a custom hook for exercise management
export default useExerciseManagement = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);

  const [userAnswer, setUserAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();
  const { playSound } = useExerciseSound();
  const params = route.params;
  const { userLives, decreaseLives } = useUserStats();
  const { data, isLoading, error } = useQuery(
    [`exercises${params.lessonId}`],
    () =>
      query(queryExercisesByLessonId, {
        id: params.lessonId,
        start: 1,
        limit: 100,
      })
  );

  const exercises = isLoading
    ? []
    : data?.exercisesByLesson.exercises.sort((a, b) => a.order - b.order);
  let percentage = ((currentIndex + 1) * 100) / exercises.length;

  useEffect(() => {
    if (
      exercises[currentIndex] &&
      exercises[currentIndex].attributes.type === "completion"
    ) {
      setUserAnswer([]);
    } else {
      setUserAnswer(null);
    }
    setIsAnswerCorrect(null);
  }, [currentIndex, isLoading]);

  const checkAnswer = async () => {
    const currentExercise = exercises[currentIndex];
    const mainAnswer = parseExerciseContent(currentExercise);

    const exerciseType = currentExercise.attributes.type;
    const answerChecker = exercisesChecker[exerciseType];

    if (!answerChecker) {
      // Manejar el caso en que no se encuentre una función de comprobación adecuada.
      console.error(
        `No se encontró una función de comprobación para el tipo de ejercicio: ${exerciseType}`
      );
      return;
    }

    const isCorrect = answerChecker(mainAnswer, userAnswer);

    if (isCorrect) {
      await playSound();
      setIsAnswerCorrect(true);
    } else {
      decreaseLives();

      setIsAnswerCorrect(false);
    }
  };

  const renderExercise = () => {
    if (currentIndex > exercises.length - 1) {
      navigation.navigate("Congrats", { lessonId: params.lessonId });
      return;
    }
    if (userLives <= 0) {
      navigation.goBack(); // Replace "GameOver" with your actual screen name for when the user has 0 lives.
      return;
    }
    const currentExercise = exercises[currentIndex];

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
    return typeof exercise.attributes.content === "string"
      ? JSON.parse(exercise.attributes.content)
      : exercise.attributes.content;
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
  };
};
