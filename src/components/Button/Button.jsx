import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { SemanticColors, Colors } from "@utils/Theme";

const buttonVariants = {
   PRIMARY: "primary",
   SECONDARY: "secondary",
   GHOST: "ghost",
   SUCCESS: "success",
   WRONG: "wrong",
};

const buttonSizes = {
   S: "small",
   M: "medium",
   L: "large",
};

const Button = ({ variant, text = "Button", leftIcon, rightIcon, onPress, size = "large", disabled=false, style }) => {
   const [isPressed, setIsPressed] = useState(false);
   const handlePressIn = () => {
      if (!disabled) {
         setIsPressed(true);
      }
   };

   const handlePressOut = () => {
      if (!disabled) {
         setIsPressed(false);

      }
   };

   const getButtonStyles = () => {
      let styles;
      if (disabled) {
         styles = buttonStyles[variant].disabled || buttonStyles[variant].default;
      } else {
         styles = isPressed ? buttonStyles[variant].pressed || buttonStyles[variant].default : buttonStyles[variant].default;
      }
      return {
         ...styles,
         ...buttonSizeStyles[size],
      };
   };
   const getTextStyles = () => {
      let fontSize;

      switch (size) {
         case buttonSizes.S:
            fontSize = 14;
            break;
         case buttonSizes.M:
         default:
            fontSize = 15;
            break;
      }

      const buttonTextStyles = {
         [buttonVariants.PRIMARY]: {  color: disabled? Colors.gray_300: "#fff", fontSize },
         [buttonVariants.SECONDARY]: {
            color: isPressed ? SemanticColors.text.primary_active : disabled? Colors.gray_300: SemanticColors.text.subdued_normal,
            fontSize,
         },
         [buttonVariants.GHOST]: { color: isPressed ? SemanticColors.text.primary_active : SemanticColors.text.subdued_normal, fontSize },
         [buttonVariants.SUCCESS]: { color: "#fff", fontSize },
         [buttonVariants.WRONG]: { color: "#fff", fontSize },
      };
      return buttonTextStyles[variant];
   };

   return (
      <View style={[styles.container, style]}>
         <Pressable onPress={disabled ? () => {} : onPress} onPressIn={handlePressIn} onPressOut={handlePressOut} style={[getButtonStyles(), styles.button]}>
            <View style={styles.buttonTextContainer}>
               {leftIcon}
               <Text style={[styles.text, getTextStyles()]}>{text}</Text>
               {rightIcon}
            </View>
         </Pressable>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      height: 56,
      justifyContent: "flex-end",
   },
   buttonTextContainer: {
      height: 30,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingHorizontal: 8,
   },
   button: {
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 3,
   },
   text: {
      textTransform: "uppercase",

      fontFamily: "Sora-Bold",
   },
});
const buttonSizeStyles = {
   [buttonSizes.S]: {
      padding: 3,
   },
   [buttonSizes.M]: {
      padding: 6,
   },
   [buttonSizes.L]: {
      padding: 8,
   },
};
const buttonStyles = {
   [buttonVariants.PRIMARY]: {
      default: {
         backgroundColor: SemanticColors.bg.primary_normal,
         borderColor: SemanticColors.elevation.primary_normal,
         borderBottomWidth: 7,
      },
      pressed: {
         backgroundColor: SemanticColors.bg.primary_active,
         borderColor: SemanticColors.elevation.primary_active,
         borderBottomWidth: 3,
      },
      disabled: {
         backgroundColor: Colors.gray_100,
         borderColor: Colors.gray_200,
         borderBottomWidth: 3,
      }
   },
   [buttonVariants.SECONDARY]: {
      default: {
         backgroundColor: SemanticColors.app.bg_normal,
         borderColor: SemanticColors.elevation.secondary_normal,
         borderBottomWidth: 7,
      },
      pressed: {
         backgroundColor: SemanticColors.app.bg_normal,
         borderColor: SemanticColors.elevation.secondary_normal,
         borderBottomWidth: 3,
      },
      disabled: {
         backgroundColor: Colors.gray_100,
         borderColor: Colors.gray_200,
         borderBottomWidth: 3,
      }
   },
   [buttonVariants.GHOST]: {
      default: {
         backgroundColor: SemanticColors.app.bg_normal,
         borderColor: SemanticColors.app.bg_normal,
      },
   },
   [buttonVariants.SUCCESS]: {
      default: {
         backgroundColor: Colors.success_500,
         borderColor: Colors.success_700,
         borderBottomWidth: 7,
      },
      pressed: {
         backgroundColor: Colors.success_600,
         borderColor: Colors.success_700,
         borderBottomWidth: 3,
      },
   },
   [buttonVariants.WRONG]: {
      default: {
         backgroundColor: Colors.error_500,
         borderColor: Colors.error_700,
         borderBottomWidth: 7,
      },
      pressed: {
         backgroundColor: Colors.error_600,
         borderColor: Colors.error_700,
         borderBottomWidth: 3,
      },
   },
};
export default Button;
