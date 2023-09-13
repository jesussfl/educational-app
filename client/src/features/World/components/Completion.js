import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "@components";

const Completion = ({ content }) => {
   const data = JSON.parse(content);
   const texto = "Ahorrar dinero es esencial para {asegurar} futuras {metas} {financieras} y {afrontar} {situaciones} de emergencia.";

   // Utilizamos una expresión regular para dividir el texto en partes con y sin llaves
   const partes = texto.split(/(\{[^}]*\})/);

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
            {data.words.map((word, index) => (
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
      paddingHorizontal: 4, // Añade un espacio horizontal para separar el borde del texto
   },
   borderText: {
      opacity: 0, // Oculta el contenido real dentro del borde
   },
   text: {
      // Estilos para el texto normal
      // Puedes personalizar esto según tus necesidades
      fontSize: 16,
      margin: 4, // Añade un espacio alrededor del texto normal
   },
});
