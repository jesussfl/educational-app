import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Svg, Line } from "react-native-svg";
import { LessonButton } from "@components";
import { StatusBar } from "expo-status-bar";
const Reviews = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <LessonButton scale={0.9} />
      <Svg width="100" height="100">
        <Line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          stroke="#9A4CFF"
          strokeWidth="10"
        />
      </Svg>
      <LessonButton scale={0.9} />
    </View>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 24,
    gap: -36,
  },
});
