import { createContext, useContext, useEffect } from "react";
import { useAuthContext } from "./auth.context";
export const UserStatsContext = createContext();

export const UserStatsProvider = ({ children }) => {
  return <UserStatsContext.Provider value={{}}>{children}</UserStatsContext.Provider>;
};

export const useUserStatsContext = () => useContext(UserStatsContext);
