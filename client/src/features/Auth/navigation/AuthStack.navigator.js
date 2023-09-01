import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen, RecoverPasswordStep1, RecoverPasswordStep2, RecoverPasswordStep3, SignupScreen } from "../../index";

const AuthStack = createStackNavigator();
const RecoverPasswordStack = createStackNavigator();

const RecoverPasswordStackNavigator = () => {
	return (
		<RecoverPasswordStack.Navigator>
			<RecoverPasswordStack.Screen name='RecoverPasswordStep1' component={RecoverPasswordStep1} options={{ headerShown: true, headerTitle: "" }} initialParams={{ headerShown: true, headerTitle: "" }} />
			<RecoverPasswordStack.Screen name='RecoverPasswordStep2' component={RecoverPasswordStep2} options={{ headerShown: true, headerTitle: "" }} initialParams={{ headerShown: true, headerTitle: "" }} />
			<RecoverPasswordStack.Screen name='RecoverPasswordStep3' component={RecoverPasswordStep3} options={{ headerShown: true, headerTitle: "" }} initialParams={{ headerShown: true, headerTitle: "" }} />
		</RecoverPasswordStack.Navigator>
	);
};

const AuthStackNavigator = () => {
	return (
		<AuthStack.Navigator>
			<AuthStack.Screen name='Login' component={LoginScreen} options={{ headerShown: true, headerTitle: "" }} />
			<AuthStack.Screen name='Signup' component={SignupScreen} options={{ headerShown: true, headerTitle: "" }} />
			<AuthStack.Screen name='RecoverPassword' component={RecoverPasswordStackNavigator} options={{ headerShown: false }} />
		</AuthStack.Navigator>
	);
};
export default AuthStackNavigator;
