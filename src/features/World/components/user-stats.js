import { View, Text, StyleSheet, StatusBar } from "react-native";
import React from "react";
import { DollarCircle, Heart } from "iconsax-react-native";
import RemixIcon from "react-native-remix-icon";
import { Colors } from "@utils/Theme";
import { Constants } from "expo-constants";
import { Button } from "@components";
import { useAuthContext } from "@contexts/auth.context";
import { useLessonModal } from "@stores/lesson-modal";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "@stores/useAuthStore";
const UserStats = () => {
  const { user } = useAuthStore();
  const { addLessonType } = useLessonModal((state) => state);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginTop: StatusBar.currentHeight,
    height: 72,
    marginHorizontal: 24,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 3,
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
    borderRadius: 12,
  },
});
export default UserStats;
