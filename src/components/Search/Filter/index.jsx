"use client";

import { Close, Options } from "react-ionicons";
import Acousticness from "./Acousticness";
import Danceability from "./Danceability";
import Duration from "./Duration";
import Energy from "./Energy";
import Instrumentalness from "./Instrumentalness";
import Key from "./Key";
import Liveness from "./Liveness";
import Loudness from "./Loudness";
import Mode from "./Mode";
import Popularity from "./Popularity";
import Speechiness from "./Speechiness";
import Tempo from "./Tempo";
import TimeSignature from "./TimeSignature";
import Valence from "./Valence";
import Genre from "./Genre";
import Market from "./Market";
import Artist from "./Artist";
import Track from "./Track";
import { useFilterToggle } from "@/zustand/filterToggle";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRequiredFilter } from "@/zustand/isRequiredFilter";

export default function Filter({ markets, genres }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { filterToggle, setFilterToggle } = useFilterToggle();
  const { setIsRequired } = useRequiredFilter();

  useEffect(() => {
    const requiredFilter = ["seed_artists", "seed_genres", "seed_tracks"];
    const hasSomeFilter = requiredFilter.some((param) =>
      searchParams.has(param),
    );

    if (hasSomeFilter) {
      setIsRequired(false);
    } else {
      router.push("/search");
      setIsRequired(true);
    }
  }, [searchParams]);

  const oldClassName = `fixed left-0 z-20 max-h-[calc(100dvh-(64px+80px))] w-full flex-1 space-y-2 overflow-y-auto bg-neutral bg-opacity-90 p-4 backdrop-blur transition-all duration-300 sm:left-4 sm:mt-2 sm:max-h-[calc(100dvh-(64px+84px+1.5rem))] sm:max-w-[300px] sm:rounded-2xl lg:left-auto xl:sticky xl:top-2 ${filterToggle ? "-translate-x-0 opacity-100 xl:ml-0" : "-translate-x-[calc(100%+1rem)] opacity-0 xl:-ml-[calc(300px+1rem)]"}`;

  return (
    <div
      className={`fixed left-0 top-[66px] z-20 w-full transition-all duration-300 sm:left-4 sm:mt-2 sm:max-w-[300px] lg:left-auto xl:static ${filterToggle ? "-translate-x-0 opacity-100 xl:ml-0" : "-translate-x-[calc(100%+1rem)] opacity-0 xl:-ml-[calc(300px+1rem)]"}`}
    >
      {/* Filter */}
      <div
        className={`max-h-[calc(100dvh-(64px+80px))] space-y-2 overflow-y-auto bg-neutral bg-opacity-90 p-4 backdrop-blur sm:max-h-[calc(100dvh-(64px+84px+1.5rem))] sm:rounded-2xl xl:sticky xl:top-2`}
      >
        <Artist />
        <Genre data={genres} />
        <Track />
        <Market data={markets} />
        <Valence />
        <Acousticness />
        <Danceability />
        <Duration />
        <Energy />
        <Instrumentalness />
        <Key />
        <Liveness />
        <Loudness />
        <Mode />
        <Popularity />
        <Speechiness />
        <Tempo />
        <TimeSignature />
      </div>

      {/* Close Button */}
      <button
        onClick={() => setFilterToggle(false)}
        className={`absolute right-4 top-2 block sm:hidden`}
      >
        <Close color={`#ffffff`} width={`34px`} height={`34px`} />
      </button>
    </div>
  );
}

export function FilterMenuToggle() {
  const { filterToggle, setFilterToggle } = useFilterToggle();

  return (
    <button
      onClick={() => setFilterToggle(!filterToggle)}
      className={`btn btn-circle btn-primary`}
    >
      <Options color={`#ffffff`} />
    </button>
  );
}
