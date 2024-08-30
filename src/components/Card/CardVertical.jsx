/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function CardVertical({ track }) {
  const [image] = track.album.images;

  return (
    <article className={`flex flex-col gap-2`}>
      <figure className={`overflow-hidden rounded-lg`}>
        <img src={image.url} alt={track.name} />
      </figure>

      <div className={`flex flex-col gap-1`}>
        <h3 title={track.name} className={`line-clamp-1 font-medium hocus:underline`}>
          {track.name}
        </h3>

        <span className={`line-clamp-2 text-xs font-medium text-neutral-500`}>
          {track.artists.map((artist) => artist.name).join(", ")}
        </span>
      </div>
    </article>
  );
}
