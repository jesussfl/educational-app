import { StyleSheet, Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Button } from "@components";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "@utils/Theme";
import { useCustomMutation } from "@utils/useCustomMutation";
import { createLessonCompletedMutation } from "@utils/graphql/mutations/lessonsCompleted.mutations";
import { createWorldCompletedMutation } from "@utils/graphql/mutations/worldsCompleted.mutation";
import { useAuthContext } from "@contexts/auth.context";
import useUserStats from "@hooks/useUserStats";
import { useLessonModal } from "@stores/lesson-modal";
import useAuthStore from "@stores/useAuthStore";

const CongratsPage = ({ route }) => {
  const { user } = useAuthStore();
  const navigation = useNavigation();
  const { lessonId, elapsedTime, errorCount, errorExercises } = route.params;
  const { isLastLesson } = useLessonModal((state) => state);

  const { increaseStreak, updateLastCompletedLessonDate, decreaseMoney, increaseMoney } = useUserStats();
  const { mutate } = useCustomMutation("lessonsCompleted", createLessonCompletedMutation);
  const { mutate: mutateWorld } = useCustomMutation("worldsCompleted", createWorldCompletedMutation);
  useEffect(() => {
    saveProgress();
  }, []);
  const saveProgress = () => {
    //Aveces se guarda y aveces no, solucionar

    if (isLastLesson) {
      mutateWorld({
        data: {
          user: user.id,
          world: user.currentWorld,
        },
      });
    }
    mutate({
      user: user.id,
      lesson: lessonId,
      data: {
        user: user.id,
        lesson: lessonId,
        timeSpent: elapsedTime,
        mistakes: errorCount,
        errorExercises: errorExercises,
      },
    });
    updateLastCompletedLessonDate();
    increaseStreak();
    decreaseMoney(10);
    increaseMoney(30 - errorCount * 2);
  };

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
