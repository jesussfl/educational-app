const exerciseServices = {
  getAll: async () => {
    try {
      const data = await fetch(`http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/exercises?populate=*`, {
        method: "GET",
      }).then((response) => response.json());
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch exercises");
    }
  },

  findByRelationId: async (lessonId, { page, pageSize }) => {
    try {
      const data = await fetch(
        `http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/exercises?populate[lesson][populate]=world&populate[lesson][populate]=module&filters[lesson][id]=${lessonId}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
        {
          method: "GET",
        }
      ).then((response) => response.json());
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch exercises by lesson ID");
    }
  },

  create: async (exerciseData) => {
    try {
      const response = await fetch(`http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/exercises?populate=*`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exerciseData),
      });

      const data = await response.json();
      console.log("exercise created ", data);
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create exercise");
    }
  },

  update: async (exerciseId, exerciseData) => {
    try {
      const response = await fetch(`http:${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/exercises/${exerciseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exerciseData),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to update exercise");
    }
  },

  delete: async (exerciseId) => {
    try {
      const response = await fetch(`http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/exercises/${exerciseId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      console.log("DELETED");
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to delete exercise");
    }
  },
};

export default exerciseServices;
