import { fetchData } from "@/server/actions";
import { create } from "zustand";

export const usePlayback = create((set, get) => ({
  // Track
  track: null,
  setTrack: (track) => set({ track }),

  // Queue
  queue: null,
  setQueue: (queue) => set({ queue }),

  // Volume
  volume: 0,
  setVolume: (volume) => set({ volume }),
  handleSetVolume: async (volume_percent, playback, device) => {
    if (!playback) return;

    localStorage.setItem("volume-state", volume_percent);
    set({ volume: volume_percent });

    await fetchData(`/me/player/volume`, {
      method: "PUT",
      params: {
        volume_percent: volume_percent,
        device_id: device.device_id,
      },
    });
  },
  handleMouseWheelChangeVolume: (
    event,
    volume,
    playback,
    device,
    timeoutRef,
  ) => {
    const delta = event.deltaY < 0 ? 1 : -1;
    const newVolume = Math.max(0, Math.min(100, volume + delta * 10));

    set({ volume: newVolume });

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      get().handleSetVolume(newVolume, playback, device);
    }, 200);
  },
}));
