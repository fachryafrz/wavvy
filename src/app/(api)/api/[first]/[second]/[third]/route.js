import { SPOTIFY_ACCESS_TOKEN } from "@/lib/constants";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { limiter, tokenExpired } from "../../../config/limiter";

export async function GET(req, ctx) {
  const { first, second, third } = ctx.params;
  const { searchParams } = new URL(req.url);
  const cookiesStore = cookies();

  const remainingToken = await limiter.removeTokens(1);
  if (remainingToken < 0) return tokenExpired(req);

  try {
    const { data, status } = await axios.get(
      `${process.env.API_URL}/${first}/${second}/${third}`,
      {
        headers: {
          Authorization: `Bearer ${cookiesStore.get(SPOTIFY_ACCESS_TOKEN).value}`,
        },
        params: Object.fromEntries(searchParams)
      }
    )

    return NextResponse.json(data, { status });
  } catch (error) {
    return NextResponse.json(error.response.data, { status: error.response.status });
  }
}

export async function PUT(req, ctx) {
  const { first, second, third } = ctx.params;
  const { searchParams } = new URL(req.url);
  const cookiesStore = cookies();

  const remainingToken = await limiter.removeTokens(1);
  if (remainingToken < 0) return tokenExpired(req);

  try {
    const { data, status } = await axios.put(
      `${process.env.API_URL}/${first}/${second}/${third}`, {},
      {
        headers: {
          Authorization: `Bearer ${cookiesStore.get(SPOTIFY_ACCESS_TOKEN).value}`,
        },
        params: Object.fromEntries(searchParams)
      }
    )

    return NextResponse.json(data, { status });
  } catch (error) {
    return NextResponse.json(error.response.data, { status: error.response.status });
  }
}

export async function DELETE(req, ctx) {
  const { first, second, third } = ctx.params;
  const { searchParams } = new URL(req.url);
  const cookiesStore = cookies();

  const remainingToken = await limiter.removeTokens(1);
  if (remainingToken < 0) return tokenExpired(req);

  try {
    const { data, status } = await axios.delete(
      `${process.env.API_URL}/${first}/${second}/${third}`,
      {
        headers: {
          Authorization: `Bearer ${cookiesStore.get(SPOTIFY_ACCESS_TOKEN).value}`,
        },
        params: Object.fromEntries(searchParams)
      }
    )

    return NextResponse.json(data, { status });
  } catch (error) {
    return NextResponse.json(error.response.data, { status: error.response.status });
  }
}