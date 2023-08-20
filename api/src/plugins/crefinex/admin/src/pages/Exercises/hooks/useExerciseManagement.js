// hooks/useLessonManagement.js
import { useState } from "react";
import exerciseRequests from "../../../api/exercise/services/exercises";
export function useExerciseManagement(fetchingData) {
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState({});

  async function deleteExercise(exerciseId) {
    try {
      await exerciseRequests.deleteExercise(exerciseId);
      await fetchingData();
      setResponse({ type: "success", title: "Success: ", message: "Exercise deleted successfully" });
    } catch (error) {
      console.log(error);
      setResponse({ type: "error", title: "Error: ", message: `Error deleting Exercise: ${error}` });
    } finally {
      setShowModal(false);
    }
  }

  async function createExercise(exerciseData) {
    try {
      await exerciseRequests.createExercise(exerciseData);
      await fetchingData();

      setResponse({ type: "success", title: "Success: ", message: "Exercise created successfully" });
    } catch (error) {
      console.log(error);
      setResponse({ type: "error", title: "Error: ", message: `Error creating Exercise: ${error}` });
    } finally {
      setShowModal(false);
    }
  }

  return { showModal, setShowModal, exerciseActions: { deleteExercise, createExercise }, response };
}
