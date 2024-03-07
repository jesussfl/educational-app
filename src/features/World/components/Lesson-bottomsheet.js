import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useCallback } from "react";
import { Button } from "@components";
import { Colors } from "@utils/Theme";
import { PlayCircle, Book1, HeartSlash, DollarCircle } from "iconsax-react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useLessonStore } from "@stores/useLessonStore";
import useBottomSheet from "@hooks/useBottomSheet";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "@stores/useAuthStore";
import { ECONOMY } from "@config/economy";

const LessonBottomsheet = () => {
  const navigation = useNavigation();
  const { bottomSheetModalRef } = useBottomSheet();
  const { lessonId, lessonType, lessonStatus, lessonDescription } = useLessonStore();
  const { user } = useAuthStore();
  const goToExercises = async () => {
    await bottomSheetModalRef.current?.close();
    navigation.navigate("Lessons", { screen: "Exercise", params: { lessonId } });
  };
  const getActionState = () => {
    if (user.lives < 1) {
      return "NO_LIVES";
    }

    if (user.money < ECONOMY.LESSONS_PRICE && lessonStatus !== "completed") {
      return "NO_MONEY";
    }
    if (lessonType === "exam" && lessonStatus === "completed") {
      return "EXAM_COMPLETED";
    }
    if (lessonType === "lesson" && lessonStatus === "completed") {
      return "LESSON_COMPLETED";
    }
    if (lessonType === "exam") {
      return "EXAM";
    }

    return "LESSON";
  };
  const ACTIONS = {
    EXAM: <Button variant={"primary"} text={"Comenzar Examen"} rightIcon={<PlayCircle size={24} variant="Bold" color={"#fff"} />} onPress={goToExercises} />,
    LESSON: <Button variant={"primary"} text={"Comenzar Lección"} rightIcon={<PlayCircle size={24} variant="Bold" color={"#fff"} />} onPress={goToExercises} />,
    EXAM_COMPLETED: (
      <Button
        variant={"success"}
        text={"Repetir Examen"}
        rightIcon={<PlayCircle size={24} variant="Bold" color={"#fff"} />}
        size="small"
        onPress={goToExercises}
      />
    ),
    LESSON_COMPLETED: (
      <Button
        variant={"success"}
        text={"Repasar Lección"}
        rightIcon={<PlayCircle size={24} variant="Bold" color={"#fff"} />}
        size="small"
        onPress={goToExercises}
      />
    ),
    NO_MONEY: (
      <Button
        variant={"secondary"}
        text={"No tienes dinero suficiente"}
        rightIcon={<DollarCircle size={24} variant="Bold" color={Colors.error_400} />}
        disabled
      />
    ),
    NO_LIVES: (
      <Button variant={"secondary"} text={"No te quedan vidas"} rightIcon={<HeartSlash size={24} variant="Bold" color={Colors.error_400} />} disabled />
    ),
  };
  return (
    <CustomBottomSheet description={lessonDescription} costText={"Costo"} cost={lessonStatus === "completed" ? "Adquirida" : ECONOMY.LESSONS_PRICE}>
      {ACTIONS[getActionState()]}
    </CustomBottomSheet>
  );
};

const CustomBottomSheet = ({ children, description, costText, cost }) => {
  const { bottomSheetModalRef, snapPoints, handlePresentModalPress } = useBottomSheet();
  const { isOpen, lessonId, reset } = useLessonStore((state) => state);

  useEffect(() => {
    if (isOpen) {
      handlePresentModalPress(lessonId);
    }
  }, [isOpen]);
  const renderBackdrop = useCallback((props) => <BottomSheetBackdrop {...props} opacity={0.3} disappearsOnIndex={-1} appearsOnIndex={1} />, []);

  return (
    <BottomSheet
      ref={bottomSheetModalRef}
      index={-1}
      snapPoints={snapPoints}
      enableOverDrag={true}
      enableDismissOnClose={true}
      enablePanDownToClose={true}
      onClose={reset}
      backdropComponent={renderBackdrop}
    >
      <View style={styles.mainContainer}>
        <Text style={styles.description}>{description}</Text>

        <View style={styles.header}>
          <Text style={styles.costText}>{costText}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <DollarCircle size={28} color={Colors.success_500} variant="Bold" />
            <Text style={[styles.costText, { fontSize: 24 }]}>{cost}</Text>
          </View>
        </View>
        {children}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 24,
    gap: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  description: {
    fontSize: 24,
    fontFamily: "Sora-SemiBold",
    color: Colors.gray_500,
    textAlign: "center",
  },
  costText: {
    fontSize: 20,
    fontFamily: "Sora-Bold",
    color: Colors.gray_500,
    textAlign: "center",
  },
});
export default LessonBottomsheet;
