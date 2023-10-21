import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Button, TextField } from "@components";
import { removeToken } from "@utils/helpers/auth.helpers";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import Icon from "react-native-remix-icon";
import { UserCirlceAdd } from "iconsax-react-native";
import { Colors } from "@utils/Theme";
import { emailValidations } from "../../Auth/utils/inputValidations";
import { useAuthContext } from "../../../contexts/auth.context";
import { queryLessonsCompletedByUser } from "@utils/graphql/queries/lessonsCompleted.queries";

import { useQuery } from "@tanstack/react-query";
import { query } from "@utils/graphql/client/GraphQLCLient";
const colors = [Colors.primary_500, "#12B76A", "#9A4CFF", "#F1733D"];
const ProfileScreen = () => {
  const { user } = useAuthContext();
  const navigation = useNavigation();
  const { data, isLoading, error } = useQuery([`lessons_completed`, user.id], () =>
    query(queryLessonsCompletedByUser, {
      id: user.id,
      start: 1,
      limit: 100,
    })
  );
  const handleLogout = () => {
    removeToken();
    navigation.replace("Auth", { screen: "Login" });
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  const lessonsCompleted = data?.lessonsCompletedByUser.lessonsCompleted;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarInitial}>{user.username.slice(0, 1)}</Text>
        </View>
        <Text style={styles.usernameText}>{user.username}</Text>
      </View>
      <View style={{ flex: 1, width: "100%", gap: 12, marginVertical: 24 }}>
        <View style={{ flexDirection: "row", flex: 1, gap: 12 }}>
          <View style={styles.statContainer}>
            <Text style={{ fontSize: 18, fontFamily: "Sora-SemiBold" }}>Lecciones completadas</Text>
            <Text style={{ fontSize: 18, fontFamily: "Sora-SemiBold" }}>{lessonsCompleted?.length}</Text>
          </View>
          <View style={styles.statContainer}></View>
        </View>
        <View style={{ flexDirection: "row", flex: 1, gap: 12 }}>
          <View style={styles.statContainer}></View>
          <View style={styles.statContainer}></View>
        </View>
        <View
          style={{
            flexDirection: "column",
            flex: 1,
            gap: 12,
            backgroundColor: "#fff",
            padding: 12,
            borderRadius: 12,
            borderColor: Colors.gray_50,
            borderWidth: 2,
            marginTop: 12,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              gap: 12,
              padding: 12,
            }}
          >
            <UserCirlceAdd size={56} color={Colors.primary_500} variant="Bold" />
            <View style={{ flex: 1, gap: 4 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Sora-SemiBold",
                  color: Colors.primary_600,
                }}
              >
                Una semana de Finex Pro
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Sora-Regular",
                  flex: 1,
                  color: Colors.gray_400,
                  lineHeight: 22,
                }}
              >
                Comparte la app con tus amigos y obbten hasta 7 dias gratis de Finex Pro por cada registro
              </Text>
            </View>
          </View>
          <Button text="Invitar amigos" variant="secondary" size="medium" />
        </View>
      </View>
      <Button
        text="Cerrar sesión"
        onPress={handleLogout}
        variant="primary"
        size="medium"
        style={{ alignSelf: "flex-start", marginTop: 24, marginBottom: 76 }}
      />
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  avatarContainer: {
    flex: 1,
    gap: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: "center",
    marginTop: 24,
    backgroundColor: "#9A4CFF",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitial: {
    fontSize: 24,
    fontFamily: "Sora-Bold",
    textTransform: "uppercase",
    color: "#fff",
  },
  usernameText: {
    fontSize: 24,
    fontFamily: "Sora-SemiBold",
    textTransform: "capitalize",
    alignSelf: "center",
    color: Colors.gray_600,
  },
  statContainer: {
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.gray_50,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    height: 164,
    alignItems: "center",
    justifyContent: "center",
  },
});
