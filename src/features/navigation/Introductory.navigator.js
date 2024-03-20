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
    const checkUserSession = async () => {
      //TODO: check if token is expired and refresh it, if admin add money to user, session should be expired and database requests cant be after every app launch
      if (token) {
        try {
          const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/users/me?populate=*`, {
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

    checkUserSession();
  }, []);

  return (
    <Stack.Navigator screenOptions={commonScreenOptions}>
      {isNewUser && <Stack.Screen name="Walkthrough" component={WalkthroughStackNavigator} />}
      {token && <Stack.Screen name="Main" component={BottomNavStackNavigator} />}
      <Stack.Screen name="Auth" component={AuthStackNavigator} />
    </Stack.Navigator>
  );
};
