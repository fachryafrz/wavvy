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
    if (!code) {
      if (cookiesStore.has(spotify_access_token)) {
        return NextResponse.json(
          { access_token: cookiesStore.get(spotify_access_token).value },
          { status: 200 },
        );
      } else if (cookiesStore.has(spotify_refresh_token)) {
        const params = new URLSearchParams({
          refresh_token: cookiesStore.get(spotify_refresh_token).value,
          grant_type: "refresh_token",
          client_id: process.env.CLIENT_ID,
        });

        const { data } = await axios.post(
          process.env.ACCESS_TOKEN_URL,
          params.toString(),
          { headers: headers },
        );

        cookiesStore.set(spotify_access_token, data.access_token, {
          maxAge: data.expires_in,
        });
        cookiesStore.delete(spotify_refresh_token);

        return NextResponse.json(data, { status: 200 });
      } else {
        // const { data } = await axios.post(
        //   process.env.ACCESS_TOKEN_URL,
        //   { grant_type: "client_credentials" },
        //   { headers: headers },
        // );

        // cookiesStore.set(spotify_access_token, data.access_token, {
        //   maxAge: data.expires_in,
        // });

        // return NextResponse.json(data, { status: 200 });

        return NextResponse.json("No access token", { status: 200 });
      }
    }

    if (code) {
      const { data } = await axios.post(
        process.env.ACCESS_TOKEN_URL,
        {
          code: code,
          redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
          grant_type: "authorization_code",
        },
        { headers: headers },
      );

      cookiesStore.set(spotify_access_token, data.access_token, {
        maxAge: data.expires_in,
      });
      cookiesStore.set(spotify_refresh_token, data.refresh_token, {
        maxAge: 60 * 60 * 24 * 30,
      });

      return NextResponse.json(data, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(error, { status: error.status });
  }
}
