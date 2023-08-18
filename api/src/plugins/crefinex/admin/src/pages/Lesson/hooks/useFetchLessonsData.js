import React, { useState, useEffect } from "react";
import lessonRequests from "../../../api/lesson/services/lessons";
import moduleRequests from "../../../api/module/services/modules";
import { useParams } from "react-router-dom";

export const useFetchLessonsData = (initialModuleId) => {
  const [lessonData, setLesson] = useState([]);
  const [moduleData, setModule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const moduleId = initialModuleId || useParams().moduleId; // Use the initialModuleId if provided, otherwise useParams

  useEffect(() => {
    fetchData();
  }, [moduleId]);

  const fetchData = async () => {
    setIsLoading(true);
    const lessonData = await lessonRequests.getLessonsByModuleId(moduleId);
    const moduleData = await moduleRequests.getModuleById(moduleId);

    console.log("ESTOY FETCHEANDO LOS DATOOOOS", lessonData, moduleData);

    setLesson(lessonData.data);
    setModule(moduleData.data);
    setIsLoading(false);
  };

  return {
    lessonData,
    moduleData,
    isLoading,
    fetchData,
    setIsLoading,
  };
};
