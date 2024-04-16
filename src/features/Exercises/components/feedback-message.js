import { Button } from "@components";
import { useNavigation } from "@react-navigation/native";
import { useExercises } from "@stores/useExerciseStore";
import { Colors } from "@utils/Theme";
import { StatusBar } from "expo-status-bar";
import { ArrowRight, HeartSlash, InfoCircle, TickCircle } from "iconsax-react-native";
import { StyleSheet, Text, View } from "react-native";
import UserStats from "../../World/components/UserStats";
import { calculateTimeSpent } from "../helpers";
import { stopSpeak } from "../helpers/speak";
import { useExerciseActions } from "../hooks/useExerciseActions";

export const FeedbackMessage = ({ isLastExercise, lessonId, profit }) => {
  const { exercises, isAnswerCorrect, nextExercise, startTime, mistakes, isCheckingAnswer, correctAnswer } = useExercises();

  const navigation = useNavigation();
  return (
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
      {!isAnswerCorrect && <Text style={styles.wrongText}>La respuesta era: {correctAnswer}</Text>}
      <Button
        text="Continuar"
        variant={isAnswerCorrect ? "success" : "wrong"}
        disabled={isCheckingAnswer}
        rightIcon={isAnswerCorrect ? <ArrowRight size={24} color={"#fff"} variant="Bold" /> : <InfoCircle size={24} color={"#fff"} variant="Bold" />}
        onPress={
          !isLastExercise
            ? () => {
                stopSpeak();
                nextExercise();
              }
            : () => {
                stopSpeak();
                navigation.navigate("Congrats", {
                  lessonId,
                  elapsedTime: calculateTimeSpent(startTime),
                  errorCount: mistakes.length,
                  errorExercises: mistakes,
                  profit,
                  correctAnswers: exercises.length - mistakes.length,
                });
              }
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: StatusBar.currentHeight || 24,
  },
  wrongText: {
    color: Colors.error_500,
    fontSize: 14,
    fontFamily: "Sora-SemiBold",
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
