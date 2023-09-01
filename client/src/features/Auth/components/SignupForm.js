import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebase";
import { Colors } from "@utils/Theme";
import { useForm } from "react-hook-form";
import { emailValidations, passwordValidations } from "../utils/inputValidations";

//Components
import Icon from "react-native-remix-icon";
import TextField from "../../../components/textField/TextField";
import Button from "../../../components/button/Button";
import Spinner from "react-native-loading-spinner-overlay";

const SignupForm = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [isLoading, setIsLoading] = useState(false);

	// useEffect(() => {
	// 	if (route.params?.isFromLogin) {
	// 		navigation.setOptions({
	// 			animation: "fade",
	// 		});
	// 	}
	// }, []);

	const onSignupPressed = async ({ email, password }) => {
		setIsLoading(true);
		console.log(email, password);
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			setIsLoading(false);
			navigation.navigate("Home");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={styles.container}>
			<Spinner visible={isLoading} />

			<View>
				<TextField {...emailValidations} control={control} leftIcon={<Icon name='mail-fill' size='20' color={Colors.gray_300} />} />
				<TextField {...passwordValidations} control={control} leftIcon={<Icon name='lock-fill' size='20' color={Colors.gray_300} />} />
			</View>
			<View style={{ gap: 16 }}>
				<Button variant={"primary"} text='Crear mi cuenta' size='medium' onPress={handleSubmit(onSignupPressed)} />
				<Button variant={"secondary"} text='Ya tengo una cuenta' size='medium' onPress={() => navigation.replace("Auth", { screen: "Login" })} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: "space-between", alignSelf: "stretch" },
	alertText: { color: "red", textAlign: "center", marginBottom: 16 },
});

export default SignupForm;
