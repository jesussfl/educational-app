import { create } from "zustand";

const initialState = {
  currentExerciseIndex: 0,
  currentExerciseType: null,
  currentExercise: null,
  userAnswer: [],
  mistakes: [],
  isAnswerCorrect: null,
  startTime: null,
  endTime: null,
};

export const useExercises = create((set) => ({
  ...initialState,
  nextExercise: () => {
    set((state) => ({
      currentExerciseIndex: state.currentExerciseIndex + 1,
    }));
  },
  setUserAnswer: (value) => {
    set({ userAnswer: value });
  },
  setIsAnswerCorrect: (value) => {
    set({ isAnswerCorrect: value });
  },
  setMistakes: (value) => {
    set({ mistakes: value });
  },
  setStartTime: () => {
    set({ startTime: new Date().getTime() });
  },
  setEndTime: () => {
    set({ endTime: new Date().getTime() });
  },
  setCurrentExercise: (value) => {
    set({ currentExercise: value });
  },
  setCurrentExerciseType: (value) => {
    set({ currentExerciseType: value });
  },
  reset: () => {
    set(initialState);
  },
}));
