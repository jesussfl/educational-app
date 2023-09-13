import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import { SemanticColors, Colors } from "@utils/Theme";
import RemixIcon from "react-native-remix-icon";
const Select = ({ text, image, isPressed = false, onPress }) => {
   return (
      <TouchableWithoutFeedback onPress={onPress}>
         <View style={isPressed ? styles.containerPressed : styles.container}>
            {image ? (
               <View style={styles.imageContainer}>
                  <Image source={image} style={styles.image} />
               </View>
            ) : isPressed ? (
               <RemixIcon name="checkbox-blank-circle-fill" size={24} color={SemanticColors.bg.primary_normal} />
            ) : (
               <RemixIcon name="checkbox-blank-circle-line" size={24} color={Colors.gray_300} />
            )}
            <Text style={styles.text}>{text}</Text>
         </View>
      </TouchableWithoutFeedback>
   );
};

export default Select;

const styles = StyleSheet.create({
   container: {
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      paddingVertical: 24,
      paddingHorizontal: 16,
      borderWidth: 2,
      borderColor: Colors.gray_200,
   },
   containerPressed: {
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      paddingVertical: 24,
      paddingHorizontal: 16,
      borderWidth: 3,
      borderColor: SemanticColors.bg.primary_normal,
   },
   text: {
      color: Colors.gray_300,
      fontFamily: "Sora-Regular",
      fontSize: 16,
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
      resizeMode: "stretch",
   },
});
