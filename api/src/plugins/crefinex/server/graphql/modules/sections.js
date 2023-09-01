const typeDef = `
    extend type Query {
      sections(start:Int, limit:Int): CrefinexSectionEntityResponseCollection!

    }
`;

const resolvers = {
  sections: {
    resolve: async (parent, args, context) => {
      const UID = "plugin::crefinex.section";
      const { toEntityResponseCollection } = strapi.service("plugin::graphql.format").returnTypes;

      //This extra info is needed for breadcrumbs
      const { results } = await strapi.services[UID].find();

      const response = toEntityResponseCollection(results, {
        args: { start: args.start, limit: args.limit },
        resourceUID: UID,
      });

      console.log("##################", response, "##################");

      return response;
    },
  },
  sectionsByWorld: {
    resolve: async (parent, args, context) => {
      const UID = "plugin::crefinex.section";
      // const { toEntityResponseCollection, toEntityResponse } = strapi.service("plugin::graphql.format").returnTypes;

      let { results: sectionsData, pagination } = await strapi.services[UID].find({
        filters: {
          world: args.id,
        },
        pagination: { page: args.start, pageSize: args.limit },
      });

      //This extra info is needed for breadcrumbs
      const { results: worldData } = await strapi.services["plugin::crefinex.world"].find({
        filters: { id: args.id },
        fields: ["name", "description"],
      });
      const data = {
        id: args.id,
        sections: sectionsData.map((lesson) => {
          return lesson;
        }),
        world: worldData[0],
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
  typeDef,
  resolvers,
};
