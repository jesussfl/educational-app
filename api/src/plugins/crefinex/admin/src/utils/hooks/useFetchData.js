import React, { useState, useEffect } from "react";
import moduleRequests from "../../api/module/services/modules";
import worldRequests from "../../api/world/services/worlds";
import lessonRequests from "../../api/lesson/services/lessons";
import { useParams } from "react-router-dom";

export const useFetchData = (dataTypes = [], initialModuleId) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const moduleId = initialModuleId || useParams().moduleId;

  useEffect(() => {
    fetchData();
  }, [moduleId, ...dataTypes]);

  const fetchData = async () => {
    setIsLoading(true);
    const fetchedData = {};
    console.log(moduleId);

    if (dataTypes.includes("modules")) {
      const moduleData = await moduleRequests.getAllModules();
      fetchedData.modules = moduleData.data;
    }

    if (dataTypes.includes("worlds")) {
      const worldData = await worldRequests.getAllWorlds();
      fetchedData.worlds = worldData.data;
    }

    if (dataTypes.includes("lessons")) {
      const lessonData = await lessonRequests.getLessonsByModuleId(moduleId);
      const moduleData = await moduleRequests.getModuleById(moduleId);
      fetchedData.lessons = { lessonData: lessonData.data, moduleData: moduleData.data };
    }

    setIsLoading(false);
    setData(fetchedData);
  };

  return {
    data,
    isLoading,
    refreshData: fetchData,
  };
};
