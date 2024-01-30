import React, { useState, useTransition } from "react";
//components
import { StyleSheet, View, Text } from "react-native";
import { Colors } from "@utils/Theme";
import { TextField, Button, Headings } from "@components";
import Icon from "react-native-remix-icon";
import Spinner from "react-native-loading-spinner-overlay";

//Hooks
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "@contexts/auth.context";
import { useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//Utils
import { query } from "@utils/graphql";
import { loginUserMutation } from "@utils/graphql/mutations/user.mutation";
import { setToken } from "@utils/helpers/auth.helpers";
import { handleEmailValidation } from "@utils/helpers/validateEmail";
const LoginForm = () => {
  const navigation = useNavigation();
  const { setUser } = useAuthContext();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const { mutate: login } = useMutation((data) => query(loginUserMutation, { ...data }));
  const form = useForm({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    const input = {
      identifier: values.email,
      password: values.password,
    };
    startTransition(() => {
      login(
        { input },
        {
          onSuccess: (data) => {
            setUser(data.login.user);
            setToken(data.login.jwt);
            console.log("Login Successful");
            navigation.navigate("Main");
          },
          onError: (error) => {
            console.log(error.message);
            if (error.message.includes("Invalid identifier or password")) {
              setError("Email o contraseña incorrecta");
            }
          },
        }
      );
    });
  };

  return (
    <KeyboardAwareScrollView style={{ padding: 24 }}>
      <Spinner visible={isPending} />
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
        <Button variant={"primary"} disabled={isPending} text="Iniciar Sesión" size="medium" onPress={form.handleSubmit(onSubmit)} />
        <Button variant={"secondary"} text="No tengo una cuenta" size="medium" onPress={() => navigation.replace("Auth", { screen: "Signup" })} />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  alertText: { color: "red", textAlign: "center", marginBottom: 16 },
});

export default LoginForm;
