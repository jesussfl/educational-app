import React, { useState } from "react";
import { View } from "react-native";
import WorldSections from "../components/WorldSections";

import { Button } from "@components";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import useBottomSheet from "@utils/hooks/useBottomSheet";
const WorldScreen = ({ navigation }) => {
   const { bottomSheetModalRef, snapPoints, handlePresentModalPress, handleSheetChanges } = useBottomSheet();
   const [lessonId, setLessonId] = useState(null);

   return (
      <BottomSheetModalProvider>
         <WorldSections handlePresentModalPress={handlePresentModalPress} setLessonId={setLessonId}></WorldSections>
         <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={(index) => handleSheetChanges(index)}
            enableOverDrag={true}
            enableDismissOnClose={true}
            enablePanDownToClose={true}>
            <View style={{ padding: 24, gap: 24 }}>
               <Button
                  text="Start Lesson"
                  variant="primary"
                  size="medium"
                  onPress={() => {
                     bottomSheetModalRef.current?.close();
                     navigation.navigate("Lessons", { screen: "Exercise", params: { lessonId } });
                  }}
               />
               <Button text="Read Theory" variant="secondary" size="medium" />
            </View>
         </BottomSheetModal>
      </BottomSheetModalProvider>
   );
};

export default WorldScreen;
