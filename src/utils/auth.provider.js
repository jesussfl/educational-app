import React, { useState, useEffect, useRef } from "react";
import { AuthContext } from "@contexts/auth.context";
import { getToken } from "@utils/helpers/auth.helpers";
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

/**
 * AuthProvider component provides authentication-related data and functions to its children.
 * It manages user data, loading state, and authentication token.
 *
 */
const AuthProvider = ({ children }) => {
  console.log("AuthProvider");
  // State to store user data
  const [userData, setUserData] = useState();
  // State to track loading state
  const [isLoading, setIsLoading] = useState(false);
  // State to store authentication token
  const [authToken, setAuthToken] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // Load the authentication token when the component mounts
    const loadToken = async () => {
      setIsLoading(true);
      const authToken = await getToken();
      if (authToken) {
        setAuthToken(authToken);
        await fetchLoggedInUser(authToken);
      }
      setIsLoading(false);
    };

    if (authToken === undefined) {
      loadToken();
    }
  }, []);
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {});

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const fetchLoggedInUser = async (token) => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error While Getting Logged In User Details", error);

      setError(error);
    }
  };

  /**
   * Refreshes the user data using the current authentication token.
   */
  const refreshUserData = async () => {
    await fetchLoggedInUser(authToken);
  };

  return (
    <AuthContext.Provider
      value={{
        user: userData,
        setUser: setUserData,
        isLoading,
        refreshUserData,
        authToken,
        setAuthToken,
        error,
        setError,
        expoPushToken,
        setExpoPushToken,
      }}
    >
      {isLoading ? null : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

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
