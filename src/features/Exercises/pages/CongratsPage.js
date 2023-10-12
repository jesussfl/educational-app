import { StyleSheet, Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button } from "@components";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "@utils/Theme";
import ProgressBar from "../components/ProgressBar";
import { useCustomMutation } from "@utils/useCustomMutation";
import { createLessonCompletedMutation } from "@utils/graphql/mutations/lessonsCompleted.mutations";
import { useAuthContext } from "../../Auth/contexts/auth.context";
const CongratsPage = ({ route }) => {
  const { lessonId } = route.params;

  const { mutate } = useCustomMutation(
    "lessonsCompleted",
    createLessonCompletedMutation
  );
  const { user } = useAuthContext();
  const navigation = useNavigation();
  console.log(lessonId, user.id);
  const saveProgress = () => {
    mutate(
      {
        data: {
          user: user.id,
          lesson: lessonId,
        },
      },
      {
        onSuccess: () => {
          navigation.replace("Main", { screen: "Lessons" });
        },
      }
    );
  };
  return (
    <>
      <StatusBar style="dark" translucent={true} />
      <View style={styles.pageContainer}>
        <Image
          style={styles.image}
          source={require("../../../../assets/papelillos.png")}
        ></Image>
        <View style={styles.textsContainer}>
          <Text style={styles.congratsText}>¡Completaste la lección!</Text>
          <Text
            style={[
              styles.congratsText,
              { fontSize: 18, fontFamily: "Sora-Medium" },
            ]}
          >
            ¡Lo hiciste muy bien!
          </Text>
          {/* <ProgressBar percentage={"100"} /> */}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            text="Continuar"
            variant="secondary"
            style={{ flex: 1 }}
            onPress={saveProgress}
          />
        </View>
      </View>
    </>
  );
};

export default CongratsPage;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  textsContainer: {
    flex: 1,

    padding: 24,
    gap: 16,
    justifyContent: "center",
  },
  congratsText: {
    fontFamily: "Sora-Bold",
    color: Colors.gray_600,
    fontSize: 44,

    textAlign: "center",
  },
  buttonContainer: {
    gap: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 24,
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: -600,
    transform: [{ rotate: "180deg" }],
    opacity: 0.8,
    zIndex: -1,
  },
});
