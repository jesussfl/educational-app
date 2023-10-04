// Import necessary dependencies
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { query } from "@utils/graphql/client/GraphQLCLient";
import { queryExercisesByLessonId } from "@utils/graphql/queries/exercise.queries";
import { useRoute } from "@react-navigation/native";
import SimpleSelectionExercise from "../components/SimpleSelectionExercise";
import CompletionExercise from "../components/CompletionExercise";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Define a custom hook for exercise management
export default useExerciseManagement = () => {
   // Initialize navigation and route for navigation control and route parameters
   const navigation = useNavigation();
   const route = useRoute();
   const params = route.params;

   // Fetch exercise data using React Query
   const { data, isLoading, error } = useQuery([`exercises${params.lessonId}`], () =>
      query(queryExercisesByLessonId, { id: params.lessonId, start: 1, limit: 100 })
   );

   // Initialize current exercise index and isEmpty flag
   const [currentIndex, setCurrentIndex] = useState(0);
   const [isEmpty, setIsEmpty] = useState(false);
   const [userAnswer, setUserAnswer] = useState(null);
   const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

   // Sort exercises if data is available
   const exercises = isLoading ? [] : data?.exercisesByLesson.exercises.sort((a, b) => a.order - b.order);
   // Calculate percentage completion
   let percentage = ((currentIndex + 1) * 100) / exercises.length;

   useEffect(() => {
      if (exercises[currentIndex] && exercises[currentIndex].attributes.type === "completion") {
         // If the exercise type is completion, initialize userAnswer as an empty array
         setUserAnswer([]);
      } else {
         // For other exercise types, initialize userAnswer as null
         setUserAnswer(null);
      }
      // Reset isAnswerCorrect to null when the current exercise changes
      setIsAnswerCorrect(null);
   }, [currentIndex, isLoading]);

   const checkAnswer = () => {
      // Parse the correct answer from the exercise content
      const mainAnswer = JSON.parse(exercises[currentIndex].attributes.content);
      if (exercises[currentIndex].attributes.type === "simpleSelection") {
         console.log(userAnswer, mainAnswer);
         if (userAnswer === mainAnswer.correctAnswerIndex) {
            // Check if the user's answer matches the correct answer index
            return setIsAnswerCorrect(true);
         } else {
            // If not, set isAnswerCorrect to false
            return setIsAnswerCorrect(false);
         }
      } else if (exercises[currentIndex].attributes.type === "completion") {
         console.log(userAnswer, mainAnswer);
         if (userAnswer.length !== mainAnswer.correctWords.length) {
            // Check if the number of user-selected words matches the correct number
            return setIsAnswerCorrect(false);
         }

         // Sort both correctWords and userSelectedWords for comparison
         const correctWords = mainAnswer.correctWords.slice().sort();
         const userSelectedWords = userAnswer.slice().sort();

         for (let i = 0; i < userAnswer.length; i++) {
            if (correctWords[i] !== userSelectedWords[i]) {
               // Compare each word in the user's answer with the correct answer
               return setIsAnswerCorrect(false);
            }
         }
         // If all comparisons pass, set isAnswerCorrect to true
         return setIsAnswerCorrect(true);
      }
   };

   // Handle navigation to the next exercise
   const handleNext = () => {
      if (currentIndex < exercises.length - 1) {
         // Move to the next exercise if available
         setCurrentIndex(currentIndex + 1);
      }
   };

   // Handle exercise completion and return to the main screen
   const closeExercise = () => {
      navigation.replace("Main", { screen: "Lessons" });
   };

   // Render the current exercise based on its type
   const renderExercise = () => {
      if (exercises.length === 0) {
         // If there are no exercises available, set isEmpty flag to true
         setIsEmpty(true);
         return <Text style={{ textAlign: "center" }}>No exercises available for this lesson</Text>;
      }

      if (isLoading) {
         return <Text style={{ textAlign: "center" }}>Loading...</Text>;
      }
      // Define different exercise types and render the appropriate component
      const exerciseTypes = {
         simpleSelection: () => (
            <SimpleSelectionExercise
               content={JSON.parse(exercises[currentIndex].attributes.content)}
               setUserAnswer={setUserAnswer}
               isAnswerCorrect={isAnswerCorrect}
               userAnswer={userAnswer}
            />
         ),
         completion: () => {
            return (
               <CompletionExercise
                  content={JSON.parse(exercises[currentIndex].attributes.content)}
                  setUserAnswer={setUserAnswer}
                  userAnswer={userAnswer}
                  isAnswerCorrect={isAnswerCorrect}
               />
            );
         },
      };

      return exerciseTypes[exercises[currentIndex].attributes.type]();
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
