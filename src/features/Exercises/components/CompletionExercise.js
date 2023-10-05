import React from "react";
import { StyleSheet, View } from "react-native";

import CompletionText from "./CompletionText";
import WordSelection from "./WordSelection";

// The Completion component accepts props 'content', 'setUserAnswer', and 'userAnswer'.
const CompletionExercise = ({ content, setUserAnswer, userAnswer }) => {
   // Initialize a word counter.
   let wordCounter = 0;

   // Handle the selection of words by updating the user's answer.
   const handleSelectedWords = (selectedWord) => {
      setUserAnswer([...userAnswer, selectedWord]);
   };

   // Remove the last selected word from the user's answer.
   const removeLastSelectedWord = () => {
      setUserAnswer(userAnswer.slice(0, userAnswer.length - 1));
   };

   // Split the completion text using a regular expression to separate words with and without braces.
   const textParts = content.completionText.split(" ");

   // Filter out empty elements from the resulting array.
   const nonEmptyParts = textParts.filter((part) => part.trim() !== "");

   // Combine correct and incorrect words into a single array.
   const allWords = [...content.correctWords, ...content.incorrectWords];

   return (
      <View style={styles.container}>
         {/* Render the CompletionText component */}
         <CompletionText
            result={nonEmptyParts}
            userAnswer={userAnswer}
            wordCounter={wordCounter}
            removeLastSelectedWord={removeLastSelectedWord}
         />

         {/* Render the WordSelection component */}
         <WordSelection combinedWords={allWords} handleSelectedWords={handleSelectedWords} />
      </View>
   );
};

export default CompletionExercise;

// Define the styles for the Completion component.
const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 16,
      gap: 16,
      justifyContent: "space-between",
   },
});
