import React, { useState, useRef } from "react";
import { ScrollView, View, RefreshControl, StyleSheet } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import useWorldData from "../hooks/useWorldData";
import Lessons from "./Lessons";
import WorldSectionBanner from "./WorldSectionBanner";
import { Colors } from "@utils/Theme";

const sectionColors = [Colors.primary_500, "#12B76A", "#9A4CFF", "#F1733D"];

const WorldSections = ({ handlePresentModalPress, setLessonId, setLessonType, setIsLessonCompleted }) => {
  const { isLoading, sections, lessonsCompleted, sectionsCompleted, completedLessonIds, refreshData } = useWorldData();

  const [refreshing, setRefreshing] = useState(false);
  const scrollViewRef = useRef(null);

  const onRefresh = () => {
    setRefreshing(true);
    refreshData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  if (isLoading) {
    return <Spinner visible={isLoading} />;
  }

  const isSectionDisabled = (section, index) => {
    const firstCompletedSectionId = sectionsCompleted[0]?.attributes?.section?.data?.id;
    return section.id !== firstCompletedSectionId && sectionsCompleted.length === 0 && index !== 0;
  };

  const areAllPreviousSectionLessonsCompleted = (index) => {
    if (index === 0) return true; // La primera sección siempre está habilitada
    const previousSectionLessons = sections[index - 1].attributes.lessons.data;
    return previousSectionLessons.every((lesson) => completedLessonIds.includes(lesson.id));
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.pageContainer}
      onContentSizeChange={() => {
        scrollViewRef.current?.scrollToEnd({ animated: false });
      }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.sectionsContainer}>
        {sections.map((section, index) => {
          const randomColor = sectionColors[index % sectionColors.length];
          const disabled = isSectionDisabled(section, index);
          const isFirstLessonCurrent = areAllPreviousSectionLessonsCompleted(index) || (index === 0 && sectionsCompleted.length === 0);
          const lessons = section.attributes.lessons.data;

          return (
            <View key={section.id} style={styles.sectionContainer}>
              <Lessons
                lessons={lessons}
                lessonsCompleted={lessonsCompleted}
                isFirstLessonCurrent={isFirstLessonCurrent}
                handlePresentModalPress={handlePresentModalPress}
                setLessonId={setLessonId}
                setLessonType={setLessonType}
                setIsLessonCompleted={setIsLessonCompleted}
              />
              <WorldSectionBanner
                isDisabled={disabled}
                backgroundColor={randomColor}
                description={section.attributes.description}
                order={section.attributes.order}
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
  pageContainer: {
    flex: 1,
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
