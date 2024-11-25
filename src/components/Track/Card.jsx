/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

export default function TrackCard({
  id,
  image,
  type,
  name,
  info,
  responsive = false,
}) {
  return (
    <article className={`flex items-center gap-2 p-1`}>
      {image && (
        <>
          {type && id ? (
            <Link
              href={`/${type}/${id}`}
              className={`z-10 aspect-square max-w-14 flex-grow`}
            >
              <figure className={`overflow-hidden rounded-lg`}>
                <img src={image} alt={name} loading="lazy" draggable="false" />
              </figure>
            </Link>
          ) : (
            <figure
              className={`aspect-square max-w-14 flex-grow overflow-hidden rounded-lg`}
            >
              <img src={image} alt={name} loading="lazy" draggable="false" />
            </figure>
          )}
        </>
      )}

      <div
        className={`w-full flex-col ${responsive ? `hidden sm:flex` : `flex`}`}
      >
        <div className={`line-clamp-1 font-medium`}>{name}</div>

        {info && (
          <div className={`line-clamp-1 text-sm font-medium text-neutral-500`}>
            {info}
          </div>
        )}
      </div>
    </article>
  );
}
