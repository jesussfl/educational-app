import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useCallback } from "react";
import { Button } from "@components";
import { Colors } from "@utils/Theme";
import { PlayCircle, Book1, HeartSlash, DollarCircle } from "iconsax-react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useLessonModal } from "@stores/lesson-modal";
import useBottomSheet from "@hooks/useBottomSheet";
import { useAuthContext } from "@contexts/auth.context";
import { useNavigation } from "@react-navigation/native";

const LessonBottomsheet = () => {
  const navigation = useNavigation();
  const { bottomSheetModalRef, snapPoints, handlePresentModalPress } = useBottomSheet();
  const { isOpen, lessonId, lessonType, lessonStatus, reset, onClose } = useLessonModal((state) => state);
  const { user } = useAuthContext();

  useEffect(() => {
    if (isOpen) {
      handlePresentModalPress(lessonId);
    }
  }, [isOpen]);
  const renderBackdrop = useCallback((props) => <BottomSheetBackdrop {...props} opacity={0.3} disappearsOnIndex={-1} appearsOnIndex={1} />, []);
  const buttonText = () => {
    if (lessonType === "exam") {
      if (lessonStatus === "completed") {
        return "Repetir Examen";
      }
      return "Comenzar Examen";
    }

    if (lessonStatus === "completed") {
      return "Repasar";
    }
    return "Comenzar Lección";
  };
  return (
    <BottomSheet
      ref={bottomSheetModalRef}
      index={-1}
      snapPoints={snapPoints}
      enableOverDrag={true}
      enableDismissOnClose={true}
      enablePanDownToClose={true}
      onClose={onClose}
      backdropComponent={renderBackdrop}
    >
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Text style={styles.costText}>{lessonType === "exam" ? "Este examen cuesta:" : "Esta leccción cuesta:"}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <DollarCircle size={28} color={Colors.success_500} variant="Bold" />
            <Text style={[styles.costText, { fontSize: 24 }]}>10</Text>
          </View>
        </View>
        {user.lives === 0 ? (
          <Button text="No tienes vidas" variant="wrong" size="medium" rightIcon={<HeartSlash size={28} color={"#fff"} variant="Bold" />} />
        ) : (
          <Button
            text={buttonText()}
            variant={lessonStatus === "completed" ? "success" : "primary"}
            size="medium"
            rightIcon={<PlayCircle size={28} color={"#fff"} variant="Bold" />}
            onPress={async () => {
              await bottomSheetModalRef.current?.close();
              if (user.lives === 0) return;
              if (user.money >= 10) {
                navigation.navigate("Lessons", { screen: "Exercise", params: { lessonId } });
              }
            }}
          />
        )}

        <Button text="Leer Contenido" variant="secondary" size="medium" rightIcon={<Book1 size={28} color={Colors.gray_500} variant="Bold" />} />
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
  costText: {
    fontSize: 20,
    fontFamily: "Sora-Bold",
    color: Colors.gray_500,
    textAlign: "center",
  },
});
export default LessonBottomsheet;
