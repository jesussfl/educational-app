import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LogginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import * as WebBrowser from "expo-web-browser";
import { useFonts } from "expo-font";

WebBrowser.maybeCompleteAuthSession();
const Stack = createNativeStackNavigator();

export default function App() {
   const [fontsLoaded, error] = useFonts({
      "Sora-Bold": require("./assets/fonts/Sora-Bold.ttf"),
      // "Sora-Regular": require("./assets/fonts/Sora-Regular.ttf"),
      // "Sora-Medium": require("./assets/fonts/Sora-Medium.ttf"),
      // "Sora-Light": require("./assets/fonts/Sora-Light.ttf"),
      // "Sora-SemiBold": require("./assets/fonts/Sora-SemiBold.ttf"),
      // "Sora-ExtraLight": require("./assets/fonts/Sora-ExtraLight.ttf"),
      // "Sora-ExtraBold": require("./assets/fonts/Sora-ExtraBold.ttf"),
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
            <Stack.Navigator>
               <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
               <Stack.Screen name="Home" component={HomeScreen} />
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
