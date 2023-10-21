import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Heart, DollarCircle, Flash } from "iconsax-react-native";
import { Colors } from "@utils/Theme";
import { useAuthContext } from "../../../contexts/auth.context";

const UserStats = ({ statusToShow }) => {
  const { user } = useAuthContext();

  // Define the icons and colors based on the statusToShow prop
  let icons, colors, values;

  if (!statusToShow || statusToShow === "all") {
    // Display both statistics
    icons = [
      <Heart key="heart" size={24} variant="Bold" color={Colors.error_400} />,
      <DollarCircle key="dollar" size={24} variant="Bold" color={Colors.success_500} />,
    ];

    colors = [Colors.error_400, Colors.success_500];
    values = [user.lives || 0, user.money || 0];
  } else if (statusToShow === "lives") {
    // Display lives only
    icons = [<Heart key="heart" size={24} variant="Bold" color={Colors.error_400} />];
    colors = [Colors.error_400];
    values = [user.lives || 0];
  } else if (statusToShow === "money") {
    // Display money only
    icons = [<DollarCircle key="dollar" size={24} variant="Bold" color={Colors.success_500} />];
    colors = [Colors.success_500];
    values = [user.money || 0];
  } else {
    // Display default icon and color for an unknown statusToShow value
    icons = [<Flash key="flash" size={24} variant="Bold" color={Colors.primary} />];
    colors = [Colors.primary];
    values = [0];
  }

  return (
    <View style={styles.statusContainer}>
      {icons.map((icon, index) => (
        <View style={styles.status} key={index}>
          {icon}
          <Text style={[styles.statusText, { color: colors[index] }]}>{values[index]}</Text>
        </View>
      ))}
    </View>
  );
};

export default UserStats;

const styles = StyleSheet.create({
  statusContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 16,
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderColor: Colors.gray_200,
    borderWidth: 2,
    padding: 6,
    borderRadius: 12,
  },
  statusText: {
    color: Colors.gray_400,
    fontSize: 16,
    fontFamily: "Sora-SemiBold",
  },
});
