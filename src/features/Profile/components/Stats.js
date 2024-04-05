import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Colors } from "@utils/Theme";
import { Heart, DollarCircle } from "iconsax-react-native";
import useAuthStore from "@stores/useAuthStore";

const Stats = () => {
  const { user } = useAuthStore();
  return (
    <View style={{ flexDirection: "row", gap: 12 }}>
      <View style={styles.wrapper}>
        <Image source={require("@assets/icons/live.png")} style={{ width: 36, height: 36, resizeMode: "contain" }} />
        <Text style={styles.text}>{user.lives} vidas</Text>
      </View>
      <View style={styles.wrapper}>
        <Image source={require("@assets/icons/coin.png")} style={{ width: 36, height: 36, resizeMode: "contain" }} />
        <Text style={styles.text}>{Math.round(user.money * 100) / 100} Monedas</Text>
      </View>
    </View>
  );
};

export default Stats;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    borderWidth: 4,
    borderColor: Colors.gray_100,
    padding: 12,
    flexDirection: "column",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Sora-Medium",
    fontSize: 15,
    color: Colors.gray_600,
  },
});
