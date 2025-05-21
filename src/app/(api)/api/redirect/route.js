import {
  WAVVY_REDIRECT,
  SPOTIFY_ACCESS_TOKEN,
  SPOTIFY_REFRESH_TOKEN,
} from "@/lib/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { limiter, tokenExpired } from "../config/limiter";

export async function GET(req) {
  const cookiesStore = cookies();
  const headers = {
    Authorization: `Basic ${Buffer.from(
      `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`,
    ).toString("base64")}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const url = new URL(req.url);
  const { path } = Object.fromEntries(url.searchParams);

  const remainingToken = await limiter.removeTokens(1);
  if (remainingToken < 0) return tokenExpired(req);

  try {
    cookiesStore.set(WAVVY_REDIRECT, path);

    return NextResponse.json({ message: "Login attempt" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.response.data, { status: error.response.status });
  }
}
