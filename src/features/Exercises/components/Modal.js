import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "@components";
import { Colors } from "@utils/Theme";
const Modal = ({ cancel, close }) => {
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
        <Text style={styles.modalTitle}>¿Estás seguro que deseas salir?</Text>
        <Text style={styles.modalText}>Si sales se perderá tu progreso</Text>
        <View
          style={{
            flexDirection: "row",
            gap: 16,
          }}
        >
          <Button
            text="Cancelar"
            variant="secondary"
            onPress={cancel}
            style={{ flex: 1 }}
          />
          <Button
            text="Salir"
            variant="primary"
            onPress={close}
            style={{ flex: 1 }}
          />
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
