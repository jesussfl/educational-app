import React from "react";
import { View, StyleSheet } from "react-native";

import { Colors } from "@utils/Theme";
import { emailValidations, passwordValidations, usernameValidations } from "../utils/inputValidations";
import { TextField } from "@components";
//Components
import Icon from "react-native-remix-icon";
import { useForm } from "react-hook-form";
import { Button } from "@components";
import Spinner from "react-native-loading-spinner-overlay";
import { useAuthSubmit } from "../hooks/useAuthSubmit";
import { useNavigation } from "@react-navigation/native";
const SignupForm = ({ currentRef }) => {
	const { control, handleSubmit } = useForm();
	const { authSubmit, isLoading } = useAuthSubmit({ isRegister: true });
	const navigation = useNavigation();

	const scrollToInput = (reactNode) => {
		if (currentRef) {
			currentRef.current.scrollToFocusedInput(reactNode, 120);
		}
	};
	return (
		<View>
			<Spinner visible={isLoading} />

			<View>
				<TextField {...usernameValidations} control={control} onFocus={(event) => scrollToInput(event.target)} leftIcon={<Icon name='user-fill' size='20' color={Colors.gray_300} />} />
				<TextField {...emailValidations} onFocus={(event) => scrollToInput(event.target)} control={control} leftIcon={<Icon name='mail-fill' size='20' color={Colors.gray_300} />} />
				<TextField {...passwordValidations} onFocus={(event) => scrollToInput(event.target)} control={control} leftIcon={<Icon name='lock-fill' size='20' color={Colors.gray_300} />} />
			</View>
			<View style={styles.bottomActions}>
				<Button variant={"primary"} text='Crear mi cuenta' size='medium' onPress={handleSubmit(authSubmit)} />
				<Button variant={"secondary"} text='Ya tengo una cuenta' size='medium' onPress={() => navigation.replace("Auth", { screen: "Login" })} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	alertText: { color: "red", textAlign: "center", marginBottom: 16 },
	bottomActions: { gap: 16, marginTop: 28 },
});

export default SignupForm;
