import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@utils/Theme";
import { Button } from "@components";
const CompletionText = ({ result, userAnswer, wordCounter, removeLastSelectedWord }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: 0 }}>
      {result.map((part, index) => {
        if (part.startsWith("{") && part.endsWith("}")) {
          // If the part starts and ends with curly braces, show a border around it
          wordCounter++;
          return (
            <View key={index}>
              {Array.isArray(userAnswer) && userAnswer.includes(userAnswer[wordCounter - 1]) ? (
                <View style={[styles.borderText, { borderColor: Colors.primary_600, borderBottomWidth: 0, paddingVertical: 0 }]}>
                  <Button key={index} text={userAnswer[wordCounter - 1]} variant="secondary" size="small" onPress={() => removeLastSelectedWord()} />
                </View>
              ) : (
                <View style={[styles.borderText, { height: 56 }]} />
              )}
            </View>
          );
        } else {
          // Otherwise, display the normal text part
          return (
            <Text key={index} style={styles.text}>
              {part}
            </Text>
          );
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 16,
    justifyContent: "space-between",
  },
  borderText: {
    borderColor: Colors.gray_300,
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderBottomWidth: 3,
    borderStyle: "dotted",
    opacity: 1,
    width: 150,
  },
  text: {
    fontFamily: "Sora-SemiBold",
    fontSize: 16,
    margin: 4,
    color: Colors.gray_600,
  },
});

export default CompletionText;
