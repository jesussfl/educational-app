import * as Speech from "expo-speech";

export const speak = (text) => {
  Speech.speak(text, {
    language: "es-ES",
  });
};

export const stopSpeak = () => {
  Speech.stop();
};
