import { StyleSheet, Text, View } from "react-native";
import { SemanticColors } from "../../utils/Theme";
import React from "react";

const Headings = ({ title, description, align }) => {
   return (
      <View style={{ alignItems: align ? "flex-start" : "center", gap: 16, marginVertical: 8, marginBottom: 32 }}>
         <Text style={{ fontFamily: "Sora-SemiBold", color: SemanticColors.text.normal, fontSize: 32, textAlign: align || "center" }}>
            {title}
         </Text>
         <Text
            style={{
               fontFamily: "Sora-Regular",
               color: SemanticColors.text.subdued_normal,
               fontSize: 17,
               lineHeight: 22.4,
               textAlign: align || "center",
            }}>
            {description}
         </Text>
      </View>
   );
};

export default Headings;

const styles = StyleSheet.create({});
