import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { LessonButton, Button } from "@components";
import { Colors } from "../../../utils/Theme";
import { Key } from "iconsax-react-native";
import { calculateLeftPosition } from "../utils/calculateLessonsPosition";

const Lessons = ({
  lessons,
  lessonsCompleted,
  handlePresentModalPress,
  setLessonId,
  isFirstSection,
}) => {
  let firstUnlockedLessonIndex = -1;

  return (
    <View style={styles.container}>
      {lessons.map((lesson, index) => {
        const isLessonCompleted = lessonsCompleted.some(
          (completedLesson) =>
            completedLesson.attributes.lesson.data.id === lesson.id
        );
        if (isLessonCompleted) {
          firstUnlockedLessonIndex = index;
        }

        const isLessonUnlocked =
          index === firstUnlockedLessonIndex + 1 && isFirstSection;

        let isLessonLocked = !isLessonCompleted && !isLessonUnlocked;

        if (index === firstUnlockedLessonIndex && isLessonLocked) {
          isLessonLocked = false;
        }

        return (
          <View key={lesson.id}>
            <LessonButton
              isCompleted={isLessonCompleted}
              isLocked={isLessonLocked}
              left={calculateLeftPosition(index)}
              onPress={() => {
                if (!isLessonLocked) {
                  handlePresentModalPress(lesson.id);
                  setLessonId(lesson.id);
                }
              }}
              scale={0.88}
            />
          </View>
        );
      })}
      <Image
        source={require("../../../../assets/Gift.png")}
        style={styles.giftImage}
      />
      <View style={styles.bottomContainer}>
        <Image
          source={require("../../../../assets/Door.png")}
          style={styles.image}
        />
        <Button
          text="Siguiente Sección"
          variant="secondary"
          rightIcon={<Key size={20} variant="Bold" color={Colors.gray_300} />}
        />
      </View>
    </View>
  );
};

export default Lessons;

const styles = StyleSheet.create({
  container: {
    gap: -5,
    alignItems: "center",
    flexDirection: "column-reverse",
  },
  giftImage: {
    width: 150,
    height: 150,
    marginVertical: 16,
  },
  bottomContainer: {
    gap: 2,
    marginBottom: 24,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});
