import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Select from "../../../components/Select/Select";
import { Button } from "@components";
import { Colors } from "@utils/Theme";
const SimpleSelection = ({ content, handleNext }) => {
   const data = JSON.parse(content);
   const [selectedOption, setSelectedOption] = useState(null);
   const [selectedAnswer, setSelectedAnswer] = useState(null);
   const handleSelectClick = (optionId, answer) => {
      setSelectedOption(optionId);
      setSelectedAnswer(answer);
   };
   const checkAnswer = () => {
      if (selectedAnswer === data.options[0].text) {
         console.log(true);
         handleNext();
      } else {
         console.log(false);
      }
   };
   return (
      <View style={styles.container}>
         <Text style={styles.text}>Pregunta</Text>
         <View style={styles.optionsContainer}>
            {data.options.map((option, index) => (
               <Select
                  key={index}
                  {...option}
                  isPressed={selectedOption === index}
                  onPress={() => handleSelectClick(index, option.text)}></Select>
            ))}
         </View>
         <View style={{ gap: 16, flexDirection: "row", alignItems: "center" }}>
            <Button text="Volver" variant="secondary" style={{ flex: 1 }} />
            <Button text="Comprobar" variant="primary" style={{ flex: 1 }} onPress={checkAnswer} />
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
