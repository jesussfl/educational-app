// import React from "react";
import { View } from "react-native";
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
        tabBarStyle: {
          height: 72,
          elevation: 0,
          shadowOpacity: 0,
          borderTopColor: Colors.gray_50,
          borderTopWidth: 6,
        },
      }}
    >
      <BottomNavStack.Screen
        name="Lessons"
        component={WorldStackNavigator}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();

            navigation.navigate("Lessons", { screen: "World" });
          },
        })}
        options={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", backgroundColor: focused ? "#FFF4D3" : "#fff", padding: 8, borderRadius: 100 }}>
              <Home variant="Bold" size={28} color={focused ? Colors.primary_500 : SemanticColors.elevation.secondary_normal} />
            </View>
          ),
          headerShown: false,
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";
            if (routeName === "Exercise" || routeName === "Congrats" || routeName === "TheoryScreen") {
              return { display: "none" };
            }

            return {
              height: 72,
              elevation: 0,
              shadowOpacity: 0,
              borderTopColor: Colors.gray_50,
              borderTopWidth: 6,
            };
          })(route),
        })}
        initialParams={{ headerShown: false, headerTitle: "" }}
      />

      <BottomNavStack.Screen
        name="Reviews"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", backgroundColor: focused ? "#FFF4D3" : "#fff", padding: 8, borderRadius: 100 }}>
              <Weight size={28} variant="Bold" color={focused ? Colors.primary_500 : SemanticColors.elevation.secondary_normal} />
            </View>
          ),
        }}
        component={Screens.ReviewsScreen}
      />

      <BottomNavStack.Screen
        name="Levels"
        options={{
          headerShown: true,
          headerTitle: "Explora los distintos niveles",
          headerTitleStyle: {
            color: Colors.gray_400,
            fontFamily: "Sora-SemiBold",
            fontSize: 18,
          },
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
          tabBarIcon: ({ focused }) => <Signpost size={28} variant="Bold" color={focused ? Colors.primary_500 : SemanticColors.elevation.secondary_normal} />,
        }}
        component={Screens.LevelsScreen}
      />
      <BottomNavStack.Screen
        name="Notifications"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", backgroundColor: focused ? "#FFF4D3" : "#fff", padding: 8, borderRadius: 100 }}>
              <Notification size={28} variant="Bold" color={focused ? Colors.primary_500 : SemanticColors.elevation.secondary_normal} />
            </View>
          ),
        }}
        component={Screens.NotificationsScreen}
      />
      <BottomNavStack.Screen
        name="Profile"
        options={{
          headerShown: true,
          headerTitle: "Perfil de usuario",
          headerTitleStyle: {
            color: Colors.gray_400,
            fontFamily: "Sora-SemiBold",
          },
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", backgroundColor: focused ? "#FFF4D3" : "#fff", padding: 8, borderRadius: 100 }}>
              <UserOctagon variant="Bold" size={28} color={focused ? Colors.primary_500 : SemanticColors.elevation.secondary_normal} />
            </View>
          ),
        }}
        component={Screens.ProfileScreen}
      />
    </BottomNavStack.Navigator>
  );
};
