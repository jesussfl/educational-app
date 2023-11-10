import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Colors } from "@utils/Theme";
const Avatar = ({ username = "John Doe", email = "bKp0G@example.com" }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../../../assets/Avatar.png")}></Image>
      <Text style={styles.usernameText}>{"@" + username}</Text>
      <Text style={styles.emailText}>{email}</Text>
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
  image: {
    flex: 1,
    width: "40%",
    resizeMode: "contain",
  },
  usernameText: {
    fontFamily: "Sora-SemiBold",
    fontSize: 22,
    color: Colors.gray_600,
  },
  emailText: {
    fontFamily: "Sora-Regular",
    fontSize: 16,
    color: Colors.gray_400,
  },
});
