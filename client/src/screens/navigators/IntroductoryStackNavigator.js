import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SemanticColors } from "../../utilities/Theme";
import { BottomTabScreens } from "./BottomTab";

import * as Screens from "../index";

const Stack = createNativeStackNavigator();

const commonScreenOptions = {
   gestureEnabled: false,
   animationTypeForReplace: "pop",
   animation: "slide_from_right",
};
const routes = [
   { name: "Walkthrough1", component: Screens.Walkthrough1, headerShown: false },
   { name: "Walkthrough2", component: Screens.Walkthrough2, headerShown: false },
   { name: "Walkthrough3", component: Screens.Walkthrough3, headerShown: false },
   { name: "Welcome", component: Screens.WelcomeScreen, headerShown: false },
   { name: "Login", component: Screens.LoginScreen, headerShown: true, headerTitle: "" },
   { name: "Signup", component: Screens.SignupScreen, headerShown: true, headerTitle: "" },
   { name: "RecoverPasswordStep1", component: Screens.RecoverPasswordStep1, headerShown: true, headerTitle: "" },
   { name: "RecoverPasswordStep2", component: Screens.RecoverPasswordStep2, headerShown: true, headerTitle: "" },
   { name: "RecoverPasswordStep3", component: Screens.RecoverPasswordStep3, headerShown: true, headerTitle: "" },
   { name: "Main", component: BottomTabScreens, headerShown: false, headerTitle: "" },
];
export const IntroductoryStackNavigator = () => {
   return (
      <Stack.Navigator
         screenOptions={({ route }) => ({
            headerShadowVisible: false,
            headerStyle: { backgroundColor: SemanticColors.app.bg_normal },
            headerShown: route.params?.headerShown ?? commonScreenOptions.headerShown,
            headerTitle: route.params?.headerTitle ?? commonScreenOptions.headerTitle,
            ...commonScreenOptions,
         })}>
         {routes.map(({ name, component, headerShown, headerTitle }) => (
            <Stack.Screen key={name} name={name} component={component} initialParams={{ headerShown, headerTitle }} />
         ))}
      </Stack.Navigator>
   );
};
