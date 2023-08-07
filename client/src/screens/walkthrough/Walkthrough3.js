import React from "react";
import { StyleSheet, View } from "react-native";
import { Headings, Button } from "@components";
import { SemanticColors } from "@utils/Theme";
const Walkthrough3 = ({ navigation }) => {
   return (
      <View style={{ flex: 1, justifyContent: "space-between", padding: 24 }}>
         <View style={{ backgroundColor: SemanticColors.elevation.secondary_normal, height: 300 }}></View>
         <Headings
            title="Realiza un seguimiento de tu progreso"
            description="Mantén un registro de tus logros y observa cómo mejoras tus habilidades financieras con el tiempo"></Headings>
         <View style={{ gap: 16 }}>
            <Button variant={"primary"} text="Comenzar" onPress={() => navigation.navigate("Welcome")} />
         </View>
      </View>
   );
};

export default Walkthrough3;

const styles = StyleSheet.create({});
