import { StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { WithSplashScreen } from "./src/screens/Splash";
import { IntroductoryStackNavigator } from "./src/screens/navigators/IntroductoryStackNavigator";
import * as WebBrowser from "expo-web-browser";
import useCustomFonts from "./src/utilities/hooks/customFonts";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
   const [isAppReady, setIsAppReady] = useState(false);
   const isFontsLoaded = useCustomFonts();

   useEffect(() => {
      setIsAppReady(isFontsLoaded);
   }, [isFontsLoaded]);

   if (!isAppReady) {
      return null;
   }
   return (
      <WithSplashScreen isAppReady={isAppReady}>
         <NavigationContainer>
            <IntroductoryStackNavigator />
         </NavigationContainer>
      </WithSplashScreen>
   );
}

const styles = StyleSheet.create({});
