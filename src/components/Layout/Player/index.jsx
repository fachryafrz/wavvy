"use client";

import { useEffect, useState } from "react";
import Playback from "./Playback";
import PlaybackOptions from "./Options";
import { useQuery } from "@tanstack/react-query";
import {
  usePlaybackState,
  usePlayerDevice,
  useSpotifyPlayer,
} from "react-spotify-web-playback-sdk";
import { fetchData } from "@/server/actions";
import { useAuth } from "@/hooks/auth";
import PlayerInfo from "./Info";
import { useTrack } from "@/zustand/track";
import { useVolume } from "@/zustand/volume";
import { MusicalNotes } from "react-ionicons";

export default function Player() {
  // State
  const [isMobile, setIsMobile] = useState(false);
  const [playbackState, setPlaybackState] = useState(null);

  // Hooks
  const { user } = useAuth();
  const { track, setTrack } = useTrack();
  const { volume, setVolume } = useVolume();
  const device = usePlayerDevice();
  const player = useSpotifyPlayer();
  const playback = usePlaybackState();

  const { refetch: refetchRecentlyPlayed } = useQuery({
    enabled: false,
    queryKey: `/me/player/recently-played`,
    queryFn: async ({ queryKey }) => {
      return await fetchData(queryKey).then(({ data }) => data);
    },
  });

  useEffect(() => {
    const volumeStateLocalStorage = Number(
      localStorage.getItem("volume-state"),
    );
    if (volumeStateLocalStorage) {
      setVolume(volumeStateLocalStorage);
    } else {
      localStorage.setItem("volume-state", 100);
      setVolume(100);
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    if (playbackState) {
      setTrack(playbackState.item);
      return;
    }

    const handleRefetchRecentlyPlayed = async () => {
      const { data } = await refetchRecentlyPlayed();
      setTrack(data.items[0].track);
    };

    handleRefetchRecentlyPlayed();
  }, [user, playbackState]);

  useEffect(() => {
    if (!playback) return;

    setTrack(playback.track_window.current_track);
  }, [playback]);

  useEffect(() => {
    if (!user) return;

    const handlePlaybackState = async () => {
      const { data } = await fetchData(`/me/player`);
      if (!data) return;

      setPlaybackState(data);
    };

    handlePlaybackState();
  }, [user, playback]);

  // useEffect(() => {
  //   const isMobileDevice = () => {
  //     const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  //     // Windows Phone must come first because its UA also contains "Android"
  //     if (/windows phone/i.test(userAgent)) {
  //       setVolume(100);
  //       return true;
  //     }

  //     if (/android/i.test(userAgent)) {
  //       setVolume(100);
  //       return true;
  //     }

  //     // iOS detection from: http://stackoverflow.com/a/9039885/177710
  //     if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
  //       setVolume(100);
  //       return true;
  //     }

  //     return false;
  //   };

  //   setIsMobile(isMobileDevice());
  // }, []);

  useEffect(() => {
    if (!playback) return;

    const DEFAULT_SKIP_TIME = 1e4; // 10 seconds

    const currentTrack = playback.track_window.current_track;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentTrack.name,
      artist: currentTrack.artists.map((artist) => artist.name).join(", "),
      album: currentTrack.album.name,
      artwork: [
        {
          src: currentTrack.album.images[0].url,
          sizes: "640x640",
          type: "image/jpeg",
        },
      ],
    });

    // Optional: Add Media Session Controls
    navigator.mediaSession.setActionHandler("play", () => player.resume());
    navigator.mediaSession.setActionHandler("pause", () => player.pause());
    navigator.mediaSession.setActionHandler("nexttrack", () =>
      player.nextTrack(),
    );
    navigator.mediaSession.setActionHandler("previoustrack", () =>
      player.previousTrack(),
    );
    navigator.mediaSession.setActionHandler("seekbackward", (details) => {
      const skipTime = details.seekOffset || DEFAULT_SKIP_TIME;
      player.seek(playback.position - skipTime);
    });
    navigator.mediaSession.setActionHandler("seekforward", (details) => {
      const skipTime = details.seekOffset || DEFAULT_SKIP_TIME;
      player.seek(playback.position + skipTime);
    });
  }, [playback]);

  return (
    <div
      id="player"
      className={`grid w-full grid-cols-3 items-center gap-x-2 gap-y-1 sm:gap-x-4`}
    >
      {/* Toggle Mobile Player */}
      <div
        onClick={() => document.getElementById("mobilePlayer").showModal()}
        className={`absolute inset-0 z-0 sm:hidden`}
      ></div>

      {/* Track Info (Image, Title, Artist) */}
      <div className={`col-span-2 sm:col-span-1`}>
        <PlayerInfo />
      </div>

      {/* Playback (Play, Pause, Next, Previous, Runtime) */}
      <div>
        <Playback isMobile={isMobile} />
      </div>

      {/* Options (Volume, Shuffle, Repeat) */}
      <div className={`hidden sm:block`}>
        <PlaybackOptions />
      </div>

      {/* Other Devices */}
      {user &&
        playbackState &&
        device &&
        playbackState.device.id !== device.device_id && (
          <div
            className={`col-span-3 mx-1 flex justify-center rounded-lg bg-primary p-1 text-base-100`}
          >
            <div className={`flex items-center gap-1`}>
              <MusicalNotes />
              <button className={`font-medium hocus:underline`}>
                <span className={`sm:hidden`}>{playbackState.device.name}</span>
                <span className={`hidden sm:inline`}>
                  {`Playing on ${playbackState.device.name}`}
                </span>
              </button>
            </div>
          </div>
        )}
    </div>
  );
}
