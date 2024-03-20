import { StyleSheet, ToastAndroid, View } from "react-native";
import { Button, Headings, TextField } from "@components";

import { useNavigation } from "@react-navigation/native";
import OTPTextInput from "react-native-otp-textinput";
import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import Icon from "react-native-remix-icon";
import { Colors } from "@utils/Theme";

const RecoverPasswordStep2 = ({ email }) => {
  const navigation = useNavigation();
  const form = useForm();
  let otpInput = useRef(null);

  const clearText = () => {
    otpInput.current.clear();
  };

  const setText = () => {
    otpInput.current.setValue("1234");
  };
  const onSubmit = (value) => {
    if (!value.otp || value.otp.length < 6) {
      return;
    }

    if (value.password !== value.confirmPassword) {
      return;
    }

    fetch("http://172.16.0.2:1337/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: value.otp, // code contained in the reset link of step 3.
        password: value.password,
        passwordConfirmation: value.confirmPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Your user's password has been reset.", data);
        if (data.error?.message === "Incorrect code provided") {
          alert("El código es incorrecto");
          return;
        }

        if (data.error) {
          alert("Parece que hubo un problema");
          return;
        }
        ToastAndroid.show("Contraseña cambiada con exito", ToastAndroid.LONG);
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: "space-between", padding: 24 }}>
      <Headings title="Introduzca su código" description={`"Hemos enviado un código al correo. Introduzca el código debajo para verificar. "`} />
      <Controller
        control={form.control}
        name="otp"
        render={({ field: { onChange, value } }) => <OTPTextInput inputCellLength={1} inputCount={6} ref={(e) => (otpInput = e)} handleTextChange={onChange} />}
        rules={{
          required: true,
        }}
      />
      <TextField
        label="Contraseña"
        name={"password"}
        placeholder={"Introduce tu contraseña"}
        rules={{
          required: "La contraseña es requerida",
          minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" },
        }}
        secureTextEntry
        control={form.control}
        leftIcon={<Icon name="lock-fill" size="20" color={Colors.gray_300} />}
      />
      <TextField
        label="Confirmar contraseña"
        name={"confirmPassword"}
        placeholder={"Introduce tu contraseña"}
        rules={{
          required: "La contraseña es requerida",
          minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" },
          validate: (value) => value === form.getValues("password") || "Las contraseña no coinciden",
        }}
        secureTextEntry
        control={form.control}
        leftIcon={<Icon name="lock-fill" size="20" color={Colors.gray_300} />}
      />
      <Button variant={"primary"} text="Continuar" size="medium" onPress={() => onSubmit(form.getValues())} />
    </View>
  );
};

export default RecoverPasswordStep2;

const styles = StyleSheet.create({});
