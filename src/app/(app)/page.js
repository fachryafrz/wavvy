import LeftContent from "@/components/Layout/Home/LeftContent";
import { fetchData } from "@/server/actions";

export const revalidate = 1800; // 30 minutes

export default async function Home() {
  const {
    data: { categories },
  } = await fetchData(`/browse/categories`);

  const categoriesPlaylists = await Promise.all(
    categories.items.map(({ id }) =>
      fetchData(`/browse/categories/${id}/playlists`).then(({ data }) => data),
    ),
  );

  return (
    <div className={`flex flex-col gap-4 lg:grid lg:grid-cols-12`}>
      {/* Left Content */}
      <div className={`col-span-full lg:row-start-1`}>
        {categories && categoriesPlaylists && (
          <LeftContent
            categories={categories}
            categoriesPlaylists={categoriesPlaylists}
          />
        )}
      </div>
    </div>
  );
}
