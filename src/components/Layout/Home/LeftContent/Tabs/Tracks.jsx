import CardLong from "@/components/Card/CardLong";
import LoadingCard from "@/components/Loading/Card";
import { useFetch } from "@/helper/fetch";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TabTracks() {
  const { data, error, loading, execute } = useFetch({
    endpoint: `/api/me/top/tracks`,
  });

  const [showLimit, setShowLimit] = useState(5);
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
    setShowLimit(showMore ? 5 : data.items.length);
  };

  useEffect(() => {
    execute();
  }, []);

  return (
    <div>
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
          const runtime = `${moment(track.duration_ms).format("m")}m ${moment(track.duration_ms).format("ss")}s`;

          return (
            <CardLong
              key={track.id}
              item={track}
              image={image}
              link={`/${track.type}/${track.id}`}
              smallInfo={track.artists.map((artist) => artist.name).join(", ")}
              secondInfo={
                <Link
                  href={`/${track.album.type}/${track.album.id}`}
                  className={`hocus:underline`}
                >
                  {track.album.name}
                </Link>
              }
              thirdInfo={runtime}
            />
          );
        })}

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
    </div>
  );
}
