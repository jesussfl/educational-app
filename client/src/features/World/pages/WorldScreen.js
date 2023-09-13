import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

import { query } from "@utils/graphql/client/GraphQLCLient";
import { SemanticColors, Colors } from "@utils/Theme";
import { querySectionsByWorldId } from "@utils/graphql/queries/section.queries";
import { queryLessonsCompletedByUser } from "@utils/graphql/queries/lessonsCompleted.queries";
import { LessonButton, Button } from "@components";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Flag } from "iconsax-react-native";
import { useAuthContext } from "../../Auth/contexts/auth.context";
import Spinner from "react-native-loading-spinner-overlay";
const WorldScreen = ({ navigation }) => {
   console.log("WorldScreen");
   const { user } = useAuthContext();
   const { data, isLoading, error } = useQuery(["sections", user.currentWorld], () =>
      query(querySectionsByWorldId, { id: user.currentWorld, start: 1, limit: 10 })
   );
   const { data: lessons_completed, isLoading: isLoadingLessonsCompleted } = useQuery(["lessons_completed"], () =>
      query(queryLessonsCompletedByUser, { id: user.currentWorld, start: 1, limit: 10 })
   );
   const lessonsCompleted = isLoadingLessonsCompleted ? [] : lessons_completed.lessonsCompletedByUser.lessonsCompleted;
   console.log(lessonsCompleted);
   const worldName = isLoading ? "Cargando..." : data.sectionsByWorld.world.name;
   const bottomSheetModalRef = useRef(null);
   const [lessonId, setLessonId] = useState(null);
   const completed_lessons = ["6", "1", "7", "4"];
   // variables
   const snapPoints = useMemo(() => ["25%", "50%"], []);
   let last_index;
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

   return isLoading ? (
      <Spinner visible={isLoading} />
   ) : (
      <BottomSheetModalProvider>
         <ScrollView style={{ gap: 24, backgroundColor: Colors.gray_50 }}>
            <View style={{}}>
               {/* Render World By Sections */}
               {data.sectionsByWorld.sections.map((section) => {
                  last_index = null;
                  return (
                     <View key={section.id} style={styles.sectionContainer}>
                        <View style={styles.sectionBanner}>
                           <Flag variant="Bold" size={24} color={Colors.gray_400} />
                           <Text style={styles.sectionBannerText}>{section.attributes.description}</Text>
                        </View>
                        {/* Render Lessons By Section */}
                        {section.attributes.lessons.data.map((lesson, index) => {
                           if (lesson.id == lessonsCompleted[index]?.attributes?.lesson?.data?.id) {
                              last_index = index;
                              return (
                                 <LessonButton
                                    key={lesson.id}
                                    isLocked={false}
                                    isCompleted={true}
                                    onPress={() => handlePresentModalPress(lesson.id)}
                                 />
                              );
                           } else if (index == last_index + 1) {
                              return (
                                 <LessonButton
                                    key={lesson.id}
                                    isLocked={false}
                                    isCompleted={false}
                                    isUnlocked={true}
                                    onPress={() => handlePresentModalPress(lesson.id)}
                                 />
                              );
                           } else {
                              return (
                                 <LessonButton
                                    key={lesson.id}
                                    isLocked={true}
                                    isCompleted={false}
                                    onPress={() => handlePresentModalPress(lesson.id)}
                                 />
                              );
                           }
                        })}
                     </View>
                  );
               })}
            </View>
         </ScrollView>
         <BottomSheetModal ref={bottomSheetModalRef} index={1} snapPoints={snapPoints}>
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
