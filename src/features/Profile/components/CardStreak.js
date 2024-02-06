import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@utils/Theme";
import useAuthStore from "@stores/useAuthStore";
const CardStreak = () => {
  const { user } = useAuthStore();
  return (
    <View style={styles.card}>
      <View style={[styles.rowContainer, { paddingHorizontal: 0, justifyContent: "space-between" }]}>
        <View>
          <Text style={[styles.title, { color: Colors.success_600 }]}>Racha Actual</Text>
          <Text style={styles.initials}>{user.streak_days} dias</Text>
        </View>
        <View>
          <Text style={[styles.title, { color: Colors.primary_600, textAlign: "right" }]}>Mayor racha</Text>
          <Text style={[styles.initials, { textAlign: "right" }]}>0 dias</Text>
        </View>
      </View>
    </View>
  );
};

export default CardStreak;

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    flex: 1,
    gap: 18,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 24,
    marginTop: 12,
    borderColor: Colors.gray_100,
    borderWidth: 4,
  },
  rowContainer: {
    flexDirection: "row",
    gap: 8,
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 18,
    fontFamily: "Sora-SemiBold",
    color: Colors.gray_400,
  },
  initials: {
    fontSize: 16,
    fontFamily: "Sora-SemiBold",
    color: Colors.gray_400,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.gray_100,
  },
});
