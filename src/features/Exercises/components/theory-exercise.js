import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Colors } from "@utils/Theme";
import SectionContentHTML from "@features/World/components/section-theory";
// import { speak, stopSpeak } from "../helpers/speak";
import { Button } from "@components";
import { VolumeHigh, VolumeSlash } from "iconsax-react-native";

import * as Speech from "expo-speech";

const TheoryExercise = ({ content }) => {
  const theory = content.theory || "";

  const [text, setText] = useState("");
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [voices, setTextVoices] = useState(null);
  const stripHtmlTags = (html) => {
    // Elimina las etiquetas HTML utilizando regex

    return html.replace(/(<([^>]+)>)/gi, "");
  };

  const toggleVoice = async () => {
    const isSpeaking = await Speech.isSpeakingAsync();

    if (isSpeaking) {
      Speech.stop();
      setVoiceEnabled(false);
    } else {
      Speech.speak(text, {
        language: "es-ES",
        voice: "es-us-x-esc-network",
      });
      setVoiceEnabled(true);
    }
  };

  useEffect(() => {
    const textWithoutHtml = content.title + "..............." + stripHtmlTags(theory);
    const loadVoices = (counter) => {
      setTimeout(async () => {
        var voices = await Speech.getAvailableVoicesAsync();

        if (voices.length > 0) {
          setTextVoices(voices);
          console.log(voices.filter((voice) => voice.language.includes("es")));
        } else {
          console.log("voices not found");
          if (!counter || counter < 10) loadVoices((counter ?? 0) + 1);
        }
      }, (counter ?? 1) * 300);
    };

    loadVoices();
    setText(textWithoutHtml);
    Speech.speak(textWithoutHtml, {
      language: "es-ES",
      voice: "es-us-x-esc-network",
    });
    setVoiceEnabled(true);
  }, []);
  return (
    <ScrollView style={styles.PageContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>{content.title}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.details}>Lee detenidamente</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 12, alignSelf: "center" }}>
          <Button
            variant={"secondary"}
            leftIcon={<VolumeHigh variant="Bold" size={24} color="#9A4CFF" />}
            text=""
            onPress={toggleVoice}
            style={{ alignSelf: "center" }}
          />
          <Button
            variant={"secondary"}
            leftIcon={<VolumeSlash variant="Bold" size={24} color={Colors.error_500} />}
            text=""
            onPress={() => Speech.stop()}
            style={{ alignSelf: "center" }}
          />
        </View>
      </View>

      <View style={styles.content}>
        <SectionContentHTML html={theory || ""} />
      </View>
    </ScrollView>
  );
};

export default TheoryExercise;

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
