import Item from "@/components/Search/Item";
import Link from "next/link";
import { fetchData } from "@/server/actions";
import pluralize from "pluralize";

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
  const { query: rawQuery } = params;

  const query = decodeURIComponent(rawQuery);

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
          {pluralize("Song", data?.tracks?.items.length)}
        </Link>
        <div className={`-mx-2`}>
          <Item itemsData={data?.tracks?.items} itemsType="tracks" />
        </div>
      </section>

      <section>
        <Link
          href={`/search/${query}/artists`}
          className={`text-xl font-medium hocus:underline`}
        >
          {pluralize("Artist", data?.artists?.items.length)}
        </Link>
        <div className={`-mx-2`}>
          <Item itemsData={data?.artists?.items} itemsType="artists" />
        </div>
      </section>

      <section>
        <Link
          href={`/search/${query}/albums`}
          className={`text-xl font-medium hocus:underline`}
        >
          {pluralize("Album", data?.albums?.items.length)}
        </Link>
        <div className={`-mx-2`}>
          <Item itemsData={data?.albums?.items} itemsType="albums" />
        </div>
      </section>

      <section>
        <Link
          href={`/search/${query}/playlists`}
          className={`text-xl font-medium hocus:underline`}
        >
          {pluralize("Playlist", data?.playlists?.items.length)}
        </Link>
        <div className={`-mx-2`}>
          <Item itemsData={data?.playlists?.items} itemsType="playlists" />
        </div>
      </section>
    </div>
  );
}
