import { StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { WithSplashScreen } from "@features/Splash/pages/Splash";
import { IntroductoryStackNavigator } from "./src/features/navigation/Introductory.navigator";
import * as WebBrowser from "expo-web-browser";
import useCustomFonts from "@hooks/customFonts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AuthProvider from "./src/features/Auth/utils/auth.provider";
const queryClient = new QueryClient();
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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <WithSplashScreen isAppReady={isAppReady}>
            <NavigationContainer>
              <IntroductoryStackNavigator />
            </NavigationContainer>
          </WithSplashScreen>
        </GestureHandlerRootView>
      </AuthProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({});
