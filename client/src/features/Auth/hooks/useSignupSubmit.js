import { useState } from "react";
import { setToken } from "../../../utils/helpers/auth.helpers";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../contexts/auth.context";
import { API_URL } from "@env";
export const useSignupSubmit = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const navigation = useNavigation();
	const { setUser } = useAuthContext();

	const signupSubmit = async (values) => {
		console.log(API_URL, "API_URL");
		try {
			const format = { ...values };
			setIsLoading(true);
			const response = await fetch(`${API_URL}/api/auth/local/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(format),
			});
			const data = await response.json();
			if (data?.error) {
				throw data?.error;
			} else {
				// set the token
				setToken(data.jwt);
				// set the user
				setUser(data.user);
				setIsLoading(false);
				navigation.replace("Main", { screen: "Lessons" });
			}
		} catch (error) {
			setError(error);
			console.error(error);
			setIsLoading(false);
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, error, signupSubmit };
};
