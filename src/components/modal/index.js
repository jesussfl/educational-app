import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "@components";
import { Colors } from "@utils/Theme";
const Modal = ({ title, description, cancelAction, actionText, action, children }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 99,
        padding: 24,
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          padding: 24,
          borderRadius: 24,
          gap: 24,
          borderWidth: 4,
          borderColor: Colors.gray_300,
        }}
      >
        <Text style={styles.modalTitle}>{title}</Text>
        <Text style={styles.modalText}>{description}</Text>
        {children}
        <View
          style={{
            flexDirection: "row",
            gap: 16,
          }}
        >
          {cancelAction && <Button text="Cancelar" variant="secondary" onPress={cancelAction} style={{ flex: 1 }} />}
          <Button text={actionText} variant="primary" onPress={action} style={{ flex: 1 }} />
        </View>
      </View>
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 24,
    marginBottom: 8,
    fontFamily: "Sora-SemiBold",
    color: Colors.gray_600,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    fontFamily: "Sora-Medium",
    color: Colors.gray_600,
    textAlign: "center",
  },
});
