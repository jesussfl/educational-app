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
import { useWorldData } from "../hooks/useWorldData";

const LevelsScreen = () => {
  const { setUser, user } = useAuthContext();
  const { mutate } = useCustomMutation("user", updateUserMutation);
  const navigation = useNavigation();

  const { isLoading, worlds, completedWorlds } = useWorldData();
  if (isLoading) {
    return <Spinner visible={isLoading} />;
  }

  const completedWorldsIds = completedWorlds.length > 0 && completedWorlds.map((world) => world.attributes.world.data.id);
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
    const worldsData = worlds.slice(0, index);
    return worldsData.every((world) => completedWorldsIds.length > 0 && completedWorldsIds.includes(world.id));
  };

  return (
    <ScrollView style={{ padding: 24, gap: 24 }}>
      {worlds.map((world, index) => {
        const isWorldCompleted = completedWorldsIds.length > 0 && completedWorldsIds.includes(world.id);
        const isPrevWorldCompleted = checkLastWorldCompleted(index);
        console.log(world.attributes.image);
        return (
          <Card
            key={world.id}
            name={world.attributes.name}
            description={world.attributes.description}
            imgSource={`${process.env.EXPO_PUBLIC_API_URL}${world.attributes.image?.data?.attributes?.url}`}
            mainAction={() => updateCurrentWorld(world.id)}
            isCompleted={isWorldCompleted}
            isLocked={isPrevWorldCompleted ? false : !isWorldCompleted}
            worldsCompleted={completedWorlds.length}
          />
        );
      })}
    </ScrollView>
  );
};

export default LevelsScreen;

const styles = StyleSheet.create({});
