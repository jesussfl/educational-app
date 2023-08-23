const worldServices = {
  getAll: async () => {
    try {
      const data = await fetch(`http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/worlds`, {
        method: "GET",
      }).then((response) => response.json());
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch worlds");
    }
  },

  getById: async (moduleId) => {
    try {
      const data = await fetch(`http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/worlds/${moduleId}`, {
        method: "GET",
      }).then((response) => response.json());
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch world by ID");
    }
  },
};

export default worldServices;
