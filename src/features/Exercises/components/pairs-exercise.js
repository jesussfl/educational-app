import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, SemanticColors } from "@utils/Theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Animatable from "react-native-animatable";
import { usePairsExercise } from "../hooks/usePairsExercise";

const content = {
  options: {
    type: "text",
    data: [
      {
        id: 1,
        identifier: "1",
        text: "Este es un texto larguisimo larguisimo larguisimo",
      },
      {
        id: 2,
        identifier: "2",
        text: "Este es un texto corto",
      },
    ],
  },
  answers: {
    type: "image",
    data: [
      {
        id: 1,
        identifier: "1",
        image: "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
      },
      {
        id: 2,
        identifier: "2",
        image: "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
      },
    ],
  },
};
const PairsExercise = ({ content }) => {
  const [options, setOptions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const { checkIfSuccess, handleFirstSelection, handleSecondSelection, firstItemSelected, secondItemSelected, correctIdentifiers } = usePairsExercise(
    content.pairs.length
  );

  useEffect(() => {
    slidenIn();
    setOptions(content.pairs.map((pair) => pair.option).sort(() => Math.random() - 0.5));
    setAnswers(content.pairs.map((pair) => pair.answer).sort(() => Math.random() - 0.5));
  }, []);

  const slidenIn = () => {
    this.view.slideInRight(300);
  };

  return (
    <KeyboardAwareScrollView>
      <Animatable.View
        animation="slideInLeft"
        duration={1000} // Adjust the duration as needed
        ref={(ref) => (this.view = ref)}
      >
        <Text style={styles.optionTitle}>Selecciona los pares</Text>
        <Text style={styles.description}>{content.description}</Text>
        <ScrollView>
          <ScrollView>
            <View style={{ flexDirection: "row", gap: 12, padding: 12 }}>
              <View style={{ flex: 1, flexDirection: "column", gap: 12 }}>
                {options.map((option, index) => {
                  return (
                    <Option
                      key={index}
                      image={content.optionsType === "text" ? null : option?.image}
                      text={option?.text}
                      isPressed={firstItemSelected === option.identifier}
                      onPress={() => handleFirstSelection(option.identifier)}
                      disabled={correctIdentifiers.includes(option.identifier)}
                      success={checkIfSuccess(option.identifier)}
                      error={correctIdentifiers.includes(option.identifier) && !checkIfSuccess(option.identifier)}
                    />
                  );
                })}
              </View>
              <View style={{ flex: 1, flexDirection: "column", gap: 12 }}>
                {answers.map((answer, index) => {
                  return (
                    <Option
                      key={index + 2}
                      image={content.answersType === "text" ? null : answer?.image}
                      text={answer?.text}
                      isPressed={secondItemSelected === answer.identifier}
                      onPress={() => handleSecondSelection(answer.identifier)}
                      success={correctIdentifiers.includes(answer.identifier)}
                      disabled={correctIdentifiers.includes(answer.identifier)}
                    />
                  );
                })}
              </View>
            </View>
          </ScrollView>
        </ScrollView>
      </Animatable.View>
    </KeyboardAwareScrollView>
  );
};

export default PairsExercise;

const Option = ({ text, image, disabled = false, isPressed = false, error = false, success = false, onPress }) => {
  const getStyles = () => {
    if (disabled) {
      return SelectStateStyles.disabled;
    }
    if (error) {
      return SelectStateStyles.error;
    }
    if (success) {
      return SelectStateStyles.success;
    }
    if (isPressed) {
      return SelectStateStyles.pressed;
    }
    return SelectStateStyles.default;
  };

  const getTextStyles = () => {
    if (disabled) {
      return TextStateStyles.disabled;
    }
    if (error) {
      return TextStateStyles.error;
    }
    if (success) {
      return TextStateStyles.success;
    }
    if (isPressed) {
      return TextStateStyles.pressed;
    }

    return TextStateStyles.default;
  };

  return (
    <TouchableWithoutFeedback onPress={disabled ? null : onPress}>
      <Animatable.View
        animation="fadeIn"
        duration={1000} // Adjust the duration as needed
        ref={(ref) => (this.view = ref)}
        style={[styles.container, getStyles()]}
      >
        {image ? (
          <View style={[styles.imageContainer, { width: "100%", height: 150, borderWidth: 0, opacity: disabled ? 0.3 : 1 }]}>
            <Image src={image} style={styles.image} />
          </View>
        ) : (
          <Text style={[styles.text, getTextStyles()]}>{text}</Text>
        )}
      </Animatable.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  optionTitle: {
    color: Colors.gray_600,
    fontFamily: "Sora-SemiBold",
    fontSize: 20,
    lineHeight: 32,
    marginHorizontal: 12,
  },
  description: {
    color: Colors.gray_500,
    fontFamily: "Sora-Medium",
    fontSize: 15,
    lineHeight: 20,
    marginHorizontal: 12,
  },
  text: {
    color: Colors.gray_500,
    fontFamily: "Sora-Medium",
    fontSize: 15,
    lineHeight: 24,
  },
  pressableContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: Colors.gray_100,
    padding: 8,
  },
  pressableContainerPressed: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: Colors.primary_500,
    padding: 8,
  },
  textOption: {
    fontSize: 16,
    fontFamily: "Sora-Medium",
    color: Colors.gray_600,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: Colors.gray_100,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

const SelectStateStyles = {
  default: {
    borderWidth: 2,
    borderColor: Colors.gray_200,
  },
  pressed: {
    borderWidth: 3,
    borderColor: SemanticColors.bg.primary_normal,
  },
  success: {
    borderWidth: 3,
    borderColor: Colors.success_500,
  },
  error: {
    borderWidth: 3,
    borderColor: Colors.error_500,
  },
  disabled: {
    borderWidth: 2,
    borderColor: Colors.gray_100,
  },
};
const TextStateStyles = {
  default: {
    fontFamily: "Sora-Regular",
    color: Colors.gray_300,
  },
  pressed: {
    fontFamily: "Sora-SemiBold",

    color: SemanticColors.bg.primary_normal,
  },
  success: {
    fontFamily: "Sora-SemiBold",

    color: Colors.success_500,
  },
  error: {
    fontFamily: "Sora-SemiBold",

    color: Colors.error_500,
  },
  disabled: {
    fontFamily: "Sora-Regular",
    color: Colors.gray_200,
  },
};
