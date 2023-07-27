import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { auth, googleProvider } from "../../config/firebase";
import { useNavigation } from "@react-navigation/core";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Button from "../button/Button";
const Auth = ({ propmtAsync }) => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const navigation = useNavigation();
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

   return (
      <View>
         <TextInput placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} style={styles.input} />
         <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
         />
         <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={handleSignUp} style={[styles.button, styles.buttonOutline]}>
            <Text style={styles.buttonOutlineText}>Register</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => propmtAsync()} style={[styles.button, styles.buttonOutline]}>
            <Text style={styles.buttonOutlineText}>Login With Google</Text>
         </TouchableOpacity>
         <Button />
      </View>
   );
};

export default Auth;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
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
