import { StyleSheet, ScrollView, View, RefreshControl } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Lessons from "./Lessons";
import { Colors } from "@utils/Theme";
import Spinner from "react-native-loading-spinner-overlay";
import useWorldData from "../hooks/useWorldData";
import WorldSectionBanner from "./WorldSectionBanner";

const sectionColors = [Colors.primary_500, "#12B76A", "#9A4CFF", "#F1733D"];

const WorldSections = ({ handlePresentModalPress, setLessonId }) => {
  const { isLoading, worldData, lessonsCompleted, refreshData } =
    useWorldData();
  const [refreshing, setRefreshing] = useState(false);

  const scrollViewRef = useRef(null);
  const onRefresh = () => {
    setRefreshing(true);
    refreshData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    // Additional logic here
  }, [worldData, lessonsCompleted]);

  useEffect(() => {
    // Scroll al final cuando el componente se carga
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false }); // Coloca el scroll al final
    }
  }, []);

  return isLoading ? (
    <Spinner visible={isLoading} />
  ) : (
    <ScrollView
      ref={scrollViewRef}
      style={styles.pageContainer}
      onContentSizeChange={() => {
        scrollViewRef.current?.scrollToEnd();
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ flexDirection: "column-reverse", paddingBottom: 48 }}>
        {worldData.sectionsByWorld.sections.map((section, index) => {
          const randomColor = sectionColors[index % sectionColors.length];
          return (
            <View key={section.id} style={styles.sectionContainer}>
              <Lessons
                lessons={section.attributes.lessons.data}
                handlePresentModalPress={handlePresentModalPress}
                setLessonId={setLessonId}
                lessonsCompleted={lessonsCompleted}
              />
              <WorldSectionBanner
                description={section.attributes.description}
                order={section.attributes.order}
                backgroundColor={randomColor}
                id={section.id}
              />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default WorldSections;

const styles = StyleSheet.create({
  pageContainer: { gap: 24, backgroundColor: Colors.gray_25 },

  sectionContainer: {
    flex: 1,
    gap: 24,
    marginVertical: 24,
    alignItems: "center",
  },
});
