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
  const { elapsedTime, errorCount } = route.params;
  const { saveProgress } = useExerciseActions();
  const profit =
    lessonStatus === "completed"
      ? ECONOMY.COMPLETED_LESSONS_PROFIT
      : (ECONOMY.LESSONS_PROFIT - ECONOMY.LESSONS_PRICE) / (state.exercises.length / (state.exercises.length - state.mistakes.length));
  console.log(profit);
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
            <View style={styles.resultContainer}>
              <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                <Clock size={36} color={Colors.success_600} variant="Bold" />
                <Text style={[styles.congratsText, { fontSize: 18, fontFamily: "Sora-Medium" }]}>Tu tiempo:</Text>
              </View>
              <Text style={[styles.congratsText, { fontSize: 20, fontFamily: "Sora-Bold" }]}>{elapsedTime}</Text>
            </View>
            <View style={styles.resultContainer}>
              <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                <Coin1 size={36} color={Colors.primary_600} variant="Bold" />
                <Text style={[styles.congratsText, { fontSize: 18, fontFamily: "Sora-Medium" }]}>Monedas conseguidas:</Text>
              </View>
              <Text style={[styles.congratsText, { fontSize: 22, fontFamily: "Sora-Bold" }]}> {profit}</Text>
            </View>
            <View style={styles.resultContainer}>
              <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                <HeartSlash size={32} color={Colors.error_500} variant="Bold" />
                <Text style={[styles.congratsText, { fontSize: 18, fontFamily: "Sora-Medium" }]}>Vidas perdidas:</Text>
              </View>
              <Text style={[styles.congratsText, { fontSize: 22, fontFamily: "Sora-Bold" }]}> {errorCount}</Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            text="Continuar"
            variant="primary"
            style={{ flex: 1 }}
            onPress={() => {
              if (isLastLesson) {
                navigation.navigate("WorldCompleted");
                return;
              }
              navigation.replace("Main", { screen: "Lessons" });
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
    backgroundColor: Colors.gray_50,
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
    padding: 24,
  },
  textsContainer: {
    flex: 1,

    padding: 24,
    gap: 16,
    justifyContent: "flex-end",
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
