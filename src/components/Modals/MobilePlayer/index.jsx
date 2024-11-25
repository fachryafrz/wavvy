"use client";

import { useAuth } from "@/hooks/auth";
import { fetchData } from "@/server/actions";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { usePlaybackState } from "react-spotify-web-playback-sdk";
import TopBar from "./TopBar";
import Info from "./Info";
import Control from "./Control";

export default function MobilePlayer() {
  // State
  const [volumeState, setVolumeState] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [recentlyPlayed, setRecentlyPlayed] = useState();

  // Hooks
  const { user } = useAuth();
  const playback = usePlaybackState();

  const { refetch: refetchRecentlyPlayed } = useQuery({
    enabled: false,
    queryKey: `/me/player/recently-played`,
    queryFn: async ({ queryKey }) => {
      return await fetchData(queryKey).then(({ data }) => data);
    },
  });

  // Lifecycle
  useEffect(() => {
    const volumeStateLocalStorage = Number(
      localStorage.getItem("volume-state"),
    );
    if (volumeStateLocalStorage) {
      setVolumeState(volumeStateLocalStorage);
    } else {
      setVolumeState(100);
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    const handleRefetchRecentlyPlayed = async () => {
      const { data } = await refetchRecentlyPlayed();
      setRecentlyPlayed(data.items[0].track);
    };

    handleRefetchRecentlyPlayed();
  }, [user]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        document.getElementById("mobilePlayer").close();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <dialog id="mobilePlayer" className="modal modal-bottom">
      <div className="modal-box flex h-full max-h-none w-full max-w-none flex-col justify-between rounded-none bg-base-200 bg-opacity-90 p-4 backdrop-blur">
        {/* Top Bar */}
        <section>
          <TopBar
            track={playback?.track_window?.current_track ?? recentlyPlayed}
          />
        </section>

        {/* Album, Title, Artist */}
        <section>
          <Info
            track={playback?.track_window?.current_track ?? recentlyPlayed}
          />
        </section>

        {/* Player */}
        <section>
          <Control
            track={playback?.track_window?.current_track ?? recentlyPlayed}
            volumeState={volumeState}
            setVolumeState={setVolumeState}
          />
        </section>
      </div>
    </dialog>
  );
}
