// import React from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import * as React from "react";
import * as Google from "expo-auth-session/providers/google";
import Auth from "../components/auth/Auth";
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from "firebase/auth";
import { auth } from "../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
   const [userInfo, setUserInfo] = React.useState();
   const [request, response, promptAsync] = Google.useAuthRequest({
      androidClientId: "52699390234-8r5bc69b4njsopffe5tcjpb1hep1i5hc.apps.googleusercontent.com",
   });

   React.useEffect(() => {
      if (response?.type === "success") {
         const { id_token } = response.params;
         const credential = GoogleAuthProvider.credential(id_token);

         signInWithCredential(auth, credential);
      }
   }, [response]);
   return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
         <Auth propmtAsync={promptAsync} />
      </KeyboardAvoidingView>
   );
};

export default LoginScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      padding: 24,
   },
});
