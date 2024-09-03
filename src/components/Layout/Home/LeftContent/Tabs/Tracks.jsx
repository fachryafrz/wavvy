import CardLong from "@/components/Card/CardLong";
import LoadingCard from "@/components/Loading/Card";
import { userStore } from "@/zustand/user";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { ChevronDown } from "react-ionicons";

export default function TabTracks() {
  const { user } = userStore();
  const router = useRouter();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showLimit, setShowLimit] = useState(5);
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
    setShowLimit(showMore ? 5 : data.items.length);
  };

  useEffect(() => {
    if (!user) return;

    const fetchCurrentUserFollowedArtists = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/api/me/top/tracks`);
        setIsLoading(false);

        setData(data);
      } catch ({ response }) {
        if (response.status === 401) router.push("/login");
      }
    };

    fetchCurrentUserFollowedArtists();
  }, [user]);

  return (
    <div>
      {isLoading && (
        <div className={`flex flex-col`}>
          {[...Array(showLimit)].map((_, i) => (
            <LoadingCard key={i} info={false} />
          ))}
        </div>
      )}

      {!isLoading &&
        data?.items.length > 0 &&
        data.items.slice(0, showLimit).map((track, i) => {
          const image = track.album.images[0].url;
          const runtime = `${moment(track.duration_ms).format("m")}m ${moment(track.duration_ms).format("ss")}s`;

          return (
            <CardLong
              key={track.id}
              item={track}
              image={image}
              link={`/track/${track.id}`}
              smallInfo={track.artists.map((artist) => artist.name).join(", ")}
              secondInfo={
                <Link
                  href={`/album/${track.album.id}`}
                  className={`hocus:underline`}
                >
                  {track.album.name}
                </Link>
              }
              thirdInfo={runtime}
            />
          );
        })}

      {!isLoading && data?.items.length > showLimit && (
        <div className={`mt-4 flex justify-center`}>
          <button
            onClick={handleShowMore}
            className={`btn btn-ghost btn-sm w-full text-primary`}
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
}
