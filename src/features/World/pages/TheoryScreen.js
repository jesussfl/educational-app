import { StyleSheet, Text, View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Colors } from "@utils/Theme";
import { Button } from "@components";
const TheoryScreen = ({ id }) => {
   return (
      <>
         <StatusBar style="auto" />
         <ScrollView style={styles.PageContainer}>
            <View style={styles.header}>
               <Text style={styles.headline}>Sección</Text>
               <Text style={styles.title}>Teoria de los principios del ahorro</Text>
               <Text style={styles.description}>
                  Explora y prueba las distintas guias de diseño usadas para asegurar una excelente experiencia de usuario
               </Text>
               <View style={styles.detailsContainer}>
                  <Text style={styles.details}>El ahorro -</Text>
                  <Text style={styles.details}>7 min</Text>
               </View>
               <View style={styles.actions}>
                  <Button text="Comenzar" variant="primary" size="small" onPress={() => {}} style={{ paddingVertical: 8 }} />
               </View>
            </View>

            <View style={styles.content}>
               <Text style={styles.paragraph}>
                  {" "}
                  Este es un texto que explica los principios del ahorro con un texto bastante largo que es utilizado para hacer pruebas
                  reales en la aplicacion de crefinex, es por eso que como minimo se necesita que este parrafo llene 6 lineas dentro de la
                  pantalla de teoria, para comprobar que la lectura sea agradable para el usuario y no afecte negativamente la experiencia
                  del usuario.
               </Text>
               <Text style={styles.paragraph}>
                  {" "}
                  Este es un texto que explica los principios del ahorro con un texto bastante largo que es utilizado para hacer pruebas
                  reales en la aplicacion de crefinex, es por eso que como minimo se necesita que este parrafo llene 6 lineas dentro de la
                  pantalla de teoria, para comprobar que la lectura sea agradable para el usuario y no afecte negativamente la experiencia
                  del usuario.
               </Text>
               <Text style={styles.contentTitle}> Ejemplo </Text>
               <View style={styles.imageExample}></View>
               <Text style={styles.paragraph}>
                  {" "}
                  Este es un texto que explica los principios del ahorro con un texto bastante largo que es utilizado para hacer pruebas
                  reales en la aplicacion de crefinex, es por eso que como minimo se necesita que este parrafo llene 6 lineas dentro de la
                  pantalla de teoria, para comprobar que la lectura sea agradable para el usuario y no afecte negativamente la experiencia
                  del usuario.
               </Text>
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

   paragraph: {
      fontFamily: "Sora-Regular",
      fontSize: 16,
      lineHeight: 27,
      color: Colors.gray_500,
      marginBottom: 20,
   },
   imageExample: {
      width: "100%",
      height: 300,
      backgroundColor: Colors.gray_50,
      marginVertical: 16,
   },
   contentTitle: {
      fontSize: 28,
      fontFamily: "Sora-SemiBold",
      lineHeight: 36,
      color: Colors.gray_600,
      marginBottom: 16,
      marginTop: 32,
   },
});
