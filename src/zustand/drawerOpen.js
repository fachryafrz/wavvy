import { create } from "zustand";

export const useDrawerOpen = create((set) => ({
  drawerOpen: false,
  setDrawerOpen: () => set((state) => ({ drawerOpen: !state.drawerOpen })),
}));