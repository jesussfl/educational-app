import React, { useState } from "react";

//Components
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import GiftModal from "../components/gift-modal";
import Spinner from "react-native-loading-spinner-overlay";

import WorldSections from "../components/world-sections";
import LessonBottomsheet from "../components/Lesson-bottomsheet";
//Hooks
import LivesModal from "../components/lives-modal";
import { useSections } from "../hooks/useSections";
import { Button } from "@components";
import { ArrowCircleDown } from "iconsax-react-native";
import { useScrollStore } from "@stores/useScrollStore";

const CurrentWorldScreen = () => {
  const { sections, completedLessons, isLoading, error } = useSections();
  const { currentCoords, sectionCoords, sectionHeight } = useScrollStore();

  const [ref, setRef] = useState(null);

  if (error) {
    return (
      <View>
        <Text>{error.message}</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar style="dark" translucent={true} />

      {isLoading || !sections ? (
        <Spinner visible={isLoading} />
      ) : (
        <>
          <WorldSections sections={sections} completedLessons={completedLessons} customRef={ref} setRef={setRef} />
          <Button
            variant={"secondary"}
            leftIcon={<ArrowCircleDown variant="Bold" size={24} color="#9A4CFF" />}
            text=""
            onPress={() => {
              if (ref && currentCoords && sectionCoords && sectionHeight) {
                ref.scrollTo({
                  x: 0,
                  y: sectionCoords + currentCoords + 100 - sectionHeight / 3,
                  animated: true,
                });
              }
            }}
            // onPress={reset}
            style={{ alignSelf: "center", marginTop: 48, position: "absolute", bottom: 24, right: 24 }}
          />
          <LessonBottomsheet />

          <GiftModal />
          <LivesModal />
        </>
      )}
    </>
  );
};

export default CurrentWorldScreen;

// Enable socket
// const {
//   user: { email },
// } = useAuthStore();
// const { sections, completedLessons, isLoading, error } = useSections();
// const { socket, emit, connect } = useSocketStore((state) => state);

// useEffect(() => {
//   connect();
// }, [connect]);

// useEffect(() => {
//   if (!socket) return;
//   emit("join", { socketId: socket.id, name: email });
// }, [socket?.id, email]);

// useEffect(() => {
//   if (!socket) return;

//   socket.on("broadcast", (message) => {
//     console.log("MESSAGE FROM SERVER", message);
//   });

//   return () => {
//     socket.off("broadcast");
//   };
// }, [socket]);
