import { spotify_access_token, spotify_refresh_token } from "@/lib/constants";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { code } = await request.json();

  const cookiesStore = cookies();
  const headers = {
    Authorization: `Basic ${Buffer.from(
      `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`,
    ).toString("base64")}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  try {
    if (cookiesStore.has(spotify_refresh_token)) {
      const { data } = await axios.post(
        process.env.ACCESS_TOKEN_URL,
        {
          refresh_token: cookiesStore.get(spotify_refresh_token).value,
          grant_type: "refresh_token",
          client_id: process.env.CLIENT_ID,
        },
        { headers: headers },
      );

      cookiesStore.set(spotify_access_token, data.access_token, {
        maxAge: data.expires_in,
      });
      cookiesStore.set(spotify_refresh_token, data.refresh_token, {
        maxAge: data.expires_in,
      });

      return NextResponse.json(data, { status: 200 });
    }
  } catch (error) {
    return NextResponse.error(error);
  }
}
