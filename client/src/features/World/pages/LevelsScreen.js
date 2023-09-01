import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import { Card } from "@components";
import { useQuery } from "@tanstack/react-query";
import { query } from "@utils/graphql/client/GraphQLCLient";
import { queryWorlds } from "@utils/graphql/queries/world.queries";

const LevelsScreen = () => {
	const { data, isLoading, error } = useQuery(["worlds"], () => query(queryWorlds));
	console.log(data);
	return (
		<ScrollView style={{ padding: 24, gap: 24 }}>
			{isLoading ? <Text>Cargando...</Text> : data.crefinexWorlds.data.map((world) => <Card key={world.id} name={world.attributes.name} description={world.attributes.description} imgSource={`http://192.168.0.108:1337${world.attributes.image.data.attributes.formats.thumbnail.url}`} />)}
		</ScrollView>
	);
};

export default LevelsScreen;

const styles = StyleSheet.create({});
