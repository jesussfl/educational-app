import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Button from "../Button/Button";
import Headings from "../Headings/Headings";
// import { Headings, Button } from "../index";
import { Colors } from "../../utils/Theme";
const Card = ({ name, description, imgSource, mainAction }) => {
	return (
		<View
			style={{
				justifyContent: "space-between",
				marginBottom: 24,
				gap: 8,
				padding: 24,
				borderWidth: 4,
				borderColor: Colors.gray_100,
				borderRadius: 24,
			}}>
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Image style={{ width: 124, height: 124, resizeMode: "stretch" }} src={imgSource}></Image>
			</View>
			<Headings title={name} description={description} align={"left"} />
			<View style={{ gap: 16 }}>
				<Button text='0/24 Lecciones' variant='secondary' size='small' />
				<Button text='Explorar' variant='primary' onPress={mainAction} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({});
export default Card;
