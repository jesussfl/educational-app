import { StyleSheet, Text, View } from "react-native";
import { Button, TextField, Headings } from "@components";

import { emailValidations } from "../../utils/inputValidations";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "@utils/Theme";

import Icon from "react-native-remix-icon";
const RecoverPasswordStep2 = () => {
	const navigation = useNavigation();
	return (
		<View style={{ flex: 1, justifyContent: "space-between", padding: 24 }}>
			<Headings title='Introduzca su código' description='Hemos enviado un código al siguiente correo: je****02@gmail.com. Introduzca el código debajo para verificar. '></Headings>
			<Button variant={"primary"} text='Continuar' size='medium' onPress={() => navigation.navigate("RecoverPasswordStep3")} />
		</View>
	);
};

export default RecoverPasswordStep2;

const styles = StyleSheet.create({});
