import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "@utils/Theme";
import { useForm } from "react-hook-form";
import { emailValidations, loginPasswordValidations, passwordValidations } from "../utils/inputValidations";

//components
import Icon from "react-native-remix-icon";
import { TextField, Button } from "@components";
import { useAuthSubmit } from "../hooks/useAuthSubmit";
import Spinner from "react-native-loading-spinner-overlay";
const LoginForm = () => {
  const navigation = useNavigation();
  const { isLoading, authSubmit, error } = useAuthSubmit({ isRegister: false });
  const { control, handleSubmit } = useForm();
  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View>
        <TextField {...emailValidations} control={control} leftIcon={<Icon name="mail-fill" size="20" color={Colors.gray_300} />} />
        <TextField
          {...loginPasswordValidations}
          control={control}
          leftIcon={<Icon name="lock-fill" size="20" color={Colors.gray_300} />}
          isError={error?.status === 400 ? "La contraseña es incorrecta" : ""}
        />
        <Button
          variant={"ghost"}
          text="Olvidé mi contraseña"
          size="small"
          style={{ alignSelf: "flex-end" }}
          onPress={() => navigation.navigate("Auth", { screen: "RecoverPassword" })}
        />
      </View>
      <View style={{ gap: 16 }}>
        <Button variant={"primary"} text="Iniciar Sesión" size="medium" onPress={handleSubmit(authSubmit)} />
        <Button variant={"secondary"} text="No tengo una cuenta" size="medium" onPress={() => navigation.replace("Auth", { screen: "Signup" })} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "space-between", alignSelf: "stretch" },
  alertText: { color: "red", textAlign: "center", marginBottom: 16 },
});

export default LoginForm;
