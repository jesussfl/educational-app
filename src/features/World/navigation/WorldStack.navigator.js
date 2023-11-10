import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WorldScreen from "../pages/lessons-screen";

import ExerciseScreen from "../../Exercises/pages/ExercisePage";
const WorldStack = createStackNavigator();
import { Colors } from "@utils/Theme";

import UserStats from "../components/UserStats";
import CongratsPage from "../../Exercises/pages/CongratsPage";
import TheoryScreen from "../pages/theory-screen";
const WorldStackNavigator = () => {
  return (
    <WorldStack.Navigator initialRouteName="World">
      <WorldStack.Screen
        name="World"
        component={WorldScreen}
        options={{
          headerShown: true,
          headerRightContainerStyle: {
            paddingRight: 16,
          },
          headerTitleStyle: {
            color: Colors.gray_500,
            fontFamily: "Sora-SemiBold",
            fontSize: 15,
            alignSelf: "center",
          },
          headerTitleContainerStyle: {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.gray_25,
            marginVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 16,
            flex: 1,
          },

          headerRight: () => <UserStats />,
        }}
        initialParams={{ headerShown: true, headerTitle: "" }}
      />
      <WorldStack.Screen name="Exercise" component={ExerciseScreen} options={{ headerShown: false }} />
      <WorldStack.Screen name="Congrats" component={CongratsPage} options={{ headerShown: false }} />
      <WorldStack.Screen name="TheoryScreen" component={TheoryScreen} options={{ headerShown: true, headerTitle: "" }} />
    </WorldStack.Navigator>
  );
};
export default WorldStackNavigator;
