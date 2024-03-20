import React from "react";

import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { emailValidations } from "../../utils/inputValidations";
import { useForm, useFormContext, FormProvider } from "react-hook-form";

import { Button, TextField, Headings } from "@components";
import { Colors } from "@utils/Theme";

import Icon from "react-native-remix-icon";

const RecoverPasswordStep1 = () => {
  const navigation = useNavigation();
  const form = useForm();

  const sendOtpCode = async (email) => {
    fetch("http://172.16.0.2:1337/api/auth/forgot-password-mobile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }).then((res) => {
      if (res.status === 200) {
        navigation.navigate("RecoverPasswordStep2", { email });
      }
      if (res.status === 429) {
        alert("El correo electrónico ya fue enviado");
        navigation.navigate("RecoverPasswordStep2", { email });
      }
      if (!res.ok) {
        console.log("error");
      }
    });
  };

  return (
    <FormProvider {...form}>
      <View style={{ flex: 1, justifyContent: "space-between", padding: 24 }}>
        <Headings
          title="Recuperar contraseña"
          description="Por favor ingrese su correo electrónico y le enviaremos un código en el siguiente paso para reestablecer su contraseña. "
        />
        <TextField {...emailValidations} control={form.control} leftIcon={<Icon name="mail-fill" size="20" color={Colors.gray_300} />} />
        <Button variant={"primary"} text="Continuar" size="medium" onPress={() => sendOtpCode(form.getValues("email"))} />
      </View>
    </FormProvider>
  );
};

export default RecoverPasswordStep1;

const styles = StyleSheet.create({});
