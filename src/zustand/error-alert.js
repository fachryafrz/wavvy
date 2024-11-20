import { create } from "zustand";

export const useErrorAlert = create((set) => ({
  errorAlert: null,
  setErrorAlert: (errorAlert) => set({ errorAlert }),
}));
