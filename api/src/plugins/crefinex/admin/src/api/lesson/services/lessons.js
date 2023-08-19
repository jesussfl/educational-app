const lessonRequests = {
  getAllLessons: async () => {
    const data = await fetch(`http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/lessons?populate=*`, {
      method: "GET",
    }).then((response) => response.json());
    return data;
  },

  getLessonsByModuleId: async (moduleId, { page, pageSize }) => {
    const data = await fetch(
      `http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/lessons?populate[module][populate]=world&filters[module][id]=${moduleId}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
      {
        method: "GET",
      }
    ).then((response) => response.json());
    return data;
  },

  createLesson: async (lessonData) => {
    const response = await fetch(`http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/lessons?populate=*`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lessonData),
    });
    const data = await response.json();
    console.log("module created ", data);
    return data;
  },

  updateModule: async (moduleId, moduleData) => {
    const response = await fetch(`http:${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/lessons/${moduleId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(moduleData),
    });
    const data = await response.json();
    return data;
  },

  deleteLesson: async (lessonID) => {
    console.log(lessonID);

    const response = await fetch(`http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/lessons/${lessonID}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log("BORRADO");
    return data;
  },
};

export default lessonRequests;
