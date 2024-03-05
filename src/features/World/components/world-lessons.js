import React from "react";
import { View, StyleSheet } from "react-native";

import LessonWrapper from "./lesson-button-wrapper";
import Gift from "./gift-button";
import Exam from "./exam-button";

const WorldLessons = ({
  lessons,
  completedLessons,
  firstLessonActive,
  isLastSection,

  sectionIndex,
}) => {
  const checkIfLessonCompleted = (lesson) => {
    if (!completedLessons || firstLessonActive) {
      return false;
    }

    return completedLessons.some((completedLesson) => completedLesson.attributes.lesson.data.id === lesson.id);
  };
  const checkIfLessonLocked = (lesson, index) => {
    if (!completedLessons || (firstLessonActive && index === 0)) {
      return false;
    }

    return !completedLessons.some((completedLesson) => completedLesson.attributes.lesson.data.id === lesson.id);
  };
  const checkPrevLessonIsCompleted = (index) => {
    if (index === 0) {
      return false;
    }
    const prevLesson = lessons[index - 1];
    return checkIfLessonCompleted(prevLesson);
  };
  return (
    <View style={styles.container}>
      {lessons.map((lesson, index) => {
        const isLessonCompleted = checkIfLessonCompleted(lesson);
        const isLessonLocked = checkIfLessonLocked(lesson, index);
        const isPrevLessonCompleted = checkPrevLessonIsCompleted(index);

        const isGift = lesson.attributes.type === "gift";
        const isExam = lesson.attributes.type === "exam";
        const isLast = index === lessons.length - 1 && isLastSection;

        if (isGift) {
          return <Gift key={lesson.id} isLessonCompleted={isLessonCompleted} isLocked={isLessonLocked} id={lesson.id} />;
        }
        if (isExam) {
          return (
            <Exam
              key={lesson.id}
              isLast={isLast}
              id={lesson.id}
              isLocked={!isPrevLessonCompleted}
              isCompleted={isLessonCompleted}
              description={lesson.attributes.description}
              sectionIndex={sectionIndex}
            />
          );
        }
        return (
          <LessonWrapper
            key={lesson.id}
            index={index}
            isLessonLocked={isPrevLessonCompleted ? false : isLessonLocked}
            isLessonCompleted={isLessonCompleted}
            lesson={lesson}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 28,
    alignItems: "center",
    flexDirection: "column-reverse",
  },
});
export default WorldLessons;
