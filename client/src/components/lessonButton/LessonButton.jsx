import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { SemanticColors, Colors } from "@utils/Theme";
import Icon from "react-native-remix-icon";
const LessonButton = ({ isLocked = false, onPress, isCompleted = false, isUnlocked = false }) => {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={styles.wrapper}>
				{isLocked && <Icon name='lock-fill' size={42} color={Colors.gray_300} style={{ position: "absolute", top: 50, left: 50, transform: [{ translateX: -16 }, { translateY: -16 }], zIndex: 100 }} />}
				{isCompleted && <Icon name='checkbox-circle-fill' size={42} color={"#fff"} style={{ position: "absolute", top: 50, left: 50, transform: [{ translateX: -16 }, { translateY: -16 }], zIndex: 100 }} />}
				{isUnlocked && <Icon name='play-circle-fill' size={42} color={"#fff"} style={{ position: "absolute", top: 50, left: 50, transform: [{ translateX: -16 }, { translateY: -16 }], zIndex: 100 }} />}
				<View style={[styles.rhombus, isLocked && styles.rhombusLocked, isCompleted && styles.rhombusCompleted, isUnlocked && styles.rhombusUnlocked]}></View>
				<View style={[styles.rectangle, isLocked && styles.rectangleLocked, isCompleted && styles.rectangleCompleted, isUnlocked && styles.rectangleUnlocked]}></View>
				<View style={[styles.rhombusBefore, isLocked && styles.rhombusBeforeLocked, isCompleted && styles.rhombusBeforeCompleted, isUnlocked && styles.rhombusBeforeUnlocked]}></View>
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
		zIndex: -1,
	},
	rectangleLocked: {
		backgroundColor: Colors.gray_300,
	},
	rectangleCompleted: {
		backgroundColor: Colors.success_700,
	},
	rectangleUnlocked: {
		backgroundColor: Colors.primary_700,
	},
	rhombus: {
		width: 112,
		height: 112,
		transform: [{ rotateX: "45deg" }, { rotateZ: "45deg" }],
		borderRadius: 16,
		borderWidth: 6,
	},
	rhombusLocked: {
		backgroundColor: Colors.gray_200,
		borderColor: Colors.gray_300,
	},
	rhombusCompleted: {
		backgroundColor: Colors.success_500,
		borderColor: Colors.success_700,
	},
	rhombusUnlocked: {
		backgroundColor: SemanticColors.bg.primary_normal,
		borderColor: Colors.primary_700,
	},
	rhombusBefore: {
		width: 112,
		height: 112,
		transform: [{ rotateX: "45deg" }, { rotateZ: "45deg" }],
		borderRadius: 16,
		borderWidth: 4,
		zIndex: -1,
	},
	rhombusBeforeLocked: {
		backgroundColor: Colors.gray_300,
		borderColor: Colors.gray_300,
	},
	rhombusBeforeCompleted: {
		backgroundColor: Colors.success_700,
		borderColor: Colors.success_700,
	},
	rhombusBeforeUnlocked: {
		backgroundColor: Colors.primary_700,
		borderColor: Colors.primary_700,
	},
});
