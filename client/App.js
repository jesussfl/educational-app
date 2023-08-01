import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/auth/LoginScreen";
import WelcomeScreen from "./src/screens/walkthrough/WelcomeScreen";
import Walkthrough1 from "./src/screens/walkthrough/Walkthrough1";
import Walkthrough2 from "./src/screens/walkthrough/Walkthrough2";
import Walkthrough3 from "./src/screens/walkthrough/Walkthrough3";
import SignupScreen from "./src/screens/auth/SignupScreen";
import * as WebBrowser from "expo-web-browser";
import { useFonts } from "expo-font";
import { SemanticColors } from "./src/utilities/Theme";

WebBrowser.maybeCompleteAuthSession();
const Stack = createNativeStackNavigator();

export default function App() {
   const [fontsLoaded, error] = useFonts({
      "Sora-Bold": require("./assets/fonts/Sora-Bold.ttf"),
      "Sora-Regular": require("./assets/fonts/Sora-Regular.ttf"),
      "Sora-Medium": require("./assets/fonts/Sora-Medium.ttf"),
      "Sora-Light": require("./assets/fonts/Sora-Light.ttf"),
      "Sora-SemiBold": require("./assets/fonts/Sora-SemiBold.ttf"),
      "Sora-ExtraLight": require("./assets/fonts/Sora-ExtraLight.ttf"),
      "Sora-ExtraBold": require("./assets/fonts/Sora-ExtraBold.ttf"),
   });

   if (!fontsLoaded) {
      return null;
   }
   if (error) {
      console.log(error);
   }
   if (fontsLoaded) {
      return (
         <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShadowVisible: false, headerStyle: { backgroundColor: SemanticColors.app.bg_normal } }}>
               <Stack.Screen
                  options={{ headerShown: false, gestureEnabled: true, animationTypeForReplace: "pop", animation: "slide_from_right" }}
                  name="Walkthrough1"
                  component={Walkthrough1}
               />
               <Stack.Screen
                  options={{ headerShown: false, gestureEnabled: true, animationTypeForReplace: "pop", animation: "slide_from_right" }}
                  name="Walkthrough2"
                  component={Walkthrough2}
               />
               <Stack.Screen
                  options={{ headerShown: false, gestureEnabled: true, animationTypeForReplace: "pop", animation: "slide_from_right" }}
                  name="Walkthrough3"
                  component={Walkthrough3}
               />
               <Stack.Screen options={{ headerShown: false }} name="Welcome" component={WelcomeScreen} />
               <Stack.Screen
                  options={{
                     headerTitle: "",
                     animationTypeForReplace: "pop",
                     animation: "slide_from_right",
                  }}
                  name="Login"
                  component={LoginScreen}
               />
               <Stack.Screen
                  options={{ headerTitle: "", animationTypeForReplace: "pop", animation: "slide_from_right" }}
                  name="Signup"
                  component={SignupScreen}
               />
            </Stack.Navigator>
         </NavigationContainer>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
   },
});
