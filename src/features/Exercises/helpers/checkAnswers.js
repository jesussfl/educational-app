export const checkSimpleSelectionAnswer = (mainAnswer, userAnswer) => {
  const correctAnswer = mainAnswer.options.findIndex((option) => option.isCorrect);

  if (userAnswer === correctAnswer) {
    return true;
  }
  return false;
};

export const checkCompletionAnswer = (mainAnswer, userAnswer) => {
  //get just the words that are correct
  const correctWords = mainAnswer.words
    .filter((word) => {
      return word.isCorrect;
    })
    .map((word) => {
      return word.name;
    });

  if (userAnswer.length !== correctWords.length) {
    return false;
  }
  for (let i = 0; i < userAnswer.length; i++) {
    if (correctWords[i] !== userAnswer[i]) {
      return false;
    }
  }

  return true;
};

export default exercisesChecker = {
  simpleSelection: checkSimpleSelectionAnswer,
  completion: checkCompletionAnswer,
};
