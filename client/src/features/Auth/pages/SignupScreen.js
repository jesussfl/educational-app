import { StyleSheet, Text, View, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useRef } from "react";
import SignupForm from "../components/SignupForm";
import { SemanticColors } from "@utils/Theme";
import { Headings } from "@components";
const SignupScreen = () => {
   const scrollRef = useRef(null);

   const scrollToInput = (reactNode) => {
      if (scrollRef.current) {
         scrollRef.current.scrollToFocusedInput(reactNode, 120);
      }
   };
   return (
      <KeyboardAwareScrollView style={styles.container} ref={scrollRef}>
         <Headings title="¡Crea tu cuenta!" description="Completa la información para comenzar a aprender"></Headings>

         <SignupForm scroll={scrollToInput}></SignupForm>
      </KeyboardAwareScrollView>
   );
};

export default SignupScreen;

const styles = StyleSheet.create({
   container: { flex: 1, padding: 24 },
});
