import { create } from "zustand";
// import useBottomSheet from "@hooks/useBottomSheet";

const initialState = {
  isOpen: false,
  lessonId: null,
  lessonType: null,
  lessonStatus: null,
};

export const useLessonModal = create((set) => {
  return {
    ...initialState,

    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),

    addLessonId: (lessonId) => set({ lessonId }),
    removeLessonId: () => set({ lessonId: null }),

    addLessonType: (lessonType) => set({ lessonType }),
    removeLessonType: () => set({ lessonType: null }),

    addLessonStatus: (lessonStatus) => set({ lessonStatus }),
    removeLessonStatus: () => set({ lessonStatus: null }),

    reset: () => {
      set(initialState);
    },
  };
});
