import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WorldScreen from "../pages/WorldScreen";
import LevelsScreen from "../pages/LevelsScreen";
const WorldStack = createStackNavigator();

const WorldStackNavigator = () => {
	return (
		<WorldStack.Navigator>
			<WorldStack.Screen name='WorldSelect' component={LevelsScreen} options={{ headerShown: false }} />
			<WorldStack.Screen name='World' component={WorldScreen} options={{ headerShown: true }} initialParams={{ headerShown: true, headerTitle: "" }} />
		</WorldStack.Navigator>
	);
};
export default WorldStackNavigator;
