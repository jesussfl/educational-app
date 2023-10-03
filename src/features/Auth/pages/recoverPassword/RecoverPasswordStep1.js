import React from "react";

import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { emailValidations } from "../../utils/inputValidations";
import { useForm } from "react-hook-form";

import { Button, TextField, Headings } from "@components";
import { Colors } from "@utils/Theme";

import Icon from "react-native-remix-icon";

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
