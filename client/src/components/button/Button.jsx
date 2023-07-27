import { StyleSheet, Text, View, Pressable } from "react-native";
import { SemanticColors } from "../../utilities/Theme";
import React from "react";

const Button = () => {
   return (
      <View style={styles.container}>
         <Pressable
            style={({ pressed }) => [
               {
                  backgroundColor: pressed ? SemanticColors.bg.primary_active : SemanticColors.bg.primary_normal,
                  borderColor: pressed ? SemanticColors.elevation.primary_active : SemanticColors.elevation.primary_normal,
                  borderBottomWidth: pressed ? 3 : 7,
               },
               styles.button,
            ]}>
            <Text style={styles.buttonText}>Button</Text>
         </Pressable>
      </View>
   );
};

export default Button;

const styles = StyleSheet.create({
   container: {
      height: 64,
      justifyContent: "flex-end",
   },
   button: {
      padding: 16,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 3,
   },
   buttonText: {
      color: "white",
      fontSize: 16,
      fontFamily: "Sora-Bold",
      textTransform: "uppercase",
   },
});
