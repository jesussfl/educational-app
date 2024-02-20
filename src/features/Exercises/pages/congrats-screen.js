import { StyleSheet, Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Button } from "@components";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "@utils/Theme";
import { useExerciseActions } from "../hooks/useExerciseActions";

const CongratsPage = ({ route }) => {
  const navigation = useNavigation();
  const { elapsedTime, errorCount } = route.params;
  const { saveProgress } = useExerciseActions();

  useEffect(() => {
    saveProgress();
  }, []);

  return (
    <>
      <StatusBar style="dark" translucent={true} />
      <View style={styles.pageContainer}>
        <Image style={styles.image} source={require("../../../../assets/papelillos.png")}></Image>
        <View style={styles.textsContainer}>
          <Text style={styles.congratsText}>¡Completaste la lección!</Text>
          <Text style={[styles.congratsText, { fontSize: 18, fontFamily: "Sora-Medium" }]}>¡Lo hiciste muy bien!</Text>
          <View style={{ flexDirection: "column", gap: 8 }}>
            <Text style={[styles.congratsText, { fontSize: 18, fontFamily: "Sora-Medium" }]}>{elapsedTime}</Text>
            <Text style={[styles.congratsText, { fontSize: 18, fontFamily: "Sora-Medium" }]}>Has ganado {30 - errorCount * 2} monedas</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button text="Continuar" variant="secondary" style={{ flex: 1 }} onPress={() => navigation.replace("Main", { screen: "Lessons" })} />
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
    fontSize: 32,

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
