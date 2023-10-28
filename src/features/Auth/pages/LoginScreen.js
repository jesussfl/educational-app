import { StyleSheet, View } from "react-native";
import React from "react";
import LoginForm from "../components/LoginForm";
import { SemanticColors, Colors } from "@utils/Theme";
import { Headings } from "@components";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ArrowLeft } from "iconsax-react-native";
const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ArrowLeft size={32} color={Colors.gray_400} style={{ marginLeft: 16, marginTop: 46 }} onPress={() => navigation.replace("Welcome")} />
      <KeyboardAwareScrollView style={{ padding: 24 }}>
        <Headings title="Inicia Sesión" description="Completa la información para acceder a tu cuenta"></Headings>
        <LoginForm></LoginForm>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: SemanticColors.app.bg_normal },
});
