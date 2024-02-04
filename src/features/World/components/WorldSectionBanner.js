import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Book1 } from "iconsax-react-native";
import { Colors } from "@utils/Theme";
import { Button } from "@components";
import { useNavigation } from "@react-navigation/native";

const borderColors = {
  [Colors.primary_500]: Colors.primary_700,
  ["#12B76A"]: "#0A683D",
  ["#9A4CFF"]: "#3D0A6B",
  ["#F1733D"]: "#6B0A3D",
};

const WorldSectionBanner = ({ description, backgroundColor, id, order, isDisabled = false }) => {
  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.sectionBanner,
        { backgroundColor: isDisabled ? Colors.gray_100 : backgroundColor, borderColor: isDisabled ? Colors.gray_300 : borderColors[backgroundColor] },
      ]}
    >
      <View style={styles.textsContainer}>
        <Text style={[styles.sectionBannerText, { color: isDisabled ? Colors.gray_500 : "#fff" }]}>{`Sección ${order}`}</Text>
        <Text
          style={[
            styles.sectionBannerText,
            {
              textTransform: "none",
              fontFamily: "Sora-Medium",
              lineHeight: 20,
              color: isDisabled ? Colors.gray_500 : "#fff",
            },
          ]}
        >
          {description}
        </Text>
      </View>
      <Button
        variant="secondary"
        size="small"
        text={"Teoría"}
        leftIcon={<Book1 size={24} variant="Bold" color={isDisabled ? Colors.gray_500 : backgroundColor} />}
        onPress={() => {
          if (isDisabled) {
            return;
          }
          navigation.navigate("Lessons", {
            screen: "TheoryScreen",
            params: { id },
          });
        }}
      />
    </View>
  );
};

export default WorldSectionBanner;

const styles = StyleSheet.create({
  sectionBanner: {
    alignSelf: "stretch",
    paddingVertical: 24,
    flexDirection: "row",
    borderRadius: 32,
    paddingHorizontal: 16,
    gap: 12,
    borderWidth: 4,
    borderBottomWidth: 13,
    marginHorizontal: 24,
  },
  textsContainer: {
    flex: 1,
    gap: 4,
  },
  sectionBannerText: {
    fontSize: 14,
    fontFamily: "Sora-Bold",
    color: "#fff",
    paddingRight: 16,
    textTransform: "uppercase",
  },
});
