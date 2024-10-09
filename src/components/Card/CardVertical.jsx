/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

export default function CardVertical({ name, link, image, info, type }) {
  return (
    <article className={`flex flex-col gap-2`}>
      <figure
        className={`aspect-square overflow-hidden ${type === `artist` ? `rounded-full` : `rounded-lg`}`}
      >
        {link ? (
          <Link href={link} prefetch={true}>
            <img src={image} alt={name} loading="lazy" draggable="false" />
          </Link>
        ) : (
          <img src={image} alt={name} loading="lazy" draggable="false" />
        )}
      </figure>

      <div className={`flex flex-col gap-1`}>
        <h3
          className={`line-clamp-1 font-medium hocus:underline ${type === `artist` ? `text-center` : `text-start`}`}
        >
          {name}
        </h3>

        {info && (
          <span className={`line-clamp-2 text-sm font-medium text-neutral-500`}>
            {info}
          </span>
        )}
      </div>
    </article>
  );
}
