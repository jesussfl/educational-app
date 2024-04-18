import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback, Image, FlatList } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Colors, SemanticColors } from "@utils/Theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Animatable from "react-native-animatable";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
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

const datas = [
  { key: "1", identifier: "A1", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6FjAMRbFlhyjU49DAVH0p0jmQbcQ_DT2qqLQPOwQblA&s" },
  { key: "2", identifier: "A2", text: "test" },
  { key: "3", identifier: "A3", text: "hola" },
];
const MemoryExercise = ({ content }) => {
  const { checkIfError, handleSelections, firstItemSelected, secondItemSelected, correctIdentifiers } = useMemoryExercise(content.options.length);
  const [showQuestionMarks, setShowQuestionMarks] = useState(false);
  const [data, setData] = useState([]);
  const [isFlipping, setIsFlipping] = useState(false);
  const timeoutRef = useRef(null);
  const displayTime = 10000;
  const [counter, setCounter] = useState(displayTime / 1000);
  // console.log(content);
  // const data = [
  //   ...content.options.map((item) => ({ ...item, key: Math.random().toString(), identifier: item.identifier.toString() })),
  //   ...content.options.map((item) => ({ ...item, key: Math.random().toString(), identifier: item.identifier.toString() })),
  // ];

  const slidenIn = () => {
    this.view.slideInRight(300);
  };
  useEffect(() => {
    setData(
      [
        ...content.options.map((item) => ({ ...item, key: Math.random().toString() })),
        ...content.options.map((item) => ({ ...item, key: Math.random().toString() })),
      ].sort((a, b) => 0.5 - Math.random())
    );

    slidenIn();

    // Oculta el mensaje después del tiempo especificado
    timeoutRef.current = setTimeout(() => {
      setShowQuestionMarks(true);
    }, displayTime);

    const counterTimer = setInterval(() => {
      // Decrementa el contador si no es cero
      setCounter((prevCounter) => {
        if (prevCounter === 0) {
          clearInterval(counterTimer); // Detiene el temporizador cuando el contador llega a cero
          return 0; // Asegura que el contador permanezca en cero
        }
        return prevCounter - 1;
      });
    }, 1000);

    // Limpia el temporizador cuando el componente se desmonta
    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(counterTimer);
    };
  }, []);

  const handleShowQuestionMarks = (isSelected, item) => {
    if (correctIdentifiers.includes(item.key)) {
      return false;
    }
    if (!showQuestionMarks) {
      return false;
    }

    if (isSelected) {
      return false;
    }

    return true;
  };
  const renderItem = ({ item }) => {
    const isSelected = firstItemSelected.key === item.key || secondItemSelected.key === item.key;
    return (
      <Option
        image={item?.image}
        onPress={() => {
          handleSelections(item);
        }}
        text={item?.text}
        showQuestionMark={handleShowQuestionMarks(isSelected, item)}
        disabled={correctIdentifiers.includes(item.identifier)}
        error={checkIfError(item)}
        isFlipping={isFlipping}
        setIsFlipping={setIsFlipping}
        isPressed={firstItemSelected.key === item.key || secondItemSelected.key === item.key}
      />
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <Animatable.View
        animation="slideInLeft"
        duration={1000} // Adjust the duration as needed
        ref={(ref) => (this.view = ref)}
      >
        <Text style={styles.optionTitle}>Memoriza y selecciona las parejas</Text>
        {/* Show a progress bar here */}

        {counter === 0 ? null : (
          <View style={{ flexDirection: "row", gap: 12, padding: 12, justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.description}>{`Volteando tarjetas en ${counter} segundos`}</Text>
          </View>
        )}
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
      </Animatable.View>
    </View>
  );
};

export default MemoryExercise;

const Option = ({
  text,
  isFlipping,
  setIsFlipping,
  image,
  disabled = false,
  isPressed = false,
  error = false,
  success = false,
  onPress,
  showQuestionMark = false,
}) => {
  const timeoutRef = useRef(null);

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
  const rotate = useSharedValue(1);
  useEffect(() => {
    // Oculta el mensaje después del tiempo especificado
    timeoutRef.current = setTimeout(() => {
      rotate.value = 0;
    }, 10000);

    // Limpia el temporizador cuando el componente se desmonta
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);
  useEffect(() => {
    if (error && isPressed) {
      setIsFlipping(true);
      setTimeout(() => {
        rotate.value = 0;
        setTimeout(() => {
          setIsFlipping(false);
        }, 300);
      }, 900); // 1000 milisegundos = 1 segundo
    }

    return () => {};
  }, [error, isPressed]);
  const frontAnimatedStyles = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotate.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${rotateValue}deg`, { duration: 1000 }),
        },
      ],
    };
  });
  const backAnimatedStyles = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotate.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${rotateValue}deg`, { duration: 1000 }),
        },
      ],
    };
  });
  const handleClick = () => {
    if (!showQuestionMark || disabled || isFlipping) {
      return;
    }

    if (!isPressed) rotate.value = rotate.value === 0 ? 1 : 0;

    onPress();
  };

  return (
    <TouchableWithoutFeedback onPress={disabled ? null : handleClick}>
      <View>
        <Animated.View style={[styles.frontCard, styles.container, getStyles(), frontAnimatedStyles, { borderWidth: 2, opacity: disabled ? 0.3 : 1 }]}>
          <Image src={"https://i.pinimg.com/736x/93/ae/51/93ae515eb75b21f3af334fd3888ee367.jpg"} style={styles.image} />
        </Animated.View>
        <Animated.View style={[styles.container, styles.backCard, getStyles(), backAnimatedStyles, { borderWidth: 2, opacity: disabled ? 0.3 : 1 }]}>
          {image ? <Image src={image} style={styles.image} /> : <Text style={[styles.text, { marginHorizontal: 12 }]}>{text}</Text>}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  frontCard: {
    position: "absolute",

    backfaceVisibility: "hidden",
  },
  backCard: {
    backfaceVisibility: "hidden",
    backgroundColor: Colors.gray_100,
  },
  container: {
    width: 100,
    height: 100,
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
