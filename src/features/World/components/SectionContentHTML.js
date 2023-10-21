import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RenderHTML from "react-native-render-html";
import { Colors } from "@utils/Theme";

const customStyles = {
  p: {
    fontFamily: "Sora-Regular",
    fontSize: 16,
    lineHeight: 27,
    color: Colors.gray_500,
    marginBottom: -15,
  },
  ul: {
    fontFamily: "Sora-Regular",

    marginLeft: 20, // Sangría a la izquierda
    // Otros estilos de lista desordenada
  },
  li: {
    fontFamily: "Sora-Regular",
    fontSize: 16,
    // Otros estilos de elementos de lista
  },
  h1: {
    fontSize: 28,
    fontFamily: "Sora-SemiBold",
    color: Colors.gray_600,
    marginTop: 32,
  },
  img: {
    width: "100%",
    height: 300,
    backgroundColor: Colors.gray_50,
  },
};
const SectionContentHTML = ({ html }) => {
  console.log(html);
  return (
    <RenderHTML
      contentWidth={400}
      source={{
        html: html,
      }}
      systemFonts={["Sora-Regular", "Sora-Medium", "Sora-Bold", "Sora-SemiBold"]}
      baseStyle={{ fontFamily: "Sora-Bold" }}
      tagsStyles={customStyles}
      //  customStyle={customStyles}
    />
  );
};

export default SectionContentHTML;

const styles = StyleSheet.create({});
