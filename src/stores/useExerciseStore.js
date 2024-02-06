import { create } from "zustand";

const initialState = {
  exercises: [],
  currentExerciseIndex: 0,
  currentExerciseType: null,
  currentExercise: null,
  userAnswer: [],
  mistakes: [],
  isAnswerCorrect: null,
  startTime: null,
  endTime: null,
  correctAnswers: 0,
};

export const useExercises = create((set) => ({
  ...initialState,
  nextExercise: () => {
    set((state) => ({
      isAnswerCorrect: null,
      userAnswer: [],
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
  setExercises: (value) => {
    set({ exercises: value });
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
  addNewExercise: (value) => {
    set((state) => ({
      exercises: [...state.exercises, value],
    }));
  },
  sumCorrectAnswer: () => {
    set((state) => ({
      correctAnswers: state.correctAnswers + 1,
    }));
  },
  reset: () => {
    set(initialState);
  },
}));
