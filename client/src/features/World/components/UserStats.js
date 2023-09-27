import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Heart, DollarCircle, Flash } from "iconsax-react-native";
import { Colors } from "@utils/Theme";
import { useAuthContext } from "../../Auth/contexts/auth.context";
const UserStats = () => {
	const { user } = useAuthContext();
	return (
		<View style={styles.statusContainer}>
			<View style={styles.status}>
				<Heart size={24} variant='Bold' color={Colors.error_400} />
				<Text style={[styles.statusText, { color: Colors.error_400 }]}>{user.lives ? user.lives : 0}</Text>
			</View>

			<View style={styles.status}>
				<DollarCircle size={24} variant='Bold' color={Colors.success_500} />
				<Text style={[styles.statusText, { color: Colors.success_500 }]}>{user.money ? user.money : 0}</Text>
			</View>
		</View>
	);
};

export default UserStats;

const styles = StyleSheet.create({
	statusContainer: {
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		gap: 16,
		paddingRight: 16,
	},
	status: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 6,
		borderColor: Colors.gray_200,
		borderWidth: 2,
		padding: 6,
		borderRadius: 12,
	},
	statusText: {
		color: Colors.gray_400,
		fontSize: 16,
		fontFamily: "Sora-SemiBold",
	},
});
