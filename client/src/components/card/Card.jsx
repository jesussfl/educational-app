import { StyleSheet, Text, View } from "react-native";
import React from "react";
// import { Button } from "@components/button/Button";
// import { Headings } from "@components/headings/Headings";
import { Headings, Button } from "../index";
import { Colors } from "@utils/Theme";
const Card = ({ name, description }) => {
   return (
      <View
         style={{ justifyContent: "space-between", gap: 24, padding: 24, borderWidth: 4, borderColor: Colors.gray_100, borderRadius: 24 }}>
         <Headings title={name} description={description} />
         <View style={{ gap: 16 }}>
            <Button text="0/24 Lecciones" variant="secondary" size="small" />
            <Button text="Explorar" variant="primary" />
         </View>
      </View>
   );
};

const styles = StyleSheet.create({});
export default Card;
