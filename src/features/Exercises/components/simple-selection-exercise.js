import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Select from "../../../components/Select/Select";
import { Colors } from "@utils/Theme";
import * as Animatable from "react-native-animatable";
import { useExercises } from "@stores/exercises";
const SimpleSelectionExercise = ({ content }) => {
  const { userAnswer, isAnswerCorrect, setUserAnswer } = useExercises((state) => state);
  useEffect(() => {
    slidenIn();
  }, []);
  const slidenIn = () => {
    this.view.slideInRight(300);
  };
  return (
    <KeyboardAwareScrollView>
      <Animatable.View
        style={styles.container}
        animation="slideInLeft"
        duration={1000} // Adjust the duration as needed
        ref={(ref) => (this.view = ref)}
      >
        <Text style={styles.optionTitle}>Elige la opción correcta</Text>
        <Text style={styles.text}>{content.question}</Text>
        <View style={styles.optionsContainer}>
          {content.options.map((option, index) => {
            if (userAnswer === index) {
              return (
                <Select
                  key={index}
                  {...option}
                  isPressed={true}
                  error={isAnswerCorrect === false}
                  success={isAnswerCorrect}
                  onPress={() => handleSelectClick(index, option.text)}
                />
              );
            } else {
              return <Select key={index} {...option} isPressed={false} onPress={() => setUserAnswer(index)} />;
            }
          })}
        </View>
      </Animatable.View>
    </KeyboardAwareScrollView>
  );
};

export default SimpleSelectionExercise;

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
  optionTitle: {
    color: Colors.gray_600,
    fontFamily: "Sora-SemiBold",
    fontSize: 20,
    lineHeight: 32,
  },
  text: {
    color: Colors.gray_500,
    fontFamily: "Sora-Medium",
    fontSize: 18,
    lineHeight: 28,
  },
});
