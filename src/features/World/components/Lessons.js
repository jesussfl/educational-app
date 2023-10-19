import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { LessonButton, Button } from "@components";
import { Colors } from "../../../utils/Theme";
import { Key } from "iconsax-react-native";
import { calculateLeftPosition } from "../utils/calculateLessonsPosition";
import * as Animatable from "react-native-animatable";
import { Svg, Line } from "react-native-svg";
import {
  findFirstUnlockedLessonIndex,
  checkIfLessonCompleted,
  checkIfLessonLocked,
  checkIfLessonUnlocked,
} from "../utils/renderLessons.helper";
const Lessons = ({ lessons, lessonsCompleted, handlePresentModalPress, setLessonId, isFirstLessonCurrent }) => {
  const firstUnlockedLessonIndex = findFirstUnlockedLessonIndex(lessons, lessonsCompleted);
  return (
    <View style={styles.container}>
      {lessons.map((lesson, index) => {
        const isLessonCompleted = checkIfLessonCompleted(lesson, lessonsCompleted);
        const isLessonUnlocked = checkIfLessonUnlocked(index, firstUnlockedLessonIndex, isFirstLessonCurrent);
        const isLessonLocked = checkIfLessonLocked(index, firstUnlockedLessonIndex, isLessonCompleted);
        return (
          <View key={lesson.id}>
            {isLessonUnlocked ? (
              <UnlockedLesson
                index={index}
                handlePresentModalPress={handlePresentModalPress}
                setLessonId={setLessonId}
                isLessonLocked={isLessonLocked}
                isLessonCompleted={isLessonCompleted}
                lesson={lesson}
              />
            ) : (
              <LockedOrCompletedLesson
                index={index}
                handlePresentModalPress={handlePresentModalPress}
                setLessonId={setLessonId}
                isLessonLocked={isLessonLocked}
                isLessonCompleted={isLessonCompleted}
                lesson={lesson}
              />
            )}
          </View>
        );
      })}

      <Image source={require("../../../../assets/Gift.png")} style={styles.giftImage} />
      <BottomContainer />
    </View>
  );
};

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
export default Lessons;

function UnlockedLesson({ index, handlePresentModalPress, setLessonId, lesson }) {
  return (
    <>
      <Svg width="100" height="180" style={{ marginBottom: -36, marginTop: -106 }}>
        <Line x1="55%" y1="0" x2="55%" y2="100%" stroke={Colors.gray_50} strokeWidth="80" />
        <Line x1="55%" y1="0" x2="55%" y2="100%" stroke={Colors.gray_200} strokeWidth="15" />
      </Svg>
      <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
        <View style={styles.unlockedLessonContainer}>
          <LessonButton
            left={calculateLeftPosition(index)}
            onPress={() => {
              handlePresentModalPress(lesson.id);
              setLessonId(lesson.id);
            }}
            scale={0.9}
          />
        </View>
      </Animatable.View>
    </>
  );
}

function LockedOrCompletedLesson({ index, handlePresentModalPress, setLessonId, isLessonLocked, isLessonCompleted, lesson }) {
  return (
    <>
      <Svg width="100" height="160" style={{ marginBottom: -36, marginTop: -106 }}>
        <Line x1="55%" y1="0" x2="55%" y2="100%" stroke={Colors.gray_50} strokeWidth="80" />
        <Line
          x1="55%"
          y1="0"
          x2="55%"
          y2="100%"
          stroke={isLessonCompleted ? Colors.success_500 : Colors.gray_200}
          strokeWidth="15"
        />
      </Svg>
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
        scale={isLessonCompleted ? 0.96 : 0.9}
      />
    </>
  );
}

function BottomContainer() {
  return (
    <View style={styles.bottomContainer}>
      <Image source={require("../../../../assets/Door.png")} style={styles.image} />
      <Button text="Siguiente Sección" variant="secondary" rightIcon={<Key size={20} variant="Bold" color={Colors.gray_300} />} />
    </View>
  );
}
