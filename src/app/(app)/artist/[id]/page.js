import { spotify_access_token } from "@/lib/constants";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export async function generateMetadata({ params }) {
  const { id } = params;
  const cookiesStore = cookies();
  const headers = {
    Authorization: `Bearer ${cookiesStore.get(spotify_access_token).value}`,
  };

  const { data } = await axios.get(`${process.env.API_URL}/artists/${id}`, {
    headers: headers,
  });

  return {
    title: `${data.name}`,
  };
}

export default async function page({ params }) {
  const { id } = params;
  const cookiesStore = cookies();

  const headers = {
    Authorization: `Bearer ${cookiesStore.get(spotify_access_token).value}`,
  };

  const { data } = await axios.get(`${process.env.API_URL}/artists/${id}`, {
    headers: headers,
  });

  return (
    <div>
      <div>{data.name}</div>
    </div>
  );
}
