import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-remix-icon";
import TextField from "../../../../components/textField/TextField";
import { Colors, SemanticColors } from "../../../../utilities/Theme";
import Button from "../../../../components/button/Button";

const LoginForm = () => {
   const navigation = useNavigation();
   const route = useRoute();

   useEffect(() => {
      if (route.params?.isFromSignup) {
         navigation.setOptions({
            animation: "fade",
         });
      }
   }, []);
   return (
      <View style={styles.container}>
         <View>
            <TextField
               label="Correo Electrónico"
               placeholder="Correo electrónico"
               leftIcon={<Icon name="mail-fill" size="20" color={Colors.gray_300} />}></TextField>
            <TextField
               label="Contraseña"
               placeholder="Introduce tu contraseña"
               leftIcon={<Icon name="lock-fill" size="20" color={Colors.gray_300} />}></TextField>
         </View>
         <View style={{ gap: 16 }}>
            <Button variant={"primary"} text="Iniciar Sesión" size="medium" />
            <Button
               variant={"secondary"}
               text="Crear una cuenta"
               size="medium"
               onPress={() => {
                  navigation.replace("Signup", { isFromLogin: true });
               }}
            />
         </View>
      </View>
   );
};

export default LoginForm;

const styles = StyleSheet.create({
   container: { flex: 1, justifyContent: "space-between" },
});
