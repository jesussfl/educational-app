import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TextField from "../../components/textField/TextField";
import LoginForm from "../../features/Auth/Login/UI/LoginForm";
import { SemanticColors } from "../../utilities/Theme";
import Headings from "../../components/headings/Headings";
const LoginScreen = ({ navigation }) => {
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
