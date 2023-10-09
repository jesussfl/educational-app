import React, { useState, useCallback } from "react";
import { View } from "react-native";
import WorldSections from "../components/WorldSections";
import { StatusBar } from "expo-status-bar";
import { Button } from "@components";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import useBottomSheet from "@utils/hooks/useBottomSheet";
import { PlayCircle, Book1 } from "iconsax-react-native";
import { Colors } from "@utils/Theme";
const WorldScreen = ({ navigation }) => {
   const { bottomSheetModalRef, snapPoints, handlePresentModalPress, handleSheetChanges } = useBottomSheet();
   const [lessonId, setLessonId] = useState(null);
   const renderBackdrop = useCallback(
      (props) => <BottomSheetBackdrop {...props} opacity={0.3} disappearsOnIndex={1} appearsOnIndex={2} />,
      []
   );
   return (
      <>
         <StatusBar style="dark" />
         <WorldSections handlePresentModalPress={handlePresentModalPress} setLessonId={setLessonId}></WorldSections>
         <BottomSheet
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={(index) => handleSheetChanges(index)}
            enableOverDrag={true}
            enableDismissOnClose={true}
            enablePanDownToClose={true}
            backdropComponent={renderBackdrop}>
            <View style={{ padding: 24, gap: 24 }}>
               <Button
                  text="Empezar Lección"
                  variant="primary"
                  size="medium"
                  rightIcon={<PlayCircle size={28} color={"#fff"} variant="Bold" />}
                  onPress={() => {
                     bottomSheetModalRef.current?.close();
                     navigation.navigate("Lessons", { screen: "Exercise", params: { lessonId } });
                  }}
               />
               <Button
                  text="Leer Contenido"
                  variant="secondary"
                  size="medium"
                  rightIcon={<Book1 size={28} color={Colors.gray_500} variant="Bold" />}
               />
            </View>
         </BottomSheet>
      </>
   );
};

export default WorldScreen;
