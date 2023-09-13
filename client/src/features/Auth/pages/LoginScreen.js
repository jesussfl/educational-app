import { StyleSheet, View } from "react-native";
import React from "react";
import LoginForm from "../components/LoginForm";
import { SemanticColors } from "@utils/Theme";
import { Headings } from "@components";
const LoginScreen = () => {
   return (
      <View style={styles.container}>
         <Headings title="Inicia Sesión" description="Completa la información para acceder a tu cuenta"></Headings>
         <LoginForm></LoginForm>
      </View>
   );
};

export default LoginScreen;

const styles = StyleSheet.create({
   container: { flex: 1, alignItems: "center", padding: 24, backgroundColor: SemanticColors.app.bg_normal },
});
