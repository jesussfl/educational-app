import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Button, TextField } from "@components";
import { removeToken } from "@utils/helpers/auth.helpers";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import Icon from "react-native-remix-icon";
import { UserCirlceAdd } from "iconsax-react-native";
import { Colors } from "@utils/Theme";
import { emailValidations } from "../../Auth/utils/inputValidations";
import { useAuthContext } from "@contexts/auth.context";
import { queryLessonsCompletedByUser } from "@utils/graphql/queries/lessonsCompleted.queries";
import { useQuery } from "@tanstack/react-query";
import { query } from "@utils/graphql/client/GraphQLCLient";
const colors = [Colors.primary_500, "#12B76A", "#9A4CFF", "#F1733D"];
const ProfileScreen = () => {
  const { user, setUser } = useAuthContext();
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
    setUser(undefined);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Auth" }],
      })
    );
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  const lessonsCompleted = data?.lessonsCompletedByUser.lessonsCompleted;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatarContainer}>
        <View
          style={{
            backgroundColor: "#fff",
            padding: 4,
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 4,
            borderColor: Colors.gray_50,
          }}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarInitial}>{user.username.slice(0, 1)}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.nameText}>{user.username}</Text>
          <Text style={styles.usernameText}>{user.email}</Text>
        </View>
      </View>
      <View style={{ flex: 1, width: "100%", gap: 12, marginVertical: 24 }}>
        <View style={{ flexDirection: "row", flex: 1, gap: 12 }}>
          <View style={[styles.statContainer, { backgroundColor: "#9A4CFF" }]}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontFamily: "Sora-SemiBold", color: "#fff" }}>Lecciones completadas</Text>
              <Text style={{ fontSize: 14, fontFamily: "Sora-Regular", color: "#fff" }}>A mas lecciones mejores recompenzas</Text>
            </View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                  backgroundColor: "#fff",
                  borderRadius: 100,
                  width: 72,
                  height: 72,
                }}
              >
                <Text style={{ fontSize: 28, fontFamily: "Sora-SemiBold", color: "#9A4CFF" }}>{lessonsCompleted?.length}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", flex: 1, gap: 12 }}>
          <View style={[styles.statContainer, { backgroundColor: "#F1733D", flexDirection: "column-reverse", gap: 12 }]}>
            <View style={{ flex: 1, alignSelf: "stretch" }}>
              <Text style={{ fontSize: 18, fontFamily: "Sora-SemiBold", color: "#fff" }}>Mayor racha de dias</Text>
              <Text style={{ fontSize: 14, fontFamily: "Sora-Regular", color: "#fff" }}>Manten tus rachas</Text>
            </View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                  backgroundColor: "#fff",
                  borderRadius: 100,
                  width: 72,
                  height: 72,
                }}
              >
                <Text style={{ fontSize: 28, fontFamily: "Sora-SemiBold", color: "#F1733D" }}>{lessonsCompleted?.length}</Text>
              </View>
            </View>
          </View>
          <View style={[styles.statContainer, { backgroundColor: "#12B76A", flexDirection: "column-reverse", gap: 12 }]}>
            <View style={{ flex: 1, alignSelf: "stretch" }}>
              <Text style={{ fontSize: 18, fontFamily: "Sora-SemiBold", color: "#fff" }}>Tu racha actual</Text>
              <Text style={{ fontSize: 14, fontFamily: "Sora-Regular", color: "#fff" }}>Manten tus rachas</Text>
            </View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                  backgroundColor: "#fff",
                  borderRadius: 100,
                  width: 72,
                  height: 72,
                }}
              >
                <Text style={{ fontSize: 28, fontFamily: "Sora-SemiBold", color: "#12B76A" }}>{lessonsCompleted?.length}</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            flex: 1,
            gap: 12,
            backgroundColor: "#fff",
            padding: 12,
            borderRadius: 24,
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
    gap: 12,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 24,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 100,
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
});
