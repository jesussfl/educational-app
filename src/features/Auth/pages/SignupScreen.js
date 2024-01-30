import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useRef } from "react";
import SignupForm from "../components/SignupForm";
import { Headings } from "@components";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@utils/Theme";
import { ArrowLeft } from "iconsax-react-native";

const SignupScreen = ({ navigation }) => {
  const scrollRef = useRef(null);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ArrowLeft size={32} color={Colors.gray_400} style={{ marginLeft: 16, marginTop: 46 }} onPress={() => navigation.replace("Welcome")} />

      <KeyboardAwareScrollView ref={scrollRef} style={{ padding: 24 }}>
        <Headings title="¡Crea tu cuenta!" description="Completa la información para comenzar a aprender"></Headings>
        <SignupForm currentRef={scrollRef}></SignupForm>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
