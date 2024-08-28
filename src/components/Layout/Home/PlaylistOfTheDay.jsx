/* eslint-disable @next/next/no-img-element */
import { checkToken } from "@/helper/checkToken";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function PlaylistOfTheDay() {
  const showLimit = 1;

  const [data, setData] = useState([]);
  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewReleases = async () => {
      const { data } = await axios.get(`/api/browse/new-releases`);

      const [firstData] = data.albums.items;

      setIsLoading(false);
      setData(firstData);
      setImage(firstData.images.find((image) => image.width === 300));
    };

    checkToken(fetchNewReleases);
  }, []);

  return (
    <div
      className={`rounded-xl bg-opacity-20 bg-gradient-to-r from-[#3E2532] to-[#24202B] p-4`}
    >
      {/* Header */}
      <div className={`flex flex-col gap-2`}>
        {/* Small Info */}
        <div
          className={`flex items-center gap-1 text-xs font-medium text-neutral-500`}
        >
          <span>69 tracks</span>
          <span>{`\u2022`}</span>
          <span>4 hours 37 minutes</span>
        </div>

        {/* Title */}
        <h2 className={`text-2xl font-medium`}>Playlist of the day</h2>
      </div>

      {/* Image Cover */}
      <div className={`flex justify-center p-6 px-8`}>
        {isLoading && (
          <span
            className={`aspect-square w-40 animate-pulse rounded-xl bg-neutral-400 bg-opacity-50`}
          ></span>
        )}

        {!isLoading && data && (
          <Link
            href={`/playlist/${data.id}`}
            className={`flex transition-all duration-500 hocus:scale-105 hocus:shadow-2xl`}
          >
            <figure
              className={`aspect-square min-w-40 max-w-40 overflow-hidden rounded-xl`}
            >
              <img
                src={image?.url}
                alt={data.name}
                loading="lazy"
                draggable="false"
              />
            </figure>

            <span className={`sr-only`}>{data.name}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
