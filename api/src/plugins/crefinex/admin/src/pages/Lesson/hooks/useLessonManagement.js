// hooks/useLessonManagement.js
import { useState } from "react";
import lessonRequests from "../../../api/lesson/services/lessons";
import { useFetchLessonsData } from "./useFetchLessonsData";
export function useLessonManagement(fetchingData) {
  const [showModal, setShowModal] = useState(false);
  const { fetchData } = useFetchLessonsData();
  async function deleteLesson(lessonId) {
    await lessonRequests.deleteLesson(lessonId);
    await fetchData();
  }

  async function createLesson(lessonData) {
    await lessonRequests.createLesson(lessonData);
    setShowModal(false);
    console.log("CREADOOOO");
    fetchingData();
  }

  return { showModal, setShowModal, deleteLesson, createLesson };
}
