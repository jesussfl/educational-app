import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "@components";
import { useExercises } from "@stores/useExerciseStore";
import { speak } from "../helpers/speak";
const WordSelection = ({ combinedWords, handleSelectedWords, wordCounter }) => {
  const { userAnswer } = useExercises((state) => state);

  return (
    <View style={styles.wordsContainer}>
      {combinedWords.map((word, index) => (
        <Button
          key={index}
          text={word}
          variant="secondary"
          size="small"
          onPress={() => {
            handleSelectedWords(word);
            speak(word);
          }}
          disabled={userAnswer.includes(word) || wordCounter === userAnswer.length}
        />
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  wordsContainer: {
    gap: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});
export default WordSelection;
