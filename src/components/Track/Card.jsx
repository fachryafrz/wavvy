/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function TrackCard({ image, name, info, responsive = false }) {
  return (
    <article className={`flex items-center gap-2 p-1`}>
      {image && (
        <figure
          className={`aspect-square min-w-12 max-w-12 overflow-hidden rounded-lg`}
        >
          <img src={image} alt={name} loading="lazy" draggable="false" />
        </figure>
      )}

      <div
        className={`w-full flex-col ${responsive ? `hidden sm:flex` : `flex`}`}
      >
        <h3 className={`line-clamp-1 text-sm font-medium 2xl:text-base`}>
          {name}
        </h3>

        {info && (
          <div className={`line-clamp-1 text-xs font-medium text-neutral-500`}>
            {info}
          </div>
        )}
      </div>
    </article>
  );
}
