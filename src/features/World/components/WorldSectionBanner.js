import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Flag, Book1 } from "iconsax-react-native";
import { Colors } from "@utils/Theme";
import { Button } from "@components";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-remix-icon";

const WorldSectionBanner = ({
  description,
  backgroundColor,
  id,
  order,
  isDisabled = false,
}) => {
  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.sectionBanner,
        { backgroundColor: isDisabled ? Colors.gray_100 : backgroundColor },
      ]}
    >
      <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            width: 50,
            height: 50,
            padding: 4,
            borderRadius: 8,
          }}
        >
          {isDisabled ? (
            <Icon name="lock-fill" size="36" color={Colors.gray_300} />
          ) : (
            <Flag variant="Bold" size={36} color={backgroundColor} />
          )}
        </View>
        <View style={styles.textsContainer}>
          <Text style={styles.sectionBannerText}>{`Sección ${order}`}</Text>
          <Text
            style={[
              styles.sectionBannerText,
              {
                textTransform: "none",
                fontFamily: "Sora-Medium",
                lineHeight: 20,
              },
            ]}
          >
            {description}
          </Text>
        </View>
      </View>
      <Button
        text="Leer Teoria"
        variant="secondary"
        size="small"
        rightIcon={
          isDisabled ? (
            <Icon name="lock-fill" size={20} color={Colors.gray_300} />
          ) : (
            <Book1 size={20} color={Colors.gray_500} variant="Bold" />
          )
        }
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
    marginHorizontal: 16,
    alignSelf: "stretch",
    paddingVertical: 24,
    flexDirection: "column",
    borderRadius: 16,
    paddingHorizontal: 20,
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
