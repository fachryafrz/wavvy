import Profile from "@/components/User/Profile";
import { SPOTIFY_ACCESS_TOKEN } from "@/lib/constants";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function generateMetadata() {
  const cookiesStore = cookies();
  const headers = {
    Authorization: `Bearer ${cookiesStore.get(SPOTIFY_ACCESS_TOKEN).value}`,
  };

  const { data: user } = await axios
    .get(`${process.env.API_URL}/me`, {
      headers: headers,
    })
    .catch((error) => redirect("/"));

  return {
    title: `${user.display_name}`,
  };
}

export default async function page() {
  const cookiesStore = cookies();

  const headers = {
    Authorization: `Bearer ${cookiesStore.get(SPOTIFY_ACCESS_TOKEN).value}`,
  };

  const { data: user } = await axios.get(`${process.env.API_URL}/me`, {
    headers: headers,
  });

  return (
    <div>
      <Profile user={user} />
    </div>
  );
}
