import { useState } from "react";
import { setToken } from "../../../utils/helpers/auth.helpers";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../contexts/auth.context";
import { API_URL } from "@env";
export const useAuthSubmit = ({ isRegister }) => {
	const { setUser } = useAuthContext();
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const fetchURL = `${API_URL}/api/auth/local${isRegister ? "/register" : ""}`;
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
				throw data?.error;
			} else {
				setToken(data.jwt);
				setUser(data.user);
				setIsLoading(false);

				navigation.replace("Main", { screen: "Lessons" });
			}
		} catch (error) {
			setIsLoading(false);

			setError(error);
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, error, authSubmit };
};
