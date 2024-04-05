export const checkSimpleSelectionAnswer = (mainAnswer, userAnswer) => {
  const correctAnswerIndex = mainAnswer.options.findIndex((option) => option.isCorrect);
  const correctAnswer = mainAnswer.options.find((option) => option.isCorrect);
  if (userAnswer === correctAnswerIndex) {
    return {
      isCorrect: true,
      correctAnswer: correctAnswer.text,
    };
  }
  return {
    isCorrect: false,
    correctAnswer: correctAnswer.text,
  };
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
    return {
      isCorrect: false,
      correctAnswer: correctWords,
    };
  }
  for (let i = 0; i < userAnswer.length; i++) {
    if (correctWords[i] !== userAnswer[i]) {
      return {
        isCorrect: false,
        correctAnswer: correctWords,
      };
    }
  }

  return {
    isCorrect: true,
    correctAnswer: correctWords,
  };
};

export default exercisesChecker = {
  simpleSelection: checkSimpleSelectionAnswer,
  completion: checkCompletionAnswer,
};
