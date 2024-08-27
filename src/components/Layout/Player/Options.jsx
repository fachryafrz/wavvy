import React from "react";
import { Repeat, Shuffle, VolumeMedium } from "react-ionicons";

export default function PlaybackOptions({ track, isLoading }) {
  return (
    <div className={`flex flex-wrap items-center justify-end lg:flex-nowrap`}>
      {/* Volume */}
      <div className={`mr-4 hidden items-center lg:flex`}>
        <button className={`btn btn-square btn-ghost btn-sm !bg-transparent`}>
          <VolumeMedium color={"#ffffff"} width={`20px`} height={`20px`} />
        </button>

        <div className={`h-1 w-24 rounded-full bg-neutral-600`}>
          <div
            className={`h-full w-1/4 rounded-full bg-primary`}
            style={{ width: `${track?.device.volume_percent}%` }}
          ></div>
        </div>
      </div>

      {/* Shuffle, Repeat */}
      <button className={`btn btn-square btn-ghost btn-sm !bg-transparent`}>
        <Shuffle
          color={track?.shuffle_state ? "#ff6337" : "#ffffff"}
          width={`20px`}
          height={`20px`}
        />
      </button>

      <button
        className={`btn btn-square btn-ghost btn-sm relative !bg-transparent`}
      >
        <Repeat
          color={track?.repeat_state !== "off" ? "#ff6337" : "#ffffff"}
          width={`20px`}
          height={`20px`}
        />

        {track?.repeat_state === "track" && (
          <span
            className={`absolute -top-2 left-1/2 block aspect-square w-4 -translate-x-1/2 rounded-full text-xs font-medium text-primary`}
          >
            1
          </span>
        )}
      </button>
    </div>
  );
}
