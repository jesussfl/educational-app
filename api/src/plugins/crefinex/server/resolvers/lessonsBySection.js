module.exports = {
  Query: {
    lessonsBySection: {
      resolve: async (parent, args, context) => {
        const UID = "plugin::crefinex.lesson";
        const { toEntityResponseCollection } = strapi.service("plugin::graphql.format").returnTypes;

        const { results } = await strapi.services[UID].find({
          filters: {
            section: args.id,
          },
        });

        const response = toEntityResponseCollection(results, {
          args: { start: args.start, limit: args.limit },
          resourceUID: UID,
        });

        console.log("##################", response, "##################");

        return response;
      },
    },
  },
};
