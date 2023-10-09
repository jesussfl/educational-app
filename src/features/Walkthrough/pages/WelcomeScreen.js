import React from "react";
import { View, StyleSheet } from "react-native";

//Components
import { SemanticColors } from "@utils/Theme";
import { Headings, Button } from "@components";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
//Firebase Imports
// import * as Google from "expo-auth-session/providers/google";

// GoogleSignin.configure({
//    webClientId: "52699390234-8r5bc69b4njsopffe5tcjpb1hep1i5hc.apps.googleusercontent.com",
// });

//Remix Icons
import Icon from "react-native-remix-icon";
const WelcomeScreen = ({ navigation }) => {
   // const [request, response, promptAsync] = Google.useAuthRequest({
   // 	androidClientId: "52699390234-8r5bc69b4njsopffe5tcjpb1hep1i5hc.apps.googleusercontent.com",
   // 	redirectUri: "exp://192.168.0.108:8081/--/auth/callback",
   // });
   // Somewhere in your code

   return (
      <View style={styles.pageContainer}>
         <Headings title="Bienvenido" description="Continuemos con una de las siguientes opciones" />
         <View style={{ gap: 16 }}>
            <Button
               onPress={() => navigation.navigate("Auth", { screen: "Login" })}
               variant={"secondary"}
               text="Continuar con correo"
               size="medium"
               rightIcon={<Icon name="mail-fill" size="20" color={SemanticColors.text.normal}></Icon>}
            />
         </View>
         <View style={{ gap: 16 }}>
            <Button variant={"primary"} text="Comenzar" onPress={() => navigation.replace("Main", { screen: "Lessons" })} />
            <Button variant={"secondary"} text="Crear una cuenta" onPress={() => navigation.navigate("Auth", { screen: "Signup" })} />
         </View>
      </View>
   );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
   pageContainer: {
      flex: 1,
      justifyContent: "space-around",
      gap: 32,
      padding: 24,
   },
});
