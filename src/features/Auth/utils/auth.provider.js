import React, { useState, useEffect } from "react";
import { AuthContext } from "../contexts/auth.context";
import { getToken } from "../../../utils/helpers/auth.helpers";

/**
 * AuthProvider component provides authentication-related data and functions to its children.
 * It manages user data, loading state, and authentication token.
 *
 * @param {Object} children - The child components to which authentication context is provided.
 */
const AuthProvider = ({ children }) => {
   // State to store user data
   const [userData, setUserData] = useState();
   // State to track loading state
   const [isLoading, setIsLoading] = useState(true);
   // State to store authentication token
   const [authToken, setAuthToken] = useState(null);

   /**
    * Fetches the user data using the provided token.
    *
    * @param {string} token - The authentication token.
    */
   const fetchLoggedInUser = async (token) => {
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

   /**
    * Sets the user data.
    *
    * @param {Object} user - The user data to set.
    */
   const handleUser = (user) => {
      setUserData(user);
   };

   // Load the authentication token when the component mounts
   useEffect(() => {
      const loadToken = async () => {
         const authToken = await getToken();
         if (authToken) {
            setAuthToken(authToken);
         }
      };

      loadToken();
   }, []);

   // Fetch user data when the authentication token changes
   useEffect(() => {
      if (authToken) {
         fetchLoggedInUser(authToken);
      }
   }, [authToken]);

   return (
      <AuthContext.Provider
         value={{
            user: userData,
            setUser: handleUser,
            isLoading,
            refreshUserData,
         }}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthProvider;
