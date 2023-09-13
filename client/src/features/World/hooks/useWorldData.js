import { useEffect } from "react";
import { query } from "@utils/graphql/client/GraphQLCLient";
import { useQueries } from "@tanstack/react-query";
import { querySectionsByWorldId } from "@utils/graphql/queries/section.queries";
import { queryLessonsCompletedByUser } from "@utils/graphql/queries/lessonsCompleted.queries";
import { useAuthContext } from "../../Auth/contexts/auth.context";
import { useNavigation } from "@react-navigation/native";
const useWorldData = () => {
	const navigation = useNavigation();
	const { user } = useAuthContext();
	const results = useQueries({
		queries: [
			{
				queryKey: ["sections", user.currentWorld],
				queryFn: () => query(querySectionsByWorldId, { id: user.currentWorld, start: 1, limit: 10 }),
			},
			{
				queryKey: ["lessons_completed"],
				queryFn: () => query(queryLessonsCompletedByUser, { id: user.id, start: 1, limit: 10 }),
			},
		],
	});

	const isLoading = results.some((result) => result.isLoading);
	const data = results.reduce((acc, result) => {
		return {
			...acc,
			...result.data,
		};
	});
	const worldData = data.data;
	const lessonsCompleted = data?.lessonsCompletedByUser?.lessonsCompleted;
	const worldName = isLoading ? "Cargando..." : worldData.sectionsByWorld.world.name;

	useEffect(() => {
		navigation.setOptions({
			title: worldName,
		});
	}, [worldName]);
	return { isLoading, worldData, lessonsCompleted };
};

export default useWorldData;
