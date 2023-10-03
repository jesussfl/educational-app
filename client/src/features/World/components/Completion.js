import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "@components";

const Completion = ({ content }) => {
   // Utilizamos una expresión regular para dividir el texto en partes con y sin llaves
   const partes = content.completionText.split(/(\{[^}]*\})/);

   // Eliminamos elementos vacíos del arreglo resultante
   const resultado = partes.filter((part) => part.trim() !== "");

   return (
      <View>
         <View style={{ flexDirection: "row", alignItems: "center", padding: 16, flexWrap: "wrap" }}>
            {resultado.map((parte, index) => {
               if (parte.startsWith("{") && parte.endsWith("}")) {
                  // Si la parte comienza y termina con llaves, muestra un borde alrededor
                  return (
                     <View key={index} style={styles.borderContainer}>
                        <Text style={styles.borderText}>&nbsp;</Text>
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
         <View style={{ gap: 24, flexDirection: "row", alignItems: "center", padding: 16, flexWrap: "wrap" }}>
            {content.incorrectWords.map((word, index) => (
               <Button key={index} text={word} variant="secondary" size="small" />
            ))}
         </View>
      </View>
   );
};

export default Completion;

const styles = StyleSheet.create({
   container: {
      flexDirection: "row",
      flexWrap: "wrap",
   },
   borderContainer: {
      width: 50,
      borderBottomWidth: 2,
      borderColor: "black",
      paddingHorizontal: 4,
   },
   borderText: {
      opacity: 0,
   },
   text: {
      fontSize: 16,
      margin: 4,
   },
});
