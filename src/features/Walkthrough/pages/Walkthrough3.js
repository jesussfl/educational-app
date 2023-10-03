import React from "react";
import { StyleSheet, View } from "react-native";
import { Headings, Button } from "@components";
import { SemanticColors } from "@utils/Theme";
import { walkthrough3Texts } from "../utils/walkthroughTexts";

const Walkthrough3 = ({ navigation }) => {
   return (
      <View style={styles.pageContainer}>
         <View style={styles.image}></View>
         <Headings {...walkthrough3Texts}></Headings>
         <View style={{ gap: 16 }}>
            <Button variant={"primary"} text="Comenzar" onPress={() => navigation.replace("Walkthrough", { screen: "Welcome" })} />
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
      height: "30%",
   },
});
