import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from "react-native";
import { Colors } from "@utils/Theme";
import { Button } from "@components";
import { VolumeHigh, VolumeSlash } from "iconsax-react-native";
import Voice from "@react-native-voice/voice";
const SpeechExercise = () => {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = (err) => setError(err.error);
    Voice.onSpeechResults = (result) => setResult(result.value[0]);

    return () => {
      Voice.destroy().then(Voice.removeAllListeners());
    };
  }, []);
  const onSpeechStart = (event) => {
    console.log("Recording", event);
  };
  const startRecording = async () => {
    try {
      await Voice.start("en-US");
      setIsRecording(true);
      console.log("holaaa");
    } catch (err) {
      setError(err);
    }
  };
  const onSpeechEnd = (event) => {
    console.log("ending", event);
  };
  const stopRecording = async () => {
    try {
      await Voice.stop();
      Voice.removeAllListeners();
      setIsRecording(false);
    } catch (error) {
      setError(error);
    }
  };
  return (
    <ScrollView style={styles.PageContainer}>
      <View style={{ flexDirection: "row", gap: 12, alignSelf: "center" }}>
        {/* <Text>{result}</Text>
        <Text>{error}</Text> */}
        <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
          <Text>{isRecording ? "Stop recording" : "Start recording"}</Text>
        </TouchableOpacity>
        <Button
          onPress={() => (isRecording ? stopRecording() : startRecording())}
          variant={"secondary"}
          leftIcon={<VolumeHigh variant="Bold" size={24} color="#9A4CFF" />}
          text="Start"
          style={{ alignSelf: "center" }}
        />
        <Button
          variant={"secondary"}
          leftIcon={<VolumeSlash variant="Bold" size={24} color={Colors.error_500} />}
          text="Stop"
          style={{ alignSelf: "center" }}
        />
      </View>
    </ScrollView>
  );
};

export default SpeechExercise;

const styles = StyleSheet.create({
  header: {
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: "Sora-SemiBold",
    lineHeight: 32,
    color: Colors.gray_600,
    textAlign: "center",
  },
  description: {
    fontFamily: "Sora-Regular",
    fontSize: 16,
    lineHeight: 24,
    color: Colors.gray_400,
    textAlign: "center",
  },
  headline: {
    fontSize: 15,
    fontFamily: "Sora-SemiBold",
    lineHeight: 20,
    color: Colors.gray_300,
    textAlign: "center",
  },
  detailsContainer: {
    flexDirection: "row",
    gap: 8,
    alignSelf: "center",
  },
  details: {
    fontSize: 14,
    fontFamily: "Sora-Regular",
    lineHeight: 20,
    color: Colors.gray_300,
    textAlign: "center",
  },
  PageContainer: {
    marginTop: 32,
  },
  actions: {
    alignSelf: "center",
    width: "50%",
    paddingHorizontal: 16,
  },
  content: {
    padding: 24,
  },
});
