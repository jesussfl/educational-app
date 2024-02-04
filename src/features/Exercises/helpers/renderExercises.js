import React from "react";
import { CompletionExercise, SimpleSelectionExercise } from "../components";
import TheoryExercise from "../components/theory-exercise";
import { calculateTimeSpent } from "./calculateTimeSpent";
import { useExercises } from "@stores/exercises";
const EXERCISE_TYPES = {
  simpleSelection: (content, key) => {
    return <SimpleSelectionExercise content={content} key={key} />;
  },
  completion: (content, key) => {
    return <CompletionExercise content={content} key={key} />;
  },
  theory: (content, key) => {
    return <TheoryExercise content={content} key={key} />;
  },
};
export const renderExercise = (currentExercise) => {
  if (!currentExercise) {
    return null;
  }

  const exerciseType = currentExercise.attributes.type;
  const exerciseId = currentExercise.id;
  return EXERCISE_TYPES[exerciseType](currentExercise.attributes.content, exerciseId);
};
