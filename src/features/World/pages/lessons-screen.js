import React from "react";

import { StatusBar } from "expo-status-bar";

import { useAuthContext } from "@contexts/auth.context";
import { useLessonModal } from "@stores/lesson-modal";

import GiftModal from "../components/GiftModal";
import Spinner from "react-native-loading-spinner-overlay";
import CountdownBar from "../components/Countdown-bar";
import WorldSections from "../components/world-sections";
import LessonBottomsheet from "../components/Lesson-bottomsheet";

import { query } from "@utils/graphql/client/GraphQLCLient";
import { useQueries } from "@tanstack/react-query";
import { querySectionsByWorldId } from "@utils/graphql/queries/section.queries";
import { queryLessonsCompletedByUser } from "@utils/graphql/queries/lessonsCompleted.queries";
const WorldScreen = () => {
  const { lessonId, lessonType, reset } = useLessonModal((state) => state);
  const { user } = useAuthContext();

  const results = useQueries({
    queries: [
      {
        queryKey: ["sections", user.currentWorld],
        queryFn: () =>
          query(querySectionsByWorldId, {
            id: user.currentWorld,
            start: 1,
            limit: 10,
          }),
      },
      {
        queryKey: ["lessons_completed"],
        queryFn: () =>
          query(queryLessonsCompletedByUser, {
            id: user.id,
            start: 1,
            limit: 100,
          }),
      },
    ],
  });

  const isLoading = results.some((result) => result.isLoading);

  if (isLoading) {
    return <Spinner visible={isLoading} />;
  }

  const { sections } = results[0]?.data?.sectionsByWorld;
  const { lessonsCompleted } = results[1]?.data?.lessonsCompletedByUser;

  return (
    <>
      <StatusBar style="dark" />
      <CountdownBar />
      <WorldSections sections={sections} lessonsCompleted={lessonsCompleted} />
      <LessonBottomsheet />

      {lessonType === "gift" && <GiftModal cancel={() => reset()} close={() => reset()} lessonId={lessonId} />}
    </>
  );
};

export default WorldScreen;
