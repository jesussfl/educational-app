export const loadCompletionSentence = (sentence) => {
  const regex = /\{([^}]+)\}/g;
  const words = [];
  let match;
  while ((match = regex.exec(sentence)) !== null) {
    words.push(match[1]);
  }
  return JSON.stringify({
    template: sentence,
    words,
  });
};
