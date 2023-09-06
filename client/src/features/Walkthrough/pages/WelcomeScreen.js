import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

//Components
import { SemanticColors } from "@utils/Theme";
import { Headings, Button } from "@components";
import { FacebookIcon, GoogleIcon } from "@assets/icons/index";
import { GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-google-signin/google-signin";
//Firebase Imports
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from "firebase/auth";
import { auth } from "../../../config/firebase";
import * as Google from "expo-auth-session/providers/google";

GoogleSignin.configure({
	webClientId: "52699390234-8r5bc69b4njsopffe5tcjpb1hep1i5hc.apps.googleusercontent.com",
});

//Remix Icons
import Icon from "react-native-remix-icon";
const WelcomeScreen = ({ navigation }) => {
	const [userInfo, setUserInfo] = useState();
	const [isLoading, setIsLoading] = useState(false);

	const [request, response, promptAsync] = Google.useAuthRequest({
		androidClientId: "52699390234-8r5bc69b4njsopffe5tcjpb1hep1i5hc.apps.googleusercontent.com",
		redirectUri: "exp://192.168.0.108:8081/--/auth/callback",
	});
	// Somewhere in your code
	const signIn = async () => {
		await GoogleSignin.hasPlayServices();
		const userInfo = await GoogleSignin.signIn();
		console.log(userInfo);
		// console.log(userInfo);
		// setUserInfo(userInfo);
		// try {
		// } catch (error) {
		// 	if (error.code === statusCodes.SIGN_IN_CANCELLED) {
		// 		console.log("User cancelled the login flow");
		// 		// user cancelled the login flow
		// 	} else if (error.code === statusCodes.IN_PROGRESS) {
		// 		console.log("Signing in");
		// 		// operation (e.g. sign in) is in progress already
		// 	} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
		// 		console.log("Play services not available or outdated");
		// 		// play services not available or outdated
		// 	} else {
		// 		console.log("Some other error happened", error);
		// 		// some other error happened
		// 	}
		// }
	};

	useEffect(() => {
		console.log(response);
		if (response?.type === "success") {
			const { id_token } = response.params;
			const credential = GoogleAuthProvider.credential(id_token);
			console.log(credential);
			// signInWithCredential(auth, credential);
		}
	}, [response]);

	console.log(response);
	return (
		<View style={styles.pageContainer}>
			<Headings title='Bienvenido' description='Continuemos con una de las siguientes opciones' />
			<View style={{ gap: 16 }}>
				{/* <Button variant={"secondary"} text='Continuar con Google' size='medium' onPress={() => promptAsync()} rightIcon={<GoogleIcon />} />
				<Button variant={"secondary"} text='Continuar con Facebook' size='medium' onPress={() => console.log("Login")} rightIcon={<FacebookIcon />} /> */}
				<Button onPress={() => navigation.navigate("Auth", { screen: "Login" })} variant={"secondary"} text='Continuar con correo' size='medium' rightIcon={<Icon name='mail-fill' size='20' color={SemanticColors.text.normal}></Icon>} />
			</View>
			<View style={{ gap: 16 }}>
				<Button variant={"primary"} text='Comenzar' onPress={() => navigation.replace("Main", { screen: "Lessons" })} />
				<Button variant={"secondary"} text='Crear una cuenta' onPress={() => navigation.navigate("Auth", { screen: "Signup" })} />
			</View>
		</View>
	);
};

export default WelcomeScreen;

const styles = StyleSheet.create({
	pageContainer: {
		flex: 1,
		justifyContent: "space-around",
		gap: 32,
		padding: 24,
	},
});
