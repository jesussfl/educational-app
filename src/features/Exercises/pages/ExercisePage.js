import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { CloseCircle, ArrowRight, TickCircle, InfoCircle, HeartSlash } from "iconsax-react-native";
import { Colors } from "@utils/Theme";
import Spinner from "react-native-loading-spinner-overlay";
import ProgressBar from "../components/ProgressBar";
import { Button } from "@components";
import useExerciseManagement from "../hooks/useExerciseManagement";
import UserStats from "../../World/components/UserStats";
import Modal from "../components/Modal";
const ExercisePage = () => {
  const { status, handler, answer, countdown, isCountdownActive, initialCountdownValue } = useExerciseManagement();
  const [modalVisible, setModalVisible] = React.useState(false);
  if (status.isLoading) {
    return <Spinner visible={status.isLoading} />;
  }
  return (
    <>
      <StatusBar style="auto" translucent={true} />
      <View style={styles.pageContainer}>
        <View style={styles.topBar}>
          <CloseCircle size={32} color={Colors.gray_300} onPress={() => setModalVisible(true)} />
          {status.isEmpty ? null : <ProgressBar percentage={`${handler.percentage}%`} />}
        </View>
        {status.isEmpty ? <Text>Vacio</Text> : handler.render()}

        {answer.isCorrect != null ? (
          <View style={styles.answeredContainer}>
            <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
              {answer.isCorrect ? (
                <TickCircle size={28} color={Colors.success_500} variant="Bold" />
              ) : (
                <HeartSlash size={28} color={Colors.error_500} variant="Bold" />
              )}
              <Text
                style={{
                  color: Colors.gray_500,
                  fontSize: 20,
                  fontFamily: "Sora-Bold",
                }}
              >
                {answer.isCorrect ? "Bien Hecho!" : "Incorrecto!"}
              </Text>
            </View>
            <Button
              text="Continuar"
              variant={answer.isCorrect ? "success" : "wrong"}
              rightIcon={answer.isCorrect ? <ArrowRight size={24} color={"#fff"} variant="Bold" /> : <InfoCircle size={24} color={"#fff"} variant="Bold" />}
              onPress={handler.next}
            />
          </View>
        ) : (
          <View>
            {isCountdownActive ? (
              <View style={{ height: 10, width: `${(countdown * 100) / initialCountdownValue}%`, backgroundColor: Colors.primary_600 }}></View>
            ) : null}
            <View style={styles.buttonContainer}>
              <UserStats statusToShow={"lives"} style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }} />

              <Button
                text="Comprobar"
                variant="primary"
                disabled={answer.userAnswer == null || answer.userAnswer.length === 0}
                rightIcon={<ArrowRight size={24} color={"#fff"} variant="Bold" />}
                style={{ flex: 1 }}
                onPress={answer.check}
              />
            </View>
          </View>
        )}
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
