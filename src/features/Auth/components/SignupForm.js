import React, { useState, useTransition } from "react";

// Components
import { View, StyleSheet, Text } from "react-native";
import { Colors } from "@utils/Theme";
import { TextField } from "@components";
import { Button } from "@components";
import Icon from "react-native-remix-icon";
import Spinner from "react-native-loading-spinner-overlay";

// Hooks
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "@contexts/auth.context";
import { useForm } from "react-hook-form";

// Utils
import { handleEmailValidation } from "@utils/helpers/validateEmail";
import { registerUserMutation } from "@utils/graphql/mutations/user.mutation";
import { setToken } from "@utils/helpers/auth.helpers";
import { query } from "@utils/graphql";
const SignupForm = ({ currentRef }) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);

  const form = useForm();
  const navigation = useNavigation();

  const { setUser } = useAuthContext();
  const { mutate: register } = useMutation((data) => query(registerUserMutation, { ...data }));
  const onSubmit = async (values) => {
    const input = {
      username: values.username,
      email: values.email,
      password: values.password,
    };
    startTransition(() => {
      register(
        { input },
        {
          onSuccess: (data) => {
            setUser(data.register.user);
            setToken(data.register.jwt);
            console.log("Register Successful");
            navigation.navigate("Main");
          },
          onError: (error) => {
            if (error.message.includes("Email or Username are already taken")) {
              form.setError("email", {
                type: "manual",
                message: "El email o usuario ya existe",
              });
              setError("El email o usuario ya existe");
            }
            console.log(error.message);
          },
        }
      );
    });
  };
  const scrollToInput = (reactNode) => {
    if (currentRef) {
      currentRef.current.scrollToFocusedInput(reactNode, 120);
    }
  };
  return (
    <View>
      <Spinner visible={isPending} />

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
        <Button variant={"primary"} text="Crear mi cuenta" size="medium" onPress={form.handleSubmit(onSubmit)} />
        <Button variant={"secondary"} text="Ya tengo una cuenta" size="medium" onPress={() => navigation.replace("Auth", { screen: "Login" })} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  alertText: { color: "red", textAlign: "center", marginBottom: 16 },
  bottomActions: { gap: 16, marginTop: 28 },
});

export default SignupForm;
