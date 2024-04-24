import React, { useEffect, useState } from "react";

// Components
import { StyleSheet, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { CloseCircle } from "iconsax-react-native";
import Spinner from "react-native-loading-spinner-overlay";
import Modal from "@components/modal";
import BottomActions from "../components/bottom-actions";
import ProgressBar from "../components/ProgressBar";

// Utils
import { Colors } from "@utils/Theme";
import { useExercises } from "@stores/useExerciseStore";
import useAuthStore from "@stores/useAuthStore";
// Hooks
import { useExerciseActions } from "../hooks/useExerciseActions";
import * as Speech from "expo-speech";

const ExercisePage = ({ navigation, route }) => {
  const state = useExercises((state) => state);
  const { isLoading, currentExerciseData, isLastExercise, percentage, currentExerciseView, checkAnswer } = useExerciseActions();
  const { user } = useAuthStore();
  const [isAboutToLeave, setIsAboutToLeave] = useState(false);
  const [action, setAction] = useState();
  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      console.log("livedfgdfgeess", user.lives);
      if (user.lives === 0) {
        navigation.dispatch(e.data.action);
        console.log("lives", user.lives);
        state.reset();
        return;
      }
      e.preventDefault();

      setIsAboutToLeave(true);
      setAction(e.data.action);
      // Prompt the user before leaving the screen
    });
  }, [user.lives]);

  if (isLoading || !state.exercises) {
    return <Spinner visible={true} />;
  }

  const isMistake = state.mistakes.includes(currentExerciseData?.id) && state.isAnswerCorrect === null;
  return (
    <>
      <StatusBar style="auto" translucent={true} />

      <View style={styles.pageContainer}>
        <View>
          <View style={styles.topBar}>
            <CloseCircle size={32} color={Colors.gray_300} onPress={() => navigation.replace("Main", { screen: "Lessons" })} />
            {<ProgressBar percentage={`${percentage}%`} />}
          </View>
          {isMistake ? <Text style={styles.mistakeText}>Corrigiendo el ejercicio</Text> : null}
        </View>
        {/* <PairsExercise /> */}
        {/* <SpeechExercise /> */}
        {/* <MemoryExercise /> */}
        {currentExerciseView}

        <BottomActions
          checkAnswer={checkAnswer}
          isLastExercise={isLastExercise}
          exerciseType={currentExerciseData?.attributes?.type}
          lessonId={route.params?.lessonId}
        />
      </View>
      {user.lives === 0 && (
        <Modal
          title="Perdiste todas tus vidas"
          description="Ve a la tienda para comprar vidas o espera a que tus vidas se regeneren."
          actionText={"Ir al inicio"}
          action={() => {
            navigation.replace("Main", { screen: "Lessons" });
            Speech.stop();

            // state.reset();
          }}
        />
      )}
      {isAboutToLeave && (
        <Modal
          title="¿Estás seguro que deseas dejar el ejercicio?"
          description="Si sales se perderá tu progreso y tu dinero no será regresado"
          cancelAction={() => setIsAboutToLeave(false)}
          actionText={"Si, salir"}
          action={(e) => {
            setIsAboutToLeave(false);
            navigation.dispatch(action);
            navigation.replace("Main", { screen: "Lessons" });
            state.reset();
            Speech.stop();
          }}
        />
      )}
    </>
  );
};

export default ExercisePage;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: StatusBar.currentHeight || 24,
  },
  mistakeText: {
    color: Colors.error_500,
    fontFamily: "Sora-SemiBold",
    fontSize: 14,
    textAlign: "center",
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
