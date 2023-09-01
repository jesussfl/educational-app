import { useState, useEffect } from "react";
import * as Font from "expo-font";

export default function useCustomFonts() {
   const [isFontsLoaded, setIsFontsLoaded] = useState(false);

   useEffect(() => {
      async function loadFonts() {
         try {
            await Font.loadAsync({
               "Sora-Bold": require("../../../assets/fonts/Sora-Bold.ttf"),
               "Sora-Regular": require("../../../assets/fonts/Sora-Regular.ttf"),
               "Sora-Medium": require("../../../assets/fonts/Sora-Medium.ttf"),
               "Sora-Light": require("../../../assets/fonts/Sora-Light.ttf"),
               "Sora-SemiBold": require("../../../assets/fonts/Sora-SemiBold.ttf"),
               "Sora-ExtraLight": require("../../../assets/fonts/Sora-ExtraLight.ttf"),
               "Sora-ExtraBold": require("../../../assets/fonts/Sora-ExtraBold.ttf"),
            });
            setIsFontsLoaded(true);
         } catch (error) {
            console.error("Error loading fonts:", error);
         }
      }
      loadFonts();
   }, []);

   return isFontsLoaded;
}
