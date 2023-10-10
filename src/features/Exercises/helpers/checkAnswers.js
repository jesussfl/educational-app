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

   const correctWords = mainAnswer.correctWords.slice().sort();
   const userSelectedWords = userAnswer.slice().sort();

   for (let i = 0; i < userAnswer.length; i++) {
      if (correctWords[i] !== userSelectedWords[i]) {
         return false;
      }
   }

   return true;
};

export const exercisesChecker = {
   simpleSelection: checkSimpleSelectionAnswer,
   completion: checkCompletionAnswer,
};
