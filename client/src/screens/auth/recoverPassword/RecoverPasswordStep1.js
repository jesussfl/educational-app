import { StyleSheet, Text, View } from "react-native";
import Headings from "../../../components/headings/Headings";
import Button from "../../../components/button/Button";
import TextField from "../../../components/textField/TextField";
import { emailValidations } from "../../../features/Auth/utils/inputValidations";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../utilities/Theme";
import Icon from "react-native-remix-icon";

import React from "react";

const RecoverPasswordStep1 = () => {
   const navigation = useNavigation();
   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm();
   return (
      <View style={{ flex: 1, justifyContent: "space-between", padding: 24 }}>
         <Headings
            title="Recuperar contraseña"
            description="Por favor ingrese su correo electrónico y le enviaremos un código en el siguiente paso para reestablecer su contraseña. "></Headings>
         <TextField {...emailValidations} control={control} leftIcon={<Icon name="mail-fill" size="20" color={Colors.gray_300} />} />
         <Button variant={"primary"} text="Continuar" size="medium" onPress={() => navigation.navigate("RecoverPasswordStep2")} />
      </View>
   );
};

export default RecoverPasswordStep1;

const styles = StyleSheet.create({});
