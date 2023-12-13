import { createContext, useContext } from "react";

export const AuthContext = createContext({
  user: undefined,
  token: undefined,
  isLoading: false,
  error: undefined,
  expoPushToken: undefined,
  setExpoPushToken: () => {},
  setUser: () => {},
  setAuthToken: () => {},
});

export const useAuthContext = () => useContext(AuthContext);
