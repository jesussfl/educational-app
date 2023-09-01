import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "@utils/Theme";
import { set, useForm } from "react-hook-form";
import { emailValidations, loginPasswordValidations } from "../utils/inputValidations";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../../config/firebase";
//components
import Icon from "react-native-remix-icon";
import { TextField, Button } from "@components";
import Spinner from "react-native-loading-spinner-overlay";
const LoginForm = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [isLoading, setIsLoading] = useState(false);
	onSigninPressed = async ({ email, password }) => {
		console.log(email, password);
		setIsLoading(true);
		try {
			await signInWithEmailAndPassword(auth, email, password);
			setIsLoading(false);
			navigation.navigate("Main", { screen: "Lessons" });
		} catch (error) {
			setIsLoading(false);
			console.log(error);
		}
	};

	// useEffect(() => {
	// 	if (route.params?.isFromSignup) {
	// 		navigation.setOptions({
	// 			animation: "fade",
	// 		});
	// 	}
	// }, []);
	return (
		<View style={styles.container}>
			<Spinner visible={isLoading} />
			<View>
				<TextField {...emailValidations} control={control} leftIcon={<Icon name='mail-fill' size='20' color={Colors.gray_300} />} />
				<TextField {...loginPasswordValidations} control={control} leftIcon={<Icon name='lock-fill' size='20' color={Colors.gray_300} />} />
				<Button variant={"ghost"} text='Olvidé mi contraseña' size='small' style={{ alignSelf: "flex-end" }} onPress={() => navigation.navigate("Auth", { screen: "RecoverPassword" })} />
			</View>
			<View style={{ gap: 16 }}>
				<Button variant={"primary"} text='Iniciar Sesión' size='medium' onPress={handleSubmit(onSigninPressed)} />
				<Button variant={"secondary"} text='No tengo una cuenta' size='medium' onPress={() => navigation.replace("Auth", { screen: "Signup" })} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: "space-between", alignSelf: "stretch" },
	alertText: { color: "red", textAlign: "center", marginBottom: 16 },
});

export default LoginForm;
