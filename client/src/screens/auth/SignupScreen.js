import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SignupForm from "../../features/Auth/Signup/UI/SignupForm";
import { SemanticColors } from "@utils/Theme";
import { Headings } from "@components";
const SignupScreen = () => {
   return (
      <View style={styles.container}>
         <Headings title="¡Crea tu cuenta!" description="Completa la información para comenzar a aprender"></Headings>
         <SignupForm></SignupForm>
      </View>
   );
};

export default SignupScreen;

const styles = StyleSheet.create({
   container: { flex: 1, alignItems: "center", padding: 24, backgroundColor: SemanticColors.app.bg_normal },
});
