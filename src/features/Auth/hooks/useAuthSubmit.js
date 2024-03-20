import { useState } from "react";
import { setToken } from "../../../utils/helpers/auth.helpers";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "@contexts/auth.context";
import { CommonActions } from "@react-navigation/native";
import { useCustomMutation } from "@utils/useCustomMutation";
import { updateUserMutation } from "@utils/graphql/mutations/user.mutation";

export const useAuthSubmit = ({ isRegister }) => {
  const { setUser, setAuthToken, expoPushToken } = useAuthContext();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { mutate } = useCustomMutation("user", updateUserMutation);

  const fetchURL = `${process.env.EXPO_PUBLIC_API_URL}/api/auth/local${isRegister ? "/register" : ""}`;
  const authSubmit = async (values) => {
    try {
      setIsLoading(true);
      let userData;

      if (isRegister) {
        userData = { ...values };
      } else {
        userData = {
          identifier: values.email,
          password: values.password,
        };
      }
      const response = await fetch(fetchURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (data?.error) {
        setError(data?.error);
        throw data?.error;
      } else {
        setToken(data.jwt);
        setUser(data.user);
        setAuthToken(data.jwt);

        mutate({
          id: data.user.id,
          data: {
            expoPushToken: expoPushToken,
          },
        });
        setUser((prev) => {
          return { ...prev, expoPushToken: expoPushToken };
        });

        setIsLoading(false);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Main" }],
          })
        );
      }
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, authSubmit };
};
