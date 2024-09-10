import {
  spotify_access_token,
  spotify_authorization,
  spotify_refresh_token,
} from "@/lib/constants";
import { generateRandomString } from "@/lib/randomString";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request) {
  const { context_uri, uris, offset, position_ms } = await request.json();

  const cookiesStore = cookies();

  try {
    const { data } = await axios.put(
      `${process.env.API_URL}/me/player/play`,
      { context_uri, uris, offset, position_ms },
      {
        headers: {
          Authorization: `Bearer ${cookiesStore.get(spotify_access_token).value}`,
        },
      },
    );

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: error.status });
  }
}
