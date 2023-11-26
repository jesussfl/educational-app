import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Key } from "iconsax-react-native";

import { Button } from "@components";
import { useLessonModal } from "@stores/lesson-modal";
import { Colors } from "@utils/Theme";
const Exam = ({ isLast, id }) => {
  const { addLessonId, addLessonStatus, onOpen, addIsLastLesson, addLessonType } = useLessonModal((state) => state);

  return (
    <View style={styles.bottomContainer}>
      <Image source={require("../../../../assets/Door.png")} style={styles.image} />
      <Button
        text="Siguiente Sección"
        variant="secondary"
        rightIcon={<Key size={20} variant="Bold" color={Colors.gray_300} />}
        onPress={() => {
          addLessonType("exam");
          addLessonId(id);
          addLessonStatus("unlocked");
          if (isLast) {
            addIsLastLesson(true);
          } else {
            addIsLastLesson(false);
          }
          onOpen();
        }}
      />
    </View>
  );
};

export default Exam;

const styles = StyleSheet.create({
  container: {
    gap: 28,
    alignItems: "center",
    flexDirection: "column-reverse",
  },
  giftImage: {
    width: 150,
    height: 150,
    marginVertical: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 16,
    alignSelf: "center",
  },
});
