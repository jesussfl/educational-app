// @ts-ignore

const moduleRequests = {
  getAllModules: async () => {
    const data = await fetch(
      `http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/modules?populate=*`,
      {
        method: "GET",
      }
    ).then((response) => response.json());
    return data;
  },

  getModuleById: async (moduleId) => {
    const data = await fetch(
      `http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/modules/${moduleId}?populate=*`,
      {
        method: "GET",
      }
    ).then((response) => response.json());
    return data;
  },

  createModule: async (moduleData) => {
    const response = await fetch(
      `http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/modules`,
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
      `http:${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/modules/${moduleId}`,
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

export default moduleRequests;
