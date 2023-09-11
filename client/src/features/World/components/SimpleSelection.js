import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Select from "../../../components/Select/Select";
import { Colors } from "@utils/Theme";
const SimpleSelection = ({ content }) => {
	const data = JSON.parse(content);
	const [selectedOption, setSelectedOption] = useState(null);

	const handleSelectClick = (optionId) => {
		setSelectedOption(optionId);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Pregunta</Text>
			<View style={styles.optionsContainer}>
				{data.options.map((option, index) => (
					<Select key={index} {...option} isPressed={selectedOption === index} onPress={() => handleSelectClick(index)}></Select>
				))}
			</View>
		</View>
	);
};

export default SimpleSelection;

const styles = StyleSheet.create({
	container: {
		padding: 24,
		gap: 16,
	},
	optionsContainer: {
		gap: 24,
	},
	text: {
		color: Colors.gray_600,
		fontFamily: "Sora-SemiBold",
		fontSize: 20,
		textAlign: "center",
	},
});
