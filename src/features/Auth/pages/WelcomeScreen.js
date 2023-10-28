import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";

//Components
import { SemanticColors, Colors } from "@utils/Theme";
import { Headings, Button } from "@components";

//Remix Icons
import Icon from "react-native-remix-icon";
import { useAuthContext } from "@contexts/auth.context";
import { StatusBar } from "expo-status-bar";
const WelcomeScreen = ({ navigation }) => {
  const { token } = useAuthContext();

  useEffect(() => {
    if (token) {
      navigation.replace("Main", { screen: "Lessons" });
    }
  }, [token]);

  return (
    <>
      <StatusBar style="dark" translucent={true} />
      <View style={styles.pageContainer}>
        <Image
          source={require("../../../../assets/3d-render-hand-dropping-golden-coins-white.jpg")}
          style={{ width: 350, height: 350, alignSelf: "center", marginVertical: -56 }}
        />
        <Headings title="Hey, Hola! 👋" description="Registrate o inicia sesión para comenzar a aprender sobre finanzas" />
        <View style={{ gap: 16 }}>
          <Button variant={"secondary"} text="Continuar con google" disabled={true} rightIcon={<Icon name="google-fill" size={20} color={Colors.gray_300} />} />
          <Button
            variant={"secondary"}
            text="Continuar con Facebook"
            disabled={true}
            rightIcon={<Icon name="facebook-fill" size={20} color={Colors.gray_300} />}
          />
        </View>
        <View style={{ gap: 16 }}>
          <Button onPress={() => navigation.navigate("Auth", { screen: "Login" })} variant={"primary"} text="Iniciar Sesión" size="medium" />
          <Button variant={"secondary"} text="Crearme una cuenta" onPress={() => navigation.navigate("Signup")} />
        </View>
      </View>
    </>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "space-around",
    gap: 32,
    padding: 24,
    backgroundColor: "#fff",
  },
});
