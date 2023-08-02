import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "../../../../utilities/Theme";
import { useForm } from "react-hook-form";
import { emailValidations, loginPasswordValidations } from "../../utils/inputValidations";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../../../config/firebase";
//components
import Icon from "react-native-remix-icon";
import TextField from "../../../../components/textField/TextField";
import Button from "../../../../components/button/Button";

const LoginForm = () => {
   const navigation = useNavigation();
   const route = useRoute();
   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm();

   onSigninPressed = async ({ email, password }) => {
      console.log(email, password);
      try {
         await signInWithEmailAndPassword(auth, email, password);
         navigation.navigate("Home");
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      if (route.params?.isFromSignup) {
         navigation.setOptions({
            animation: "fade",
         });
      }
   }, []);
   return (
      <View style={styles.container}>
         <View>
            <TextField {...emailValidations} control={control} leftIcon={<Icon name="mail-fill" size="20" color={Colors.gray_300} />} />
            <TextField
               {...loginPasswordValidations}
               control={control}
               leftIcon={<Icon name="lock-fill" size="20" color={Colors.gray_300} />}
            />
         </View>
         <View style={{ gap: 16 }}>
            <Button variant={"primary"} text="Iniciar Sesión" size="medium" onPress={handleSubmit(onSigninPressed)} />
            <Button
               variant={"secondary"}
               text="No tengo una cuenta"
               size="medium"
               onPress={() => navigation.replace("Signup", { isFromLogin: true })}
            />
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: { flex: 1, justifyContent: "space-between", alignSelf: "stretch" },
   alertText: { color: "red", textAlign: "center", marginBottom: 16 },
});

export default LoginForm;
