import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { CloseCircle, ArrowRight, TickCircle, InfoCircle } from "iconsax-react-native";
import { Colors } from "../../../utils/Theme";
import Spinner from "react-native-loading-spinner-overlay";
import ProgressBar from "../components/ProgressBar";
import { Button } from "@components";
import useExerciseManagement from "../hooks/useExerciseManagement";
import UserStats from "../../World/components/UserStats";

const ExercisePage = () => {
   const { status, handler, answer } = useExerciseManagement();

   if (status.isLoading) {
      return <Spinner visible={status.isLoading} />;
   }

   return (
      <>
         <StatusBar style="auto" translucent={true} />
         <View style={styles.pageContainer}>
            <View style={styles.topBar}>
               <CloseCircle size={32} color={Colors.gray_300} onPress={() => handler.close()} />
               {status.isEmpty ? null : <ProgressBar percentage={`${handler.percentage}%`} />}
               <UserStats statusToShow={"lives"} />
            </View>
            {status.isEmpty ? <Text>Vacio</Text> : handler.render()}
            <View style={styles.buttonContainer}>
               <Button text="Pista" variant="secondary" style={{ flex: 0.5 }} />
               {answer.isCorrect != null ? (
                  <Button
                     text="Continuar"
                     variant={answer.isCorrect ? "success" : "wrong"}
                     style={{ flex: 1 }}
                     rightIcon={<TickCircle size={24} color={"#fff"} variant="Bold" />}
                     onPress={handler.next}
                  />
               ) : (
                  <Button
                     text="Comprobar"
                     variant="primary"
                     rightIcon={<ArrowRight size={24} color={"#fff"} variant="Bold" />}
                     style={{ flex: 1 }}
                     onPress={answer.check}
                  />
               )}
            </View>
         </View>
      </>
   );
};

export default ExercisePage;

const styles = StyleSheet.create({
   pageContainer: {
      flex: 1,
      justifyContent: "space-between",
      marginTop: StatusBar.currentHeight || 24,
   },

   topBar: {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      padding: 16,
      gap: 16,
   },
   buttonContainer: {
      borderTopWidth: 2,
      borderColor: Colors.gray_200,
      gap: 16,
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
   },
});
