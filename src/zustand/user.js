const { create } = require("zustand");

export const userStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
