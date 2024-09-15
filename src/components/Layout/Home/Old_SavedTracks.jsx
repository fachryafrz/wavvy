"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingCard from "../../Loading/Card";
import moment from "moment";
import TrackCard from "../../Track/Card";
import { EllipsisVertical, Heart } from "react-ionicons";

export default function SavedTracks({ data }) {
  const showLimit = 5;

  // const { user } = userStore();
  // const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   if (!user) return;

  //   const fetchSavedTracks = async () => {
  //     const { data } = await axios.get(`/api/me/tracks`);

  //     setIsLoading(false);
  //     setData(data.items.slice(0, showLimit));
  //   };

  //   checkToken(fetchSavedTracks);
  // }, [user]);

  return (
    <div className={`flex flex-col gap-2`}>
      {/* Header */}
      <div className={`flex items-center justify-between`}>
        <h2 className={`section-title`}>Saved Songs</h2>

        <Link href={`/`} className={`text-xs font-medium text-primary`}>
          See all
        </Link>
      </div>

      {/* {isLoading && (
        <div className={`-mx-1 flex flex-col`}>
          {[...Array(showLimit)].map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      )} */}

      {/* Cards */}
      {data.items.length > 0 && (
        <ul className={`-mx-1 flex flex-col`}>
          {data.items.slice(0, showLimit).map((item, i) => {
            const track = item.track;
            const releaseDate = moment(track.album.release_date).get("year");
            const albumImage = track.album.images.find(
              (image) => image.width === 64,
            );

            return (
              <li
                key={track.id}
                className={`flex items-center justify-between`}
              >
                <Link href={`/track/${track.id}`} className={`block w-full`}>
                  <TrackCard
                    name={track.name}
                    image={albumImage.url}
                    info={
                      <span
                        data-before-content={track.artists[0].name}
                        className={`before-content`}
                      />
                    }
                  />
                </Link>
                <div className={`flex items-center`}>
                  <button className={`btn btn-square btn-ghost btn-sm`}>
                    <Heart color={"#b91c1c"} width={`20px`} height={`20px`} />
                  </button>
                  <button className={`btn btn-square btn-ghost btn-sm`}>
                    <EllipsisVertical
                      color={"#ffffff"}
                      width={`20px`}
                      height={`20px`}
                    />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
