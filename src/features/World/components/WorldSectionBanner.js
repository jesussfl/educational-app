import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Flag } from "iconsax-react-native";
import { Colors } from "@utils/Theme";

const WorldSectionBanner = ({ text }) => {
	return (
		<View style={styles.sectionBanner}>
			<Flag variant='Bold' size={24} color={Colors.gray_400} />
			<Text style={styles.sectionBannerText}>{text}</Text>
		</View>
	);
};

export default WorldSectionBanner;

const styles = StyleSheet.create({
	sectionBanner: {
		alignSelf: "stretch",
		backgroundColor: Colors.gray_25,
		paddingVertical: 16,
		paddingHorizontal: 24,
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	sectionBannerText: {
		fontSize: 14,
		fontFamily: "Sora-Bold",
		color: Colors.gray_400,
		paddingRight: 16,
	},
});
