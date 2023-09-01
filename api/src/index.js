const { resolvers: sectionsResolvers } = require("./plugins/crefinex/server/graphql/modules/sections");
const { resolvers: lessonsBySectionResolvers } = require("./plugins/crefinex/server/graphql/modules/lessonsBySection");
const { resolvers: exerciseResolvers } = require("./plugins/crefinex/server/graphql/modules/exercise.module");
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
    extend type Query {
      exercisesByLesson(id:ID!, start:Int, limit:Int): ExercisesByLesson!
    }
    extend type Query {
      sectionsByWorld(id:ID!, start:Int, limit:Int): SectionsByWorld!
    }
    type LessonsBySection {
      lessons: [CrefinexLessonEntity]
      pagination: Pagination
      section: CrefinexSection
    }
    type ExercisesByLesson {
      exercises: [CrefinexExerciseEntity]
      pagination: Pagination
      lesson: CrefinexLesson
    }
    type SectionsByWorld {
      sections: [CrefinexSectionEntity]
      pagination: Pagination
      world: CrefinexWorld
    }
    `;
    extensionService.use(({ strapi }) => ({
      typeDefs: Query,
      resolvers: { Query: { ...lessonsBySectionResolvers, ...sectionsResolvers, ...exerciseResolvers } },
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
