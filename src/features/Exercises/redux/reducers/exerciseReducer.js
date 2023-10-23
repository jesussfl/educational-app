export const initialState = {
  currentExerciseIndex: 0,
  exercises: [],
  userAnswer: [],
  mistakes: [],
  currentExercise: null,
  isAnswerCorrect: null,
  startTime: null,
  endTime: null,
};

export const exerciseTypes = {
  NEXT_EXERCISE: "NEXT_EXERCISE",
  SET_USER_ANSWER: "SET_USER_ANSWER",
  SET_IS_ANSWER_CORRECT: "SET_IS_ANSWER_CORRECT",
  SET_MISTAKES: "SET_MISTAKES",
  SET_START_TIME: "SET_START_TIME",
  SET_END_TIME: "SET_END_TIME",
  SET_EXERCISES: "SET_EXERCISES",
  SET_CURRENT_EXERCISE: "SET_CURRENT_EXERCISE",
};

export const exerciseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEXT_EXERCISE":
      return {
        ...state,
        currentExerciseIndex: state.currentExerciseIndex + 1,
        currentExercise: state.exercises[state.currentExerciseIndex + 1],
      };
    case "SET_USER_ANSWER":
      return {
        ...state,
        userAnswer: action.payload,
      };
    case "SET_IS_ANSWER_CORRECT":
      return {
        ...state,
        isAnswerCorrect: action.payload,
      };
    case "SET_MISTAKES":
      return {
        ...state,
        mistakes: [...state.mistakes, action.payload],
      };
    case "SET_START_TIME":
      return {
        ...state,
        startTime: new Date().getTime(),
      };
    case "SET_END_TIME":
      return {
        ...state,
        endTime: new Date().getTime(),
      };
    case "SET_EXERCISES":
      return {
        ...state,
        exercises: [...action.payload].sort((a, b) => a.order - b.order),
      };
    case "SET_CURRENT_EXERCISE":
      return {
        ...state,
        currentExercise: action.payload,
      };
    default:
      return state;
  }
};
