import { create } from "zustand";

export const useRequiredFilter = create((set) => ({
  isRequired: true,
  setIsRequired: (isRequired) => set({ isRequired }),
}));
