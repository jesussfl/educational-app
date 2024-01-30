import React from "react";

//Components
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import GiftModal from "../components/GiftModal";
import Spinner from "react-native-loading-spinner-overlay";
import CountdownBar from "../components/Countdown-bar";
import WorldSections from "../components/world-sections";
import LessonBottomsheet from "../components/Lesson-bottomsheet";

//Hooks
import { useWorldData } from "../hooks/useWorldData";
import { useAuthContext } from "@contexts/auth.context";
import { useLessonModal } from "@stores/lesson-modal";

const WorldScreen = () => {
  const { lessonType } = useLessonModal((state) => state);
  const { sections, completedLessons, error, isLoading } = useWorldData();

  if (error) {
    return (
      <View>
        <Text>{error.message}</Text>
      </View>
    );
  }

  if (isLoading) {
    return <Spinner visible={isLoading} />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <CountdownBar />
      <WorldSections sections={sections} completedLessons={completedLessons} />
      <LessonBottomsheet />

      {lessonType === "gift" && <GiftModal />}
    </>
  );
};

export default WorldScreen;
