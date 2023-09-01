const resolvers = {
  exercisesByLesson: {
    resolve: async (parent, args, context) => {
      const UID = "plugin::crefinex.exercise";
      // const { toEntityResponseCollection, toEntityResponse } = strapi.service("plugin::graphql.format").returnTypes;

      let { results: exercisesData, pagination } = await strapi.services[UID].find({
        filters: {
          lesson: args.id,
        },
        pagination: { page: args.start, pageSize: args.limit },
      });

      //This extra info is needed for breadcrumbs
      const { results: lessonData } = await strapi.services["plugin::crefinex.lesson"].find({
        filters: { id: args.id },
        populate: { world: { fields: ["name"] } },
        fields: ["description", "order"],
      });
      const data = {
        id: args.id,
        exercises: exercisesData.map((lesson) => {
          return lesson;
        }),
        lesson: lessonData[0],
        pagination,
      };

      // const response = toEntityResponseCollection(data, {
      //   args: { start: args.start, limit: args.limit },
      //   resourceUID: UID,
      // });

      console.log("##################", data, "##################");

      return data;
    },
  },
};

module.exports = {
  resolvers,
};
