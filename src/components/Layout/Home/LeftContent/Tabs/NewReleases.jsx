import CardLong from "@/components/Card/CardLong";
import LoadingCard from "@/components/Loading/Card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";

export default function TabNewReleases() {
  const {
    data,
    error,
    isLoading: loading,
  } = useQuery({
    queryKey: `/api/browse/new-releases`,
    queryFn: async ({ queryKey }) => {
      return await axios.get(queryKey).then(({ data }) => data);
    },
  });

  const [showLimit, setShowLimit] = useState(5);
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
    setShowLimit(showMore ? 5 : data.albums.items.length);
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

      {!loading && data?.albums.items.length > 0 ? (
        data.albums.items.slice(0, showLimit).map((item, i) => {
          const [image] = item.images;
          const releaseDate = moment(item.release_date).format("MMMM DD, YYYY");

          return (
            <CardLong
              key={item.id}
              item={item}
              image={image?.url ?? "/maskable/maskable_icon_x192.png"}
              link={`/${item.type}/${item.id}`}
              smallInfo={
                <span className={`capitalize`}>{item.album_type}</span>
              }
              secondInfo={item.artists.map((artist) => {
                return (
                  <>
                    <Link
                      href={`/${artist.type}/${artist.id}`}
                      className={`hocus:underline`}
                    >
                      {artist.name}
                    </Link>

                    <span className={`last:hidden`}>, </span>
                  </>
                );
              })}
              thirdInfo={<div className={`mx-auto w-fit`}>{releaseDate}</div>}
            />
          );
        })
      ) : (
        <span
          className={`text mx-auto block w-fit text-sm font-medium text-neutral-500`}
        >
          No data.
        </span>
      )}

      {!loading && data?.albums.items.length > showLimit && (
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
