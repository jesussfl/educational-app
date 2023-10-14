import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Colors } from "@utils/Theme";
import CompletionText from "./CompletionText";
import WordSelection from "./WordSelection";
import * as Animatable from "react-native-animatable";
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
  useEffect(() => {
    // Start the animation when the component mounts.
    slidenIn();
  }, []);
  const slidenIn = () => {
    // You can customize the animation duration and other properties as needed.
    this.view.slideInRight(300);
  };

  return (
    <Animatable.View
      style={styles.container}
      animation="slideInLeft"
      duration={1000} // Adjust the duration as needed
      ref={(ref) => (this.view = ref)}
    >
      {/* Render the CompletionText component */}
      <View style={{ gap: 24 }}>
        <Text style={styles.titleText}>Completa los espacios vacíos</Text>
        <CompletionText
          result={nonEmptyParts}
          userAnswer={userAnswer}
          wordCounter={wordCounter}
          removeLastSelectedWord={removeLastSelectedWord}
        />
      </View>

      {/* Render the WordSelection component */}
      <WordSelection
        combinedWords={allWords}
        handleSelectedWords={handleSelectedWords}
      />
    </Animatable.View>
  );
};

export default CompletionExercise;

// Define the styles for the Completion component.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 16,
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 20,
    fontFamily: "Sora-SemiBold",
    lineHeight: 32,
    color: Colors.gray_600,
  },
});
