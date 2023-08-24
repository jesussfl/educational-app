const lessonServices = {
  getAll: async () => {
    try {
      const data = await fetch(`http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/lessons?populate=*`, {
        method: "GET",
      }).then((response) => response.json());
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch lessons");
    }
  },
  findById: async (lessonId) => {
    try {
      const data = await fetch(`http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/lessons/${lessonId}?populate=*`, {
        method: "GET",
      }).then((response) => response.json());
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  findByRelationId: async (moduleId, { page, pageSize }) => {
    try {
      const data = await fetch(
        `http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/lessons?populate[module][populate]=world&filters[module][id]=${moduleId}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
        {
          method: "GET",
        }
      ).then((response) => response.json());
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch lessons by module ID");
    }
  },

  create: async (lessonData) => {
    try {
      const response = await fetch(`http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/lessons?populate=*`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lessonData),
      });

      const data = await response.json();
      console.log("lesson created ", data);
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create lesson");
    }
  },

  update: async (moduleData) => {
    try {
      const response = await fetch(`http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/lessons/${moduleData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(moduleData),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to update lesson");
    }
  },

  delete: async (lessonID) => {
    try {
      const response = await fetch(`http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/lessons/${lessonID}`, {
        method: "DELETE",
      });

      const data = await response.json();
      console.log("DELETED");
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to delete lesson");
    }
  },
};

export default lessonServices;
