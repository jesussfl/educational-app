import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { SemanticColors, Colors } from "@utils/Theme";

let isLocked = true;
const LessonButton = ({ isLocked, onPress }) => {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={styles.wrapper}>
				<View style={styles.rhombus}></View>
				<View style={styles.rectangle}></View>
				<View style={styles.rhombusBefore}></View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default LessonButton;

const styles = StyleSheet.create({
	wrapper: {
		gap: -88,
	},
	rectangle: {
		position: "absolute",
		transform: [{ translateY: 52 }, { translateX: -16.2 }],
		width: 144.5,
		height: 31,
		backgroundColor: isLocked ? Colors.gray_300 : Colors.primary_700,
		zIndex: -1,
	},
	rhombus: {
		width: 112,
		height: 112,
		backgroundColor: isLocked ? Colors.gray_200 : SemanticColors.bg.primary_normal,
		transform: [{ rotateX: "45deg" }, { rotateZ: "45deg" }],
		borderRadius: 16,
		borderWidth: 6,
		borderColor: isLocked ? Colors.gray_300 : Colors.primary_700,
	},
	rhombusBefore: {
		width: 112,
		height: 112,
		backgroundColor: isLocked ? Colors.gray_300 : Colors.primary_700,
		transform: [{ rotateX: "45deg" }, { rotateZ: "45deg" }],
		borderRadius: 16,
		borderWidth: 4,
		borderColor: isLocked ? Colors.gray_300 : Colors.primary_700,
		zIndex: -1,
	},
});
