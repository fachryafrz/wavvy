import { ProfileHero } from "@/components/Layout/Profile/Hero";
import { createSpotifyAxiosInstance } from "@/lib/axios";

export default async function page({ params }) {
  const { id } = params;

  const axios = await createSpotifyAxiosInstance();

  const [user] = await Promise.all([
    axios.get(`/users/${id}`).then(({ data }) => data),
  ]);

  return (
    <div className={`space-y-4`}>
      <ProfileHero user={user} />
    </div>
  );
}
