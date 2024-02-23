import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SemanticColors } from "@utils/Theme";
import { BottomNavStackNavigator } from "./BottomNav.navigator";

import WalkthroughStackNavigator from "../Walkthrough/navigation/WalkthroughStack.navigator";
import AuthStackNavigator from "../Auth/navigation/AuthStack.navigator";
import useAuthStore from "@stores/useAuthStore";
const Stack = createNativeStackNavigator();

const commonScreenOptions = {
  gestureEnabled: false,
  animationTypeForReplace: "pop",
  animation: "fade",
  headerStyle: {
    backgroundColor: SemanticColors.app.bg_normal,
  },
  headerShown: false,

  headerShadowVisible: false,
};

export const IntroductoryStackNavigator = () => {
  const { isNewUser, setIsNewUser, setUser, token } = useAuthStore();

  useEffect(() => {
    const fetchToken = async () => {
      if (token) {
        try {
          const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          setUser(data);
          isNewUser && setIsNewUser(false);
        } catch (error) {
          console.error("Error While Getting Logged In User Details", error);
        }
      }
    };

    fetchToken();
  }, []);

  return (
    <Stack.Navigator screenOptions={commonScreenOptions}>
      {isNewUser && <Stack.Screen name="Walkthrough" component={WalkthroughStackNavigator} />}
      <Stack.Screen name="Main" component={BottomNavStackNavigator} />
      <Stack.Screen name="Auth" component={AuthStackNavigator} />
    </Stack.Navigator>
  );
};
