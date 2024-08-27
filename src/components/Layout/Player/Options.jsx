import React from "react";
import { Repeat, Shuffle, VolumeMedium } from "react-ionicons";

export default function PlaybackOptions({ track, isLoading }) {
  return (
    <div className={`flex items-center justify-end flex-wrap lg:flex-nowrap`}>
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
        <Shuffle color={"#ffffff"} width={`20px`} height={`20px`} />
      </button>

      <button className={`btn btn-square btn-ghost btn-sm !bg-transparent`}>
        <Repeat color={"#ffffff"} width={`20px`} height={`20px`} />
      </button>
    </div>
  );
}
