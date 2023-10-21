export const checkSimpleSelectionAnswer = (mainAnswer, userAnswer) => {
  if (userAnswer === mainAnswer.correctAnswerIndex) {
    return true;
  }
  return false;
};

export const checkCompletionAnswer = (mainAnswer, userAnswer) => {
  if (userAnswer.length !== mainAnswer.correctWords.length) {
    return false;
  }
  for (let i = 0; i < userAnswer.length; i++) {
    if (mainAnswer.correctWords[i] !== userAnswer[i]) {
      return false;
    }
  }

  return true;
};

export default exercisesChecker = {
  simpleSelection: checkSimpleSelectionAnswer,
  completion: checkCompletionAnswer,
};
