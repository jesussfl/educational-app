import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "@components";
import { UserCirlceAdd } from "iconsax-react-native";
import { Colors } from "@utils/Theme";
const CardReferrals = () => {
  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          gap: 12,
          padding: 12,
        }}
      >
        <UserCirlceAdd size={56} color={Colors.primary_500} variant="Bold" />
        <View style={{ flex: 1, gap: 4 }}>
          <Text style={styles.heading}>Una semana de Finex Pro</Text>
          <Text style={styles.description}>Comparte la app con tus amigos y obbten hasta 7 dias gratis de Finex Pro por cada registro</Text>
        </View>
      </View>
      <Button text="Invitar amigos" variant="secondary" size="medium" />
    </View>
  );
};

export default CardReferrals;

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    flex: 1,
    gap: 12,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 24,
    marginTop: 12,
    borderColor: Colors.gray_100,
    borderWidth: 4,
  },
  container: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
    flex: 1,
  },
  description: {
    fontSize: 14,
    fontFamily: "Sora-Regular",
    lineHeight: 22,
    flex: 1,
    color: Colors.gray_400,
  },
  heading: {
    fontSize: 18,
    fontFamily: "Sora-SemiBold",
    color: Colors.primary_600,
  },
});
