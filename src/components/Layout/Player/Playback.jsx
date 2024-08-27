import React from "react";
import {
  PauseCircle,
  PlayCircle,
  PlaySkipBack,
  PlaySkipForward,
} from "react-ionicons";

export default function Playback({ track, isLoading }) {
  return (
    <div className={`flex flex-col items-center justify-center sm:flex-row`}>
      <div className={`flex items-center justify-center`}>
        {/* Previous */}
        <button className={`btn btn-square btn-ghost btn-sm !bg-transparent`}>
          <PlaySkipBack color={"#ffffff"} width={`20px`} height={`20px`} />
        </button>

        {/* Play/Pause */}
        <button className={`btn btn-square btn-ghost !bg-transparent`}>
          {track?.is_playing ? (
            <PauseCircle color={"#ffffff"} width={`40px`} height={`40px`} />
          ) : (
            <PlayCircle color={"#ffffff"} width={`40px`} height={`40px`} />
          )}
        </button>

        {/* Next */}
        <button className={`btn btn-square btn-ghost btn-sm !bg-transparent`}>
          <PlaySkipForward color={"#ffffff"} width={`20px`} height={`20px`} />
        </button>
      </div>

      {/* Runtime */}
      <div className={`flex items-center gap-4 sm:ml-4 sm:w-full`}>
        {/* Runtime Bar */}
        <div
          className={`hidden h-1 w-full rounded-full bg-neutral-600 sm:block`}
        >
          <div
            className={`h-full w-1/4 rounded-full bg-primary`}
            style={{ width: `45%` }}
          ></div>
        </div>

        {/* Minutes */}
        <span className={`text-xs font-medium text-neutral-500`}>
          1:14/4:00
        </span>
      </div>
    </div>
  );
}
