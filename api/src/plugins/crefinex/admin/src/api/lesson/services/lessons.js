// @ts-ignore

const lessonRequests = {
  getAllLessons: async () => {
    const data = await fetch(
      `http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/lessons?populate=*`,
      {
        method: "GET",
      }
    ).then((response) => response.json());
    return data;
  },

  getLessonsByModuleId: async (moduleId) => {
    console.log("lessons: ", moduleId);

    const data = await fetch(
      `http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/lessons?filters[module][id]=${moduleId}&populate=*`,
      {
        method: "GET",
      }
    ).then((response) => response.json());
    return data;
  },

  createModule: async (moduleData) => {
    const response = await fetch(
      `http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/lessons`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(moduleData),
      }
    );
    const data = await response.json();
    console.log("module created ", data);
    return data;
  },

  updateModule: async (moduleId, moduleData) => {
    const response = await fetch(
      `http:${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/lessons/${moduleId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(moduleData),
      }
    );
    const data = await response.json();
    return data;
  },

  deleteModule: async (moduleId) => {
    const response = await fetch(
      `http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/modules/${moduleId}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    return data;
  },
};

export default lessonRequests;
