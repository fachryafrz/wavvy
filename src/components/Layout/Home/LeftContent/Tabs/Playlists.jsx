import CardLong from "@/components/Card/CardLong";
import LoadingCard from "@/components/Loading/Card";
import { useFetch } from "@/helper/fetch";
import { useEffect, useState } from "react";

export default function TabPlaylists() {
  const { data, error, loading } = useFetch(`/api/browse/featured-playlists`);

  const [showLimit, setShowLimit] = useState(5);
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
    setShowLimit(showMore ? 5 : data.playlists.items.length);
  };

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
        data?.playlists.items.length > 0 &&
        data.playlists.items.slice(0, showLimit).map((playlist, i) => {
          const image = playlist.images[0].url;

          return (
            <CardLong
              key={playlist.id}
              item={playlist}
              image={image}
              link={`/${playlist.type}/${playlist.id}`}
            />
          );
        })}

      {!loading && data?.playlists.items.length > showLimit && (
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
