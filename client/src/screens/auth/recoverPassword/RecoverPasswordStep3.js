import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TextField from "../../../components/textField/TextField";
import Headings from "../../../components/headings/Headings";
import Button from "../../../components/button/Button";
import { emailValidations } from "../../../features/Auth/utils/inputValidations";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../utilities/Theme";
import Icon from "react-native-remix-icon";
const RecoverPasswordStep3 = () => {
   const navigation = useNavigation();
   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm();
   return (
      <View style={{ flex: 1, justifyContent: "space-between", padding: 24 }}>
         <Headings
            title="Crear una nueva contraseña"
            description="Crea tu nueva contraseña. Si la olvidas siempre puedes volver a recuperarla"></Headings>
         <TextField {...emailValidations} control={control} leftIcon={<Icon name="mail-fill" size="20" color={Colors.gray_300} />} />
         <TextField {...emailValidations} control={control} leftIcon={<Icon name="mail-fill" size="20" color={Colors.gray_300} />} />
         <Button variant={"primary"} text="Cambiar contraseña" size="medium" onPress={() => navigation.navigate("RecoverPasswordStep3")} />
      </View>
   );
};

export default RecoverPasswordStep3;
