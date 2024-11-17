import LeftContent from "@/components/Layout/Home/LeftContent";
import { SPOTIFY_ACCESS_TOKEN } from "@/lib/constants";
import { fetchData } from "@/server/actions";

export default async function Home() {
  const {
    data: { categories },
  } = await fetchData(`/browse/categories`);

  const categoriesPlaylists = [];

  for (const item of categories.items) {
    const { id } = item;

    const { data } = await fetchData(`/browse/categories/${id}/playlists`);

    categoriesPlaylists.push(data);
  }

  return (
    <div className={`flex flex-col gap-4 lg:grid lg:grid-cols-12`}>
      {/* Left Content */}
      <div className={`col-span-full lg:row-start-1`}>
        <LeftContent
          categories={categories}
          categoriesPlaylists={categoriesPlaylists}
        />
      </div>
    </div>
  );
}
