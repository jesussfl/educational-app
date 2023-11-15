import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { CloseCircle } from "iconsax-react-native";
import { Colors } from "@utils/Theme";
import Spinner from "react-native-loading-spinner-overlay";
import ProgressBar from "../components/ProgressBar";
import useExerciseManagement from "../hooks/useExerciseManagement";
import Modal from "../components/Modal";
import BottomActions from "../components/bottom-actions";
const ExercisePage = () => {
  const { status, handler, checkAnswer, timeRemaining, isCountdownActive, initialCountdownValue } = useExerciseManagement();
  const [modalVisible, setModalVisible] = useState(false);
  if (status.isLoading) {
    return <Spinner visible={status.isLoading} />;
  }
  return (
    <>
      <StatusBar style="auto" translucent={true} />
      <View style={styles.pageContainer}>
        <View style={styles.topBar}>
          <CloseCircle size={32} color={Colors.gray_300} onPress={() => setModalVisible(true)} />
          {<ProgressBar percentage={`${handler.percentage}%`} />}
        </View>
        {handler.render()}
        <BottomActions
          isCountdownActive={isCountdownActive}
          checkAnswer={checkAnswer}
          timeRemaining={timeRemaining}
          initialCountdownValue={initialCountdownValue}
          handler={handler}
        />
      </View>
      {modalVisible && (
        <Modal
          cancel={() => setModalVisible(false)}
          close={() => {
            setModalVisible(false);
            handler.close();
          }}
        />
      )}
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
  successBar: {
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  answeredContainer: {
    padding: 16,
    backgroundColor: "#fff",
    gap: 16,
    borderTopWidth: 2,
    borderColor: Colors.gray_200,
  },
});
