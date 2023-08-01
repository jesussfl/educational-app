import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "../../components/button/Button";
import Headings from "../../components/headings/Headings";
import { SemanticColors } from "../../utilities/Theme";
const Walkthrough2 = ({ navigation }) => {
   return (
      <View style={{ flex: 1, justifyContent: "space-between", padding: 24 }}>
         <View style={{ backgroundColor: SemanticColors.elevation.secondary_normal, height: 300 }}></View>
         <Headings
            title="Explora lecciones interactivas"
            description="Descubre lecciones intuitivas y prácticas sobre educación financiera a tu propio ritmo"></Headings>
         <View style={{ gap: 16, flexDirection: "row-reverse" }}>
            <Button style={{ flex: 1 }} variant={"primary"} text="Continuar" onPress={() => navigation.navigate("Walkthrough3")} />
            <Button style={{ flex: 1 }} variant={"secondary"} text="Saltar" onPress={() => navigation.navigate("Welcome")} />
         </View>
      </View>
   );
};

export default Walkthrough2;

const styles = StyleSheet.create({});
