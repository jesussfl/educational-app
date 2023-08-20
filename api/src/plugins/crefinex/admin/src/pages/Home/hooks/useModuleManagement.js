// hooks/useLessonManagement.js
import { useState } from "react";
import moduleRequests from "../../../api/module/services/modules";
export function useModuleManagement(fetchingData) {
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState({});

  async function deleteEntry(moduleId) {
    try {
      await moduleRequests.deleteModule(moduleId);
      await fetchingData();
      setResponse({ type: "success", title: "Success: ", message: "Module deleted successfully" });
    } catch (error) {
      console.log(error);
      setResponse({ type: "error", title: "Error: ", message: `Error deleting Module: ${error}` });
    } finally {
      setShowModal(false);
    }
  }

  async function createEntry(moduleData) {
    try {
      await moduleRequests.createModule(moduleData);
      await fetchingData();

      setResponse({ type: "success", title: "Success: ", message: "Module created successfully" });
    } catch (error) {
      console.log(error);
      setResponse({ type: "error", title: "Error: ", message: `Error creating Module: ${error}` });
    } finally {
      setShowModal(false);
    }
  }

  return { showModal, setShowModal, entryActions: { deleteEntry, createEntry }, response };
}
