"use client";

import { Options } from "react-ionicons";
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

export default function Filter({ markets, genres }) {
  return (
    <div
      className={`flex-1 max-h-[calc(100dvh-(64px+64px+84px+1rem))] max-w-[300px] space-y-2 overflow-y-auto rounded-2xl bg-neutral p-4`}
    >
      <Market data={markets} />
      <Artist />
      <Genre data={genres} />
      <Track />
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
      <Valence />
    </div>
  );
}

export function FilterMenuToggle() {
  return (
    <button className={`btn btn-circle btn-primary`}>
      <Options color={`#ffffff`} />
    </button>
  );
}
