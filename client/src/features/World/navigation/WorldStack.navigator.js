import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WorldScreen from "../pages/WorldScreen";
import LevelsScreen from "../pages/LevelsScreen";
const WorldStack = createStackNavigator();

const WorldStackNavigator = () => {
	return (
		<WorldStack.Navigator screenOptions={{ headerShown: false }}>
			<WorldStack.Screen name='WorldSelect' component={LevelsScreen} />
			<WorldStack.Screen name='World' component={WorldScreen} />
		</WorldStack.Navigator>
	);
};
export default WorldStackNavigator;
