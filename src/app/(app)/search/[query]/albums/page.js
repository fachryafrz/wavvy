import Item from "@/components/Search/Item";
import { fetchData } from "@/server/actions";
import pluralize from "pluralize";

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
          {pluralize("Album", data.albums.items.length)}
        </div>
        <div className={`-mx-2`}>
          <Item itemsData={data.albums.items} />
        </div>
      </section>
    </div>
  );
}
