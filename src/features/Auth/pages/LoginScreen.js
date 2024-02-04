import React from "react";

import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ArrowLeft } from "iconsax-react-native";
import LoginForm from "../components/LoginForm";

import { SemanticColors, Colors } from "@utils/Theme";
const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ArrowLeft size={32} color={Colors.gray_400} style={{ marginLeft: 16, marginTop: 46 }} onPress={() => navigation.replace("Welcome")} />
      <LoginForm />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: SemanticColors.app.bg_normal },
});
