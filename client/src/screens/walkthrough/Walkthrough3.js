import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "../../components/button/Button";
import Headings from "../../components/headings/Headings";
import { SemanticColors } from "../../utilities/Theme";
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
