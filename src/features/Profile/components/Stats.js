import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@utils/Theme";
import { Heart, DollarCircle } from "iconsax-react-native";
import useAuthStore from "@stores/useAuthStore";

const Stats = () => {
  const { user } = useAuthStore();
  return (
    <View style={{ flexDirection: "row", gap: 12 }}>
      <View style={styles.wrapper}>
        <Heart size={36} color={Colors.error_500} variant="Bold" />
        <Text style={styles.text}>{user.lives} vidas</Text>
      </View>
      <View style={styles.wrapper}>
        <DollarCircle size={36} color={Colors.success_500} variant="Bold" />
        <Text style={styles.text}>{user.money} Monedas</Text>
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
    fontSize: 18,
    color: Colors.gray_600,
  },
});
