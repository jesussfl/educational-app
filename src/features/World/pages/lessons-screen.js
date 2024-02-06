import React, { useEffect } from "react";

//Components
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import GiftModal from "../components/GiftModal";
import Spinner from "react-native-loading-spinner-overlay";

import WorldSections from "../components/world-sections";
import LessonBottomsheet from "../components/Lesson-bottomsheet";
//Hooks
import useSocketStore from "@stores/useSocketStore";
import LivesModal from "../components/lives-modal";
import { useSections } from "../hooks/useSections";
import { useAuthContext } from "@contexts/auth.context";

const WorldScreen = () => {
  const {
    user: { email },
  } = useAuthContext();
  const { sections, completedLessons, isLoading, error } = useSections();
  const { socket, emit, connect } = useSocketStore((state) => state);

  useEffect(() => {
    connect();
  }, [connect]);

  useEffect(() => {
    if (!socket) return;
    emit("join", { socketId: socket.id, name: email });
  }, [socket?.id, email]);

  useEffect(() => {
    if (!socket) return;

    socket.on("broadcast", (message) => {
      console.log("MESSAGE FROM SERVER", message);
    });

    return () => {
      socket.off("broadcast");
    };
  }, [socket]);

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

      {isLoading ? (
        <Spinner visible={isLoading} />
      ) : (
        <>
          <WorldSections sections={sections} completedLessons={completedLessons} />
          <LessonBottomsheet />
          <GiftModal />
          <LivesModal />
        </>
      )}
    </>
  );
};

export default WorldScreen;
