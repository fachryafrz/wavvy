import { create } from "zustand";

export const useVolume = create((set) => ({
  volume: 0,
  setVolume: (volume) => set({ volume }),
}));
