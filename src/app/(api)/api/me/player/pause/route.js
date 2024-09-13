import {
  SPOTIFY_ACCESS_TOKEN,
  SPOTIFY_AUTHORIZATION,
  SPOTIFY_REFRESH_TOKEN,
} from "@/lib/constants";
import { generateRandomString } from "@/lib/randomString";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request) {
  const url = new URL(request.url);
  const { device_id } = Object.fromEntries(url.searchParams);

  const cookiesStore = cookies();

  try {
    const { data, status } = await axios.put(
      `${process.env.API_URL}/me/player/pause`,
      {},
      {
        headers: {
          Authorization: `Bearer ${cookiesStore.get(SPOTIFY_ACCESS_TOKEN).value}`,
        },
        params: { device_id },
      },
    );

    return NextResponse.json(data, { status });
  } catch ({ response }) {
    const { data, status } = response;

    return NextResponse.json(data, { status });
  }
}
