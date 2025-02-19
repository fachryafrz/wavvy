"use client";

import CardLong from "@/components/Card/CardLong";
import moment from "moment";
import Link from "next/link";
import pluralize from "pluralize";
import { DiscOutline } from "react-ionicons";

export default function AlbumDetailsTracks({ album, disc }) {
  const discNumber = album.tracks.items.every((item) => item.disc_number === 1);

  return (
    <div>
      <header className={`flex items-center gap-4`}>
        <DiscOutline color={`#ffffff`} width={`20px`} height={`20px`} />

        <div className={`flex-grow @container`}>
          <CardLong
            name={
              <h2 className={`text-xl font-medium`}>
                {discNumber
                  ? pluralize(`Song`, album.tracks.items.length)
                  : `Disc ${disc}`}
              </h2>
            }
            secondInfo={<div className={`mx-auto w-fit`}>Duration</div>}
            thirdInfo={` `}
            cta={false}
            hover={false}
          />
        </div>
      </header>

      <span className={`divider my-0`}></span>

      <ul>
        {album.tracks.items.map((item, j) => {
          return (
            item.disc_number === disc && (
              <li
                key={item.id}
                className={`-mx-2 flex items-center gap-4 px-2 hocus:rounded-lg hocus:bg-neutral`}
              >
                <span className={`flex w-5 justify-center`}>
                  {item.track_number}
                </span>

                <div className={`flex-grow @container`}>
                  <CardLong
                    item={item}
                    link={`/${item.type}/${item.id}`}
                    secondInfo={
                      <div className={`mx-auto w-fit`}>
                        {moment(item.duration_ms).format("m:ss")}
                      </div>
                    }
                    thirdInfo={` `}
                    smallInfo={item.artists.map((artist) => {
                      return (
                        <>
                          <Link
                            href={`/${artist.type}/${artist.id}`}
                            prefetch={false}
                            className={`hocus:underline`}
                          >
                            {artist.name}
                          </Link>

                          <span className={`last:hidden`}>, </span>
                        </>
                      );
                    })}
                  />
                </div>
              </li>
            )
          );
        })}
      </ul>
    </div>
  );
}
