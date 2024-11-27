import LoginAlert from "@/components/Modals/LoginAlert";
import Profile from "@/components/User/Profile";
import { fetchData } from "@/server/actions";
import { redirect } from "next/navigation";

export async function generateMetadata() {
  const { data: user, error } = await fetchData(`/me`);

  if (error)
    return {
      title: "You are not logged in",
    };

  return {
    title: `${user.display_name}`,
  };
}

export default async function page() {
  const { data: user, error } = await fetchData(`/me`).catch((error) =>
    redirect("/"),
  );

  if (error) return <LoginAlert show={true} redirect={`/`} />;

  return (
    <div>
      <Profile user={user} />
    </div>
  );
}
