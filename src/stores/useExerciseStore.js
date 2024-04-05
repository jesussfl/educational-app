import { create } from "zustand";

const initialState = {
  exercises: [],
  currentExerciseIndex: 0,
  currentExerciseType: null,
  currentExercise: null,
  userAnswer: [],
  mistakes: [],
  correctAnswer: null,
  isAnswerCorrect: null,
  isCheckingAnswer: false,
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
  setCorrectAnswer: (value) => {
    set({ correctAnswer: value });
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
  addMistake: (value) => {
    set((state) => ({
      mistakes: [...state.mistakes, value],
    }));
  },
  sumCorrectAnswer: () => {
    set((state) => ({
      correctAnswers: state.correctAnswers + 1,
    }));
  },
  setIsCheckingAnswer: (value) => {
    set({ isCheckingAnswer: value });
  },
  reset: () => {
    set(initialState);
  },
}));
