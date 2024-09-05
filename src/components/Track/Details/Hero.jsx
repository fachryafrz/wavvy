"use client";

import Link from "next/link";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { HeartOutline } from "react-ionicons";

export default function TrackDetailsHero({ track, artists }) {
  const { album } = track;
  const [image] = album.images;

  const [fontSize, setFontSize] = useState(`2xl:text-8xl`);

  useEffect(() => {
    const { name } = track;

    if (name.length > 50) {
      setFontSize(`2xl:text-4xl`);
    } else if (name.length > 40) {
      setFontSize(`2xl:text-5xl`);
    } else if (name.length > 30) {
      setFontSize(`2xl:text-6xl`);
    } else if (name.length > 20) {
      setFontSize(`2xl:text-7xl`);
    } else {
      setFontSize(`2xl:text-8xl`);
    }
  }, [track]);

  return (
    <div
      className={`relative -mx-4 mb-4 flex flex-col-reverse items-center justify-between gap-4 overflow-clip md:mx-0 md:flex-row`}
    >
      <div
        className={`flex w-full flex-grow flex-col items-center gap-6 text-center md:items-start md:text-start`}
      >
        {/* Details */}
        <div
          className={`flex w-full flex-col gap-4 @container before:font-bold`}
        >
          {/* Type */}
          <span
            data-before-content={`Song`}
            className={`before-content translate-y-8 font-medium capitalize`}
          />

          {/* Title */}
          <h1
            className={`line-clamp-2 text-pretty text-2xl font-bold !leading-snug drop-shadow-lg @sm:text-4xl @2xl:text-5xl ${fontSize}`}
          >
            {track.name}
          </h1>

          {/* Album */}
          <div className={`flex gap-1`}>
            <span className={`font-thin`}>Album: </span>

            <Link
              href={`/${album.type}/${album.id}`}
              className={`flex w-fit font-medium text-white hocus:underline`}
            >
              {album.name}
            </Link>
          </div>

          {/* Artist */}
          <div className={`text-white`}>
            <div className={`flex items-center gap-4`}>
              {artists.map((artist) => {
                const [image] = artist.images;

                return (
                  <div key={artist.id} className={`flex items-center gap-2`}>
                    <figure
                      className={`aspect-square w-[40px] overflow-hidden rounded-full`}
                    >
                      <img
                        src={image.url}
                        alt={artist.name}
                        loading="lazy"
                        draggable="false"
                      />
                    </figure>

                    <Link
                      href={`/${artist.type}/${artist.id}`}
                      className={`font-medium hocus:underline`}
                    >
                      {artist.name}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={`flex items-center gap-4`}>
          <button className={`btn btn-primary w-[150px] rounded-full`}>
            Listen Now
          </button>

          <button
            className={`btn btn-square btn-outline btn-primary flex items-center justify-center rounded-full`}
          >
            <HeartOutline color={`#ffffff`} />
          </button>
        </div>
      </div>

      <figure
        className={`max-w-[200px] overflow-hidden rounded-xl shadow-xl sm:max-w-[300px]`}
      >
        <img
          src={image.url}
          alt={track.name}
          loading="lazy"
          draggable="false"
        />
      </figure>

      <div className={`absolute inset-0 -z-10`}>
        <figure
          className={`h-full w-full opacity-50`}
          // style={{
          //   backgroundImage: `url(${image.url})`,
          //   backgroundSize: `cover`,
          //   backgroundPosition: `center`,
          //   filter: `blur(25px)`,
          // }}
        ></figure>
      </div>
    </div>
  );
}
