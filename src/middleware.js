import {
  RYTH_REDIRECT,
  SPOTIFY_ACCESS_TOKEN,
  SPOTIFY_REFRESH_TOKEN,
} from "./lib/constants";
import { NextResponse } from "next/server";

export default async function middleware(request) {
  const { pathname, searchParams } = request.nextUrl;
  const headers = {
    Authorization: `Basic ${Buffer.from(
      `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`,
    ).toString("base64")}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const isLoginPage = pathname.startsWith("/login");
  const isApiRoute = pathname.startsWith("/api");

  const cookiesStore = request.cookies;
  const accessToken = cookiesStore.has(SPOTIFY_ACCESS_TOKEN);
  const refreshToken = cookiesStore.has(SPOTIFY_REFRESH_TOKEN);
  const redirect = cookiesStore.get(RYTH_REDIRECT)?.value || pathname;

  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(new URL(redirect, request.url));
  }

  if (code) {
    const params = new URLSearchParams({
      code: code,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}`,
      grant_type: "authorization_code",
    });
    const data = await fetch(process.env.ACCESS_TOKEN_URL, {
      method: "POST",
      headers: headers,
      body: params.toString(),
    }).then((res) => res.json());

    const response = NextResponse.redirect(new URL(redirect, request.url));

    response.cookies.set(SPOTIFY_ACCESS_TOKEN, data.access_token, {
      maxAge: data.expires_in,
    });
    response.cookies.set(SPOTIFY_REFRESH_TOKEN, data.refresh_token, {
      maxAge: 60 * 60 * 24 * 30,
    });
    response.cookies.delete(RYTH_REDIRECT);

    return response;
  } else if (accessToken) {
    return NextResponse.next();
  } else if (refreshToken) {
    const params = new URLSearchParams({
      refresh_token: cookiesStore.get(SPOTIFY_REFRESH_TOKEN).value,
      grant_type: "refresh_token",
      client_id: process.env.CLIENT_ID,
    });
    const data = await fetch(process.env.ACCESS_TOKEN_URL, {
      method: "POST",
      headers: headers,
      body: params.toString(),
    }).then((res) => res.json());

    const response = NextResponse.next();

    response.cookies.set(SPOTIFY_ACCESS_TOKEN, data.access_token, {
      maxAge: data.expires_in,
    });
    response.cookies.delete(SPOTIFY_REFRESH_TOKEN);
    response.cookies.delete(RYTH_REDIRECT);

    return response;
  }

  if (!accessToken) {
    const params = new URLSearchParams({
      grant_type: "client_credentials",
    });
    const data = await fetch(process.env.ACCESS_TOKEN_URL, {
      method: "POST",
      headers: headers,
      body: params.toString(),
    }).then((res) => res.json());

    const response = NextResponse.redirect(new URL(redirect, request.url));

    response.cookies.set(SPOTIFY_ACCESS_TOKEN, data.access_token, {
      maxAge: data.expires_in,
    });
    response.cookies.delete(RYTH_REDIRECT);

    return response;
  }

  if (!accessToken && isApiRoute) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
