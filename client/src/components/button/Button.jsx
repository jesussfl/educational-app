import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { SemanticColors } from "../../utilities/Theme";

const buttonVariants = {
   PRIMARY: "primary",
   SECONDARY: "secondary",
   GHOST: "ghost",
};

const commonTextStyles = {
   fontFamily: "Sora-Bold",
   textTransform: "uppercase",
};
const buttonSizes = {
   S: "small",
   M: "medium",
   L: "large",
};
const Button = ({ variant, text = "Button", leftIcon, rightIcon, onPress, size = "large", style }) => {
   // State to track whether the button is currently pressed
   const [isPressed, setIsPressed] = useState(false);

   // Function called when the button is pressed down
   const handlePressIn = () => {
      setIsPressed(true);
   };

   // Function called when the button is released
   const handlePressOut = () => {
      setIsPressed(false);

      // If an onPress function is provided and it is a valid function, call it
      if (onPress && typeof onPress === "function") {
         onPress();
      }
   };

   // Function to get the button styles based on the variant and pressed state
   const getButtonStyles = () => {
      switch (variant) {
         case buttonVariants.PRIMARY:
            return {
               backgroundColor: isPressed ? SemanticColors.bg.primary_active : SemanticColors.bg.primary_normal,
               borderColor: isPressed ? SemanticColors.elevation.primary_active : SemanticColors.elevation.primary_normal,
               borderBottomWidth: isPressed ? 3 : 7,
            };
         case buttonVariants.SECONDARY:
            return {
               backgroundColor: SemanticColors.app.bg_normal,
               borderColor: SemanticColors.elevation.secondary_normal,
               borderBottomWidth: isPressed ? 3 : 7,
            };
         default:
            return {};
      }
   };

   // Function to get the text styles based on the variant and pressed state
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

      switch (variant) {
         case buttonVariants.PRIMARY:
            return {
               color: "#fff",
               fontSize,
            };
         case buttonVariants.SECONDARY:
            return {
               color: isPressed ? SemanticColors.text.primary_active : SemanticColors.text.subdued_normal,
               fontSize,
            };
      }
   };
   const getButtonSizeStyles = () => {
      switch (size) {
         case buttonSizes.S:
            return { padding: 3 };
         case buttonSizes.M:
            return { padding: 6 };
         case buttonSizes.L:
            return { padding: 8 };
         default:
            return {};
      }
   };
   return (
      <View style={[styles.container, style]}>
         <Pressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={({ pressed }) => [getButtonStyles(), styles.button, getButtonSizeStyles()]}>
            <View style={{ height: 30, flexDirection: "row", alignItems: "center", gap: 12 }}>
               {leftIcon}
               <Text style={[commonTextStyles, getTextStyles()]}>{text}</Text>
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
   button: {
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 3,
   },
});

export default Button;
