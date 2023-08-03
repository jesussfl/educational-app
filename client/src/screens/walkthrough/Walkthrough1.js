import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "../../components/button/Button";
import Headings from "../../components/headings/Headings";
import { SemanticColors } from "../../utilities/Theme";
const Walkthrough1 = ({ navigation }) => {
   return (
      <View style={{ flex: 1, justifyContent: "space-between", padding: 24 }}>
         <View style={{ backgroundColor: SemanticColors.elevation.secondary_normal, height: 300 }}></View>
         <Headings
            title="¡Bienvenido a [nombre de la aplicación]!"
            description="Aprende a tomar el control de tus finanzas de manera divertida y educativa"></Headings>
         <View style={{ gap: 16, flexDirection: "row-reverse" }}>
            <Button
               style={{ flex: 1 }}
               variant={"primary"}
               text="Continuar"
               size="medium"
               onPress={() => navigation.navigate("Walkthrough2")}
            />
            <Button style={{ flex: 1 }} variant={"secondary"} text="Saltar" size="medium" onPress={() => navigation.navigate("Welcome")} />
         </View>
      </View>
   );
};

export default Walkthrough1;

const styles = StyleSheet.create({});
