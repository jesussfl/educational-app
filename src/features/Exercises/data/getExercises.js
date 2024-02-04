import { useEffect } from "react";

const { useExercises } = require("@stores/exercises");
const { useQuery } = require("@tanstack/react-query");
const { queryExercisesByLessonId, query } = require("@utils/graphql");

export const getExercisesByLesson = (lessonId) => {
  if (!lessonId) {
    return { isLoading: false, error: { message: "Lesson id is required" } };
  }

  const { data, isLoading, error } = useQuery(["exercises", lessonId], () => query(queryExercisesByLessonId, { id: lessonId, start: 1, limit: 100 }));
  const { setExercises, startTime, setStartTime } = useExercises((state) => state);
  useEffect(() => {
    setExercises(data?.exercisesByLesson?.exercises);
    if (!isLoading && !startTime) {
      setStartTime();
    }
  }, [isLoading, data]);

  return { isLoading, error };
};
