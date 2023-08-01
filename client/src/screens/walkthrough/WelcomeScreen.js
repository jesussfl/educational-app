import React from "react";

import { StyleSheet, View } from "react-native";
import { SemanticColors } from "../../utilities/Theme";

import Button from "../../components/button/Button";
import Icon from "react-native-remix-icon";
import GoogleIcon from "../../../assets/google.svg";
import FacebookIcon from "../../../assets/facebook.svg";
import Headings from "../../components/headings/Headings";
const WelcomeScreen = ({ navigation }) => {
   return (
      <View style={{ flex: 1, justifyContent: "space-around", gap: 32, padding: 24 }}>
         <Headings title="Bienvenido" description="Continuemos con una de las siguientes opciones"></Headings>
         <View style={{ gap: 16 }}>
            <Button
               variant={"secondary"}
               text="Continuar con Google"
               size="medium"
               onPress={() => console.log("Login")}
               rightIcon={<GoogleIcon></GoogleIcon>}
            />
            <Button
               variant={"secondary"}
               text="Continuar con Facebook"
               size="medium"
               onPress={() => console.log("Login")}
               rightIcon={<FacebookIcon></FacebookIcon>}
            />
            <Button
               onPress={() => navigation.navigate("Login")}
               variant={"secondary"}
               text="Continuar con correo"
               size="medium"
               rightIcon={<Icon name="mail-fill" size="20" color={SemanticColors.text.normal}></Icon>}
            />
         </View>
         <View style={{ gap: 16 }}>
            <Button variant={"primary"} text="Comenzar" onPress={() => navigation.navigate("Home")} />
            <Button variant={"secondary"} text="Crear una cuenta" onPress={() => navigation.navigate("Signup")} />
         </View>
      </View>
   );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
});
