import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextField } from "@components";
import { removeToken } from "@utils/helpers/auth.helpers";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import Icon from "react-native-remix-icon";
import { Colors } from "@utils/Theme";
import { emailValidations } from "../../Auth/utils/inputValidations";
import { useAuthContext } from "../../Auth/contexts/auth.context";
const ProfileScreen = () => {
   const { user } = useAuthContext();
   const { control, handleSubmit } = useForm({ defaultValues: { username: user.username, email: user.email } });
   const navigation = useNavigation();
   const handleLogout = () => {
      removeToken();
      navigation.replace("Auth", { screen: "Login" });
   };
   console.log(user.email);
   return (
      <View style={styles.container}>
         <TextField
            label="Nombre de usuario"
            name="username"
            control={control}
            rules={{
               required: "El nombre de usuario es requerido",
               minLength: {
                  value: 3,
                  message: "El nombre de usuario debe tener al menos 3 caracteres",
               },
               maxLength: {
                  value: 80,
                  message: "El nombre de usuario no debe exceder los 80 caracteres",
               },
            }}
            placeholder="Nombre de usuario"
            leftIcon={<Icon name="user-fill" size="20" color={Colors.gray_300} />}
         />

         <TextField
            label="Email"
            name="email"
            control={control}
            rules={{
               required: "El nombre de usuario es requerido",
               minLength: {
                  value: 3,
                  message: "El nombre de usuario debe tener al menos 3 caracteres",
               },
               maxLength: {
                  value: 80,
                  message: "El nombre de usuario no debe exceder los 80 caracteres",
               },
            }}
            placeholder="MAIL"
            leftIcon={<Icon name="mail-fill" size="20" color={Colors.gray_300} />}
         />
         <Button text="Logout" onPress={handleLogout} variant="primary" size="medium" />
      </View>
   );
};

export default ProfileScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 24,
      justifyContent: "center",
   },
});
