import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

import { SemanticColors } from "./src/utilities/Theme";
import { WithSplashScreen } from "./src/screens/Splash";
import * as WebBrowser from "expo-web-browser";
import * as Screens from "./src/screens/index";

WebBrowser.maybeCompleteAuthSession();
const Stack = createNativeStackNavigator();

const commonScreenOptions = {
   gestureEnabled: true,
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
];

export default function App() {
   const [isAppReady, setIsAppReady] = useState(false);
   const [fontsLoaded, error] = useFonts({
      "Sora-Bold": require("./assets/fonts/Sora-Bold.ttf"),
      "Sora-Regular": require("./assets/fonts/Sora-Regular.ttf"),
      "Sora-Medium": require("./assets/fonts/Sora-Medium.ttf"),
      "Sora-Light": require("./assets/fonts/Sora-Light.ttf"),
      "Sora-SemiBold": require("./assets/fonts/Sora-SemiBold.ttf"),
      "Sora-ExtraLight": require("./assets/fonts/Sora-ExtraLight.ttf"),
      "Sora-ExtraBold": require("./assets/fonts/Sora-ExtraBold.ttf"),
   });

   useEffect(() => {
      setIsAppReady(true);
   }, [fontsLoaded]);

   if (!fontsLoaded) {
      return null;
   }

   if (error) {
      console.error("Error loading fonts:", error);
   }

   return (
      <WithSplashScreen isAppReady={isAppReady}>
         <NavigationContainer>
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
         </NavigationContainer>
      </WithSplashScreen>
   );
}

const styles = StyleSheet.create({});
