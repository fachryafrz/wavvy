import Item from "@/components/Search/Item";
import { isPlural } from "@/lib/isPlural";
import { fetchData } from "@/server/actions";

export async function generateMetadata({ params }) {
  const { query: rawQuery } = params;

  const query = decodeURIComponent(rawQuery).replace(/\+/g, " ");

  return {
    title: `Search albums "${query}"`,
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
    openGraph: {
      title: `Search albums "${query}" - ${process.env.NEXT_PUBLIC_APP_NAME}`,
    },
  };
}

export default async function page({ params }) {
  const { query } = params;

  const { data, error } = await fetchData(`/search?q=${query}`, {
    params: { type: "album" },
  });

  return (
    <div className={`flex flex-col gap-4 @container`}>
      <section>
        <div className={`text-xl font-medium`}>
          {isPlural(data.albums.items.length, "Album", "Albums")}
        </div>
        <div className={`-mx-2`}>
          <Item items={data.albums.items} />
        </div>
      </section>
    </div>
  );
}
