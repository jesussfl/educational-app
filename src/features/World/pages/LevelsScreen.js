import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import { Card } from "@components";
import { useQuery } from "@tanstack/react-query";
import { query } from "@utils/graphql/client/GraphQLCLient";
import { queryWorlds } from "@utils/graphql/queries/world.queries";
import { useAuthContext } from "@contexts/auth.context";
import { useCustomMutation } from "@utils/useCustomMutation";
import { updateUserMutation } from "@utils/graphql/mutations/user.mutation";
import { useNavigation } from "@react-navigation/native";
import useWorldData from "../hooks/useWorldData";
const LevelsScreen = () => {
  const { worldsCompleted, worldData } = useWorldData();
  const navigation = useNavigation();
  const { data, isLoading, error } = useQuery(["worlds"], () => query(queryWorlds, { start: 1, limit: 10 }));

  const { setUser, user } = useAuthContext();
  const { mutate } = useCustomMutation("user", updateUserMutation);
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
  let firstUnlockedWorldIndex = -1;
  return (
    <ScrollView style={{ padding: 24, gap: 24 }}>
      {isLoading ? (
        <Text>Cargando...</Text>
      ) : (
        data.crefinexWorlds.data.map((world, index) => {
          const isWorldCompleted = worldsCompleted.some((completedWorld) => completedWorld.attributes.world.id === world.id);
          if (isWorldCompleted) {
            firstUnlockedWorldIndex = index;
          }
          const isWorldUnlocked = index === firstUnlockedWorldIndex + 1;
          const isWorldLocked = !isWorldCompleted && !isWorldUnlocked;

          if (index === firstUnlockedWorldIndex && isWorldLocked) {
            isWorldLocked = false;
          }
          return (
            <Card
              key={world.id}
              name={world.attributes.name}
              description={world.attributes.description}
              imgSource={`${process.env.EXPO_PUBLIC_API_URL}${world.attributes.image.data.attributes.formats.thumbnail.url}`}
              mainAction={() => updateCurrentWorld(world.id)}
              isCompleted={isWorldCompleted}
              isLocked={isWorldLocked}
              worldsCompleted={worldsCompleted.length}
            />
          );
        })
      )}
    </ScrollView>
  );
};

export default LevelsScreen;

const styles = StyleSheet.create({});
