// hooks/useLessonManagement.js
import { useState } from "react";
import lessonServices from "../../../api/lesson/services/lessonServices";
export function useLessonManagement(fetchingData) {
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState({});

  async function deleteLesson(lessonId) {
    try {
      await lessonServices.deleteLesson(lessonId);
      await fetchingData();
      setResponse({ type: "success", title: "Success: ", message: "Lesson deleted successfully" });
    } catch (error) {
      console.log(error);
      setResponse({ type: "error", title: "Error: ", message: `Error deleting lesson: ${error}` });
    } finally {
      setShowModal(false);
    }
  }

  async function createLesson(lessonData) {
    try {
      await lessonServices.createLesson(lessonData);
      await fetchingData();

      setResponse({ type: "success", title: "Success: ", message: "Lesson created successfully" });
    } catch (error) {
      console.log(error);
      setResponse({ type: "error", title: "Error: ", message: `Error creating lesson: ${error}` });
    } finally {
      setShowModal(false);
    }
  }

  return { showModal, setShowModal, lessonActions: { deleteLesson, createLesson }, response };
}
