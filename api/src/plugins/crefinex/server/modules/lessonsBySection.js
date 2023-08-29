const resolvers = {
  lessonsBySection: {
    resolve: async (parent, args, context) => {
      const UID = "plugin::crefinex.lesson";
      // const { toEntityResponseCollection, toEntityResponse } = strapi.service("plugin::graphql.format").returnTypes;

      let { results: lessonsData, pagination } = await strapi.services[UID].find({
        filters: {
          section: args.id,
        },
        pagination: { page: args.start, pageSize: args.limit },
      });

      //This extra info is needed for breadcrumbs
      const { results: sectionData } = await strapi.services["plugin::crefinex.section"].find({
        filters: { id: args.id },
        populate: { world: { fields: ["name"] } },
        fields: ["description", "order"],
      });
      const data = {
        id: args.id,
        lessons: lessonsData.map((lesson) => {
          return lesson;
        }),
        section: sectionData[0],
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
