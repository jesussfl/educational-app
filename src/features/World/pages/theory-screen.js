import { StyleSheet, Text, View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Colors } from "@utils/Theme";
import { Button } from "@components";
import { useQuery } from "@tanstack/react-query";
import { query } from "@utils/graphql/client/GraphQLCLient";
import { querySectionById } from "@utils/graphql/queries/section.queries";
import SectionContentHTML from "../components/SectionContentHTML";
const TheoryScreen = ({ route }) => {
  const { id } = route.params;
  const { data, isLoading, error } = useQuery([`section-${id}`], () =>
    query(querySectionById, { id: id })
  );
  if (error) {
    console.log(error);
    return <Text>{`Hubo un error: ${error}`}</Text>;
  }
  const content =
    data?.crefinexSection?.data?.attributes?.content.replace(
      /http:\/\/localhost:1337/g,
      process.env.EXPO_PUBLIC_API_URL
    ) || "";

  console.log(content);
  return (
    <>
      <StatusBar style="auto" />
      <ScrollView style={styles.PageContainer}>
        <View style={styles.header}>
          <Text style={styles.headline}>Sección</Text>
          <Text style={styles.title}>Teoria de los principios del ahorro</Text>
          <Text style={styles.description}>
            Explora y prueba las distintas guias de diseño usadas para asegurar
            una excelente experiencia de usuario
          </Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.details}>El ahorro -</Text>
            <Text style={styles.details}>7 min</Text>
          </View>
          <View style={styles.actions}>
            <Button
              text="Comenzar"
              variant="primary"
              size="small"
              onPress={() => {}}
              style={{ paddingVertical: 8 }}
            />
          </View>
        </View>

        <View style={styles.content}>
          {isLoading ? (
            <Text>Cargando...</Text>
          ) : (
            <SectionContentHTML html={content || ""} />
          )}
        </View>
      </ScrollView>
      {/* <View style={{ position: "absolute", right: 0, bottom: 0, width: "100%", padding: 16 }}>
            <Button text="Comenzar" variant="primary" size="small" onPress={() => {}} />
         </View> */}
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
