import React, { useState, useEffect } from "react";
import moduleRequests from "../../api/module/services/modules";
import worldRequests from "../../api/world/services/worlds";
import lessonRequests from "../../api/lesson/services/lessons";
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
    error: null,
    isDataEmpty: { value: false, message: "" },
  });

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
        const moduleData = await moduleRequests.getAllModules({ page, pageSize });
        fetchedData.modules = moduleData;
        setStatus((prevStatus) => ({
          ...prevStatus,
          isDataEmpty: { value: moduleData.data.length === 0, message: "There are no modules yet" },
        }));
      }

      if (dataToBeFetched === dataTypes.WORLDS) {
        const worldData = await worldRequests.getAllWorlds();
        fetchedData.worlds = worldData;
        setStatus((prevStatus) => ({
          ...prevStatus,
          isDataEmpty: { value: worldData.data.length === 0, message: "There are no worlds yet" },
        }));
      }

      if (dataToBeFetched === dataTypes.LESSONS) {
        const lessonData = await lessonRequests.getLessonsByModuleId(moduleId, { page, pageSize });
        const moduleData = await moduleRequests.getModuleById(moduleId);

        fetchedData.lessons = { lessonData: lessonData, moduleData: moduleData.data };
        setStatus((prevStatus) => ({
          ...prevStatus,
          isDataEmpty: { value: lessonData.data.length === 0, message: "There are no lessons yet" },
        }));
      }

      if (dataToBeFetched === dataTypes.EXERCISES) {
        const exerciseData = await exerciseRequests.getExercisesByLessonId(moduleId, { page, pageSize });
        fetchedData.exercises = exerciseData;
        setStatus((prevStatus) => ({
          ...prevStatus,
          isDataEmpty: { value: exerciseData.data.length === 0, message: "There are no exercises yet" },
        }));
      }

      setData(fetchedData);
    } catch (error) {
      console.error(error);
      setStatus({ ...status, error: "An error occurred while fetching data." });
    } finally {
      setStatus((prevStatus) => ({
        ...prevStatus,
        isLoading: false,
      }));
    }
  };

  // console.log("FETCHEAAAANDOOOO", status.isLoading, data);
  return {
    data,
    status,
    refreshData: fetchData,
  };
};
