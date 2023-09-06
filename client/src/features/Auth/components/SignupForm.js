import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Colors } from "@utils/Theme";
import { useForm } from "react-hook-form";
import { emailValidations, passwordValidations, usernameValidations } from "../utils/inputValidations";
import { Button, TextField } from "@components";
//Components
import Icon from "react-native-remix-icon";

import Spinner from "react-native-loading-spinner-overlay";
import { useSignupSubmit } from "../hooks/useSignupSubmit";

const SignupForm = () => {
	const navigation = useNavigation();
	const { signupSubmit, isLoading } = useSignupSubmit();
	const { control, handleSubmit } = useForm();

	return (
		<View style={styles.container}>
			<Spinner visible={isLoading} />

			<View>
				<TextField {...usernameValidations} control={control} leftIcon={<Icon name='user-fill' size='20' color={Colors.gray_300} />} />
				<TextField {...emailValidations} control={control} leftIcon={<Icon name='mail-fill' size='20' color={Colors.gray_300} />} />
				<TextField {...passwordValidations} control={control} leftIcon={<Icon name='lock-fill' size='20' color={Colors.gray_300} />} />
			</View>
			<View style={{ gap: 16 }}>
				<Button variant={"primary"} text='Crear mi cuenta' size='medium' onPress={handleSubmit((values) => signupSubmit(values))} />
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
