import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Platform } from "react-native";
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
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const ProfileScreen = () => {
  console.log("ProfileScreen");
  const { setUser, setAuthToken } = useAuthContext();
  const navigation = useNavigation();
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
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
  console.log(expoPushToken);
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
          <View style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}>
            <Text>Your expo push token: {expoPushToken}</Text>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text>Title: {notification && notification.request.content.title} </Text>
              <Text>Body: {notification && notification.request.content.body}</Text>
              <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
            </View>
            <Button
              text="Press to schedule a notification"
              variant="ghost"
              size="medium"
              onPress={async () => {
                await schedulePushNotification();
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    console.log(existingStatus, "existingStatus");
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();

      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

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
