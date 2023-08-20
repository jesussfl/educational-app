const exerciseRequests = {
  getAllExercises: async () => {
    const data = await fetch(`http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/exercises?populate=*`, {
      method: "GET",
    }).then((response) => response.json());
    return data;
  },

  getExercisesByLessonId: async (lessonId, { page, pageSize }) => {
    const data = await fetch(
      `http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/exercises?populate[lesson][populate]=world&populate[lesson][populate]=module&filters[lesson][id]=${lessonId}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
      {
        method: "GET",
      }
    ).then((response) => response.json());
    return data;
  },

  createExercise: async (lessonData) => {
    const response = await fetch(`http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/exercises?populate=*`, {
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

  updateExercise: async (lessonId, lessonData) => {
    const response = await fetch(`http:${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/exercises/${lessonId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lessonData),
    });
    const data = await response.json();
    return data;
  },

  deleteExercise: async (exerciseID) => {
    console.log(exerciseID);

    const response = await fetch(`http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/exercises/${exerciseID}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log("BORRADO");
    return data;
  },
};

export default exerciseRequests;
