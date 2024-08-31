/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function CardVertical({ name, image, info }) {
  return (
    <article className={`flex flex-col gap-2`}>
      <figure className={`overflow-hidden rounded-lg`}>
        <img src={image} alt={name} />
      </figure>

      <div className={`flex flex-col gap-1`}>
        <h3 title={name} className={`line-clamp-1 font-medium hocus:underline`}>
          {name}
        </h3>

        {info && (
          <span className={`line-clamp-2 text-xs font-medium text-neutral-500`}>
            {info}
          </span>
        )}
      </div>
    </article>
  );
}
