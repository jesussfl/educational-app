import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CardStoreItem from "../components/card-store-item";
import { StatusBar } from "expo-status-bar";
const StoreScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <CardStoreItem />
    </View>
  );
};

export default StoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 24,

    paddingVertical: 56,
  },
});
