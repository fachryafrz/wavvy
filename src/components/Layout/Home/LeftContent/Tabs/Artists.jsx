import CardLong from "@/components/Card/CardLong";
import LoadingCard from "@/components/Loading/Card";
import { useFetch } from "@/helper/fetch";
import numeral from "numeral";
import { useEffect, useState } from "react";

export default function TabArtists() {
  const { data, error, loading } = useFetch(`/api/me/top/artists`);

  const [showLimit, setShowLimit] = useState(5);
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
    setShowLimit(showMore ? 5 : data.items.length);
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
        data?.items.length > 0 &&
        data.items.slice(0, showLimit).map((artist, i) => {
          const image = artist.images[0].url;
          const followers = numeral(artist.followers.total).format(`0a`);

          return (
            <CardLong
              key={artist.id}
              item={artist}
              image={image}
              link={`/${artist.type}/${artist.id}`}
              secondInfo={
                <span className={`capitalize`}>
                  {artist.genres.slice(0, 2).join(", ")}
                </span>
              }
              thirdInfo={
                <div className={`mx-auto w-fit`}>{followers} folllowers</div>
              }
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
