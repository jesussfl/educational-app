// import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";

import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import Button from "../components/button/Button";
const SignupScreen = ({ navigation, propmtAsync }) => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const handleSignUp = async () => {
      try {
         await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
         console.log(error);
      }
   };

   const handleLogin = async () => {
      try {
         await signInWithEmailAndPassword(auth, email, password);
         navigation.replace("Home");
      } catch (error) {
         console.log(error);
      }
   };

   // const navigation = useNavigation;
   return (
      <View>
         <Text>SignupScreen</Text>
         <TextInput placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} style={styles.input} />
         <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
         />

         <Button onPress={handleSignUp} style={[styles.button, styles.buttonOutline]}>
            <Text style={styles.buttonOutlineText}>Register</Text>
         </Button>
         <Button onPress={() => propmtAsync()} style={[styles.button, styles.buttonOutline]}>
            <Text style={styles.buttonOutlineText}>Login With Google</Text>
         </Button>
      </View>
   );
};

export default SignupScreen;

const styles = StyleSheet.create({
   inputContainer: {
      width: "80%",
   },
   input: {
      backgroundColor: "white",
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
   },
   buttonContainer: {
      width: "60%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 40,
   },
   button: {
      backgroundColor: "#0782F9",
      width: "100%",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
   },
   buttonOutline: {
      backgroundColor: "white",
      marginTop: 5,
      borderColor: "#0782F9",
      borderWidth: 2,
   },
   buttonText: {
      color: "white",
      fontWeight: "700",
      fontSize: 16,
   },
   buttonOutlineText: {
      color: "#0782F9",
      fontWeight: "700",
      fontSize: 16,
   },
});
