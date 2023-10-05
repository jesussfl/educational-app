import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WorldScreen from "../pages/WorldScreen";

import ExerciseScreen from "../../Exercises/pages/ExercisePage";
const WorldStack = createStackNavigator();
import { Colors } from "@utils/Theme";

import UserStats from "../components/UserStats";
import CongratsPage from "../../Exercises/pages/CongratsPage";
const WorldStackNavigator = () => {
   return (
      <WorldStack.Navigator initialRouteName="World">
         <WorldStack.Screen
            name="World"
            component={WorldScreen}
            options={{
               headerShown: true,
               headerRightContainerStyle: {
                  marginRight: 16,
               },
               headerTitleStyle: {
                  color: Colors.gray_400,
                  fontFamily: "Sora-SemiBold",
                  fontSize: 18,
               },
               headerRight: () => <UserStats />,
            }}
            initialParams={{ headerShown: true, headerTitle: "" }}
         />
         <WorldStack.Screen name="Exercise" component={ExerciseScreen} options={{ headerShown: false }} />
         <WorldStack.Screen name="Congrats" component={CongratsPage} options={{ headerShown: false }} />
      </WorldStack.Navigator>
   );
};
export default WorldStackNavigator;
