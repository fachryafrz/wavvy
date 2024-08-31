"use client";

import Link from "next/link";
import { ChevronForward } from "react-ionicons";
import ArtistCard from "../Artist/Card";

export default function FavoriteArtists({ data }) {
  const showLimit = 5;

  // const { user } = userStore();
  // const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   if (!user) return;

  //   const fetchSavedTracks = async () => {
  //     const { data } = await axios.get(`/api/me/following`, {
  //       params: { type: "artist" },
  //     });

  //     setIsLoading(false);
  //     setData(data.artists.items.slice(0, showLimit));
  //   };

  //   checkToken(fetchSavedTracks);
  // }, [user]);

  return (
    <div className={`flex flex-col gap-2`}>
      {/* Header */}
      <div className={`flex items-center justify-between`}>
        <h2 className={`section-title`}>Favorite Artists</h2>

        <Link href={`/`} className={`text-xs font-medium text-primary`}>
          See all
        </Link>
      </div>

      {/* {isLoading && (
        <div className={`-mx-1 flex flex-col`}>
          {[...Array(showLimit)].map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      )} */}

      {/* Cards */}
      {data.artists.items.length > 0 && (
        <ul className={`-mx-1 flex flex-col`}>
          {data.artists.items.slice(0, showLimit).map((item, i) => {
            return (
              <li key={item.id}>
                <Link
                  href={`/artist/${item.id}`}
                  className={`flex items-center justify-between`}
                >
                  <ArtistCard artist={item} index={i} />

                  <ChevronForward
                    color={`#ffffff`}
                    width={`16px`}
                    height={`16px`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
