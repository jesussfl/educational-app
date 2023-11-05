import React from "react";

import { StatusBar } from "expo-status-bar";

import { useAuthContext } from "@contexts/auth.context";
import { useLessonModal } from "@stores/lesson-modal";

import GiftModal from "../components/GiftModal";
import Spinner from "react-native-loading-spinner-overlay";
import CountdownBar from "../components/Countdown-bar";
import WorldSections from "../components/WorldSections";
import LessonBottomsheet from "../components/Lesson-bottomsheet";

const WorldScreen = () => {
  const { lessonId, lessonType, reset } = useLessonModal((state) => state);

  const { isLoading } = useAuthContext();

  if (isLoading) {
    return <Spinner visible={isLoading} />;
  }
  return (
    <>
      <StatusBar style="dark" />
      <CountdownBar />
      <WorldSections />
      <LessonBottomsheet />

      {lessonType === "gift" && <GiftModal cancel={() => reset()} close={() => reset()} lessonId={lessonId} />}
    </>
  );
};

export default WorldScreen;
