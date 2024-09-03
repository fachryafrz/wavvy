import CardLong from "@/components/Card/CardLong";
import LoadingCard from "@/components/Loading/Card";
import { userStore } from "@/zustand/user";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function TabNewReleases() {
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

    const fetchNewReleases = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/api/browse/new-releases`);
        setIsLoading(false);

        setData(data.albums);
      } catch ({ response }) {
        if (response.status === 401) router.push("/login");
      }
    };

    fetchNewReleases();
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
        data.items.slice(0, showLimit).map((item, i) => {
          const [image] = item.images;
          const releaseDate = moment(item.release_date).format("MMMM DD, YYYY");

          return (
            <CardLong
              key={item.id}
              item={item}
              image={image.url}
              link={`/album/${item.id}`}
              smallInfo={
                <span className={`capitalize`}>{item.album_type}</span>
              }
              thirdInfo={releaseDate}
              secondInfo={item.artists.map((artist) => artist.name).join(`, `)}
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
