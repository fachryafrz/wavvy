import Profile from "@/components/User/Profile";
import { SPOTIFY_ACCESS_TOKEN } from "@/lib/constants";
import { fetchData } from "@/server/actions";
import { redirect } from "next/navigation";

export async function generateMetadata() {
  const { data: user } = await fetchData(`/me`);

  return {
    title: `${user.display_name}`,
  };
}

export default async function page() {
  const { data: user } = await fetchData(`/me`).catch((error) => redirect("/"));

  return (
    <div>
      <Profile user={user} />
    </div>
  );
}
