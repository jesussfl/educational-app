import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Colors } from "@utils/Theme";
import WorldSectionBanner from "./world-section-banner";

import WorldLessons from "./world-lessons";
import { useScrollStore } from "@stores/useScrollStore";

const sectionColors = [Colors.primary_500, "#12B76A", "#9A4CFF", "#F1733D"];

const WorldSections = ({ sections, completedLessons }) => {
  const { currentCoords, sectionCoords, addSectionCoords, sectionHeight, addSectionHeight, reset } = useScrollStore();
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (ref && currentCoords && sectionCoords && sectionHeight) {
      ref.scrollTo({
        x: 0,
        y: sectionCoords + currentCoords - sectionHeight / 3,
        animated: true,
      });
    }
  }, [currentCoords, sectionCoords, sectionHeight]);

  const completedLessonsIds = completedLessons.map((lesson) => lesson.attributes.lesson.data.id);

  const checkIfSectionIsLocked = (section) => {
    const lessons = section.attributes.lessons.data;
    return lessons.every((lesson) => !completedLessonsIds.includes(lesson.id));
  };

  const checkIfPrevSectionCompleted = (index) => {
    if (index === 0) {
      return true;
    }
    const lessons = sections[index - 1].attributes.lessons.data;
    return lessons.every((lesson) => completedLessonsIds.includes(lesson.id));
  };

  return (
    <ScrollView
      ref={(ref) => {
        setRef(ref);
      }}
    >
      <View style={{ backgroundColor: Colors.gray_50, flexDirection: "column-reverse", paddingTop: 124, paddingBottom: 48 }}>
        {sections.map((section, index) => {
          const color = sectionColors[index % sectionColors.length];
          const sectionLessons = section.attributes.lessons.data;
          const isSectionCompleted = sectionLessons.every((lesson) => completedLessonsIds.includes(lesson.id));
          const isSectionLocked = checkIfSectionIsLocked(section);
          const isPrevSectionCompleted = checkIfPrevSectionCompleted(index);
          const firstLessonActive = isPrevSectionCompleted && isSectionLocked;
          const isLastSection = index === sections.length - 1;
          return (
            <View
              key={section.id}
              style={styles.sectionContainer}
              onLayout={(event) => {
                if ((!isSectionLocked && !isSectionCompleted) || firstLessonActive) {
                  const layout = event.nativeEvent.layout;
                  addSectionCoords(layout.y);
                  addSectionHeight(layout.height);
                }
              }}
            >
              <WorldLessons lessons={sectionLessons} completedLessons={completedLessons} firstLessonActive={firstLessonActive} isLastSection={isLastSection} />
              <WorldSectionBanner
                isDisabled={!isPrevSectionCompleted}
                backgroundColor={color}
                description={section.attributes.description}
                order={index + 1}
                id={section.id}
              />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
  },
  emptyText: {
    textAlign: "center",
    fontFamily: "Sora-SemiBold",
    fontSize: 24,
    color: Colors.gray_600,
    lineHeight: 32,
  },
  image: {
    width: "100%",
    height: "120%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
    resizeMode: "repeat",
    opacity: 0.4,
  },
  sectionsContainer: {
    flex: 1,
    backgroundColor: "#000",
    flexDirection: "column-reverse",
    paddingBottom: 48,
  },
  sectionContainer: {
    flex: 1,
    gap: 24,
    marginVertical: 24,

    alignItems: "center",
  },
});

export default WorldSections;
