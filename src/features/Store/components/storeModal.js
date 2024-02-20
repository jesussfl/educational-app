import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "@components";
import { Colors } from "@utils/Theme";
import useModalStore from "@stores/useModalStore";
import { DollarCircle } from "iconsax-react-native";
const StoreModal = ({ children }) => {
  const { isOpen, config } = useModalStore();

  return (
    <>
      {isOpen && (
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Text style={styles.modalTitle}>{config.title}</Text>
            <Text style={styles.modalText}>{config.description}</Text>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8 }}>
              <Text style={{ fontFamily: "Sora-Bold", fontSize: 24, color: Colors.primary_500 }}>{config.price}</Text>
              <DollarCircle size={36} color={Colors.primary_500} variant="Bold" />
            </View>
            {children}
            <View style={styles.actions}>
              {config.cancelAction && <Button text="Cancelar" variant="secondary" onPress={config.cancelAction} style={{ flex: 1 }} />}
              <Button text={config.confirmActionText} variant="primary" onPress={config.confirmAction} style={{ flex: 1 }} />
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default StoreModal;

const styles = StyleSheet.create({
  overlay: {
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
  },
  container: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 24,
    gap: 24,
    borderWidth: 4,
    borderColor: Colors.gray_300,
  },
  actions: {
    flexDirection: "row",
    gap: 16,
  },
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
