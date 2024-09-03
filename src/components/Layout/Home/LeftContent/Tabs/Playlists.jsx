import CardLong from "@/components/Card/CardLong";
import LoadingCard from "@/components/Loading/Card";
import { userStore } from "@/zustand/user";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function TabPlaylists() {
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

    const fetchFeaturedPlaylists = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/api/browse/featured-playlists`);
        setIsLoading(false);

        setData(data.playlists);
      } catch ({ response }) {
        if (response.status === 401) router.push("/login");
      }
    };

    fetchFeaturedPlaylists();
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
        data.items.slice(0, 5).map((playlist, i) => {
          const image = playlist.images[0].url;

          return (
            <CardLong
              key={playlist.id}
              item={playlist}
              image={image}
              link={`/playlist/${playlist.id}`}
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
