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
};

module.exports = {
  typeDef,
  resolvers,
};
