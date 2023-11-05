import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useCountdownTimer } from "@features/Exercises/hooks";
import { useAuthContext } from "@contexts/auth.context";
import { Colors } from "@utils/Theme";

export default function CountdownBar() {
  const { user, isLoading } = useAuthContext();
  const { timeRemaining, startCountdownTimer, stopCountdownTimer } = useCountdownTimer();
  useEffect(() => {
    if (user && user.next_life_regeneration) {
      const nextLifeRegenerationTime = new Date(user.next_life_regeneration);
      const now = new Date();

      if (nextLifeRegenerationTime < now && user.lives === 6) {
        return;
      }

      const timeDifference = nextLifeRegenerationTime.getTime() - now.getTime();
      if (timeDifference > 0) {
        startCountdownTimer(() => console.log("Vidas regeneradas"), timeDifference / 1000);
      }
    }
  }, [user, startCountdownTimer]);
  return (
    <View style={{ height: 56, backgroundColor: "#fff", justifyContent: "center", alignItems: "center", paddingHorizontal: 24 }}>
      <Text style={{ fontSize: 14, fontFamily: "Sora-Bold", color: Colors.gray_400, textAlign: "center" }}>
        {" "}
        {timeRemaining > 0
          ? `Vidas se regenerarán en ${Math.floor(timeRemaining / 3600)} horas, ${Math.floor((timeRemaining % 3600) / 60)} minutos y ${Math.floor(
              timeRemaining % 60
            )} segundos`
          : "Vidas listas"}
      </Text>
    </View>
  );
}
