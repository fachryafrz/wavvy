import Item from "@/components/Search/Item";
import { isPlural } from "@/lib/isPlural";
import { fetchData } from "@/server/actions";

export async function generateMetadata({ params }) {
  const { query: rawQuery } = params;

  const query = decodeURIComponent(rawQuery).replace(/\+/g, " ");

  return {
    title: `Search artists "${query}"`,
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
    openGraph: {
      title: `Search artists "${query}" - ${process.env.NEXT_PUBLIC_APP_NAME}`,
    },
  };
}

export default async function page({ params }) {
  const { query } = params;

  const { data } = await fetchData(`/search?q=${query}`, {
    params: { type: "artist" },
  });

  return (
    <div className={`flex flex-col gap-4 @container`}>
      <section>
        <div className={`text-xl font-medium`}>
          {isPlural(data.artists.items.length, "Artist", "Artists")}
        </div>
        <div className={`-mx-2`}>
          <Item items={data.artists.items} />
        </div>
      </section>
    </div>
  );
}
