// import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Weight, Signpost, Notification, UserOctagon } from "iconsax-react-native";

import { SemanticColors, Colors } from "@utils/Theme";
import * as Screens from "../index";
import { getFocusedRouteNameFromRoute, useNavigation } from "@react-navigation/native";
import WorldStackNavigator from "../World/navigation/WorldStack.navigator";
const BottomNavStack = createBottomTabNavigator();

export const BottomNavStackNavigator = () => {
	const navigation = useNavigation();
	return (
		<BottomNavStack.Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: { height: 72, elevation: 0, shadowOpacity: 0, borderTopColor: Colors.gray_50, borderTopWidth: 6 },
			}}>
			<BottomNavStack.Screen
				name='Lessons'
				component={WorldStackNavigator}
				listeners={() => ({
					tabPress: (e) => {
						console.log("hola");
						e.preventDefault();

						// navigation.navigate("Lessons", { screen: "World" });
					},
				})}
				options={({ route }) => ({
					tabBarIcon: ({ focused }) => <Home variant='Bold' size={28} color={focused ? SemanticColors.bg.primary_active : SemanticColors.elevation.secondary_normal} />,
					headerShown: false,
					tabBarStyle: ((route) => {
						const routeName = getFocusedRouteNameFromRoute(route) ?? "";
						if (routeName === "Exercise") {
							return { display: "none" };
						}
						return { height: 72, elevation: 0, shadowOpacity: 0, borderTopColor: Colors.gray_50, borderTopWidth: 6 };
					})(route),
				})}
				initialParams={{ headerShown: false, headerTitle: "" }}
			/>

			<BottomNavStack.Screen
				name='Reviews'
				options={{
					tabBarIcon: ({ focused }) => <Weight size={28} variant='Bold' color={focused ? SemanticColors.bg.primary_active : SemanticColors.elevation.secondary_normal} />,
				}}
				component={Screens.ReviewsScreen}
			/>

			<BottomNavStack.Screen
				name='Levels'
				options={{
					tabBarItemStyle: {
						transform: [{ rotate: "45deg" }],
						bottom: 44,
						borderWidth: 6,
						height: 80,

						backgroundColor: "#fff",
						borderColor: Colors.gray_50,
						borderRadius: 12,
					},
					tabBarIconStyle: { transform: [{ rotate: "-45deg" }] },
					tabBarBadgeStyle: { backgroundColor: "red" },
					tabBarIcon: ({ focused }) => <Signpost size={28} variant='Bold' color={focused ? SemanticColors.bg.primary_active : SemanticColors.elevation.secondary_normal} />,
				}}
				component={Screens.LevelsScreen}
			/>
			<BottomNavStack.Screen
				name='Notifications'
				options={{
					tabBarIcon: ({ focused }) => <Notification size={28} variant='Bold' color={focused ? SemanticColors.bg.primary_active : SemanticColors.elevation.secondary_normal} />,
				}}
				component={Screens.NotificationsScreen}
			/>
			<BottomNavStack.Screen
				name='Profile'
				options={{
					tabBarIcon: ({ focused }) => <UserOctagon variant='Bold' size={28} color={focused ? SemanticColors.bg.primary_active : SemanticColors.elevation.secondary_normal} />,
				}}
				component={Screens.ProfileScreen}
			/>
		</BottomNavStack.Navigator>
	);
};
