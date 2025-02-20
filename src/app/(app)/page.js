import LeftContent from "@/components/Layout/Home/LeftContent";
import { createSpotifyAxiosInstance } from "@/lib/axios";

export default async function Home() {
  const axios = await createSpotifyAxiosInstance();

  const {
    data: { categories },
  } = await axios.get(`/browse/categories`);

  const categoriesPlaylists = await Promise.all(
    categories.items.slice(0, 6).map(({ id }) =>
      axios.get(`/browse/categories/${id}/playlists`).then(({ data }) => data),
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
