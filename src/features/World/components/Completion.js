import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button } from "@components";
import { Colors } from "@utils/Theme";
const Completion = ({ content, handleNext }) => {
   const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
   const [isAnswerWrong, setIsAnswerWrong] = useState(false);
   const [selectedWords, setSelectedWords] = useState([]);
   let counter = 0;
   const checkAnswer = () => {
      if (isAnswerCorrect || isAnswerWrong) return;

      if (selectedWords.length !== content.correctWords.length) {
         return setIsAnswerWrong(true);
      }

      const correctWords = content.correctWords.slice().sort();
      const userSelectedWords = selectedWords.slice().sort();

      for (let i = 0; i < selectedWords.length; i++) {
         if (correctWords[i] !== userSelectedWords[i]) {
            return setIsAnswerWrong(true);
         }
      }

      return setIsAnswerCorrect(true);
   };
   const handleSelectedWords = (word) => {
      setSelectedWords([...selectedWords, word]);
   };
   const removeLastWordInSelectedWords = () => {
      setSelectedWords(selectedWords.slice(0, selectedWords.length - 1));
   };
   // Utilizamos una expresión regular para dividir el texto en partes con y sin llaves
   const partes = content.completionText.split(" ");
   // Eliminamos elementos vacíos del arreglo resultante
   const resultado = partes.filter((part) => part.trim() !== "");
   const combinedWords = [...content.correctWords, ...content.incorrectWords];
   console.log(isAnswerCorrect, isAnswerWrong);
   return (
      <View style={styles.container}>
         <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
            {resultado.map((parte, index) => {
               if (parte.startsWith("{") && parte.endsWith("}")) {
                  // Si la parte comienza y termina con llaves, muestra un borde alrededor
                  counter++;
                  return (
                     <View key={index} style={styles.borderContainer}>
                        {selectedWords.includes(selectedWords[counter - 1]) ? (
                           <Button
                              key={index}
                              text={selectedWords[counter - 1]}
                              variant="secondary"
                              size="small"
                              onPress={() => removeLastWordInSelectedWords()}
                           />
                        ) : (
                           <Text key={index} style={styles.borderText}>
                              {"            "}
                           </Text>
                        )}
                     </View>
                  );
               } else {
                  // De lo contrario, muestra la parte de texto normal
                  return (
                     <Text key={index} style={styles.text}>
                        {parte}
                     </Text>
                  );
               }
            })}
         </View>
         <View style={styles.wordsContainer}>
            {combinedWords.map((word, index) => (
               <Button key={index} text={word} variant="secondary" size="small" onPress={() => handleSelectedWords(word)} />
            ))}
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

export default Completion;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 16,
      gap: 16,
      justifyContent: "space-between",
   },
   wordsContainer: {
      gap: 4,
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
   },
   borderContainer: {
      height: 72,
      borderBottomWidth: 2,
      borderColor: Colors.gray_300,
      paddingHorizontal: 4,
      paddingVertical: 4,
   },
   borderText: {
      opacity: 1,
   },
   text: {
      fontFamily: "Sora-SemiBold",
      fontSize: 16,
      margin: 4,
      color: Colors.gray_600,
   },
});
