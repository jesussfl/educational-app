import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import Select from "../../../components/Select/Select";
import { Button } from "@components";
import { Colors } from "@utils/Theme";
import useExerciseSound from "../hooks/useExerciseSound";
const SimpleSelection = ({ content, handleNext }) => {
   const { playSound } = useExerciseSound();
   const [selectedOption, setSelectedOption] = useState(null);
   const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
   const [isAnswerWrong, setIsAnswerWrong] = useState(false);

   const handleSelectClick = (optionId) => {
      if (isAnswerCorrect || isAnswerWrong) return;

      setSelectedOption(optionId);
   };

   useEffect(() => {
      setSelectedOption(null);
      setIsAnswerCorrect(false);
      setIsAnswerWrong(false);
   }, [handleNext]);
   const checkAnswer = () => {
      if (selectedOption === content.correctAnswerIndex) {
         playSound();
         setIsAnswerCorrect(true);
      } else {
         setIsAnswerWrong(true);
      }
   };
   return (
      <View style={styles.container}>
         <Text style={styles.text}>{content.question}</Text>
         <View style={styles.optionsContainer}>
            {content.options.map((option, index) => {
               if (selectedOption === index) {
                  return (
                     <Select
                        key={index}
                        {...option}
                        isPressed={true}
                        error={isAnswerWrong}
                        success={isAnswerCorrect}
                        onPress={() => handleSelectClick(index, option.text)}></Select>
                  );
               } else {
                  return <Select key={index} {...option} isPressed={false} onPress={() => handleSelectClick(index, option.text)}></Select>;
               }
            })}
         </View>
         <View style={{ gap: 16, flexDirection: "row", alignItems: "center" }}>
            {isAnswerCorrect || isAnswerWrong ? (
               <Button text="Continuar" variant={isAnswerCorrect ? "success" : "wrong"} style={{ flex: 1 }} onPress={handleNext} />
            ) : (
               <Button text="Comprobar" variant="primary" style={{ flex: 1 }} onPress={checkAnswer} />
            )}
         </View>
      </View>
   );
};

export default SimpleSelection;

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
