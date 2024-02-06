import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "@components";
import { useExercises } from "@stores/useExerciseStore";
const WordSelection = ({ combinedWords, handleSelectedWords }) => {
  const { userAnswer } = useExercises((state) => state);
  return (
    <View style={styles.wordsContainer}>
      {combinedWords.map((word, index) => (
        <Button key={index} text={word} variant="secondary" size="small" onPress={() => handleSelectedWords(word)} disabled={userAnswer.includes(word)} />
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
