import React from "react";

//Components
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import GiftModal from "../components/GiftModal";
import Spinner from "react-native-loading-spinner-overlay";

import WorldSections from "../components/world-sections";
import LessonBottomsheet from "../components/Lesson-bottomsheet";

//Hooks
import { useWorldData } from "../hooks/useWorldData";
import LivesModal from "../components/lives-modal";

const WorldScreen = () => {
  const { sections, completedLessons, error, isLoading } = useWorldData();

  if (error) {
    return (
      <View>
        <Text>{error.message}</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar style="dark" />

      {isLoading ? (
        <Spinner visible={isLoading} />
      ) : (
        <>
          <WorldSections sections={sections} completedLessons={completedLessons} />
          <LessonBottomsheet />
          <GiftModal />
          <LivesModal />
        </>
      )}
    </>
  );
};

export default WorldScreen;
