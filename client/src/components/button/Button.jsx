import { StyleSheet, Text, View, Pressable } from "react-native";
import { SemanticColors } from "../../utilities/Theme";
import React, { useState } from "react";
const buttonVariants = {
   PRIMARY: "primary",
   SECONDARY: "secondary",
   GHOST: "ghost",
};

const commonTextStyles = {
   fontSize: 16,
   fontFamily: "Sora-Bold",
   textTransform: "uppercase",
};

const Button = ({ variant, text = "Button", leftIcon, rightIcon, onPress }) => {
   const [isPressed, setIsPressed] = useState(false);

   // Estilos comunes para el Pressable
   const commonPressableStyles = ({ pressed }) => ({
      backgroundColor: pressed ? SemanticColors.bg.primary_active : SemanticColors.bg.primary_normal,
      borderColor: pressed ? SemanticColors.elevation.primary_active : SemanticColors.elevation.primary_normal,
      borderBottomWidth: pressed ? 3 : 7,
   });
   const handlePress = () => {
      if (variant === buttonVariants.PRIMARY) {
         setIsPressed(!isPressed);
      }
      if (onPress && typeof onPress === "function") {
         onPress(); // Llamamos al prop onPress proporcionado al componente Button, si es una función válida
      }
   };
   return (
      <View style={styles.container}>
         <Pressable
            onPress={() => {
               handlePress(); // Llamamos al prop onPress proporcionado al componente Button
            }}
            style={({ pressed }) => [
               variant === buttonVariants.SECONDARY
                  ? {
                       backgroundColor: SemanticColors.app.bg_normal,
                       borderColor: SemanticColors.elevation.secondary_normal,
                       borderBottomWidth: pressed ? 3 : 7,
                    }
                  : commonPressableStyles({ pressed }),
               styles.button,
            ]}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
               {leftIcon}
               <Text
                  style={[
                     variant === buttonVariants.SECONDARY
                        ? {
                             color: isPressed ? SemanticColors.text.primary_active : SemanticColors.text.subdued_normal,
                          }
                        : { color: "#fff" },
                     commonTextStyles,
                  ]}>
                  {text}
               </Text>
               {rightIcon}
            </View>
         </Pressable>
      </View>
   );
};

export default Button;
// Estilos comunes para el texto

const styles = StyleSheet.create({
   container: {
      height: 56,
      justifyContent: "flex-end",
   },
   button: {
      padding: 12,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 3,
   },
});
