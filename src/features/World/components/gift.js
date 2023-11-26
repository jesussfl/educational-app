import React from "react";
import { Image, TouchableWithoutFeedback, View, StyleSheet } from "react-native";
import { Svg, Line } from "react-native-svg";
import * as Animatable from "react-native-animatable";
import { useLessonModal } from "@stores/lesson-modal";

import { Colors } from "@utils/Theme";

import CompletedGift from "../../../../assets/giftCompleted.png";
import UnlockedGift from "../../../../assets/giftUnlocked.png";
import LockedGift from "../../../../assets/Gift.png";
function Gift({ isLessonCompleted, isLocked, id }) {
  const { addLessonId, addLessonStatus, onOpen, addIsLastLesson, addLessonType } = useLessonModal((state) => state);
  let source;
  if (isLessonCompleted) {
    source = Image.resolveAssetSource(CompletedGift).uri;
  } else if (!isLessonCompleted && !isLocked) {
    source = Image.resolveAssetSource(UnlockedGift).uri;
  } else {
    source = Image.resolveAssetSource(LockedGift).uri;
  }
  return (
    <View style={{ alignItems: "center" }}>
      <Svg width="100" height="180" style={{ marginBottom: -36, marginTop: -106 }}>
        <Line x1="50%" y1="0" x2="50%" y2="100%" stroke={Colors.gray_50} strokeWidth="80" />
        <Line x1="50%" y1="0" x2="50%" y2="100%" stroke={Colors.gray_200} strokeWidth="15" />
      </Svg>
      <Animatable.View animation={isLessonCompleted ? null : "pulse"} easing="ease-out" iterationCount="infinite">
        <TouchableWithoutFeedback
          onPress={() => {
            if (isLessonCompleted) return;

            addLessonType("gift");
            addLessonId(id);
            addLessonStatus("completed");
            addIsLastLesson(false);
          }}
        >
          <Image source={{ uri: source }} style={styles.giftImage} />
        </TouchableWithoutFeedback>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 28,
    alignItems: "center",
    flexDirection: "column-reverse",
  },
  giftImage: {
    width: 150,
    height: 150,
    marginVertical: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 16,
    alignSelf: "center",
  },
});
export default Gift;
