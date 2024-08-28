/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function TrackCard({ image, name, info, responsive = false }) {
  return (
    <article className={`flex items-center gap-2 p-1`}>
      <figure className={`min-w-12 max-w-12 overflow-hidden rounded-lg`}>
        <img src={image} alt={name} loading="lazy" draggable="false" />
      </figure>

      <div
        className={`w-full flex-col ${responsive ? `hidden sm:flex` : `flex`}`}
      >
        <h3 className={`line-clamp-1 text-sm font-medium`}>{name}</h3>

        {info}
      </div>
    </article>
  );
}
