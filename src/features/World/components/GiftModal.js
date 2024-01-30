import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Button } from "@components";
import { Colors } from "@utils/Theme";
import useUserStats from "@hooks/useUserStats";
import { useCustomMutation } from "@utils/useCustomMutation";
import { createLessonCompletedMutation } from "@utils/graphql/mutations/lessonsCompleted.mutations";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAuthContext } from "@contexts/auth.context";
import { useLessonModal } from "@stores/lesson-modal";

const GiftModal = () => {
  const { lessonId, reset } = useLessonModal((state) => state);

  const { increaseMoney } = useUserStats();
  const navigation = useNavigation();
  const { user } = useAuthContext();
  const { mutate } = useCustomMutation("lessonsCompleted", createLessonCompletedMutation);
  useEffect(() => {
    saveProgress();
  }, []);
  const saveProgress = () => {
    increaseMoney(10);
    mutate({
      user: user.id,
      lesson: lessonId,
      data: {
        user: user.id,
        lesson: lessonId,
        timeSpent: null,
        mistakes: 0,
        errorExercises: null,
      },
    });
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 99,
        padding: 24,
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          padding: 24,
          borderRadius: 24,
          gap: 24,
          borderWidth: 4,
          borderColor: Colors.gray_300,
        }}
      >
        <Text style={styles.modalTitle}>Felicidades, aqui tienes un regalo!</Text>
        <Text style={styles.modalText}>Obtienes $10 de regalo</Text>
        <View
          style={{
            flexDirection: "row",
            gap: 16,
          }}
        >
          <Button text="Tomar" variant="primary" onPress={reset} style={{ flex: 1 }} />
        </View>
      </View>
    </View>
  );
};

export default GiftModal;

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 24,
    marginBottom: 8,
    fontFamily: "Sora-SemiBold",
    color: Colors.gray_600,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    fontFamily: "Sora-Medium",
    color: Colors.gray_600,
    textAlign: "center",
  },
});
