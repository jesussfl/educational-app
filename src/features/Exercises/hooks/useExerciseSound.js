import { useState, useEffect } from "react";
import { Audio } from "expo-av";

export default useExerciseSound = () => {
  const [sound, setSound] = useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(require("./success-sound.mp3"));
    setSound(sound);

    await sound.playAsync({ volume: 10 });
  }

  async function playErrorSound() {
    const { sound } = await Audio.Sound.createAsync(require("./error-sound.mp3"));
    setSound(sound);

    await sound.playAsync({ volume: 10 });
  }
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return { playSound, playErrorSound };
};
