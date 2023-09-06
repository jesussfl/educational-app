import { useState } from "react";
import { setToken } from "../../../utils/helpers/auth.helpers";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../contexts/auth.context";
import { API_URL } from "@env";
export const useLogin = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const navigation = useNavigation();
	const { setUser } = useAuthContext();

	const loginSubmit = async (values) => {
		try {
			const userData = {
				identifier: values.email,
				password: values.password,
			};
			const response = await fetch(`${API_URL}/api/auth/local`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			});

			const data = await response.json();
			if (data?.error) {
				throw data?.error;
			} else {
				// set the token
				setToken(data.jwt);
				// set the user
				setUser(data.user);

				navigation.replace("Main", { screen: "Lessons" });
			}
		} catch (error) {
			setError(error.name);
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, error, loginSubmit };
};
