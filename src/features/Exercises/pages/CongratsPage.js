import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "@components";
import { useNavigation } from "@react-navigation/native";

const CongratsPage = () => {
   const navigation = useNavigation();
   return (
      <View>
         <Text>¡Felicidades, has completado la lección!</Text>
         <View style={styles.buttonContainer}>
            <Button
               text="Continuar"
               variant="primary"
               style={{ flex: 1 }}
               onPress={() => navigation.replace("Main", { screen: "Lessons" })}
            />
         </View>
      </View>
   );
};

export default CongratsPage;

const styles = StyleSheet.create({
   buttonContainer: {
      gap: 16,
      flexDirection: "row",
      alignItems: "center",
      padding: 24,
   },
});
