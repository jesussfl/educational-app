import { StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { WithSplashScreen } from "./src/features/Splash/pages/Splash";
import { IntroductoryStackNavigator } from "./src/features/navigation/Introductory.navigator";
import * as WebBrowser from "expo-web-browser";
import useCustomFonts from "@utils/hooks/customFonts";
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
		<AuthProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<QueryClientProvider client={queryClient}>
					<WithSplashScreen isAppReady={isAppReady}>
						<NavigationContainer>
							<IntroductoryStackNavigator />
						</NavigationContainer>
					</WithSplashScreen>
				</QueryClientProvider>
			</GestureHandlerRootView>
		</AuthProvider>
	);
}

const styles = StyleSheet.create({});
