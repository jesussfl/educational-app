import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import { Card } from "@components";
import { useQuery } from "@tanstack/react-query";
import { query } from "@utils/graphql/client/GraphQLCLient";
import { queryWorlds } from "@utils/graphql/queries/world.queries";
import { useAuthContext } from "../../Auth/contexts/auth.context";
import { useCustomMutation } from "@utils/useCustomMutation";
import { updateUserMutation } from "@utils/graphql/mutations/user.mutation";
import { useNavigation } from "@react-navigation/native";
const LevelsScreen = () => {
  const navigation = useNavigation();
  const { data, isLoading, error } = useQuery(["worlds"], () =>
    query(queryWorlds, { start: 1, limit: 10 })
  );
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

  return (
    <ScrollView style={{ padding: 24, gap: 24 }}>
      {isLoading ? (
        <Text>Cargando...</Text>
      ) : (
        data.crefinexWorlds.data.map((world) => {
          console.log(
            `${process.env.EXPO_PUBLIC_API_URL}${world.attributes.image.data.attributes.formats.thumbnail.url}`
          );
          return (
            <Card
              key={world.id}
              name={world.attributes.name}
              description={world.attributes.description}
              imgSource={`${process.env.EXPO_PUBLIC_API_URL}${world.attributes.image.data.attributes.formats.thumbnail.url}`}
              mainAction={() => updateCurrentWorld(world.id)}
            />
          );
        })
      )}
    </ScrollView>
  );
};

export default LevelsScreen;

const styles = StyleSheet.create({});
