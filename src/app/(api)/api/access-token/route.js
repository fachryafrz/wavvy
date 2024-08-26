import { spotify_access_token } from "@/lib/constants";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const cookiesStore = cookies();

  try {
    if (cookiesStore.has(spotify_access_token)) {
      return NextResponse.json(
        { access_token: cookiesStore.get(spotify_access_token).value },
        { status: 200 },
      );
    }

    const { data } = await axios.post(
      process.env.ACCESS_TOKEN_URL,
      {
        grant_type: "client_credentials",
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`,
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    cookiesStore.set(spotify_access_token, data.access_token, {
      maxAge: data.expires_in,
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.error(error);
  }
}
