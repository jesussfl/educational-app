import { StyleSheet, Text, View, useMemo } from "react-native";
import React from "react";
import UserStats from "../../World/components/UserStats";
import { ArrowRight, TickCircle, InfoCircle, HeartSlash } from "iconsax-react-native";
import { Button } from "@components";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@utils/Theme";
import { useExercises } from "@stores/exercises";
const BottomActions = ({ isCountdownActive, checkAnswer, timeRemaining, initialCountdownValue, handler }) => {
  const { isAnswerCorrect, nextExercise, userAnswer, currentExerciseType } = useExercises();
  if (currentExerciseType === "theory") {
    return (
      <>
        <View style={styles.buttonContainer}>
          <Button
            text="Continuar"
            variant="primary"
            rightIcon={<ArrowRight size={24} color={"#fff"} variant="Bold" />}
            style={{ flex: 1 }}
            onPress={handler.next}
          />
        </View>
      </>
    );
  }
  return (
    <>
      {isAnswerCorrect != null ? (
        <View style={styles.answeredContainer}>
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            {isAnswerCorrect ? (
              <TickCircle size={28} color={Colors.success_500} variant="Bold" />
            ) : (
              <HeartSlash size={28} color={Colors.error_500} variant="Bold" />
            )}
            <Text
              style={{
                color: Colors.gray_500,
                fontSize: 20,
                fontFamily: "Sora-Bold",
              }}
            >
              {isAnswerCorrect ? "Bien Hecho!" : "Incorrecto!"}
            </Text>
          </View>
          <Button
            text="Continuar"
            variant={isAnswerCorrect ? "success" : "wrong"}
            rightIcon={isAnswerCorrect ? <ArrowRight size={24} color={"#fff"} variant="Bold" /> : <InfoCircle size={24} color={"#fff"} variant="Bold" />}
            onPress={nextExercise}
          />
        </View>
      ) : (
        <View>
          {isCountdownActive ? (
            <View style={{ height: 10, width: `${(timeRemaining * 100) / initialCountdownValue}%`, backgroundColor: Colors.primary_600 }}></View>
          ) : null}
          <View style={styles.buttonContainer}>
            <UserStats statusToShow={"lives"} style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }} />

            <Button
              text="Comprobar"
              variant="primary"
              disabled={userAnswer == null || userAnswer.length === 0}
              rightIcon={<ArrowRight size={24} color={"#fff"} variant="Bold" />}
              style={{ flex: 1 }}
              onPress={checkAnswer}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default BottomActions;
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: StatusBar.currentHeight || 24,
  },

  topBar: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 16,
    gap: 16,
  },
  buttonContainer: {
    borderTopWidth: 2,
    borderColor: Colors.gray_200,
    gap: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  successBar: {
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  answeredContainer: {
    padding: 16,
    backgroundColor: "#fff",
    gap: 16,
    borderTopWidth: 2,
    borderColor: Colors.gray_200,
  },
});
