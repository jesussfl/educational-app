// import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Weight, Signpost, Notification, UserOctagon, ShoppingCart, DollarCircle } from "iconsax-react-native";

import { SemanticColors, Colors } from "@utils/Theme";
import * as Screens from "../index";
import StoreScreen from "@features/Store/pages/store-screen";
import { getFocusedRouteNameFromRoute, useNavigation } from "@react-navigation/native";
import WorldStackNavigator from "../World/navigation/WorldStack.navigator";
import useAuthStore from "@stores/useAuthStore";
const BottomNavStack = createBottomTabNavigator();

export const BottomNavStackNavigator = () => {
  const { user } = useAuthStore();
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
        name="Store"
        options={{
          headerShown: true,
          headerTitle: "Tienda",
          headerTitleStyle: {
            color: Colors.gray_400,
            fontFamily: "Sora-SemiBold",
            fontSize: 18,
          },
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 4, marginRight: 16 }}>
              <Text style={{ color: Colors.success_600, fontFamily: "Sora-SemiBold", fontSize: 18 }}>{user.money}</Text>
              <DollarCircle size={28} color={Colors.success_500} variant="Bold" />
            </View>
          ),

          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", backgroundColor: focused ? "#FFF4D3" : "#fff", padding: 8, borderRadius: 100 }}>
              <ShoppingCart size={28} variant="Bold" color={focused ? Colors.primary_500 : SemanticColors.elevation.secondary_normal} />
            </View>
          ),
        }}
        component={StoreScreen}
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
          headerShown: false,
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
