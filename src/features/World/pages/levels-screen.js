import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import { Card } from "@components";
import { useQueries } from "@tanstack/react-query";
import { query } from "@utils/graphql/client/GraphQLCLient";
import { queryWorlds } from "@utils/graphql/queries/world.queries";
import { queryWorldsCompletedByUser } from "@utils/graphql/queries/worldsCompleted.queries";
import { useAuthContext } from "@contexts/auth.context";
import { useCustomMutation } from "@utils/useCustomMutation";
import { updateUserMutation } from "@utils/graphql/mutations/user.mutation";
import { useNavigation } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";

const LevelsScreen = () => {
  const { setUser, user } = useAuthContext();
  const { mutate } = useCustomMutation("user", updateUserMutation);
  const navigation = useNavigation();
  const results = useQueries({
    queries: [
      {
        queryKey: ["worlds"],
        queryFn: () => query(queryWorlds, { start: 1, limit: 10 }),
      },
      {
        queryKey: ["worlds_completed"],
        queryFn: () =>
          query(queryWorldsCompletedByUser, {
            id: user.id,
            start: 1,
            limit: 10,
          }),
      },
    ],
  });

  const isLoading = results.some((result) => result.isLoading);

  if (isLoading) {
    return <Spinner visible={isLoading} />;
  }

  const { crefinexWorlds } = results[0].data;
  const { worldsCompleted } = results[1].data.worldsCompletedByUser;
  const worldsCompletedIds = worldsCompleted.length > 0 && worldsCompleted.map((world) => world.attributes.world.data.id);
  const updateCurrentWorld = (worldId) => {
    mutate(
      {
        id: user.id,
        data: {
          currentWorld: Number(worldId),
        },
      },
      {
        onSuccess: () => {
          navigation.navigate("Main", { screen: "Lessons" });
        },
      }
    );
    setUser((prev) => {
      return { ...prev, currentWorld: worldId };
    });
  };
  const checkLastWorldCompleted = (index) => {
    const worlds = crefinexWorlds.data.slice(0, index);
    return worlds.every((world) => worldsCompletedIds.length > 0 && worldsCompletedIds.includes(world.id));
  };
  return (
    <ScrollView style={{ padding: 24, gap: 24 }}>
      {crefinexWorlds.data.map((world, index) => {
        const isWorldCompleted = worldsCompletedIds.length > 0 && worldsCompletedIds.includes(world.id);
        const isPrevWorldCompleted = checkLastWorldCompleted(index);

        return (
          <Card
            key={world.id}
            name={world.attributes.name}
            description={world.attributes.description}
            imgSource={`${process.env.EXPO_PUBLIC_API_URL}${world.attributes.image.data.attributes.formats.thumbnail.url}`}
            mainAction={() => updateCurrentWorld(world.id)}
            isCompleted={isWorldCompleted}
            isLocked={isPrevWorldCompleted ? false : !isWorldCompleted}
            worldsCompleted={worldsCompleted.length}
          />
        );
      })}
    </ScrollView>
  );
};

export default LevelsScreen;

const styles = StyleSheet.create({});
