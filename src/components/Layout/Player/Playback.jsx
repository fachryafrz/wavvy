import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  PauseCircle,
  PlayCircle,
  PlaySkipBack,
  PlaySkipForward,
} from "react-ionicons";
import axios from "axios";
import { usePlayback } from "@/zustand/playback";
import { useHandleError } from "@/hooks/error";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth";
import {
  usePlaybackState,
  usePlayerDevice,
  useSpotifyPlayer,
} from "react-spotify-web-playback-sdk";
import { fetchData } from "@/server/actions";

export default function Playback({ track }) {
  const { user } = useAuth();
  const router = useRouter();

  const { mutate } = useAuth();
  // const { playback, setPlayback } = usePlayback();

  const device = usePlayerDevice();
  const player = useSpotifyPlayer();
  const playback = usePlaybackState();

  const skipToPrevious = async () => {
    if (device === null) return;

    await fetchData(`/me/player/previous`, {
      method: "POST",
      params: {
        device_id: device.device_id,
      },
    });
  };

  const playSong = async () => {
    if (device === null) return;

    await fetchData(`/me/player/play`, {
      params: {
        device_id: device.device_id,
      },
      method: "PUT",
      data: JSON.stringify({
        uris: [playback?.track_window.current_track.uri ?? track?.uri],
      }),
    });
  };

  const skipToNext = async () => {
    if (device === null) return;

    await fetchData(`/me/player/next`, {
      method: "POST",
      params: {
        device_id: device.device_id,
      },
    });
  };

  const [currentProgress, setCurrentProgress] = useState(0);
  const [durationMs, setDurationMs] = useState(0);

  useEffect(() => {
    setCurrentProgress(playback ? playback.position : 0);
    setDurationMs(playback ? playback.duration : 0);
  }, [playback]);

  useEffect(() => {
    let interval;

    if (!playback?.paused) {
      interval = setInterval(() => {
        if (playback?.position !== undefined) {
          setCurrentProgress((prevProgress) => prevProgress + 1000);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [playback?.paused, playback?.position]);

  const convertProgress = (progress) => {
    if (!user) return "0:00";

    const minutes = moment(progress).format("m");
    const seconds = moment(progress).format("ss");

    return `${minutes}:${seconds}`;
  };

  const calculateProgressPercentage = (progress, duration) => {
    if (!user) return 0;
    return (progress / duration) * 100;
  };

  const { handleError } = useHandleError();

  // Login Alert
  const handleLoginAlert = () => {
    document.getElementById(`loginAlert`).showModal();
  };

  useEffect(() => {
    console.log(playback);
  }, [playback]);

  return (
    <div className={`flex flex-col items-center justify-center sm:flex-row`}>
      <div className={`flex items-center justify-center`}>
        {/* Previous */}
        <button
          onClick={async () =>
            !user
              ? handleLoginAlert()
              : playback
                ? await player.previousTrack()
                : null
          }
          className={`btn btn-square btn-ghost btn-sm !bg-transparent`}
        >
          <PlaySkipBack color={"#ffffff"} width={`20px`} height={`20px`} />
        </button>

        {/* Play/Pause */}
        <button
          onClick={async () =>
            !user
              ? handleLoginAlert()
              : playback
                ? playback.paused
                  ? await player.resume()
                  : await player.pause()
                : playSong()
          }
          className={`btn btn-square btn-ghost !bg-transparent`}
        >
          {!playback || playback?.paused ? (
            <PlayCircle color={"#ffffff"} width={`40px`} height={`40px`} />
          ) : (
            <PauseCircle color={"#ffffff"} width={`40px`} height={`40px`} />
          )}
        </button>

        {/* Next */}
        <button
          onClick={async () =>
            !user
              ? handleLoginAlert()
              : playback
                ? await player.nextTrack()
                : null
          }
          className={`btn btn-square btn-ghost btn-sm !bg-transparent`}
        >
          <PlaySkipForward color={"#ffffff"} width={`20px`} height={`20px`} />
        </button>
      </div>

      {/* Progress */}
      <div className={`flex items-center gap-4 sm:ml-4 sm:w-full`}>
        {/* Progress Bar */}
        <div
          className={`hidden h-1 w-full rounded-full bg-neutral-600 sm:block`}
        >
          <div
            className={`h-full rounded-full bg-primary`}
            style={{
              width: `${calculateProgressPercentage(currentProgress, durationMs || 1)}%`,
            }}
          ></div>
        </div>

        {/* Minutes */}
        <span className={`text-sm font-medium text-neutral-500`}>
          {`${convertProgress(currentProgress)}/${convertProgress(durationMs || 0)}`}
        </span>
      </div>
    </div>
  );
}
