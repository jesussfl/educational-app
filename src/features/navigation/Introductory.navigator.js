import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SemanticColors } from "@utils/Theme";
import { BottomNavStackNavigator } from "./BottomNav.navigator";

import WalkthroughStackNavigator from "../Walkthrough/navigation/WalkthroughStack.navigator";
import AuthStackNavigator from "../Auth/navigation/AuthStack.navigator";
const Stack = createNativeStackNavigator();

const commonScreenOptions = {
  gestureEnabled: false,
  animationTypeForReplace: "pop",
  animation: "slide_from_right",
  headerStyle: {
    backgroundColor: SemanticColors.app.bg_normal,
  },
  headerShadowVisible: false,
};

export const IntroductoryStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={commonScreenOptions}>
      <Stack.Screen name="Auth" component={AuthStackNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Walkthrough" component={WalkthroughStackNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Main" component={BottomNavStackNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
