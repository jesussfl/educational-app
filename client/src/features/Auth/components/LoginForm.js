import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "@utils/Theme";
import { useForm } from "react-hook-form";
import { emailValidations, loginPasswordValidations } from "../utils/inputValidations";
import { API_URL } from "@env";
import { useAuthContext } from "../contexts/auth.context";
import { setToken } from "../../../utils/helpers/auth.helpers";

//components
import Icon from "react-native-remix-icon";
import { TextField, Button } from "@components";
import Spinner from "react-native-loading-spinner-overlay";
const LoginForm = () => {
	const navigation = useNavigation();
	const { setUser } = useAuthContext();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [isLoading, setIsLoading] = useState(false);
	onSigninPressed = async ({ email, password }) => {
		setIsLoading(true);
		try {
			const values = {
				identifier: email,
				password: password,
			};
			const response = await fetch(`${API_URL}/api/auth/local`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});
			const data = await response.json();
			if (data?.error) {
				throw data?.error;
			} else {
				// set the token
				setToken(data.jwt);

				// set the user
				setUser(data.user);
				setIsLoading(false);
				navigation.navigate("Main", { screen: "Lessons" });
			}
		} catch (error) {
			setIsLoading(false);
			console.log(error);
		}
	};

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
