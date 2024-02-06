import { View, Text, StyleSheet, StatusBar } from "react-native";
import React from "react";
import { DollarCircle, Heart } from "iconsax-react-native";
import RemixIcon from "react-native-remix-icon";
import { Colors } from "@utils/Theme";
import { Button } from "@components";
import { useLessonModal } from "@stores/lesson-modal";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "@stores/useAuthStore";
import { useSections } from "../hooks/useSections";

const UserStats = () => {
  const { user } = useAuthStore();
  const { addLessonType } = useLessonModal((state) => state);
  const { currentWorld } = useSections();
  console.log(currentWorld);
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
            console.log("lives");
          }}
          leftIcon={<Heart size={24} variant="Bold" color={Colors.error_400} />}
        />
        <Button
          variant={"secondary"}
          text={user?.money || 0}
          size="small"
          onPress={() => navigation.navigate("Store")}
          leftIcon={<DollarCircle size={24} variant="Bold" color={Colors.success_500} />}
        />
        <Button variant={"secondary"} text={user?.streak_days || 0} size="small" leftIcon={<RemixIcon name="fire-fill" size={24} color={"#E17512"} />} />
      </View>
      <View style={styles.worldName}>
        <Text style={styles.worldTitle}>{currentWorld?.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 24,
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
    paddingHorizontal: 16,
    paddingTop: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    justifyContent: "center",
    backgroundColor: Colors.gray_50,
    padding: 8,
  },
});
export default UserStats;
