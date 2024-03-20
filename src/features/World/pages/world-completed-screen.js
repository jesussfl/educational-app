import { StyleSheet, Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Button } from "@components";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "@utils/Theme";

import { useMutation } from "@tanstack/react-query";
import { query } from "@utils/graphql";
import { updateUserMutation } from "@utils/graphql/mutations/user.mutation";
import useAuthStore from "@stores/useAuthStore";
import { useWorldData } from "../hooks/useWorldData";
import Spinner from "react-native-loading-spinner-overlay";

const WorldCompletedScreen = () => {
  const navigation = useNavigation();

  const { updateUser, user } = useAuthStore();
  const { isLoading, worlds } = useWorldData();

  const { mutate } = useMutation((data) => query(updateUserMutation, data));

  if (isLoading) {
    return <Spinner visible={isLoading} />;
  }

  const getNextWorld = () => {
    const worldsByOrder = worlds.sort((a, b) => a.attributes.order - b.attributes.order);
    const currentWorldIndex = worldsByOrder.findIndex((world) => Number(world.id) === user.currentWorld);

    const nextWorld = worldsByOrder[currentWorldIndex === worldsByOrder.length - 1 ? currentWorldIndex : currentWorldIndex + 1];
    return nextWorld;
  };

  return (
    <>
      <StatusBar style="dark" translucent={true} />
      <View style={styles.pageContainer}>
        <View style={styles.textsContainer}>
          <View style={{ alignItems: "center", padding: 24, borderWidth: 4, borderColor: Colors.primary_500, borderRadius: 9999 }}>
            <Image
              style={{ width: 156, height: 156, resizeMode: "contain" }}
              src={`${process.env.EXPO_PUBLIC_API_URL}${getNextWorld().attributes.image?.data?.attributes?.url}`}
            />
          </View>
          <Text style={styles.congratsText}>¡Felicidades!</Text>
          <Text style={[styles.congratsText, { fontSize: 18, fontFamily: "Sora-Medium" }]}>¡Has avanzado al siguiente mundo!</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            text="Continuar"
            variant="primary"
            style={{ flex: 1 }}
            onPress={() => {
              console.log("next world", getNextWorld());
              mutate(
                { id: user.id, data: { current_world: getNextWorld().id } },
                {
                  onSuccess: (data) =>
                    updateUser((prev) => ({ ...prev, current_world: { data: { id: getNextWorld().id, attributes: getNextWorld().attributes } } })),
                }
              );
              console.log(user.current_world.data.attributes);
              navigation.replace("Main", { screen: "Lessons" });
            }}
          />
        </View>
      </View>
    </>
  );
};

export default WorldCompletedScreen;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  resultContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 16,
    borderColor: Colors.gray_100,
    borderWidth: 3,
    borderBottomWidth: 8,
    padding: 24,
  },
  textsContainer: {
    flex: 1,

    padding: 24,
    gap: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  congratsText: {
    fontFamily: "Sora-Bold",
    color: Colors.gray_600,
    fontSize: 32,

    textAlign: "center",
  },
  buttonContainer: {
    gap: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 24,
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: -600,
    transform: [{ rotate: "180deg" }],
    opacity: 0.8,
    zIndex: -1,
  },
});
