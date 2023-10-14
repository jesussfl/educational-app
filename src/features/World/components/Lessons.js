import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { LessonButton, Button } from "@components";
import { Colors } from "../../../utils/Theme";
import { Key, Translate } from "iconsax-react-native";
import { calculateLeftPosition } from "../utils/calculateLessonsPosition";
import * as Animatable from "react-native-animatable";
import { Svg, Line } from "react-native-svg";
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
            {isLessonUnlocked ? (
              <>
                {isLessonUnlocked ? (
                  <Svg
                    width="100"
                    height="180"
                    style={{ marginBottom: -36, marginTop: -106 }}
                  >
                    <Line
                      x1="55%"
                      y1="0"
                      x2="55%"
                      y2="100%"
                      stroke={Colors.gray_50}
                      strokeWidth="80"
                    />
                    <Line
                      x1="55%"
                      y1="0"
                      x2="55%"
                      y2="100%"
                      stroke={Colors.gray_200}
                      strokeWidth="15"
                    />
                  </Svg>
                ) : null}
                <Animatable.View
                  animation="pulse"
                  easing="ease-out"
                  iterationCount="infinite"
                  style={{}}
                >
                  <View
                    style={{
                      height: 36,
                      width: 132,
                      backgroundColor: "#9A4CFF",
                      borderRadius: 4,
                      position: "absolute",
                      top: -36,
                      left: calculateLeftPosition(index) - 8,
                      zIndex: 99,
                      padding: 4,
                    }}
                  >
                    <Text style={styles.unlockedText}>{"Comencemos"}</Text>
                  </View>
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
                    scale={0.9} // Escala normal para las lecciones bloqueadas
                  />
                </Animatable.View>
              </>
            ) : (
              <>
                {isLessonCompleted ? (
                  <Svg
                    width="100"
                    height="160"
                    style={{ marginBottom: -36, marginTop: -106 }}
                  >
                    <Line
                      x1="55%"
                      y1="0"
                      x2="55%"
                      y2="100%"
                      stroke={Colors.gray_50}
                      strokeWidth="80"
                    />
                    <Line
                      x1="55%"
                      y1="0"
                      x2="55%"
                      y2="100%"
                      stroke={Colors.success_500}
                      strokeWidth="15"
                    />
                  </Svg>
                ) : null}
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
                  scale={0.96} // Escala ligeramente aumentada para las lecciones no bloqueadas ni completadas
                />
              </>
            )}
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
    gap: 28,
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
  unlockedText: {
    fontSize: 16,
    fontFamily: "Sora-SemiBold",
    color: "#fff",
    textAlign: "center",
  },
});
