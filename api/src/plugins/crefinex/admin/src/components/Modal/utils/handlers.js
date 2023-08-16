import moduleRequests from "../../../api/world/services/worlds";
const submitHandlers = {
  createModule: async (e, description, world) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await moduleRequests.createModule({
        data: { description: description, order: 3, world: world },
      });
    } catch (e) {
      console.log("error", e);
    }
  },
};

export default submitHandlers;
