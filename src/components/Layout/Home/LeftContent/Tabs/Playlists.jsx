import CardLong from "@/components/Card/CardLong";
import LoadingCard from "@/components/Loading/Card";
import { checkToken } from "@/helper/checkToken";
import { userStore } from "@/zustand/user";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function TabPlaylists() {
  const { user } = userStore();

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

    const fetchCurrentUserPlaylists = async () => {
      setIsLoading(true);
      const { data } = await axios.get(`/api/me/playlists`);
      setIsLoading(false);

      setData(data);
    };

    checkToken(fetchCurrentUserPlaylists);
  }, [user]);

  return (
    <div>
      {isLoading && (
        <div className={`flex flex-col`}>
          {[...Array(3)].map((_, i) => (
            <LoadingCard key={i} responsive={true} info={false} />
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
