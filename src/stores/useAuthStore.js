import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      loggedIn: false,
      user: null,
      token: null,
      setUser: (user) => set({ user, loggedIn: true }),
      updateUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),
      setToken: (token) => set({ token }),
      logout: () => set({ loggedIn: false, user: null, token: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuthStore;
