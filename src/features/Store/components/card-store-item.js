import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@utils/Theme";
const CardStoreItem = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Ideal para no gastar todas tus vidas al instante.</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}>Salvavidas</Text>
      </View>
      <View style={styles.cardButton}>
        <Text style={styles.buttonText}>Costo:</Text>
        <Text style={styles.buttonText}>1.200</Text>
      </View>
    </View>
  );
};

export default CardStoreItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDBE13",
    justifyContent: "center",
    flexDirection: "column",
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 4,
    borderBottomWidth: 13,
    borderColor: Colors.primary_600,
  },
  header: {
    height: 64,
    backgroundColor: "#FAB022",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",

    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  cardButton: {
    height: 88,
    backgroundColor: "#F2A40F",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 24,
  },
  headerText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Sora-ExtraBold",
    textTransform: "uppercase",
    textAlign: "center",
    textShadowOffset: { width: 2, height: 2 },

    textShadowColor: Colors.primary_700,
    textShadowRadius: 1,
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
    fontFamily: "Sora-ExtraBold",
    textTransform: "uppercase",
    letterSpacing: 2,
    textShadowOffset: { width: 3, height: 3 },

    textShadowColor: Colors.primary_700,
    textShadowRadius: 1,
  },

  contentText: {
    color: "#fff",
    fontSize: 24,
    fontFamily: "Sora-ExtraBold",
    textTransform: "uppercase",
    letterSpacing: 2,
    textShadowOffset: { width: 3, height: 3 },

    textShadowColor: Colors.primary_700,
    textShadowRadius: 1,
  },
});
