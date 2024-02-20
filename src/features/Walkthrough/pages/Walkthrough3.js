import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Headings, Button } from "@components";
import { SemanticColors } from "@utils/Theme";
import { walkthrough3Texts } from "../utils/walkthroughTexts";
import { StatusBar } from "expo-status-bar";

const Walkthrough3 = ({ navigation }) => {
  return (
    <View style={styles.pageContainer}>
      <StatusBar style="auto" />

      <Image style={styles.image} source={require("../../../../assets/images/walkthrough3.jpg")} />
      <Headings {...walkthrough3Texts}></Headings>
      <View style={{ gap: 16 }}>
        <Button variant={"primary"} text="Comenzar" onPress={() => navigation.replace("Auth", { screen: "Welcome" })} />
      </View>
    </View>
  );
};

export default Walkthrough3;

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
