import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../config/firebase";
import { Colors } from "../../../../utilities/Theme";
import Icon from "react-native-remix-icon";
import TextField from "../../../../components/textField/TextField";
import Button from "../../../../components/button/Button";

const SignupForm = () => {
   const navigation = useNavigation();
   const route = useRoute();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [alertMessage, setAlertMessage] = useState("");

   const showAlert = (message) => {
      setAlertMessage(message);
      setTimeout(() => {
         setAlertMessage("");
      }, 3000);
   };

   const handleSignUp = async () => {
      if (email === "" || password === "") {
         showAlert("Completa todos los campos");
         return;
      }

      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password)) {
         showAlert("La contraseña debe tener al menos 6 caracteres, 1 mayúscula, 1 minúscula y 1 número");
         return;
      }

      try {
         await createUserWithEmailAndPassword(auth, email, password);
         showAlert("Registro exitoso");
      } catch (error) {
         console.log(error);
         showAlert("Error al registrar");
      }
   };

   useEffect(() => {
      if (route.params?.isFromLogin) {
         navigation.setOptions({
            animation: "fade",
         });
      }
   }, []);

   return (
      <View style={styles.container}>
         {alertMessage ? <Text style={styles.alertText}>{alertMessage}</Text> : null}
         <View>
            <TextField
               label="Correo Electrónico"
               placeholder="Correo electrónico"
               value={email}
               onChangeText={(text) => setEmail(text)}
               leftIcon={<Icon name="mail-fill" size="20" color={Colors.gray_300} />}
            />
            <TextField
               label="Contraseña"
               placeholder="Introduce tu contraseña"
               value={password}
               onChangeText={(text) => setPassword(text)}
               leftIcon={<Icon name="lock-fill" size="20" color={Colors.gray_300} />}
            />
         </View>
         <View style={{ gap: 16 }}>
            <Button variant={"primary"} text="Crear mi cuenta" size="medium" onPress={handleSignUp} />
            <Button
               variant={"secondary"}
               text="Ya tengo una cuenta"
               size="medium"
               onPress={() => navigation.replace("Login", { isFromSignup: true })}
            />
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: { flex: 1, justifyContent: "space-between" },
   alertText: { color: "red", textAlign: "center", marginBottom: 16 },
});

export default SignupForm;
