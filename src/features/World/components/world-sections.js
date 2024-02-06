import React, { useRef } from "react";
import { ScrollView, View, StyleSheet, Image, Text } from "react-native";
import { Colors } from "@utils/Theme";
import WorldSectionBanner from "./WorldSectionBanner";

import SectionLessons from "./section-lessons";

const sectionColors = [Colors.primary_500, "#12B76A", "#9A4CFF", "#F1733D"];

const WorldSections = ({ sections, completedLessons }) => {
  const isSectionsEmpty = sections.length === 0;
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

  if (isSectionsEmpty) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Este mundo está vacío</Text>
      </View>
    );
  }

  return (
    <ScrollView
      ref={scrollViewRef}
      onContentSizeChange={() => {
        scrollViewRef.current?.scrollToEnd({ animated: false });
      }}
    >
      <View style={{ backgroundColor: Colors.gray_100 }}>
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
