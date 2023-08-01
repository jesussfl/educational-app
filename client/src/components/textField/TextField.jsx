import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { Colors, SemanticColors } from "../../utilities/Theme";

const TextField = ({ label = "Label", placeholder = "Placeholder", leftIcon, rightIcon, value, onChangeText }) => {
   return (
      <View style={styles.container}>
         <Text style={styles.label}>{label}</Text>
         <View style={styles.inputContainer}>
            <View style={styles.leftInputContainer}>
               {leftIcon}
               <TextInput style={styles.input} placeholder={placeholder} value={value} onChangeText={onChangeText} />
            </View>
            {rightIcon}
         </View>
      </View>
   );
};

export default TextField;

const styles = StyleSheet.create({
   container: {
      gap: 8,
      marginVertical: 8,
   },
   inputContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      height: 56,
      padding: 16,
      borderWidth: 2,
      borderColor: Colors.gray_100,
      borderRadius: 16,
   },
   leftInputContainer: {
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
   },
   input: {
      height: 56,
      paddingHorizontal: 12,
      fontFamily: "Sora-Regular",
      fontSize: 16,
      color: Colors.gray_500,
      flex: 1,
   },
   label: {
      fontFamily: "Sora-Regular",
      fontSize: 16,
      color: Colors.gray_500,
   },
});
