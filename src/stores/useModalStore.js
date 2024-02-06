import { create } from "zustand";

const useModalStore = create((set) => ({
  isOpen: false,
  config: null,
  setConfig: (config) => set({ config }),

  onClose: () => set({ isOpen: false, config: null }),
  onOpen: (config) => set({ isOpen: true, config }),
}));

export default useModalStore;
