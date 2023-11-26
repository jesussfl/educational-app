import React from "react";
import { View, StyleSheet } from "react-native";
import { Svg, Line } from "react-native-svg";
import * as Animatable from "react-native-animatable";

import { LessonButton, Button } from "@components";
import { useLessonModal } from "@stores/lesson-modal";
import { calculateLeftPosition } from "../utils/calculateLessonsPosition";
import { Colors } from "@utils/Theme";

export function Lesson({ index, isLessonLocked, isLessonCompleted, lesson }) {
  const { addLessonId, addLessonStatus, onOpen, addIsLastLesson, addLessonType } = useLessonModal((state) => state);

  return (
    <View>
      <Svg width="100" height="160" style={{ marginBottom: -36, marginTop: -106 }}>
        <Line x1="55%" y1="0" x2="55%" y2="100%" stroke={Colors.gray_50} strokeWidth="80" />
        <Line x1="55%" y1="0" x2="55%" y2="100%" stroke={isLessonCompleted ? Colors.success_500 : Colors.gray_200} strokeWidth="15" />
      </Svg>

      {!isLessonCompleted && !isLessonLocked ? (
        <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
          <View style={styles.unlockedLessonContainer}>
            <LessonButton
              left={calculateLeftPosition(index)}
              onPress={() => {
                addIsLastLesson(false);
                addLessonType("lesson");
                addLessonStatus("unlocked");
                addLessonId(lesson.id);
                onOpen();
              }}
              scale={0.9}
            />
          </View>
        </Animatable.View>
      ) : (
        <LessonButton
          isCompleted={isLessonCompleted}
          isLocked={isLessonLocked}
          left={calculateLeftPosition(index)}
          onPress={() => {
            if (!isLessonLocked) {
              addIsLastLesson(false);
              addLessonType("lesson");
              addLessonId(lesson.id);
              addLessonStatus("completed");
              onOpen();
            }
          }}
          scale={isLessonCompleted ? 0.96 : 0.9}
        />
      )}
    </View>
  );
}
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
export default Lesson;
