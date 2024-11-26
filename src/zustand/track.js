import { create } from "zustand";

export const useTrack = create((set) => ({
  track: null,
  setTrack: (track) => set({ track }),
}));
