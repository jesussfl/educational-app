import React, { useState, useEffect } from "react";

import { StyleSheet, View } from "react-native";
import { SemanticColors } from "../../utilities/Theme";

import Button from "../../components/button/Button";
import Icon from "react-native-remix-icon";
import GoogleIcon from "../../../assets/google.svg";
import FacebookIcon from "../../../assets/facebook.svg";
import Headings from "../../components/headings/Headings";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from "firebase/auth";
import { auth } from "../../config/firebase";
const WelcomeScreen = ({ navigation }) => {
   const [userInfo, setUserInfo] = useState();
   const [request, response, promptAsync] = Google.useAuthRequest({
      androidClientId: "52699390234-8r5bc69b4njsopffe5tcjpb1hep1i5hc.apps.googleusercontent.com",
   });
   useEffect(() => {
      if (response?.type === "success") {
         const { id_token } = response.params;
         const credential = GoogleAuthProvider.credential(id_token);

         signInWithCredential(auth, credential);
      }
   }, [response]);
   return (
      <View style={{ flex: 1, justifyContent: "space-around", gap: 32, padding: 24 }}>
         <Headings title="Bienvenido" description="Continuemos con una de las siguientes opciones"></Headings>
         <View style={{ gap: 16 }}>
            <Button
               variant={"secondary"}
               text="Continuar con Google"
               size="medium"
               onPress={() => promptAsync()}
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
            <Button variant={"primary"} text="Comenzar" onPress={() => navigation.navigate("Main", { screen: "Lessons" })} />
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
