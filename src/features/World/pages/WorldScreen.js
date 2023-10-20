import React, { useState, useCallback, useEffect } from "react";
import { View } from "react-native";
import WorldSections from "../components/WorldSections";
import { StatusBar } from "expo-status-bar";
import { Button } from "@components";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import useBottomSheet from "@utils/hooks/useBottomSheet";
import { PlayCircle, Book1, HeartSlash } from "iconsax-react-native";
import { Colors } from "@utils/Theme";
import useUserStats from "../../../hooks/useUserStats";
import GiftModal from "../components/GiftModal";
const WorldScreen = ({ navigation }) => {
  const { bottomSheetModalRef, snapPoints, handlePresentModalPress, handleSheetChanges } = useBottomSheet();
  const [lessonId, setLessonId] = useState(null);
  const [lessonType, setLessonType] = useState(null);
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);
  const { userLives } = useUserStats();
  const renderBackdrop = useCallback((props) => <BottomSheetBackdrop {...props} opacity={0.3} disappearsOnIndex={-1} appearsOnIndex={1} />, []);
  return (
    <>
      <StatusBar style="dark" />
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
