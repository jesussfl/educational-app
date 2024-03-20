import useAuthStore from "@stores/useAuthStore";
import { useQueries } from "@tanstack/react-query";
import { query } from "@utils/graphql";
import { queryLessonsCompletedByUser } from "@utils/graphql/queries/lessonsCompleted.queries";
import { queryWorlds } from "@utils/graphql/queries/world.queries";
import { queryWorldsCompletedByUser } from "@utils/graphql/queries/worldsCompleted.queries";

export const useWorldData = () => {
  const { user } = useAuthStore();
  const results = useQueries({
    queries: [
      {
        queryKey: ["lessons_completed"],
        queryFn: () =>
          query(queryLessonsCompletedByUser, {
            id: user.id,
            start: 1,
            limit: 1000,
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
  const completedLessons = results[0].data?.lessonsCompletedByUser?.lessonsCompleted;
  const completedWorlds = results[1].data?.worldsCompletedByUser?.worldsCompleted;
  const worlds = results[2].data?.crefinexWorlds.data.sort((a, b) => a.attributes.order - b.attributes.order);
  return { isLoading, error, completedLessons, completedWorlds, worlds };
};
