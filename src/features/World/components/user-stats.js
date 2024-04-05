import { View, Text, StyleSheet, StatusBar, Image } from "react-native";
import React from "react";

import { Colors } from "@utils/Theme";
import { Button } from "@components";
import { useLessonStore } from "@stores/useLessonStore";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "@stores/useAuthStore";

const UserStats = () => {
  const { user } = useAuthStore();
  const { addLessonType } = useLessonStore((state) => state);
  const navigation = useNavigation();
  return (
    <View style={styles.navContainer}>
      <View style={styles.actionsContainer}>
        <Button
          variant={"secondary"}
          text={user?.lives || 0}
          size="small"
          onPress={() => {
            addLessonType("lives");
          }}
          leftIcon={<Image source={require("@assets/icons/live.png")} style={{ width: 24, height: 24, resizeMode: "contain" }} />}
        />
        <Button
          variant={"secondary"}
          text={Math.round(user?.money * 100) / 100 || 0}
          size="small"
          onPress={() => navigation.navigate("Store")}
          leftIcon={<Image source={require("@assets/icons/coin.png")} style={{ width: 24, height: 24, resizeMode: "contain" }} />}
        />
        <Button
          variant={"secondary"}
          text={user?.streak_days || 0}
          size="small"
          leftIcon={<Image source={require("@assets/icons/streak.png")} style={{ width: 24, height: 24, resizeMode: "contain" }} />}
        />
        <Button
          variant={"secondary"}
          text={user?.streak_shields || 0}
          size="small"
          leftIcon={<Image source={require("@assets/icons/shield.png")} style={{ width: 24, height: 24, resizeMode: "contain" }} />}
        />
      </View>
      <View style={styles.worldName}>
        <Text style={styles.worldTitle}>{`Mundo: ${user.current_world?.data?.attributes?.name}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 0,
    marginTop: StatusBar.currentHeight,
    borderRadius: 16,
  },
  worldTitle: {
    color: Colors.gray_500,
    fontFamily: "Sora-SemiBold",
    fontSize: 16,
    textAlign: "center",
  },
  worldName: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  actionsContainer: {
    paddingHorizontal: 8,
    paddingTop: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 0,
    justifyContent: "center",
    backgroundColor: Colors.gray_50,
    padding: 4,
  },
});
export default UserStats;
