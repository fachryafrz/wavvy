import { spotify_access_token } from "@/lib/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export async function generateMetadata() {
  return {
    title: `Podcasts`,
  };
}

export default function page() {
  const cookiesStore = cookies();

  if (!cookiesStore.has(spotify_access_token)) {
    return redirect(`/login`);
  }

  const headers = {
    Authorization: `Bearer ${cookiesStore.get(spotify_access_token).value}`,
  };

  return <div>Podcasts</div>;
}
