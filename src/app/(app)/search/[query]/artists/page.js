import Item from "@/components/Search/Item";
import { fetchData } from "@/server/actions";
import pluralize from "pluralize";

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
          {pluralize("Artist", data.artists.items.length)}
        </div>
        <div className={`-mx-2`}>
          <Item itemsData={data.artists.items} />
        </div>
      </section>
    </div>
  );
}
