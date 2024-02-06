import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Headings, Button } from "@components";
import { SemanticColors } from "@utils/Theme";
import { walkthrough1Texts } from "../utils/walkthroughTexts";

import useAuthStore from "@stores/useAuthStore";

const Walkthrough1 = ({ navigation }) => {
  const { setUser, token } = useAuthStore();
  useEffect(() => {
    const fetchToken = async () => {
      if (token) {
        try {
          const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          setUser(data);
          navigation.replace("Main", { screen: "Lessons" });
        } catch (error) {
          console.error("Error While Getting Logged In User Details", error);
        }
      }
    };

    fetchToken();
  }, []);

  return (
    <View style={styles.pageContainer}>
      <View style={styles.image}></View>
      <Headings {...walkthrough1Texts}></Headings>
      <View style={{ gap: 16, flexDirection: "row-reverse" }}>
        <Button style={{ flex: 1 }} variant={"primary"} text="Continuar" size="medium" onPress={() => navigation.navigate("Walkthrough2")} />
        <Button style={{ flex: 1 }} variant={"secondary"} text="Saltar" size="medium" onPress={() => navigation.replace("Auth", { screen: "Welcome" })} />
      </View>
    </View>
  );
};

export default Walkthrough1;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: 24,
  },
  image: {
    backgroundColor: SemanticColors.elevation.secondary_normal,
    height: "30%",
  },
});
