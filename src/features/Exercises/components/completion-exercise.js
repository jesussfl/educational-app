import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Colors } from "@utils/Theme";
import CompletionText from "./CompletionText";
import WordSelection from "./WordSelection";
import * as Animatable from "react-native-animatable";
import { useExercises } from "@stores/useExerciseStore";
// The Completion component accepts props 'content', 'setUserAnswer', and 'userAnswer'.
const MemoizedWordSelection = React.memo(WordSelection);
const MemoizedCompletionText = React.memo(CompletionText);
const CompletionExercise = ({ content }) => {
  const { setUserAnswer, userAnswer } = useExercises((state) => state);
  // Initialize a word counter.
  let wordCounter = 0;
  // Handle the selection of words by updating the user's answer.
  const handleSelectedWords = React.useCallback(
    (selectedWord) => {
      setUserAnswer([...userAnswer, selectedWord]);
    },
    [setUserAnswer, userAnswer]
  );

  const removeLastSelectedWord = React.useCallback(() => {
    setUserAnswer(userAnswer.slice(0, userAnswer.length - 1));
  }, [setUserAnswer, userAnswer]);

  // Split the completion text using a regular expression to separate words with and without braces.

  // Split the completion text using a regular expression to separate words with and without braces.
  const textParts = content.completionSentence.split(/\s*({[^}]*})\s*/).filter(Boolean);

  // Function to split words within a sentence
  const splitWords = (sentence) => sentence.split(/\s+/);

  // Use flatMap to split words within each part of the text
  const result = textParts.flatMap((part) => {
    if (part.startsWith("{") && part.endsWith("}")) {
      // If the part is within braces, return it as is
      return [part];
    } else {
      // If the part is outside braces, split the words
      return splitWords(part);
    }
  });

  // Combine correct and incorrect words into a single array.
  const allWords = content.words.map((word) => {
    return word.name;
  });
  // Use state to store the shuffled words.
  const [randomWords, setRandomWords] = useState([]);

  // Only shuffle the words if the state is empty.
  useEffect(() => {
    if (randomWords.length === 0) {
      setRandomWords(allWords.sort(() => Math.random() - 0.5));
    }
  }, [allWords, randomWords]);
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
        <MemoizedCompletionText result={result} userAnswer={userAnswer} wordCounter={wordCounter} removeLastSelectedWord={removeLastSelectedWord} />
      </View>

      {/* Render the WordSelection component */}
      <MemoizedWordSelection combinedWords={randomWords} handleSelectedWords={handleSelectedWords} userAnswer={userAnswer} />
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
