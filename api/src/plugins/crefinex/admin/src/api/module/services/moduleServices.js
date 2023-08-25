const moduleAPI = {
  getAll: async ({ page, pageSize }) => {
    try {
      const data = await fetch(
        `http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/crefinex/sections?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
        {
          method: "GET",
        }
      ).then((response) => response.json());

      // if (data.data.length === 0) {
      //   data.isEmpty = "There are no modules yet";
      // } else {
      //   data.isEmpty = null;
      // }

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch modules");
    }
  },

  findById: async (moduleId) => {
    try {
      const data = await fetch(`http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/modules/${moduleId}?populate=*`, {
        method: "GET",
      }).then((response) => response.json());

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch module by ID");
    }
  },

  create: async (moduleData) => {
    try {
      const data = await fetch(`http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/modules`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(moduleData),
      }).then((response) => response.json());

      console.log("module created ", data);
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create module");
    }
  },

  update: async (moduleData) => {
    console.log("module edited ", moduleData);
    try {
      const data = await fetch(`http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/modules/${moduleData.id}?populate=*`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(moduleData),
      }).then((response) => response.json());

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to update module");
    }
  },

  delete: async (moduleId) => {
    console.log("module deleted ", moduleId);

    try {
      const data = await fetch(`http://${process.env.STRAPI_ADMIN_HOST_URL}:1337/api/modules/${moduleId}`, {
        method: "DELETE",
      }).then((response) => response.json());

      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to delete module");
    }
  },
};

export default moduleAPI;
