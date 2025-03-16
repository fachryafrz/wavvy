import Item from "@/components/Search/Item";
import { siteConfig } from "@/config/site";
import { createSpotifyAxiosInstance } from "@/lib/axios";
import pluralize from "pluralize";

export async function generateMetadata({ params }) {
  const { query: rawQuery } = params;

  const query = decodeURIComponent(rawQuery).replace(/\+/g, " ");

  return {
    title: `Search albums "${query}"`,
    description: siteConfig.description,
    openGraph: {
      title: `Search albums "${query}" - ${siteConfig.name}`,
    },
  };
}

export default async function page({ params }) {
  const { query } = params;

  const axios = await createSpotifyAxiosInstance();

  const { data } = await axios.get(`/search`, {
    params: { q: query, type: "album" },
  });

  return (
    <div className={`flex flex-col gap-4 @container`}>
      <section>
        <div className={`text-xl font-medium`}>
          {pluralize("Album", data.albums.items.length)}
        </div>
        <div className={`-mx-2`}>
          <Item itemsData={data.albums.items} />
        </div>
      </section>
    </div>
  );
}
