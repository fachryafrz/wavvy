import CardLong from "@/components/Card/CardLong";
import LoadingCard from "@/components/Loading/Card";
import { userStore } from "@/zustand/user";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function TabSavedTracks() {
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

    const fetchSavedTracks = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/api/me/tracks`);
        setIsLoading(false);

        setData(data);
      } catch ({ response }) {
        if (response.status === 401) router.push("/login ");
      }
    };

    fetchSavedTracks();
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
          const [image] = item.track.album.images;
          const releaseDate = moment(item.release_date).format("MMMM DD, YYYY");
          const runtime = `${moment(item.track.duration_ms).format("m")}m ${moment(item.track.duration_ms).format("ss")}s`;

          return (
            <CardLong
              key={item.track.id}
              item={item.track}
              image={image.url}
              link={`/track/${item.track.id}`}
              smallInfo={item.track.artists
                .map((artist) => artist.name)
                .join(", ")}
              secondInfo={
                <Link
                  href={`/album/${item.track.album.id}`}
                  className={`hocus:underline`}
                >
                  {item.track.album.name}
                </Link>
              }
              thirdInfo={runtime}
            />
          );
        })}

      {!isLoading && data?.items.length > showLimit && (
        <div className={`mt-4 flex justify-center`}>
          <Link
            href={`/me/tracks`}
            className={`btn btn-ghost btn-sm w-full text-primary`}
          >
            Show more
          </Link>
        </div>
      )}
    </div>
  );
}
