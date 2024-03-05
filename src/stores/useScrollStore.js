import { create } from "zustand";

const initialState = {
  currentCoords: null,
  sectionCoords: null,
  sectionHeight: null,
};

export const useScrollStore = create((set) => {
  return {
    ...initialState,

    addCurrentCoords: (currentCoords) => set({ currentCoords }),
    addSectionCoords: (sectionCoords) => set({ sectionCoords }),
    addSectionHeight: (sectionHeight) => set({ sectionHeight }),
    reset: () => {
      set(initialState);
    },
  };
});
