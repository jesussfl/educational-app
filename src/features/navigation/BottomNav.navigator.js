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
import { useEffect } from "react";
import useUserStats from "@hooks/useUserStats";
import { useLivesStore } from "@stores/useLivesStore";
import { ECONOMY } from "@config/economy";
const BottomNavStack = createBottomTabNavigator();
import { differenceInCalendarDays } from "date-fns";
//TODO: Refactor and improve readability of this code
export const BottomNavStackNavigator = () => {
  const { increaseLives, restartStreak, decreaseStreakShields } = useUserStats();
  const { user } = useAuthStore();
  const { lastLifeRegenerationTime, setLastLifeRegenerationTime, setRegenerationTime } = useLivesStore();
  const regenerationInterval = ECONOMY.LIFE_REGENERATION_TIME_HOURS * 60 * 60;

  const getSecondsRemaining = () => {
    const now = new Date().getTime();
    const first_life_lost_date = new Date(user.first_life_lost_date).getTime();

    let secondsElapsed = Math.floor((now - first_life_lost_date) / 1000);
    secondsElapsed = Math.max(secondsElapsed, 0);

    const secondsRemaining = (regenerationInterval - (secondsElapsed % regenerationInterval)) % regenerationInterval;

    return secondsRemaining;
  };

  const checkLifeRegeneration = () => {
    if (user.lives === ECONOMY.MAX_USER_LIVES || !user.first_life_lost_date) return;
    const now = new Date().getTime();
    const totalLostLives = ECONOMY.MAX_USER_LIVES - user.lives;
    const first_life_lost_date = new Date(user.first_life_lost_date).getTime();

    if (first_life_lost_date + regenerationInterval * 1000 <= now && !lastLifeRegenerationTime) {
      let secondsElapsed = Math.floor((now - first_life_lost_date) / 1000);
      const livesToRegenerate = Math.floor(secondsElapsed / regenerationInterval);

      if (livesToRegenerate > 0) increaseLives(Math.min(livesToRegenerate, totalLostLives));
    }

    if (lastLifeRegenerationTime) {
      const elapsedTimeSinceLastRegeneration = now - parseInt(lastLifeRegenerationTime, 10);
      const livesToRegenerate = Math.floor(elapsedTimeSinceLastRegeneration / (regenerationInterval * 1000));

      if (livesToRegenerate > 0) {
        increaseLives(Math.min(livesToRegenerate, totalLostLives));
        setLastLifeRegenerationTime(now);
      }
    }
  };

  const checkStreak = () => {
    const lastCompletedLessonDate = new Date(user.last_completed_lesson_date);
    const now = new Date();

    if (!user.last_completed_lesson_date || !user.streak_start_date) {
      console.log("No last completed lesson date");
      return;
    }

    if (differenceInCalendarDays(now, lastCompletedLessonDate) <= 1) {
      console.log("Less than 1 day since last completed lesson");
      return;
    }

    if (user.streak_shields > 0 && differenceInCalendarDays(now, lastCompletedLessonDate) <= user.streak_shields) {
      console.log("User has streak shields");
      decreaseStreakShields(Number(differenceInCalendarDays(now, lastCompletedLessonDate) - 1));
      return;
    }

    console.log("Restarting streak. User has no streak shields");
    restartStreak();
    return;
  };

  useEffect(() => {
    const secondsRemaining = getSecondsRemaining();

    if (user.lives === ECONOMY.MAX_USER_LIVES) {
      setRegenerationTime(0);
      setLastLifeRegenerationTime(null);

      return;
    }
    if (secondsRemaining <= 0) return;
    setRegenerationTime(secondsRemaining);

    let timeoutId = setTimeout(() => {
      if (user.lives < ECONOMY.MAX_USER_LIVES) {
        increaseLives(1);
      }
    }, secondsRemaining * 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [user.lives, user.first_life_lost_date]);

  useEffect(() => {
    checkLifeRegeneration();

    checkStreak();

    const now = new Date();

    const timeUntilMidnight =
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // Next day
        0, // Midnight hour
        0, // Minutes
        0 // Seconds
      ) - now;
    // Schedule checkStreak to run every midnight
    const timer = setTimeout(() => {
      console.log("CHECKING STREAK");
      checkStreak();

      // Schedule the next check for the next midnight
      setInterval(checkStreak, 24 * 60 * 60 * 1000); // 24 hours
    }, timeUntilMidnight);

    return () => clearTimeout(timer);
  }, [user.last_completed_lesson_date, user.streak_start_date]);

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
            if (routeName === "Exercise" || routeName === "Congrats" || routeName === "TheoryScreen" || routeName === "WorldCompleted") {
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
