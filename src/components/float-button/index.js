import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useAuthContext } from "@contexts/auth.context";
import { Colors } from "@utils/Theme";

//This is a circle button with an icon inside, is need to pass color, icon and size

const FloatButton = ({ color, icon, size, text }) => {
  const { user } = useAuthContext();
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#fff",
        width: 72,
        height: 72,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 24,
        right: 24,
        borderWidth: 4,
        borderColor: color,
      }}
    >
      {icon}
      <Text style={{ fontFamily: "Sora-SemiBold", color: Colors.error_500, fontSize: 20 }}>{user.lives}</Text>
    </View>
  );
};

export default FloatButton;
