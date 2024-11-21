import Item from "@/components/Search/Item";
import { isPlural } from "@/lib/isPlural";
import Link from "next/link";
import { fetchData } from "@/server/actions";

export async function generateMetadata({ params }) {
  const { query: rawQuery } = params;

  const query = decodeURIComponent(rawQuery).replace(/\+/g, " ");

  return {
    title: `Search "${query}"`,
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
    openGraph: {
      title: `Search "${query}" - ${process.env.NEXT_PUBLIC_APP_NAME}`,
    },
  };
}

export default async function page({ params }) {
  const { query } = params;

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
          <Item items={data?.albums?.items.slice(0, 6)} />
        </div>
      </section>

      <section>
        <Link
          href={`/search/${query}/playlists`}
          className={`text-xl font-medium hocus:underline`}
        >
          {isPlural(data?.playlists?.items.length, "Playlist", "Playlists")}
        </Link>
        <div className={`-mx-2`}>
          <Item items={data?.playlists?.items.slice(0, 6)} />
        </div>
      </section>
    </div>
  );
}
