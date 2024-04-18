import useExerciseSound from "./useExerciseSound";
import { ToastAndroid } from "react-native";
import { useEffect, useState } from "react";
import { useExercises } from "@stores/useExerciseStore";
import useUserStats from "@hooks/useUserStats";
export const useMemoryExercise = (pairsLength) => {
  const { playSound, playErrorSound } = useExerciseSound();
  const { decreaseLives } = useUserStats();
  const { setUserAnswer, userAnswer } = useExercises();
  const [firstItemSelected, setFirstItemSelected] = useState({
    identifier: "",
    key: "",
  });
  const [secondItemSelected, setSecondItemSelected] = useState({});
  const [correctIdentifiers, setCorrectIdentifiers] = useState([]);

  const checkSelections = () => {
    if (!firstItemSelected.identifier || !secondItemSelected.identifier) {
      return;
    }

    if (firstItemSelected.identifier === secondItemSelected.identifier) {
      playSound();
      setCorrectIdentifiers(
        correctIdentifiers.find((i) => i.identifier === firstItemSelected.identifier)
          ? correctIdentifiers
          : [...correctIdentifiers, firstItemSelected.identifier]
      );
      setFirstItemSelected({});
      setSecondItemSelected({});

      return;
    }

    playErrorSound();
    decreaseLives();
    ToastAndroid.showWithGravity("Marcaste opciones incorrectas", ToastAndroid.SHORT, ToastAndroid.TOP);
    setFirstItemSelected({});
    setSecondItemSelected({});
  };
  useEffect(() => {
    checkSelections();
  }, [firstItemSelected.identifier, secondItemSelected.identifier]);

  useEffect(() => {
    if (correctIdentifiers.length === pairsLength) {
      setUserAnswer(correctIdentifiers);
    }
  }, [correctIdentifiers]);

  const handleSelections = (item) => {
    if (!firstItemSelected.key) {
      setFirstItemSelected(item);
      return;
    }
    if (firstItemSelected.key === item.key) {
      return;
    }

    if (!secondItemSelected.key) {
      setSecondItemSelected(item);
      return;
    }

    if (secondItemSelected === item.key) {
      return;
    }
  };

  const checkIfError = (item) => {
    if (!firstItemSelected.identifier || !secondItemSelected.identifier) {
      return false;
    }

    if (item.key === firstItemSelected.key || item.key === secondItemSelected.key) {
      if (firstItemSelected.identifier !== secondItemSelected.identifier) {
        return true;
      } else {
        return false;
      }
    }

    if (firstItemSelected.identifier === item.identifier && secondItemSelected.identifier === item.identifier) {
      return false;
    }

    return false;
  };

  return {
    firstItemSelected,
    secondItemSelected,
    correctIdentifiers,
    setFirstItemSelected,
    setSecondItemSelected,

    checkIfError,
    checkSelections,
    handleSelections,
  };
};
