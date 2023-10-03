import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useRef } from "react";
import SignupForm from "../components/SignupForm";
import { Headings } from "@components";

const SignupScreen = () => {
   const scrollRef = useRef(null);

   return (
      <View style={styles.container}>
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
