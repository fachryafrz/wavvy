import { create } from "zustand";

export const useQueue = create((set) => ({
  queue: null,
  setQueue: (queue) => set({ queue }),
}));
