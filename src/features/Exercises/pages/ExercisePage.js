import { StyleSheet, View, Text } from "react-native";
import React from "react";

import { CloseCircle } from "iconsax-react-native";
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
      <View style={styles.pageContainer}>
         <View style={styles.topBar}>
            <CloseCircle size={32} color={Colors.gray_300} onPress={() => handler.close()} />
            {status.isEmpty ? null : <ProgressBar percentage={`${handler.percentage}%`} />}
            <UserStats statusToShow={"lives"} />
         </View>
         {status.isEmpty ? <Text>Vacio</Text> : handler.render()}
         <View style={styles.buttonContainer}>
            {answer.isCorrect != null ? (
               <Button text="Continuar" variant={answer.isCorrect ? "success" : "wrong"} style={{ flex: 1 }} onPress={handler.next} />
            ) : (
               <Button text="Comprobar" variant="primary" style={{ flex: 1 }} onPress={answer.check} />
            )}
         </View>
      </View>
   );
};

export default ExercisePage;

const styles = StyleSheet.create({
   pageContainer: { justifyContent: "space-between", flex: 1 },
   topBar: { alignItems: "center", justifyContent: "center", flexDirection: "row", padding: 24, gap: 16 },
   buttonContainer: {
      gap: 16,
      flexDirection: "row",
      alignItems: "center",
      padding: 24,
   },
});
