/* eslint-disable @next/next/no-img-element */
import React from "react";
import { EllipsisVertical, Play } from "react-ionicons";
import TrackCard from "../Track/Card";

export default function PlaylistCardLong({ playlist }) {
  const image = playlist.images[0].url;

  return (
    <div
      className={`grid grid-cols-12 items-center gap-2 @container hocus:rounded-lg hocus:bg-neutral`}
    >
      {/* Image, Title */}
      <div className={`col-span-10`}>
        <TrackCard name={playlist.name} image={image} />
      </div>

      {/* Tracks count, Duration */}
      {/* <div className={`col-span-3 hidden justify-center @lg:flex`}>
        <div className={`flex flex-wrap gap-1 text-xs font-medium`}>
          <span>28 tracks</span>
          <span>{`\u2022`}</span>
          <span>2h 15m</span>
        </div>
      </div> */}

      {/* Date */}
      {/* <div
        className={`col-span-6 hidden justify-center @sm:flex @lg:col-span-3`}
      >
        <span className={`text-xs font-medium`}>23 June, 2023</span>
      </div> */}

      {/* Play, Options */}
      <div className={`col-span-2 flex justify-end pr-1`}>
        <button className={`btn btn-square btn-ghost btn-sm`}>
          <Play color={`#ffffff`} width={`20px`} height={`20px`} />
        </button>
        <button className={`btn btn-square btn-ghost btn-sm`}>
          <EllipsisVertical color={`#ffffff`} width={`20px`} height={`20px`} />
        </button>
      </div>
    </div>
  );
}
