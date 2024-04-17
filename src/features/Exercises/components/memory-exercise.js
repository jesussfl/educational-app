import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, SemanticColors } from "@utils/Theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Animatable from "react-native-animatable";
import { usePairsExercise } from "../hooks/usePairsExercise";
import { useMemoryExercise } from "../hooks/useMemoryExercise";

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

const data = [
  { key: "1", text: "A1", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6FjAMRbFlhyjU49DAVH0p0jmQbcQ_DT2qqLQPOwQblA&s" },
  { key: "2", text: "A2" },
  { key: "3", text: "A1", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6FjAMRbFlhyjU49DAVH0p0jmQbcQ_DT2qqLQPOwQblA&s" },
  { key: "4", text: "A4" },
  { key: "5", text: "A3" },
  { key: "6", text: "A4" },
  { key: "7", text: "B3" },
  { key: "8", text: "B3" },
  { key: "9", text: "C1" },
  { key: "10", text: "C2" },
  { key: "11", text: "C3" },
  { key: "12", text: "C4" },
  { key: "13", text: "D1" },
  { key: "14", text: "D2" },
  { key: "15", text: "D3" },
  { key: "16", text: "D5" },
];
const MemoryExercise = ({ content }) => {
  const { checkIfSuccess, handleSelections, handleFirstSelection, handleSecondSelection, firstItemSelected, secondItemSelected, correctIdentifiers } =
    useMemoryExercise(data.length);
  const slidenIn = () => {
    this.view.slideInRight(300);
  };
  useEffect(() => {
    slidenIn();
  }, []);

  const renderItem = ({ item }) => (
    <Option
      image={item?.image}
      onPress={() => {
        handleSelections(item);
      }}
      text={item.text}
      success={correctIdentifiers.includes(item.key)}
      isPressed={firstItemSelected.key === item.key || secondItemSelected.key === item.key}
    />
  );
  return (
    <KeyboardAwareScrollView>
      <Animatable.View
        animation="slideInLeft"
        duration={1000} // Adjust the duration as needed
        ref={(ref) => (this.view = ref)}
      >
        <Text style={styles.optionTitle}>Selecciona los pares</Text>
        {/* <Text style={styles.description}>{content.description}</Text> */}
        <ScrollView>
          <ScrollView>
            <View style={{ flexDirection: "row", gap: 12, padding: 12 }}>
              <FlatList
                style={{ flex: 1, rowGap: 12, columnGap: 12, gap: 12 }}
                columnWrapperStyle={{ gap: 12 }}
                contentContainerStyle={{ gap: 12 }}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
                numColumns={3}
              />
            </View>
          </ScrollView>
        </ScrollView>
      </Animatable.View>
    </KeyboardAwareScrollView>
  );
};

export default MemoryExercise;

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
          <View style={[styles.imageContainer, { borderWidth: 0, opacity: disabled ? 0.3 : 1 }]}>
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
    minWidth: 100,
    minHeight: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    overflow: "hidden",
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
    width: 100,
    height: 100,
    borderRadius: 12,
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
