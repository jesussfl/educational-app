import { StyleSheet, Text, View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Colors } from "@utils/Theme";
import { useQuery } from "@tanstack/react-query";
import { query } from "@utils/graphql/client/GraphQLCLient";
import { querySectionById } from "@utils/graphql/queries/section.queries";
import SectionContentHTML from "../components/section-theory";
import Spinner from "react-native-loading-spinner-overlay";
// import Tts from "react-native-tts";
import { Button } from "@components";
import * as Speech from "expo-speech";
import { stopSpeak } from "@features/Exercises/helpers/speak";
const TheoryScreen = ({ route }) => {
  const { id } = route.params;
  const { data, isLoading } = useQuery([`section-${id}`], () => query(querySectionById, { id: id }));
  const [content, setContent] = useState("");
  // const content = data?.crefinexSection?.data?.attributes?.content.replace(/http:\/\/localhost:1337/g, process.env.EXPO_PUBLIC_API_URL) || "";
  const stripHtmlTags = (html) => {
    // Elimina las etiquetas HTML utilizando regex

    return html.replace(/(<([^>]+)>)/gi, "");
  };
  const speak = (text) => {
    Speech.speak(text, {
      language: "es-ES",
    });
  };
  useEffect(() => {
    setContent(data?.crefinexSection?.data?.attributes?.content);
  }, [data, isLoading]);

  useEffect(() => {
    if (content) {
      const textWithoutHtml = stripHtmlTags(content);
      console.log(textWithoutHtml);
      console.log(content);
      speak(textWithoutHtml);
    }
  }, [content]);
  if (isLoading) return <Spinner visible={isLoading} />;
  return (
    <>
      <StatusBar style="auto" />

      {isLoading ? (
        <Spinner visible={isLoading} />
      ) : (
        <ScrollView style={styles.PageContainer}>
          <View style={styles.header}>
            <Text style={styles.headline}>Sección</Text>
            <Button variant={"secondary"} text={"Voz"} onPress={() => speak("hola gfgdgdfgdfgdfgdgdfdgfgdfdfgdfg")} />
            <Button variant={"secondary"} text={"Voz"} onPress={() => stopSpeak()} />
            <Text style={styles.title}>{data.crefinexSection.data.attributes.contentTitle}</Text>
          </View>

          <View style={styles.content}>
            <SectionContentHTML html={content || ""} />
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default TheoryScreen;

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
