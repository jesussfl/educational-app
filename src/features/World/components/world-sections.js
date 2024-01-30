import React, { useRef } from "react";
import { ScrollView, View, StyleSheet, Image } from "react-native";
import { Colors } from "@utils/Theme";
import WorldSectionBanner from "./WorldSectionBanner";

import SectionLessons from "./section-lessons";

const sectionColors = [Colors.primary_500, "#12B76A", "#9A4CFF", "#F1733D"];

const WorldSections = ({ sections, completedLessons }) => {
  const scrollViewRef = useRef(null);

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
      ref={scrollViewRef}
      style={styles.pageContainer}
      onContentSizeChange={() => {
        scrollViewRef.current?.scrollToEnd({ animated: false });
      }}
    >
      <View style={styles.sectionsContainer}>
        {sections.map((section, index) => {
          const color = sectionColors[index % sectionColors.length];
          const sectionLessons = section.attributes.lessons.data;

          const isSectionLocked = checkIfSectionIsLocked(section);
          const isPrevSectionCompleted = checkIfPrevSectionCompleted(index);
          const firstLessonActive = isPrevSectionCompleted && isSectionLocked;

          const isLastSection = index === sections.length - 1;
          return (
            <View key={section.id} style={styles.sectionContainer}>
              <SectionLessons
                lessons={sectionLessons}
                completedLessons={completedLessons}
                firstLessonActive={firstLessonActive}
                isLastSection={isLastSection}
              />
              <WorldSectionBanner
                isDisabled={!isPrevSectionCompleted}
                backgroundColor={color}
                description={section.attributes.description}
                order={section.attributes.order}
                id={section.id}
              />
            </View>
          );
        })}
        <Image style={styles.image} source={require("../../../../assets/61844.jpg")} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
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
