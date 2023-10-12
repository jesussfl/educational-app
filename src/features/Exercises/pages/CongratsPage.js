import { StyleSheet, Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button } from "@components";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "@utils/Theme";
import ProgressBar from "../components/ProgressBar";
const CongratsPage = () => {
  const navigation = useNavigation();
  return (
    <>
      <StatusBar style="dark" translucent={true} />
      <View style={styles.pageContainer}>
        <Image
          style={styles.image}
          source={require("../../../../assets/papelillos.png")}
        ></Image>
        <View style={styles.textsContainer}>
          <Text style={styles.congratsText}>¡Completaste la lección!</Text>
          <Text
            style={[
              styles.congratsText,
              { fontSize: 18, fontFamily: "Sora-Medium" },
            ]}
          >
            ¡Lo hiciste muy bien!
          </Text>
          {/* <ProgressBar percentage={"100"} /> */}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            text="Continuar"
            variant="secondary"
            style={{ flex: 1 }}
            onPress={() => navigation.replace("Main", { screen: "Lessons" })}
          />
        </View>
      </View>
    </>
  );
};

export default CongratsPage;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  textsContainer: {
    flex: 1,

    padding: 24,
    gap: 16,
    justifyContent: "center",
  },
  congratsText: {
    fontFamily: "Sora-Bold",
    color: Colors.gray_600,
    fontSize: 44,

    textAlign: "center",
  },
  buttonContainer: {
    gap: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 24,
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: -600,
    transform: [{ rotate: "180deg" }],
    opacity: 0.8,
    zIndex: -1,
  },
});
