import React, { useState } from "react";

// Components
import { View, StyleSheet, Text, ToastAndroid } from "react-native";
import { Colors } from "@utils/Theme";
import { TextField } from "@components";
import { Button } from "@components";
import Icon from "react-native-remix-icon";
import Spinner from "react-native-loading-spinner-overlay";

// Hooks
import { useNavigation, CommonActions } from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

// Utils
import { handleEmailValidation } from "@utils/helpers/validateEmail";
import { registerUserMutation } from "@utils/graphql/mutations/user.mutation";
import { query } from "@utils/graphql";
import { queryWorlds } from "@utils/graphql/queries/world.queries";
import useAuthStore from "@stores/useAuthStore";
const SignupForm = ({ currentRef }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const form = useForm();
  const navigation = useNavigation();

  const { setUser, setToken } = useAuthStore();
  const { data: worlds } = useQuery(["worlds"], () => query(queryWorlds, { start: 1, limit: 1 }));
  const { mutate: register } = useMutation((data) => query(registerUserMutation, data));
  const currentWorld = worlds?.crefinexWorlds?.data[0].id;

  const onSubmit = async (values) => {
    setError(null);
    setIsLoading(true);

    if (!currentWorld) {
      setError("Parece que hubo un problema de conexión, intentalo de nuevo");
      setIsLoading(false);
      return;
    }

    const input = {
      username: values.username,
      email: values.email,
      password: values.password,
      currentWorld: parseInt(currentWorld),
    };

    register(
      { input },
      {
        onSuccess: (data) => {
          setToken(data.register.jwt);
          setUser(data.register.user);
          ToastAndroid.show("Registro exitoso", ToastAndroid.SHORT);
          form.reset();
          setIsLoading(false);

          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Main" }],
            })
          );
        },
        onError: (error) => {
          setIsLoading(false);

          if (error.message.includes("Email or Username are already taken")) {
            form.setError("email", {
              type: "manual",
            });
            form.setError("username", {
              type: "manual",
            });
            setError("El email o usuario ya existe");
            return;
          }

          if (error.message.includes("Aborted")) {
            setError("Parece que hubo un problema de red");
            ToastAndroid.show("Parece que hubo un problema de red", ToastAndroid.LONG);
            return;
          }

          setError(error.message);
        },
      }
    );
  };
  const scrollToInput = (reactNode) => {
    if (currentRef) {
      currentRef.current.scrollToFocusedInput(reactNode, 120);
    }
  };
  return (
    <View>
      <Spinner visible={isLoading} />

      <View>
        {error && <Text style={styles.alertText}>{error}</Text>}
        <TextField
          label="Nombre de usuario"
          name={"username"}
          placeholder={"Ej. Patrick123"}
          rules={{
            required: "El nombre de usuario es requerido",
            minLength: { value: 3, message: "El nombre de usuario debe tener al menos 3 caracteres" },
            maxLength: { value: 80, message: "El nombre de usuario no puede tener más de 80 caracteres" },
          }}
          control={form.control}
          onFocus={(event) => scrollToInput(event.target)}
          leftIcon={<Icon name="user-fill" size="20" color={Colors.gray_300} />}
        />
        <TextField
          label="Correo electrónico"
          name={"email"}
          placeholder={"Ej. 8sZP7@ejemplo.com"}
          rules={{
            required: "No ha ingresado un correo electrónico",
            maxLength: { value: 80, message: "El correo no puede tener más de 80 caracteres" },
            minLength: { value: 3, message: "El correo electrónico debe tener al menos 3 caracteres" },
            validate: handleEmailValidation,
          }}
          onFocus={(event) => scrollToInput(event.target)}
          control={form.control}
          leftIcon={<Icon name="mail-fill" size="20" color={Colors.gray_300} />}
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
          onFocus={(event) => scrollToInput(event.target)}
          control={form.control}
          leftIcon={<Icon name="lock-fill" size="20" color={Colors.gray_300} />}
        />
      </View>
      <View style={styles.bottomActions}>
        <Button variant={"primary"} disabled={isLoading} text="Crear mi cuenta" size="medium" onPress={form.handleSubmit(onSubmit)} />
        <Button
          variant={"secondary"}
          disabled={isLoading}
          text="Ya tengo una cuenta"
          size="medium"
          onPress={() => navigation.replace("Auth", { screen: "Login" })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  alertText: { color: Colors.error_400, textAlign: "center", marginBottom: 16, fontFamily: "Sora-SemiBold" },
  bottomActions: { gap: 16, marginTop: 28 },
});

export default SignupForm;
