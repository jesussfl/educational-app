import useExerciseSound from "./useExerciseSound";
import { ToastAndroid } from "react-native";
import { useEffect, useState } from "react";
import { useExercises } from "@stores/useExerciseStore";
export const useMemoryExercise = (pairsLength) => {
  const { playSound, playErrorSound } = useExerciseSound();
  const { setUserAnswer, userAnswer } = useExercises();
  const [firstItemSelected, setFirstItemSelected] = useState({
    text: "",
    key: "",
  });
  const [secondItemSelected, setSecondItemSelected] = useState({});
  const [correctIdentifiers, setCorrectIdentifiers] = useState([]);

  const checkSelections = () => {
    if (!firstItemSelected.text || !secondItemSelected.text) {
      return;
    }

    if (firstItemSelected.text === secondItemSelected.text) {
      playSound();
      setCorrectIdentifiers(correctIdentifiers.find((i) => i === firstItemSelected) ? correctIdentifiers : [...correctIdentifiers, firstItemSelected]);
      setFirstItemSelected({});
      setSecondItemSelected({});

      return;
    }

    playErrorSound();
    ToastAndroid.showWithGravity("Marcaste opciones incorrectas", ToastAndroid.SHORT, ToastAndroid.TOP);
    setFirstItemSelected({});
    setSecondItemSelected({});
  };
  useEffect(() => {
    checkSelections();
  }, [firstItemSelected.text, secondItemSelected.text]);

  useEffect(() => {
    if (correctIdentifiers.length === pairsLength) {
      setUserAnswer(correctIdentifiers);
    }
  }, [correctIdentifiers]);
  const handleFirstSelection = (selection) => {
    if (firstItemSelected !== selection) {
      setFirstItemSelected(selection);
      return;
    }

    if (firstItemSelected === selection) {
      setFirstItemSelected("");
      return;
    }
  };
  const handleSelections = (item) => {
    if (firstItemSelected === item.key) {
      setFirstItemSelected({});
      return;
    } else if (firstItemSelected && firstItemSelected.key === item.key) {
      setFirstItemSelected(item);
      return;
    }

    if (secondItemSelected === item.key) {
      setSecondItemSelected({});
      return;
    } else if (secondItemSelected && secondItemSelected.key === item.key) {
      setSecondItemSelected(item);
      return;
    }
  };
  const handleSecondSelection = (selection) => {
    if (secondItemSelected !== selection) {
      setSecondItemSelected(selection);
      return;
    }

    if (secondItemSelected === selection) {
      setSecondItemSelected("");
      return;
    }
  };

  const checkIfSuccess = (identifier) => {
    if (firstItemSelected === identifier && secondItemSelected === identifier) {
      return true;
    }

    return false;
  };

  return {
    firstItemSelected,
    secondItemSelected,
    correctIdentifiers,
    setFirstItemSelected,
    setSecondItemSelected,

    checkIfSuccess,
    checkSelections,
    handleSelections,
    handleFirstSelection,
    handleSecondSelection,
  };
};
