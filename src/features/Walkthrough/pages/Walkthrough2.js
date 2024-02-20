import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Headings, Button } from "@components";
import { SemanticColors } from "@utils/Theme";
import { walkthrough2Texts } from "../utils/walkthroughTexts";
import { StatusBar } from "expo-status-bar";

const Walkthrough2 = ({ navigation }) => {
  return (
    <View style={styles.pageContainer}>
      <StatusBar style="auto" />

      <Image style={styles.image} source={require("../../../../assets/images/walkthrough2.jpg")} />

      <Headings {...walkthrough2Texts}></Headings>

      <View style={{ gap: 16, flexDirection: "row-reverse" }}>
        <Button style={{ flex: 1 }} variant={"primary"} text="Continuar" onPress={() => navigation.navigate("Walkthrough3")} />
        <Button style={{ flex: 1 }} variant={"secondary"} text="Saltar" onPress={() => navigation.replace("Walkthrough", { screen: "Welcome" })} />
      </View>
    </View>
  );
};

export default Walkthrough2;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: 24,
  },
  image: {
    backgroundColor: SemanticColors.elevation.secondary_normal,
    width: "100%",
    height: "50%",
    borderRadius: 24,
    marginTop: 24,
  },
});
