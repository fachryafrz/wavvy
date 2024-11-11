// "use client";

import { fetchData } from "@/server/actions";
// import { useQuery } from "@tanstack/react-query";
import { isPlural } from "@/lib/isPlural";
import Link from "next/link";
import SkeletonItem from "../Skeleton/Card";
import Item from "./Item";

export default async function Search({ query }) {
  const types = [
    "album",
    "artist",
    "playlist",
    "track",
    "show",
    "episode",
    "audiobook",
  ];

  const { data } = await fetchData(`/search?q=${query}`, {
    params: {
      type: types.join(","),
    },
  });

  // const {
  //   data,
  //   error,
  //   isLoading: loading,
  // } = useQuery({
  //   queryKey: `/search?${new URLSearchParams({
  //     q: query,
  //   }).toString()}`,
  //   queryFn: async ({ queryKey }) => {
  //     return await fetchData(queryKey, {
  //       params: {
  //         type: types.join(","),
  //       },
  //     }).then(({ data }) => data);
  //   },
  // });

  // console.log(data);

  return (
    <div className={`flex flex-col gap-4 @container`}>
      <section>
        <Link
          href={`/search/${query}/tracks`}
          className={`text-xl font-medium hocus:underline`}
        >
          {isPlural(data?.tracks?.items.length, "Song", "Songs")}
        </Link>
        <div className={`-mx-2`}>
          {/* {loading && <SkeletonItem />} */}
          <Item items={data?.tracks?.items.slice(0, 6)} />
        </div>
      </section>

      <section>
        <Link
          href={`/search/${query}/artists`}
          className={`text-xl font-medium hocus:underline`}
        >
          {isPlural(data?.artists?.items.length, "Artist", "Artists")}
        </Link>
        <div className={`-mx-2`}>
          {/* {loading && <SkeletonItem type={`artist`} />} */}
          <Item items={data?.artists?.items.slice(0, 6)} />
        </div>
      </section>

      <section>
        <Link
          href={`/search/${query}/albums`}
          className={`text-xl font-medium hocus:underline`}
        >
          {isPlural(data?.albums?.items.length, "Album", "Albums")}
        </Link>
        <div className={`-mx-2`}>
          {/* {loading && <SkeletonItem />} */}
          <Item items={data?.albums?.items.slice(0, 6)} />
        </div>
      </section>
    </div>
  );
}
