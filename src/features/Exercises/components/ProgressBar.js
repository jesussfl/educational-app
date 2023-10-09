import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors, SemanticColors } from "@utils/Theme";
const ProgressBar = ({ percentage }) => {
   return (
      <View style={{ height: 36, position: "relative", flex: 1 }}>
         <View
            style={{
               height: 36,
               backgroundColor: Colors.gray_50,
               borderRadius: 50,
               position: "absolute",
               left: 0,
               right: 0,
               zIndex: -1,
            }}></View>
         <View
            style={{
               width: percentage,
               height: 36,
               backgroundColor: SemanticColors.bg.primary_normal,
               borderRadius: 50,
               position: "absolute",
               left: 0,
               right: 0,
               zIndex: 1,
            }}></View>
         <View
            style={{
               width: "92%",
               height: 16,
               backgroundColor: Colors.gray_25,
               opacity: 0.3,
               borderRadius: 50,
               position: "absolute",
               left: 50,
               top: 5,
               zIndex: 2,
               transform: [{ translateX: -40 }],
            }}></View>
         <View
            style={{
               height: 36,
               borderRadius: 50,
               position: "absolute",
               left: 0,
               right: 0,
               zIndex: 4,
               borderColor: Colors.gray_100,
               borderWidth: 3,
               opacity: 1,
            }}></View>
      </View>
   );
};

export default ProgressBar;

const styles = StyleSheet.create({});
