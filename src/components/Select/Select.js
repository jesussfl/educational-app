import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from "react-native";
import React, { useEffect, useState } from "react";
import { SemanticColors, Colors } from "@utils/Theme";
import RemixIcon from "react-native-remix-icon";
import * as Animatable from "react-native-animatable";

const Select = ({ text, image, disabled = false, isPressed = false, error = false, success = false, onPress, radialIcon = true }) => {
  const getStyles = () => {
    if (disabled) {
      return SelectStateStyles.disabled;
    }
    if (error) {
      return SelectStateStyles.error;
    }
    if (success) {
      return SelectStateStyles.success;
    }
    if (isPressed) {
      return SelectStateStyles.pressed;
    }
    return SelectStateStyles.default;
  };

  const getTextStyles = () => {
    if (disabled) {
      return TextStateStyles.disabled;
    }
    if (error) {
      return TextStateStyles.error;
    }
    if (success) {
      return TextStateStyles.success;
    }
    if (isPressed) {
      return TextStateStyles.pressed;
    }

    return TextStateStyles.default;
  };

  const getSelectIcon = () => {
    if (!radialIcon) {
      return;
    }

    if (error) {
      return <RemixIcon name="close-circle-fill" size={24} color={Colors.error_400} />;
    }
    if (success) {
      return <RemixIcon name="checkbox-circle-fill" size={24} color={Colors.success_400} />;
    }
    if (isPressed) {
      return <RemixIcon name="radio-button-line" size={24} color={SemanticColors.bg.primary_normal} />;
    }
    return <RemixIcon name="checkbox-blank-circle-line" size={24} color={Colors.gray_300} />;
  };

  return (
    <TouchableWithoutFeedback onPress={disabled ? null : onPress}>
      <Animatable.View
        animation="fadeIn"
        duration={1000} // Adjust the duration as needed
        ref={(ref) => (this.view = ref)}
        style={[styles.container, getStyles(), !radialIcon && { paddingVertical: 8, paddingHorizontal: 8 }]}
      >
        {image ? (
          text ? (
            <View style={styles.imageContainer}>
              <Image src={image} style={styles.image} />
            </View>
          ) : (
            <View style={[styles.imageContainer, { width: "100%", height: 150, borderWidth: 0, opacity: disabled ? 0.3 : 1 }]}>
              <Image src={image} style={styles.image} />
            </View>
          )
        ) : (
          getSelectIcon()
        )}
        <Text style={[styles.text, getTextStyles()]}>{text}</Text>
      </Animatable.View>
    </TouchableWithoutFeedback>
  );
};

export default Select;

const SelectStateStyles = {
  default: {
    borderWidth: 2,
    borderColor: Colors.gray_200,
  },
  pressed: {
    borderWidth: 3,
    borderColor: SemanticColors.bg.primary_normal,
  },
  success: {
    borderWidth: 3,
    borderColor: Colors.success_500,
  },
  error: {
    borderWidth: 3,
    borderColor: Colors.error_500,
  },
  disabled: {
    borderWidth: 2,
    borderColor: Colors.gray_100,
  },
};
const TextStateStyles = {
  default: {
    fontFamily: "Sora-Regular",
    color: Colors.gray_300,
  },
  pressed: {
    fontFamily: "Sora-SemiBold",

    color: SemanticColors.bg.primary_normal,
  },
  success: {
    fontFamily: "Sora-SemiBold",

    color: Colors.success_500,
  },
  error: {
    fontFamily: "Sora-SemiBold",

    color: Colors.error_500,
  },
  disabled: {
    fontFamily: "Sora-Regular",
    color: Colors.gray_200,
  },
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },

  text: {
    fontSize: 16,
    flex: 1,
    lineHeight: 24,
  },
  imageContainer: {
    width: 72,
    height: 72,
    borderRadius: 12,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: Colors.gray_100,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
