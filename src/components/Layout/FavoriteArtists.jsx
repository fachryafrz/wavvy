"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingCard from "../Loading/Card";
import moment from "moment";
import TrackCard from "../Track/Card";
import { checkToken } from "@/helper/checkToken";
import { ChevronForward, EllipsisVertical, Heart } from "react-ionicons";
import { useAuth } from "@/hooks/auth";
import numeral from "numeral";
import ArtistCard from "../Artist/Card";

export default function FavoriteArtists() {
  const showLimit = 5;

  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchSavedTracks = async () => {
      const { data } = await axios.get(`/api/me/following`, {
        params: { type: "artist" },
      });

      setIsLoading(false);
      setData(data.artists.items.slice(0, showLimit));
    };

    checkToken(fetchSavedTracks);
  }, [user]);

  return (
    <div className={`flex flex-col gap-2`}>
      {/* Header */}
      <div className={`flex items-center justify-between`}>
        <h2 className={`section-title ml-1`}>Favorite Artists</h2>

        <Link href={`/`} className={`text-xs font-medium text-primary`}>
          See all
        </Link>
      </div>

      {isLoading && (
        <div className={`flex flex-col`}>
          {[...Array(showLimit)].map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      )}

      {/* Cards */}
      {!isLoading && data.length > 0 && (
        <ul className={`flex flex-col`}>
          {data.map((item, i) => {
            return (
              <li key={item.id}>
                <Link
                  href={`/artists/${item.id}`}
                  className={`flex items-center justify-between`}
                >
                  <ArtistCard artist={item} index={i} />

                  <ChevronForward
                    color={`#ffffff`}
                    width={`16px`}
                    height={`16px`}
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
