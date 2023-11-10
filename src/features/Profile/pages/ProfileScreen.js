import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Button } from "@components";
import { removeToken } from "@utils/helpers/auth.helpers";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { Logout, Notification } from "iconsax-react-native";
import { Colors } from "@utils/Theme";
import { useAuthContext } from "@contexts/auth.context";
import Avatar from "../components/Avatar";
import Stats from "../components/Stats";
import CardReferrals from "../components/CardReferrals";
import CardStreak from "../components/CardStreak";
const colors = [Colors.primary_500, "#12B76A", "#9A4CFF", "#F1733D"];
const ProfileScreen = () => {
  const { setUser, setAuthToken } = useAuthContext();
  const navigation = useNavigation();

  const handleLogout = async () => {
    await removeToken();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Auth" }],
      })
    );
    setUser(undefined);
    setAuthToken(undefined);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ gap: 32 }}>
        <Avatar />
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 24 }}>
          <Text style={{ fontSize: 18, fontFamily: "Sora-SemiBold", color: "#9A4CFF" }}>Plan Premium</Text>
          <Text style={{ fontSize: 16, fontFamily: "Sora-SemiBold" }}>Vencimiento: </Text>
        </View>
        <Stats />
        <CardStreak />
        <CardReferrals />
        <View style={styles.options}>
          <Button text="Configurar Notificaciones" variant="ghost" size="medium" leftIcon={<Notification size={24} variant="Bold" color={Colors.gray_300} />} />
          <Button
            text="Cerrar sesión"
            onPress={handleLogout}
            variant="ghost"
            size="medium"
            leftIcon={<Logout size={24} variant="Bold" color={Colors.gray_300} />}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    paddingTop: 64,
  },

  nameText: {
    fontSize: 24,
    fontFamily: "Sora-SemiBold",
    textTransform: "capitalize",
    color: "#9A4CFF",
  },
  usernameText: {
    fontSize: 14,
    fontFamily: "Sora-Regular",
    textTransform: "capitalize",
    color: Colors.gray_500,
  },
  statContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 28,
    padding: 24,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  options: {
    marginTop: 24,
    marginBottom: 174,
    gap: 16,
  },
});
