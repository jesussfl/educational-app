import React, { useState, useEffect } from "react";
import moduleAPI from "../../api/module/services/moduleServices";
import worldServices from "../../api/world/services/worldServices";
import lessonRequests from "../../api/lesson/services/lessonServices";
import { useParams, useLocation } from "react-router-dom";
import exerciseRequests from "../../api/exercise/services/exercises";

const dataTypes = {
  MODULES: "modules",
  WORLDS: "worlds",
  LESSONS: "lessons",
  EXERCISES: "exercises",
};

export const useFetchData = (dataToBeFetched, initialModuleId) => {
  const [data, setData] = useState({});
  const [status, setStatus] = useState({
    isLoading: true,
    error: { value: false, message: "", type: "danger" },
    isDataEmpty: { value: false, message: "" },
  });
  const statusSetter = (newStatus) => {
    setStatus((prevStatus) => ({ ...prevStatus, ...newStatus }));
  };
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const page = params.get("page");
  const pageSize = params.get("pageSize");

  const moduleId = initialModuleId || useParams().moduleId;

  useEffect(() => {
    fetchData();
  }, [moduleId, search]);

  const fetchData = async () => {
    try {
      const fetchedData = {};
      if (dataToBeFetched === dataTypes.MODULES) {
        const moduleData = await moduleAPI.getAll({ page, pageSize });
        fetchedData.modules = moduleData;
        statusSetter({ isDataEmpty: { value: moduleData.data.length === 0, message: "There are no modules yet" } });
      }

      if (dataToBeFetched === dataTypes.WORLDS) {
        const worldData = await worldServices.getAllWorlds();
        fetchedData.worlds = worldData;
        statusSetter({ isDataEmpty: { value: worldData.data.length === 0, message: "There are no worlds yet" } });
      }

      if (dataToBeFetched === dataTypes.LESSONS) {
        const lessonData = await lessonRequests.getLessonsByModuleId(moduleId, { page, pageSize });
        const moduleData = await moduleAPI.getModuleById(moduleId);

        fetchedData.lessons = { lessonData: lessonData, moduleData: moduleData.data };
        statusSetter({ isDataEmpty: { value: lessonData.data.length === 0, message: "There are no lessons yet" } });
      }

      if (dataToBeFetched === dataTypes.EXERCISES) {
        const exerciseData = await exerciseRequests.getExercisesByLessonId(moduleId, { page, pageSize });
        fetchedData.exercises = exerciseData;
        statusSetter({ isDataEmpty: { value: exerciseData.data.length === 0, message: "There are no exercises yet" } });
      }

      setData(fetchedData);
    } catch (error) {
      console.error(error);
      statusSetter({ error: { value: true, message: error.name, type: "danger" } });
    } finally {
      statusSetter({ isLoading: false });
    }
  };

  return {
    data,
    status,
    refreshData: fetchData,
  };
};
