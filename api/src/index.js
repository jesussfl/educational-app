const { resolvers: sectionsResolvers } = require("./plugins/crefinex/server/modules/sections");
const { resolvers: lessonsBySectionResolvers } = require("./plugins/crefinex/server/modules/lessonsBySection");
module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi } */) {
    const extensionService = strapi.plugin("graphql").service("extension");
    const Query = `
    type Query {
      lessonsBySection(id:ID!, start:Int, limit:Int): LessonsBySection!
    }
    extend type Query {
      sections(start:Int, limit:Int): CrefinexSectionEntityResponseCollection!
    }
    type LessonsBySection {
      lessons: [CrefinexLessonEntity]
      pagination: Pagination
      section: CrefinexSection
    }
    `;
    extensionService.use(({ strapi }) => ({
      typeDefs: Query,
      resolvers: { Query: { ...lessonsBySectionResolvers, ...sectionsResolvers } },
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
