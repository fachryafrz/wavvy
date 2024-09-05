/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { HeartOutline } from "react-ionicons";

export default function TrackDetailsHero({ track }) {
  const [image] = track.album.images;

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
      className={`relative -mx-4 flex flex-col-reverse items-center justify-between gap-4 overflow-clip p-8 md:mx-0 md:flex-row md:rounded-2xl 2xl:rounded-3xl`}
    >
      <div
        className={`flex w-full flex-grow flex-col items-center gap-6 text-center md:items-start md:text-start`}
      >
        {/* Details */}
        <div className={`flex w-full flex-col gap-2 @container`}>
          {/* Title */}
          <h1
            className={`line-clamp-2 text-pretty text-2xl font-bold !leading-snug @sm:text-4xl @2xl:text-5xl ${fontSize}`}
          >
            {track.name}
          </h1>

          {/* Artist */}
          <span className={``}>
            {track.artists.map((artist) => artist.name).join(", ")}
          </span>
        </div>

        {/* CTA */}
        <div className={`flex items-center gap-4`}>
          <button className={`btn btn-primary rounded-full`}>Listen Now</button>

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

      <div
        className={`absolute inset-0 -z-10 backdrop-blur before:absolute before:inset-0 before:z-10 before:hidden before:bg-gradient-to-r before:from-base-100 before:opacity-80 md:before:block`}
      >
        <figure
          className={`h-full w-full opacity-50 md:opacity-80`}
          style={{
            backgroundImage: `url(${image.url})`,
            backgroundSize: `cover`,
            backgroundPosition: `center`,
            filter: `blur(25px)`,
          }}
        ></figure>
      </div>
    </div>
  );
}
