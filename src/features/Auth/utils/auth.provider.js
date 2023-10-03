import React, { useState, useEffect } from "react";
import { AuthContext } from "../contexts/auth.context";
import { getToken } from "../../../utils/helpers/auth.helpers";
import { API_URL } from "@env";
const AuthProvider = ({ children }) => {
	const [userData, setUserData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [authToken, setAuthToken] = useState(null); // Inicialmente, authToken es nulo

	const fetchLoggedInUser = async (token) => {
		setIsLoading(true);
		try {
			const response = await fetch(`${API_URL}/api/users/me`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = await response.json();

			setUserData(data);
		} catch (error) {
			console.error(error);
			console.error("Error While Getting Logged In User Details");
		} finally {
			setIsLoading(false);
		}
	};

	const handleUser = (user) => {
		setUserData(user);
	};

	useEffect(() => {
		const loadToken = async () => {
			const authToken = await getToken();
			if (authToken) {
				setAuthToken(authToken); // Actualizamos authToken una vez que tengamos el valor
			}
		};

		loadToken();
	}, []);

	useEffect(() => {
		// Usamos authToken aquí después de que se haya actualizado
		if (authToken) {
			fetchLoggedInUser(authToken);
		}
	}, [authToken]); // Dependencia en authToken

	return <AuthContext.Provider value={{ user: userData, setUser: handleUser, isLoading }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
