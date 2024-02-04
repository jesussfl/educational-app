import React, { useState } from "react";

// Components
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { CloseCircle } from "iconsax-react-native";
import Spinner from "react-native-loading-spinner-overlay";
import Modal from "@components/modal";
import BottomActions from "../components/bottom-actions";
import ProgressBar from "../components/ProgressBar";

// Utils
import { Colors } from "@utils/Theme";
import { useExercises } from "@stores/exercises";

// Hooks
import { useAuthContext } from "@contexts/auth.context";
import { useExerciseActions } from "../hooks/useExerciseActions";

const ExercisePage = ({ navigation, route }) => {
  const state = useExercises((state) => state);
  const { isLoading, currentExerciseData, isLastExercise, percentage, currentExerciseView, checkAnswer } = useExerciseActions();
  const { user } = useAuthContext();
  const [isAboutToLeave, setIsAboutToLeave] = useState(false);

  if (isLoading || !state.exercises) {
    return <Spinner visible={true} />;
  }

  return (
    <>
      <StatusBar style="auto" translucent={true} />

      <View style={styles.pageContainer}>
        <View style={styles.topBar}>
          <CloseCircle size={32} color={Colors.gray_300} onPress={() => setIsAboutToLeave(true)} />
          {<ProgressBar percentage={`${percentage}%`} />}
        </View>
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
          description="Prueba repasar lecciones para recuperar vidas"
          actionText={"Ir al inicio"}
          action={() => {
            navigation.replace("Main", { screen: "Lessons" });
            state.reset();
          }}
        />
      )}
      {isAboutToLeave && (
        <Modal
          title="¿Estás seguro que deseas dejar el ejercicio?"
          description="Si sales se perderá tu progreso"
          cancelAction={() => setIsAboutToLeave(false)}
          actionText={"Si, salir"}
          action={() => {
            setIsAboutToLeave(false);
            navigation.replace("Main", { screen: "Lessons" });
            state.reset();
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
