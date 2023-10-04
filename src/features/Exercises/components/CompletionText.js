import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@utils/Theme";
import { Button } from "@components";
const CompletionText = ({ result, userAnswer, wordCounter, removeLastWordInSelectedWords }) => {
   return (
      <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
         {result.map((part, index) => {
            if (part.startsWith("{") && part.endsWith("}")) {
               // If the part starts and ends with curly braces, show a border around it
               wordCounter++;
               return (
                  <View key={index} style={styles.borderContainer}>
                     {Array.isArray(userAnswer) && userAnswer.includes(userAnswer[wordCounter - 1]) ? (
                        <Button
                           key={index}
                           text={userAnswer[wordCounter - 1]}
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
      padding: 16,
      gap: 16,
      justifyContent: "space-between",
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

export default CompletionText;
