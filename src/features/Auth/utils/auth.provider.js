import React, { useState, useEffect } from "react";
import { AuthContext } from "@contexts/auth.context";
import { getToken } from "../../../utils/helpers/auth.helpers";
import io from "socket.io-client";

/**
 * AuthProvider component provides authentication-related data and functions to its children.
 * It manages user data, loading state, and authentication token.
 *
 */
const AuthProvider = ({ children }) => {
  // State to store user data
  const [userData, setUserData] = useState();
  // State to track loading state
  const [isLoading, setIsLoading] = useState(true);
  // State to store authentication token
  const [authToken, setAuthToken] = useState(null);
  const socket = io("http://172.16.0.2:1337");

  const fetchLoggedInUser = async (token) => {
    console.log("fetchLoggedInUser", token);
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/users/me`, {
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

  /**
   * Refreshes the user data using the current authentication token.
   */
  const refreshUserData = async () => {
    await fetchLoggedInUser(authToken);
  };

  // Load the authentication token when the component mounts
  useEffect(() => {
    loadToken();
    socket.on("updateLiveBro", (userData) => {
      console.log(userData, "updateandooo");
      setUserData((prev) => {
        return { ...prev, lives: userData.lives };
      });
    });
    console.log(userData);
  }, []);
  const loadToken = async () => {
    const authToken = await getToken();
    if (authToken) {
      console.log(authToken, "authToken");
      setAuthToken(authToken);
      fetchLoggedInUser(authToken);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user: userData,
        setUser,
        isLoading,
        refreshUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
