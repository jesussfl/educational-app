import { StyleSheet, Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Button } from "@components";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "@utils/Theme";
import { useExerciseActions } from "../hooks/useExerciseActions";
import { ECONOMY } from "@config/economy";
import { useLessonStore } from "@stores/useLessonStore";
import { useExercises } from "@stores/useExerciseStore";
import { Clock, Coin, Coin1, HeartSlash } from "iconsax-react-native";

const CongratsPage = ({ route }) => {
  const navigation = useNavigation();
  const state = useExercises();
  const { lessonStatus, isLastLesson } = useLessonStore();
  const { elapsedTime, errorCount, profit, correctAnswers } = route.params;
  const { saveProgress } = useExerciseActions();

  useEffect(() => {
    saveProgress();
    navigation.addListener("beforeRemove", (e) => {
      navigation.dispatch(e.data.action);
    });
  }, []);

  return (
    <>
      <StatusBar style="dark" translucent={true} />
      <View style={styles.pageContainer}>
        <Image style={styles.image} source={require("../../../../assets/papelillos.png")}></Image>
        <View style={styles.textsContainer}>
          <Image source={require("@assets/icons/coin.png")} style={{ width: 124, height: 124, resizeMode: "contain" }} />

          <Text style={styles.congratsText}>Has obtenido {profit} monedas!</Text>
          <Text style={[styles.congratsText, { fontSize: 18, fontFamily: "Sora-Medium" }]}>¡Has hecho un excelente trabajo!</Text>
          <View style={{ flexDirection: "column", gap: 8 }}></View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.resultContainer}>
            <View style={{ flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
              <Text style={[styles.congratsText, { fontSize: 14, fontFamily: "Sora-Medium", textAlign: "left" }]}>Tu tiempo: {elapsedTime}</Text>
              <Text style={[styles.congratsText, { fontSize: 14, fontFamily: "Sora-Medium", textAlign: "left" }]}>Respuestas Correctas: {correctAnswers}</Text>
            </View>
            <View style={{ flexDirection: "column", gap: 8, alignItems: "center" }}>
              <Text style={[styles.congratsText, { fontSize: 14, fontFamily: "Sora-Bold" }]}>Correcciones</Text>
              <Text style={[styles.congratsText, { fontSize: 28, fontFamily: "Sora-Medium" }]}>{errorCount}</Text>
            </View>
          </View>
          <Button
            text="Continuar"
            variant="primary"
            onPress={() => {
              if (isLastLesson) {
                navigation.navigate("WorldCompleted");
                return;
              }
              navigation.replace("Main");
            }}
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
    backgroundColor: "#fff",
  },
  resultContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 16,
    borderColor: Colors.gray_100,
    borderWidth: 3,
    borderBottomWidth: 8,
    padding: 12,
  },
  textsContainer: {
    flex: 1,

    padding: 24,
    gap: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  congratsText: {
    fontFamily: "Sora-Bold",
    color: Colors.gray_600,
    fontSize: 32,

    textAlign: "center",
  },
  buttonContainer: {
    gap: 16,
    flexDirection: "column",
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
