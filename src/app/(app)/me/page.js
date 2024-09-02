import Profile from "@/components/User/Profile";
import { spotify_access_token } from "@/lib/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function page() {
  const cookiesStore = cookies();

  if (!cookiesStore.has(spotify_access_token)) {
    return redirect(`/login`);
  }

  const headers = {
    Authorization: `Bearer ${cookiesStore.get(spotify_access_token).value}`,
  };

  return (
    <div>
      <Profile />
    </div>
  );
}
