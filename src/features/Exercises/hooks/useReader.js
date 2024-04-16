import * as Speech from "expo-speech";
import { useEffect, useState } from "react";

export const useReader = async () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = async (text) => {
    Speech.speak(text, {
      language: "es-ES",
    });
  };

  const stopSpeak = () => {
    Speech.stop();
  };

  return {
    speak,
    stopSpeak,
    speech: Speech,
  };
};
