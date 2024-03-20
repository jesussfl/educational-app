import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import { WorldCard } from "@components";

import { updateUserMutation } from "@utils/graphql/mutations/user.mutation";
import { useNavigation } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import { useWorldData } from "../hooks/useWorldData";
import useAuthStore from "@stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { query } from "@utils/graphql";

const LevelsScreen = () => {
  const { updateUser, user } = useAuthStore();
  const { mutate } = useMutation((data) => query(updateUserMutation, data));
  const navigation = useNavigation();

  const { isLoading, worlds, completedWorlds, completedLessons } = useWorldData();
  if (isLoading) {
    return <Spinner visible={isLoading} />;
  }

  const completedWorldsIds = completedWorlds.length > 0 && completedWorlds.map((world) => world.attributes.world.data.id);
  const updateCurrentWorld = (worldId) => {
    mutate(
      {
        id: user.id,
        data: {
          current_world: worldId,
        },
      },
      {
        onSuccess: (data) => {
          updateUser({
            current_world: { data: { id: worldId, attributes: data.updateUsersPermissionsUser.data.attributes.current_world.data.attributes } },
          });
          navigation.navigate("Main", { screen: "Lessons" });
        },
      }
    );
  };

  const checkIfPrevWorldIsCompleted = (index) => {
    if (index === 0) {
      return true;
    }
    const worldsData = worlds.slice(0, index);
    return worldsData.every((world) => completedWorldsIds.length > 0 && completedWorldsIds.includes(world.id));
  };

  return (
    <ScrollView style={{ padding: 24, gap: 24 }}>
      {isLoading ? (
        <Spinner visible={isLoading} />
      ) : (
        <View style={{ marginBottom: 56 }}>
          {worlds.map((world, index) => {
            const isWorldCurrent = user.current_world.data.id === world.id;
            const isWorldCompleted = completedWorldsIds.length > 0 && completedWorldsIds.includes(world.id);
            const isPrevWorldCompleted = checkIfPrevWorldIsCompleted(index);
            const lessonsCompletedByWorldId = completedLessons.filter(
              (lesson) => lesson.attributes.lesson.data.attributes.section.data.attributes.world.data.id === world.id
            );
            return (
              <WorldCard
                key={world.id}
                name={world.attributes.name}
                description={world.attributes.description}
                imgSource={`${process.env.EXPO_PUBLIC_API_URL}${world.attributes.image?.data?.attributes?.url}`}
                mainAction={() => {
                  if (!isWorldCurrent) {
                    updateCurrentWorld(world.id);
                    // updateUser({ current_world: { data: { id: world.id } } });
                    return;
                  }

                  navigation.navigate("Main", { screen: "Lessons" });
                }}
                isCompleted={isWorldCompleted}
                isLocked={!isPrevWorldCompleted}
                isCurrent={user.currentWorld === world.id}
                worldsCompleted={lessonsCompletedByWorldId.length}
              />
            );
          })}
        </View>
      )}
    </ScrollView>
  );
};

export default LevelsScreen;

const styles = StyleSheet.create({});
