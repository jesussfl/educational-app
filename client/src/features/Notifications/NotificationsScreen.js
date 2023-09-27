import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Colors } from "@utils/Theme";
const NotificationsScreen = () => {
	return (
		<View style={styles.pageContainer}>
			<Image style={styles.image} source={require("./empty-state-notifications.png")} />
			<Text style={styles.text}>Aún no tienes notificaciones pendientes</Text>
		</View>
	);
};

export default NotificationsScreen;

const styles = StyleSheet.create({
	pageContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		gap: 24,
		padding: 24,
	},
	image: {
		width: 200,
		height: 200,
	},
	text: {
		fontSize: 16,
		textAlign: "center",
		color: Colors.gray_400,
		lineHeight: 28,
		fontFamily: "Sora-SemiBold",
	},
});
