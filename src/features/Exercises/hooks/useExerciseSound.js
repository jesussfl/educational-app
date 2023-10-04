import { useState, useEffect } from "react";
import { Audio } from "expo-av";

export default useExerciseSound = () => {
   const [sound, setSound] = useState();

   async function playSound() {
      const { sound } = await Audio.Sound.createAsync(require("./success-sound.mp3"));
      setSound(sound);

      await sound.playAsync();
   }

   useEffect(() => {
      return sound
         ? () => {
              sound.unloadAsync();
           }
         : undefined;
   }, [sound]);
   return { playSound };
};
