import React from "react";

import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { SemanticColors } from "../../utils/Theme";

import Button from "@components";
import Icon from "react-native-remix-icon";

const Auth = () => {
	const navigation = useNavigation();

	return (
		<View style={{ flex: 1, justifyContent: "space-around", gap: 32 }}>
			<View style={{ alignItems: "center" }}>
				<Text style={{ fontFamily: "Sora-SemiBold", color: SemanticColors.text.normal, fontSize: 24, textAlign: "center" }}>¡Bienvenido!</Text>
				<Text style={{ fontFamily: "Sora-Regular", color: SemanticColors.text.subdued_normal, fontSize: 16, textAlign: "center" }}>Continuemos con una de las siguientes opciones</Text>
			</View>
			<View style={{ gap: 16 }}>
				<Button variant={"secondary"} text='Continuar con Google' onPress={() => console.log("Login")} rightIcon={<Icon name='google-fill' size='20'></Icon>} />
				<Button variant={"secondary"} text='Continuar con Facebook' onPress={() => console.log("Login")} rightIcon={<Icon name='facebook-fill' size='20'></Icon>} />
				<Button variant={"secondary"} text='Continuar con correo' onPress={() => console.log("Login")} rightIcon={<Icon name='mail-fill' size='20'></Icon>} />
			</View>
			<View style={{ gap: 16 }}>
				<Button variant={"primary"} text='Comenzar' onPress={() => navigation.navigate("Home")} />
				<Button variant={"secondary"} text='Crear una cuenta' onPress={() => navigation.navigate("Signup")} />
			</View>
		</View>
	);
};

export default Auth;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
