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
import { useFetch } from "@/helper/fetch";

export default function Playback({ isLoading }) {
  const { playback, setPlayback } = usePlayback();

  const [currentProgress, setCurrentProgress] = useState(0);
  const [durationMs, setDurationMs] = useState(0);

  useEffect(() => {
    setCurrentProgress(playback ? playback.progress_ms : 0);
    setDurationMs(playback ? playback.item.duration_ms : 0);
  }, [playback]);

  useEffect(() => {
    let interval;

    // if (playback?.is_playing) {
    //   interval = setInterval(() => {
    //     if (playback?.progress_ms !== undefined) {
    //       setCurrentProgress((prevProgress) => prevProgress + 1000);
    //     }
    //   }, 1000);
    // }

    return () => {
      clearInterval(interval);
    };
  }, [playback?.is_playing, playback?.progress_ms]);

  const convertProgress = (progress) => {
    const minutes = moment(progress).format("m");
    const seconds = moment(progress).format("ss");

    return `${minutes}:${seconds}`;
  };

  const calculateProgressPercentage = (progress, duration) => {
    return (progress / duration) * 100;
  };

  const { execute: handlePrevious } = useFetch({
    immediate: false,
    endpoint: "/api/me/player/previous",
    method: "POST",
    params: { device_id: playback?.device?.id },
  });

  const { execute: handleNext } = useFetch({
    immediate: false,
    endpoint: "/api/me/player/next",
    method: "POST",
    params: { device_id: playback?.device?.id },
  });

  const { execute: handleStartResumePlayback } = useFetch({
    immediate: false,
    endpoint: "/api/me/player/play",
    method: "PUT",
    body: {
      context_uri: `spotify:album:2u4Yp2ADTKYPwFSBFL4ffa`,
      // uris: [
      //   "spotify:track:0z8hI3OPS8ADPWtoCjjLl6",
      //   "spotify:track:1301WleyT98MSxVHPZCA6M",
      // ],
      // offset: {
      //   position: 5,
      // },
      position_ms: 0,
    },
  });

  const { execute: handlePausePlayback } = useFetch({
    immediate: false,
    endpoint: "/api/me/player/pause",
    method: "PUT",
    params: { device_id: playback?.device?.id },
  });

  return (
    <div className={`flex flex-col items-center justify-center sm:flex-row`}>
      <div className={`flex items-center justify-center`}>
        {/* Previous */}
        <button
          onClick={
            playback?.actions?.disallows?.skipping_prev ? null : handlePrevious
          }
          disabled={playback?.actions?.disallows?.skipping_prev}
          className={`btn btn-square btn-ghost btn-sm !bg-transparent`}
        >
          <PlaySkipBack color={"#ffffff"} width={`20px`} height={`20px`} />
        </button>

        {/* Play/Pause */}
        <button
          onClick={
            playback?.actions?.disallows?.pausing
              ? handleStartResumePlayback
              : handlePausePlayback
          }
          className={`btn btn-square btn-ghost !bg-transparent`}
        >
          {playback?.is_playing ? (
            <PauseCircle color={"#ffffff"} width={`40px`} height={`40px`} />
          ) : (
            <PlayCircle color={"#ffffff"} width={`40px`} height={`40px`} />
          )}
        </button>

        {/* Next */}
        <button
          onClick={handleNext}
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
        <span className={`text-xs font-medium text-neutral-500`}>
          {`${convertProgress(currentProgress)}/${convertProgress(durationMs || 0)}`}
        </span>
      </div>
    </div>
  );
}
