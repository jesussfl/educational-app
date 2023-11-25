import React, { useState, useEffect } from "react";
import { AuthContext } from "@contexts/auth.context";
import { getToken } from "@utils/helpers/auth.helpers";

/**
 * AuthProvider component provides authentication-related data and functions to its children.
 * It manages user data, loading state, and authentication token.
 *
 */
const AuthProvider = ({ children }) => {
  // State to store user data
  const [userData, setUserData] = useState();
  // State to track loading state
  const [isLoading, setIsLoading] = useState(false);
  // State to store authentication token
  const [authToken, setAuthToken] = useState(undefined);

  useEffect(() => {
    // Load the authentication token when the component mounts
    const loadToken = async () => {
      setIsLoading(true);
      const authToken = await getToken();
      if (authToken) {
        setAuthToken(authToken);
        await fetchLoggedInUser(authToken);
      }
      setIsLoading(false);
    };

    if (authToken === undefined) {
      loadToken();
    }
  }, []);

  const fetchLoggedInUser = async (token) => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      setUserData(data);
    } catch (error) {
      console.error(error);
      console.error("Error While Getting Logged In User Details");
    }
  };

  /**
   * Refreshes the user data using the current authentication token.
   */
  const refreshUserData = async () => {
    await fetchLoggedInUser(authToken);
  };

  return (
    <AuthContext.Provider
      value={{
        user: userData,
        setUser: setUserData,
        isLoading,
        refreshUserData,
        authToken,
        setAuthToken,
      }}
    >
      {isLoading ? null : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
