import { createContext, useContext } from "react";

export const AuthContext = createContext({
  user: undefined,
  token: undefined,
  isLoading: false,
  setUser: () => {},
});

export const useAuthContext = () => useContext(AuthContext);
