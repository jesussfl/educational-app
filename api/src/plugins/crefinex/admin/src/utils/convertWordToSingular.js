export const convertWordToSingular = (word) => {
  if (word.endsWith("ies")) {
    return word.replace(/ies$/, "y");
  }
  if (word.endsWith("s")) {
    return word.replace(/s$/, "");
  }
  if (word.endsWith("es")) {
    return word.replace(/es$/, "e");
  }
};
