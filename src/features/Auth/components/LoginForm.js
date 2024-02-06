import React, { useState } from "react";
//components
import { StyleSheet, View, Text, ToastAndroid } from "react-native";
import { Colors } from "@utils/Theme";
import { TextField, Button, Headings } from "@components";
import Icon from "react-native-remix-icon";
import Spinner from "react-native-loading-spinner-overlay";

//Hooks
import { useNavigation, CommonActions } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "@contexts/auth.context";
import { useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//Utils
import { query } from "@utils/graphql";
import { loginUserMutation } from "@utils/graphql/mutations/user.mutation";
// import { setToken } from "@utils/helpers/auth.helpers";
import { handleEmailValidation } from "@utils/helpers/validateEmail";
import useAuthStore from "@stores/useAuthStore";
const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser, setToken } = useAuthStore();

  const navigation = useNavigation();

  // const { setUser } = useAuthContext();
  const { mutate: login } = useMutation((data) => query(loginUserMutation, data));
  const form = useForm({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values) => {
    setIsLoading(true);
    setError("");
    const input = {
      identifier: values.email,
      password: values.password,
    };
    login(
      { input },
      {
        onSuccess: (data) => {
          setUser(data.login.user);
          setToken(data.login.jwt);
          ToastAndroid.show("Login exitoso", ToastAndroid.SHORT);
          setIsLoading(false);
          form.reset();
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Main" }],
            })
          );
        },
        onError: (error) => {
          setIsLoading(false);
          console.log("error");
          if (error.message.includes("Invalid identifier or password")) {
            setError("Email o contraseña incorrecta");
            ToastAndroid.show("Email o contraseña incorrecta", ToastAndroid.SHORT);
            return;
          }

          if (error.message.includes("Aborted")) {
            setError("Parece que hubo un problema de red");
            ToastAndroid.show("Parece que hubo un problema de red", ToastAndroid.SHORT);
            return;
          }
          setError(error.message);
          ToastAndroid.show(error.message, ToastAndroid.LONG);
        },
      }
    );
  };

  return (
    <KeyboardAwareScrollView style={{ padding: 24 }}>
      <Spinner visible={isLoading} />
      <View>
        <Headings title="Inicia Sesión" description="Completa la información para acceder a tu cuenta" />

        {error && <Text style={styles.alertText}>{error}</Text>}
        <TextField
          name={"email"}
          label="Email"
          type="email"
          placeholder={"Introduzca su correo"}
          rules={{ required: "Este campo es obligatorio", validate: handleEmailValidation }}
          control={form.control}
          leftIcon={<Icon name="mail-fill" size="20" color={Colors.gray_300} />}
        />
        <TextField
          name={"password"}
          label="Contraseña"
          type="password"
          placeholder={"***********"}
          rules={{
            required: "Introduzca su contraseña",
          }}
          secureTextEntry
          control={form.control}
          leftIcon={<Icon name="lock-fill" size="20" color={Colors.gray_300} />}
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
        <Button variant={"primary"} disabled={isLoading} text="Iniciar Sesión" size="medium" onPress={form.handleSubmit(onSubmit)} />
        <Button
          variant={"secondary"}
          disabled={isLoading}
          text="No tengo una cuenta"
          size="medium"
          onPress={() => navigation.replace("Auth", { screen: "Signup" })}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  alertText: { color: Colors.error_400, textAlign: "center", marginBottom: 16, fontFamily: "Sora-SemiBold" },
});

export default LoginForm;
