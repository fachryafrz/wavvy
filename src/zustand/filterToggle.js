import { create } from "zustand";

export const useFilterToggle = create((set) => ({
  filterToggle: false,
  setFilterToggle: (filterToggle) => set({ filterToggle }),
}))