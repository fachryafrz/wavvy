import {
  RYTH_REDIRECT,
  SPOTIFY_ACCESS_TOKEN,
  SPOTIFY_REFRESH_TOKEN,
} from "@/lib/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { limiter, tokenExpired } from "../../config/limiter";

export async function DELETE(req) {
  const cookiesStore = cookies();
  const headers = {
    Authorization: `Basic ${Buffer.from(
      `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`,
    ).toString("base64")}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const remainingToken = await limiter.removeTokens(1);
  if (remainingToken < 0) return tokenExpired(req);


  try {
    cookiesStore.delete(SPOTIFY_ACCESS_TOKEN);
    cookiesStore.delete(SPOTIFY_REFRESH_TOKEN);

    const params = new URLSearchParams({
      grant_type: "client_credentials",
    });
    const data = await fetch(process.env.ACCESS_TOKEN_URL, {
      method: "POST",
      headers: headers,
      body: params.toString(),
    }).then((res) => res.json());

    cookiesStore.set(SPOTIFY_ACCESS_TOKEN, data.access_token, {
      maxAge: data.expires_in,
    });
    cookiesStore.delete(RYTH_REDIRECT);

    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(error.response.data, { status: error.response.status });
  }
}
