import { StyleSheet, Text, View } from "react-native";
import { db, auth } from "../../config/firebase";
import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
const ProfileScreen = () => {
   const [users, setUsers] = useState([]);
   useEffect(() => {
      const getUserDetails = async () => {
         const userCollectionRef = collection(db, "USER_DETAILS");
         const data = await getDocs(userCollectionRef);
         setUsers(data.docs.map((doc) => doc.data()));
      };
      getUserDetails();
   });
   return (
      <View style={styles.container}>
         <Text>{users[0].age}</Text>
      </View>
   );
};

export default ProfileScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
   },
});
