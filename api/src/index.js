module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi } */) {
    const extensionService = strapi.plugin("graphql").service("extension");

    extensionService.use(({ strapi }) => ({
      typeDefs: `
        type Query {
          lessonsBySection(id:ID!, start:Int, limit:Int): CrefinexLessonEntityResponseCollection!
        }
      `,
      resolvers: {
        Query: {
          lessonsBySection: {
            resolve: async (parent, args, context) => {
              const { toEntityResponseCollection } = strapi.service("plugin::graphql.format").returnTypes;

              const { results } = await strapi.services["plugin::crefinex.lesson"].find({
                filters: {
                  section: args.id,
                },
              });
              console.log("##################", results, "##################");

              const response = toEntityResponseCollection(results, {
                args: { start: args.start, limit: args.limit },
                resourceUID: "plugin::crefinex.lesson",
              });

              console.log("##################", response, "##################");

              return response;
            },
          },
        },
      },
    }));
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi } */) {},
};
