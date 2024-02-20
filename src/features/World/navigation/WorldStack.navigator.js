import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WorldScreen from "../pages/lessons-screen";

import ExerciseScreen from "../../Exercises/pages/exercise-screen";

import CongratsScreen from "../../Exercises/pages/congrats-screen";
import TheoryScreen from "../pages/theory-screen";
import UserStats from "../components/user-stats";
const WorldStack = createStackNavigator();
const WorldStackNavigator = () => {
  return (
    <WorldStack.Navigator initialRouteName="World">
      <WorldStack.Screen
        name="World"
        component={WorldScreen}
        options={{
          headerTransparent: true,
          headerShown: true,
          header: () => <UserStats />,
        }}
        initialParams={{ headerShown: true, headerTitle: "" }}
      />
      <WorldStack.Screen name="Exercise" component={ExerciseScreen} options={{ headerShown: false }} />
      <WorldStack.Screen name="Congrats" component={CongratsScreen} options={{ headerShown: false }} />
      <WorldStack.Screen name="TheoryScreen" component={TheoryScreen} options={{ headerShown: true, headerTitle: "" }} />
    </WorldStack.Navigator>
  );
};
export default WorldStackNavigator;
