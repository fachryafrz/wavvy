const { create } = require("zustand");

export const usePlayback = create((set) => ({
  playback: null,
  setPlayback: (playback) => set({ playback }),
}));
