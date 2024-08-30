"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingCard from "../../Loading/Card";
import moment from "moment";
import TrackCard from "../../Track/Card";
import { checkToken } from "@/helper/checkToken";

export default function NewReleases() {
  const showLimit = 5;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewReleases = async () => {
      const { data } = await axios.get(`/api/browse/new-releases`);

      setIsLoading(false);
      setData(data.albums.items.slice(0, showLimit));
    };

    checkToken(fetchNewReleases);
  }, []);

  return (
    <div className={`flex flex-col gap-2`}>
      {/* Header */}
      <div className={`flex items-center justify-between`}>
        <h2 className={`section-title`}>New Releases</h2>

        <Link href={`/`} className={`text-xs font-medium text-primary`}>
          See all
        </Link>
      </div>

      {isLoading && (
        <div className={`-mx-1 flex flex-col`}>
          {[...Array(showLimit)].map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      )}

      {/* Cards */}
      {!isLoading && data.length > 0 && (
        <ul className={`-mx-1 flex flex-col`}>
          {data.map((album, i) => {
            const releaseDate = moment(album.release_date).get("year");
            const albumImage = album.images.find((image) => image.width === 64);

            return (
              <li key={album.id}>
                <Link
                  href={`/album/${album.id}`}
                  className={`block transition-all hocus:rounded-lg hocus:bg-neutral`}
                >
                  <TrackCard
                    name={album.name}
                    image={albumImage.url}
                    info={
                      <div className={`flex items-center gap-1 capitalize`}>
                        <span
                          data-before-content={album.album_type}
                          className={`before-content`}
                        />
                        <span
                          data-before-content={`\u2022`}
                          className={`before-content`}
                        />
                        <span
                          data-before-content={
                            album.artists[0].name.split(" ")[0]
                          }
                          className={`before-content`}
                        />
                        <span
                          data-before-content={`\u2022`}
                          className={`before-content`}
                        />
                        <span
                          data-before-content={releaseDate}
                          className={`before-content`}
                        />
                      </div>
                    }
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
