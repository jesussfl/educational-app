import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

import { query } from "@utils/graphql/client/GraphQLCLient";
import { SemanticColors, Colors } from "@utils/Theme";
import { querySectionsByWorldId } from "@utils/graphql/queries/section.queries";
import { LessonButton, Button } from "@components";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Flag } from "iconsax-react-native";
import { useAuthContext } from "../../Auth/contexts/auth.context";
import Spinner from "react-native-loading-spinner-overlay";
const WorldScreen = ({ navigation }) => {
   const { user } = useAuthContext();
   const { data, isLoading, error } = useQuery(["sections", user.currentWorld], () =>
      query(querySectionsByWorldId, { id: user.currentWorld, start: 1, limit: 10 })
   );
   const worldName = isLoading ? "Cargando..." : data.sectionsByWorld.world.name;
   const bottomSheetModalRef = useRef(null);
   const [lessonId, setLessonId] = useState(null);
   // variables
   const snapPoints = useMemo(() => ["25%", "50%"], []);

   useEffect(() => {
      navigation.setOptions({
         title: worldName,
      });
   }, [user.currentWorld, worldName]);
   // callbacks
   const handlePresentModalPress = useCallback((lessonId) => {
      setLessonId(lessonId);
      bottomSheetModalRef.current?.present();
   }, []);
   const handleSheetChanges = useCallback((index) => {}, []);

   return isLoading ? (
      <Spinner visible={isLoading} />
   ) : (
      <BottomSheetModalProvider>
         <ScrollView style={{ gap: 24, backgroundColor: Colors.gray_50 }}>
            <View style={{}}>
               {/* Render World By Sections */}
               {data.sectionsByWorld.sections.map((section) => (
                  <View key={section.id} style={styles.sectionContainer}>
                     <View style={styles.sectionBanner}>
                        <Flag variant="Bold" size={24} color={Colors.gray_400} />
                        <Text style={styles.sectionBannerText}>{section.attributes.description}</Text>
                     </View>

                     {/* Render Lessons By Section */}
                     {section.attributes.lessons.data.map((lesson) => (
                        <LessonButton key={lesson.id} isLocked={true} onPress={() => handlePresentModalPress(lesson.id)} />
                     ))}
                  </View>
               ))}
            </View>
         </ScrollView>
         <BottomSheetModal ref={bottomSheetModalRef} index={1} snapPoints={snapPoints} onChange={handleSheetChanges}>
            <View style={{ padding: 24, gap: 24 }}>
               <Button
                  text="Start Lesson"
                  variant="primary"
                  size="medium"
                  onPress={() => navigation.navigate("Lessons", { screen: "Exercise", params: { lessonId } })}
               />
               <Button text="Read Theory" variant="secondary" size="medium" />
            </View>
         </BottomSheetModal>
      </BottomSheetModalProvider>
   );
};

export default WorldScreen;

const styles = StyleSheet.create({
   sectionBanner: {
      alignSelf: "stretch",
      backgroundColor: Colors.gray_25,
      paddingVertical: 16,
      paddingHorizontal: 24,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
   },
   sectionBannerText: {
      fontSize: 14,
      fontFamily: "Sora-Bold",
      color: Colors.gray_400,
      paddingRight: 16,
   },
   sectionContainer: {
      flex: 1,
      gap: 24,
      marginVertical: 24,
      alignItems: "center",
   },
});
