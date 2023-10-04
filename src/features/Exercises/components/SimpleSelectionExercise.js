import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Select from "../../../components/Select/Select";
import { Colors } from "@utils/Theme";
const SimpleSelectionExercise = ({ content, setUserAnswer, isAnswerCorrect, userAnswer }) => {
   return (
      <View style={styles.container}>
         <Text style={styles.text}>{content.question}</Text>
         <View style={styles.optionsContainer}>
            {content.options.map((option, index) => {
               if (userAnswer === index) {
                  return (
                     <Select
                        key={index}
                        {...option}
                        isPressed={true}
                        error={isAnswerCorrect === false}
                        success={isAnswerCorrect}
                        onPress={() => handleSelectClick(index, option.text)}></Select>
                  );
               } else {
                  return <Select key={index} {...option} isPressed={false} onPress={() => setUserAnswer(index)}></Select>;
               }
            })}
         </View>
      </View>
   );
};

export default SimpleSelectionExercise;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 24,
      gap: 16,
      justifyContent: "space-between",
   },
   optionsContainer: {
      gap: 24,
   },
   text: {
      color: Colors.gray_600,
      fontFamily: "Sora-SemiBold",
      fontSize: 20,
      textAlign: "center",
   },
});
