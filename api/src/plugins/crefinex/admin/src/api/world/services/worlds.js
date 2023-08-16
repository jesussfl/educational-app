// @ts-ignore

const worldRequests = {
  getAllWorlds: async () => {
    const data = await fetch("http://localhost:1337/api/worlds", {
      method: "GET",
    }).then((response) => response.json());
    return data;
  },

  getModuleById: async (moduleId) => {
    const data = await fetch(`http://localhost:1337/api/worlds/${moduleId}`, {
      method: "GET",
    }).then((response) => response.json());
    return data;
  },
};

export default worldRequests;
