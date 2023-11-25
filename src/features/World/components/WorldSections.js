import React, { useRef } from "react";
import { ScrollView, View, RefreshControl, StyleSheet, Image } from "react-native";
import { Colors } from "@utils/Theme";
import WorldSectionBanner from "./WorldSectionBanner";
import Spinner from "react-native-loading-spinner-overlay";
import Lessons from "./Lessons";
import { useAuthContext } from "@contexts/auth.context";
import { query } from "@utils/graphql/client/GraphQLCLient";
import { useQueries } from "@tanstack/react-query";
import { querySectionsByWorldId } from "@utils/graphql/queries/section.queries";
import { queryLessonsCompletedByUser } from "@utils/graphql/queries/lessonsCompleted.queries";
const sectionColors = [Colors.primary_500, "#12B76A", "#9A4CFF", "#F1733D"];

const WorldSections = ({ sections, lessonsCompleted }) => {
  const scrollViewRef = useRef(null);

  const lessonsCompletedIds = lessonsCompleted.map((lesson) => lesson.attributes.lesson.data.id);

  const checkLastSectionCompleted = (index) => {
    if (index === 0) {
      return true;
    }
    const lessons = sections[index - 1].attributes.lessons.data;
    return lessons.every((lesson) => lessonsCompletedIds.includes(lesson.id));
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
          const randomColor = sectionColors[index % sectionColors.length];
          const lessons = section.attributes.lessons.data;
          const isFirstLessonCurrent = checkLastSectionCompleted(index) || index === 0;
          const isLastSection = index === sections.length - 1;
          return (
            <View key={section.id} style={styles.sectionContainer}>
              <Lessons lessons={lessons} lessonsCompleted={lessonsCompleted} isFirstLessonCurrent={isFirstLessonCurrent} isLastSection={isLastSection} />
              <WorldSectionBanner
                isDisabled={!checkLastSectionCompleted(index)}
                backgroundColor={randomColor}
                description={section.attributes.description}
                order={section.attributes.order}
                id={section.id}
              />
            </View>
          );
        })}
        <Image style={styles.image} source={require("../../../../assets/61844.jpg")}></Image>
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
