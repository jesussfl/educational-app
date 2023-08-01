import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TextField from "../../../../components/textField/TextField";
import Icon from "react-native-remix-icon";
import { Colors, SemanticColors } from "../../../../utilities/Theme";
import Button from "../../../../components/button/Button";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
const SignupForm = () => {
   const navigation = useNavigation();
   const route = useRoute();
   React.useEffect(() => {
      if (route.params?.isFromLogin) {
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
            <Button variant={"primary"} text="Crear mi cuenta" size="medium" />
            <Button
               variant={"secondary"}
               text="Ya tengo una cuenta"
               size="medium"
               onPress={() => navigation.replace("Login", { isFromSignup: true })}
            />
         </View>
      </View>
   );
};

export default SignupForm;

const styles = StyleSheet.create({
   container: { flex: 1, justifyContent: "space-between" },
});
