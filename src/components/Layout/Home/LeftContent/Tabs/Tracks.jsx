import CardLong from "@/components/Card/CardLong";
import LoadingCard from "@/components/Loading/Card";
import { fetchData } from "@/server/actions";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";

export default function TabTracks() {
  const {
    data,
    error,
    isLoading: loading,
  } = useQuery({
    queryKey: [`/me/top/tracks`],
    queryFn: async ({ queryKey }) => {
      return await fetchData(queryKey[0]).then(({ data }) => data);
    },
  });

  const [showLimit, setShowLimit] = useState(5);
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
    setShowLimit(showMore ? 5 : data.items.length);
  };

  return (
    <>
      {loading && (
        <div className={`flex flex-col`}>
          {[...Array(showLimit)].map((_, i) => (
            <LoadingCard key={i} info={false} />
          ))}
        </div>
      )}

      {!loading &&
        data?.items.length > 0 &&
        data.items.slice(0, showLimit).map((track, i) => {
          const image = track.album.images[0].url;
          const runtime = `${moment(track.duration_ms).format("m:ss")}`;

          return (
            <CardLong
              key={track.id}
              item={track}
              image={image}
              link={`/${track.type}/${track.id}`}
              smallInfo={track.artists.map((artist) => {
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
              secondInfo={
                <Link
                  href={`/${track.album.type}/${track.album.id}`}
                  prefetch={false}
                  className={`hocus:underline`}
                >
                  {track.album.name}
                </Link>
              }
              thirdInfo={<div className={`mx-auto w-fit`}>{runtime}</div>}
            />
          );
        })}

      {!loading && data?.items.length === 0 && (
        <span
          className={`text mx-auto flex h-full w-fit items-center justify-center text-center text-sm font-medium text-neutral-500 placeholder-accent-content`}
        >
          You haven&apos;t listened to any songs yet
        </span>
      )}

      {!loading && data?.items.length > showLimit && (
        <div className={`mt-4 flex justify-center`}>
          <button
            onClick={handleShowMore}
            className={`btn btn-ghost btn-sm w-full text-primary`}
          >
            Show more
          </button>
        </div>
      )}
    </>
  );
}
