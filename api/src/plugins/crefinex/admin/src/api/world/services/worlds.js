// @ts-ignore

const worldRequests = {
  getAllWorlds: async () => {
    const data = await fetch(
      `http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/worlds`,
      {
        method: "GET",
      }
    ).then((response) => response.json());
    return data;
  },

  getModuleById: async (moduleId) => {
    const data = await fetch(
      `http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/worlds/${moduleId}`,
      {
        method: "GET",
      }
    ).then((response) => response.json());
    return data;
  },
};

export default worldRequests;
