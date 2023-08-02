import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../config/firebase";
import { Colors } from "../../../../utilities/Theme";
import { useForm } from "react-hook-form";
import { emailValidations, passwordValidations } from "../../utils/inputValidations";

//Components
import Icon from "react-native-remix-icon";
import TextField from "../../../../components/textField/TextField";
import Button from "../../../../components/button/Button";

const SignupForm = () => {
   const navigation = useNavigation();
   const route = useRoute();
   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm();

   useEffect(() => {
      if (route.params?.isFromLogin) {
         navigation.setOptions({
            animation: "fade",
         });
      }
   }, []);

   const onSignupPressed = async ({ email, password }) => {
      console.log(email, password);
      try {
         await createUserWithEmailAndPassword(auth, email, password);
         navigation.navigate("Home");
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <View style={styles.container}>
         <View>
            <TextField {...emailValidations} control={control} leftIcon={<Icon name="mail-fill" size="20" color={Colors.gray_300} />} />
            <TextField {...passwordValidations} control={control} leftIcon={<Icon name="lock-fill" size="20" color={Colors.gray_300} />} />
         </View>
         <View style={{ gap: 16 }}>
            <Button variant={"primary"} text="Crear mi cuenta" size="medium" onPress={handleSubmit(onSignupPressed)} />
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
   container: { flex: 1, justifyContent: "space-between", alignSelf: "stretch" },
   alertText: { color: "red", textAlign: "center", marginBottom: 16 },
});

export default SignupForm;
