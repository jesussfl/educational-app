import useExerciseSound from "./useExerciseSound";
import { ToastAndroid } from "react-native";
import { useEffect, useState } from "react";
import { useExercises } from "@stores/useExerciseStore";
import useUserStats from "@hooks/useUserStats";
export const usePairsExercise = (pairsLength) => {
  const { playSound, playErrorSound } = useExerciseSound();
  const { decreaseLives } = useUserStats();

  const { setUserAnswer, userAnswer } = useExercises();
  const [firstItemSelected, setFirstItemSelected] = useState("");
  const [secondItemSelected, setSecondItemSelected] = useState("");
  const [correctIdentifiers, setCorrectIdentifiers] = useState([]);

  const checkSelections = () => {
    if (!firstItemSelected || !secondItemSelected) {
      return;
    }

    if (firstItemSelected === secondItemSelected) {
      playSound();
      setCorrectIdentifiers(correctIdentifiers.find((i) => i === firstItemSelected) ? correctIdentifiers : [...correctIdentifiers, firstItemSelected]);
      setFirstItemSelected("");
      setSecondItemSelected("");

      return;
    }

    playErrorSound();
    decreaseLives();
    ToastAndroid.showWithGravity("Marcaste opciones incorrectas", ToastAndroid.SHORT, ToastAndroid.TOP);
    setFirstItemSelected("");
    setSecondItemSelected("");
  };
  useEffect(() => {
    checkSelections();
  }, [firstItemSelected, secondItemSelected]);

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

    handleFirstSelection,
    handleSecondSelection,
  };
};
