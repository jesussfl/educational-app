import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextField } from "@components";
import { removeToken } from "@utils/helpers/auth.helpers";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
const ProfileScreen = () => {
	const { control, handleSubmit } = useForm();
	const navigation = useNavigation();
	const handleLogout = () => {
		removeToken();
		navigation.replace("Auth", { screen: "Login" });
	};
	return (
		<View style={styles.container}>
			okok <Button text='Logout' onPress={handleLogout} variant='primary' size='medium' />
		</View>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
