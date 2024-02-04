import { useAuthContext } from "@contexts/auth.context";
import { useQueries } from "@tanstack/react-query";
import { query } from "@utils/graphql";
import { queryLessonsCompletedByUser } from "@utils/graphql/queries/lessonsCompleted.queries";
import { querySectionsByWorldId } from "@utils/graphql/queries/section.queries";
import { querySectionsCompletedByUser } from "@utils/graphql/queries/sectionsCompleted.queries";
import { queryWorlds } from "@utils/graphql/queries/world.queries";
import { queryWorldsCompletedByUser } from "@utils/graphql/queries/worldsCompleted.queries";

export const useWorldData = () => {
  const { user, refreshUserData } = useAuthContext();
  const results = useQueries({
    queries: [
      {
        queryKey: ["sections", user.currentWorld],
        queryFn: () =>
          query(querySectionsByWorldId, {
            id: user.currentWorld,
            start: 1,
            limit: 100,
          }),
      },
      {
        queryKey: ["lessons_completed"],
        queryFn: () =>
          query(queryLessonsCompletedByUser, {
            id: user.id,
            start: 1,
            limit: 1000,
          }),
      },
      {
        queryKey: ["sections_completed"],
        queryFn: () =>
          query(querySectionsCompletedByUser, {
            id: user.id,
            start: 1,
            limit: 100,
          }),
      },
      // Worlds completed
      {
        queryKey: ["worlds_completed"],
        queryFn: () =>
          query(queryWorldsCompletedByUser, {
            id: user.id,
            start: 1,
            limit: 100,
          }),
      },
      {
        queryKey: ["worlds"],
        queryFn: () => query(queryWorlds, { start: 1, limit: 10 }),
      },
    ],
  });

  const isLoading = results.some((result) => result.isLoading);
  const error = results.some((result) => result.error);
  const sections = results[0].data?.sectionsByWorld.sections;
  const world = results[0].data?.sectionsByWorld.world;
  const completedLessons = results[1].data?.lessonsCompletedByUser?.lessonsCompleted;
  const completedSections = results[2].data?.sectionsCompletedByUser?.sectionsCompleted;
  const completedWorlds = results[3].data?.worldsCompletedByUser?.worldsCompleted;
  const worlds = results[4].data?.crefinexWorlds.data;

  return { isLoading, error, sections, world, completedLessons, completedSections, completedWorlds, worlds };
};
