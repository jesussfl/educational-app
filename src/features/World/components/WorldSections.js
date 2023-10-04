import { StyleSheet, ScrollView, View, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react"; // Import useState and useEffect
import Lessons from "./Lessons";
import { Colors } from "@utils/Theme";
import Spinner from "react-native-loading-spinner-overlay";
import useWorldData from "../hooks/useWorldData";
import WorldSectionBanner from "./WorldSectionBanner";

const WorldSections = ({ handlePresentModalPress, setLessonId }) => {
   const { isLoading, worldData, lessonsCompleted, refreshData } = useWorldData(); // Include a refreshData function

   const [refreshing, setRefreshing] = useState(false); // State to control the refresh indicator
   let last_index = 0;
   // Function to handle the pull to refresh action
   const onRefresh = () => {
      setRefreshing(true); // Set refreshing to true when the user pulls to refresh
      refreshData(); // Call the refreshData function to fetch new data

      // Simulate a delay and then stop the refresh indicator
      setTimeout(() => {
         setRefreshing(false);
      }, 2000); // Simulating a 2-second refresh delay
   };

   useEffect(() => {
      // Here you can put any additional logic you need when the data in WorldSections changes.
   }, [worldData, lessonsCompleted]);

   return isLoading ? (
      <Spinner visible={isLoading} />
   ) : (
      <ScrollView
         style={styles.pageContainer}
         refreshControl={
            // Attach the RefreshControl to enable pull to refresh
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
         }>
         <View>
            {/* Render World By Sections */}
            {worldData.sectionsByWorld.sections.map((section) => {
               return (
                  <View key={section.id} style={styles.sectionContainer}>
                     <WorldSectionBanner text={section.attributes.description} />
                     <Lessons
                        lessons={section.attributes.lessons.data}
                        last_index={last_index}
                        handlePresentModalPress={handlePresentModalPress}
                        setLessonId={setLessonId}
                        lessonsCompleted={lessonsCompleted}
                     />
                  </View>
               );
            })}
         </View>
      </ScrollView>
   );
};

export default WorldSections;

const styles = StyleSheet.create({
   pageContainer: { gap: 24, backgroundColor: Colors.gray_50 },

   sectionContainer: {
      flex: 1,
      gap: 24,
      marginVertical: 24,
      alignItems: "center",
   },
});
