import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";

const initialState = {
  regenerationTime: null,
  lastLifeRegenerationTime: null,
};

export const useLivesStore = create(
  persist(
    (set) => ({
      ...initialState,
      setLastLifeRegenerationTime: (value) => {
        set({ lastLifeRegenerationTime: value });
      },
      setRegenerationTime: (value) => {
        set({ regenerationTime: value });
      },
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: "lives-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
