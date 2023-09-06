import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WorldScreen from "../pages/WorldScreen";
import LevelsScreen from "../pages/LevelsScreen";
import ExerciseScreen from "../pages/ExercisePage";
const WorldStack = createStackNavigator();
import { Colors } from "@utils/Theme";
const WorldStackNavigator = () => {
	return (
		<WorldStack.Navigator initialRouteName='World'>
			<WorldStack.Screen
				name='World'
				component={WorldScreen}
				options={{
					headerShown: true,
					headerTitleStyle: {
						color: Colors.gray_400,
						fontFamily: "Sora-SemiBold",
						fontSize: 18,
					},
				}}
				initialParams={{ headerShown: true, headerTitle: "" }}
			/>
			<WorldStack.Screen name='Exercise' component={ExerciseScreen} options={{ headerShown: true }} />
		</WorldStack.Navigator>
	);
};
export default WorldStackNavigator;
