import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { API_URL } from "@env";
import { Card } from "@components";

const getWorldsFromStrapi = async () => {
   const res = await fetch(API_URL + "/worlds");
   if (!res.ok) {
      throw new Error("Something went wrong");
   }
   const { data } = await res.json();
   return data;
};

const LevelsScreen = () => {
   const [worlds, setWorlds] = useState([]);
   const [isLoading, setLoading] = useState(true);
   useEffect(() => {
      const fetchWorlds = async () => {
         try {
            const worldData = await getWorldsFromStrapi();
            setWorlds(worldData);
            setLoading(false);
         } catch (error) {
            console.error(error);
         }
      };
      fetchWorlds();
   }, []);

   return (
      <ScrollView style={{ padding: 24, gap: 24 }}>
         {isLoading ? (
            <Text>Cargando...</Text>
         ) : (
            worlds.map((world) => <Card key={world.id} name={world.attributes.name} description={world.attributes.description} />)
         )}
      </ScrollView>
   );
};

export default LevelsScreen;

const styles = StyleSheet.create({});
