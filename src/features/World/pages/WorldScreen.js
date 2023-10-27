import React, { useState, useCallback, useEffect } from "react";
import { View, Text } from "react-native";
import WorldSections from "../components/WorldSections";
import { StatusBar } from "expo-status-bar";
import { Button } from "@components";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import useBottomSheet from "@hooks/useBottomSheet";
import { PlayCircle, Book1, HeartSlash } from "iconsax-react-native";
import { Colors } from "@utils/Theme";
import useUserStats from "@hooks/useUserStats";
import GiftModal from "../components/GiftModal";
import { useAuthContext } from "@contexts/auth.context";
import { useCountdownTimer } from "@features/Exercises/hooks";
const regenerationInterval = 14400000;

const WorldScreen = ({ navigation }) => {
  const { bottomSheetModalRef, snapPoints, handlePresentModalPress, handleSheetChanges } = useBottomSheet();
  const [lessonId, setLessonId] = useState(null);
  const [lessonType, setLessonType] = useState(null);
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);
  const { userLives } = useUserStats();
  const { user, setUser } = useAuthContext();
  const { timeRemaining, startCountdownTimer, stopCountdownTimer } = useCountdownTimer();

  // Iniciar el temporizador cuando sea necesario
  useEffect(() => {
    if (user.lost_life_date) {
      const lostLifeDate = new Date(user.lost_life_date);
      const now = new Date();

      if (lostLifeDate.getTime() + regenerationInterval < now && user.lives === 6) {
        // Las vidas ya se han regenerado, no es necesario el temporizador
        return;
      }

      const timeDifference = lostLifeDate.getTime() + regenerationInterval - now.getTime();
      if (timeDifference > 0) {
        startCountdownTimer(() => console.log("Vidas regeneradas"), timeDifference / 1000);
      }
    }
  }, [user.lost_life_date, user.lives, startCountdownTimer]);

  const renderBackdrop = useCallback((props) => <BottomSheetBackdrop {...props} opacity={0.3} disappearsOnIndex={-1} appearsOnIndex={1} />, []);
  return (
    <>
      <StatusBar style="dark" />
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
      <WorldSections
        handlePresentModalPress={handlePresentModalPress}
        setLessonId={setLessonId}
        setLessonType={setLessonType}
        setIsLessonCompleted={setIsLessonCompleted}
      ></WorldSections>
      <BottomSheet
        ref={bottomSheetModalRef}
        index={-1}
        snapPoints={snapPoints}
        enableOverDrag={true}
        enableDismissOnClose={true}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
      >
        <View style={{ padding: 24, gap: 24 }}>
          {userLives === 0 ? (
            <Button text="No tienes vidas" variant="wrong" size="medium" rightIcon={<HeartSlash size={28} color={"#fff"} variant="Bold" />} />
          ) : (
            <Button
              text={isLessonCompleted ? "Repasar" : "Empezar Lección"}
              variant={isLessonCompleted ? "success" : "primary"}
              size="medium"
              rightIcon={<PlayCircle size={28} color={"#fff"} variant="Bold" />}
              onPress={async () => {
                await bottomSheetModalRef.current?.close();
                if (userLives === 0) return;
                navigation.navigate("Lessons", { screen: "Exercise", params: { lessonId } });
              }}
            />
          )}

          <Button text="Leer Contenido" variant="secondary" size="medium" rightIcon={<Book1 size={28} color={Colors.gray_500} variant="Bold" />} />
        </View>
      </BottomSheet>
      {lessonType === "gift" && <GiftModal cancel={() => setLessonType(null)} close={() => setLessonType(null)} />}
    </>
  );
};

export default WorldScreen;
