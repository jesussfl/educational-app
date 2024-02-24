import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "@components";
import { Colors } from "@utils/Theme";

import { useAuthContext } from "@contexts/auth.context";
import { useLessonStore } from "@stores/useLessonStore";
import { useLivesStore } from "@stores/useLivesStore";
import useAuthStore from "@stores/useAuthStore";

const LivesModal = () => {
  const { reset, lessonType } = useLessonStore((state) => state);
  const { regenerationTime } = useLivesStore((state) => state);
  const { user } = useAuthStore();
  const [timeLeft, setTimeLeft] = useState(regenerationTime);

  useEffect(() => {
    setTimeLeft(regenerationTime);
    if (regenerationTime > 0) {
      const intervalId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [regenerationTime]);

  if (lessonType !== "lives") {
    return null;
  }

  const formatTime = (timeInSeconds) => {
    if (timeInSeconds < 0) {
      return "";
    }
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
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
        <Text style={styles.modalTitle}>Tienes {user.lives} vidas</Text>
        <Text style={styles.modalText}>
          {timeLeft <= 0 ? "Tienes todas tus vidas" : "Tiempo restante"} {formatTime(timeLeft)}
        </Text>
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

export default LivesModal;

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
