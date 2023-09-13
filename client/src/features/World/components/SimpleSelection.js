import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import Select from "../../../components/Select/Select";
import { Button } from "@components";
import { Colors } from "@utils/Theme";
import { Audio } from "expo-av";

const SimpleSelection = ({ content, handleNext }) => {
	const data = JSON.parse(content);
	const [sound, setSound] = useState();
	const [selectedOption, setSelectedOption] = useState(null);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
	const [isAnswerWrong, setIsAnswerWrong] = useState(false);
	async function playSound() {
		console.log("Loading Soundd");
		const { sound } = await Audio.Sound.createAsync(require("../pages/success-sound.mp3"));
		setSound(sound);

		console.log("Playing Sound");
		await sound.playAsync();
	}

	React.useEffect(() => {
		return sound
			? () => {
					console.log("Unloading Sound");
					sound.unloadAsync();
			  }
			: undefined;
	}, [sound]);
	const handleSelectClick = (optionId, answer) => {
		if (isAnswerCorrect || isAnswerWrong) return;

		setSelectedOption(optionId);
		setSelectedAnswer(answer);
	};

	useEffect(() => {
		setSelectedOption(null);
		setSelectedAnswer(null);
		setIsAnswerCorrect(false);
		setIsAnswerWrong(false);
	}, [handleNext]);
	const checkAnswer = () => {
		if (selectedAnswer === data.options[0].text) {
			playSound();
			setIsAnswerCorrect(true);
		} else {
			setIsAnswerWrong(true);
		}
	};
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Pregunta</Text>
			<View style={styles.optionsContainer}>
				{data.options.map((option, index) => {
					if (selectedOption === index) {
						return <Select key={index} {...option} isPressed={true} error={isAnswerWrong} success={isAnswerCorrect} onPress={() => handleSelectClick(index, option.text)}></Select>;
					} else {
						return <Select key={index} {...option} isPressed={false} onPress={() => handleSelectClick(index, option.text)}></Select>;
					}
				})}
			</View>
			<View style={{ gap: 16, flexDirection: "row", alignItems: "center" }}>{isAnswerCorrect || isAnswerWrong ? <Button text='Continuar' variant='primary' style={{ flex: 1 }} onPress={handleNext} /> : <Button text='Comprobar' variant='primary' style={{ flex: 1 }} onPress={checkAnswer} />}</View>
		</View>
	);
};

export default SimpleSelection;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		gap: 16,
		justifyContent: "space-between",
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
