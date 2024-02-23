import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      loggedIn: false,
      user: null,
      token: null,
      isNewUser: true,
      setUser: (user) => set({ user, loggedIn: true }),
      updateUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),
      setToken: (token) => set({ token }),
      setIsNewUser: (isNewUser) => set({ isNewUser }),
      logout: () => set({ loggedIn: false, user: null, token: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuthStore;
