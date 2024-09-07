import {
  ryth_redirect,
  spotify_access_token,
  spotify_refresh_token,
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

  const cookiesStore = request.cookies;
  const accessToken = cookiesStore.has(spotify_access_token);
  const refreshToken = cookiesStore.has(spotify_refresh_token);
  const redirect = cookiesStore.get(ryth_redirect)?.value || "/";

  if (isLoginPage) {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (code) {
      const params = new URLSearchParams({
        code: code,
        redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
        grant_type: "authorization_code",
      });
      const data = await fetch(process.env.ACCESS_TOKEN_URL, {
        method: "POST",
        headers: headers,
        body: params.toString(),
      }).then((res) => res.json());

      const response = NextResponse.redirect(new URL(redirect, request.url));

      response.cookies.set(spotify_access_token, data.access_token, {
        maxAge: data.expires_in,
      });
      response.cookies.set(spotify_refresh_token, data.refresh_token, {
        maxAge: 60 * 60 * 24 * 30,
      });
      response.cookies.delete(ryth_redirect);

      return response;
    } else if (accessToken) {
      return NextResponse.redirect(new URL("/", request.url));
    } else if (refreshToken) {
      const params = new URLSearchParams({
        refresh_token: cookiesStore.get(spotify_refresh_token).value,
        grant_type: "refresh_token",
        client_id: process.env.CLIENT_ID,
      });
      const data = await fetch(process.env.ACCESS_TOKEN_URL, {
        method: "POST",
        headers: headers,
        body: params.toString(),
      }).then((res) => res.json());

      const response = NextResponse.redirect(new URL(redirect, request.url));

      response.cookies.set(spotify_access_token, data.access_token, {
        maxAge: data.expires_in,
      });
      response.cookies.delete(spotify_refresh_token);
      response.cookies.delete(ryth_redirect);

      return response;
    }
  }

  if (!isLoginPage) {
    if (!accessToken) {
      const response = NextResponse.redirect(new URL("/login", request.url));

      response.cookies.set(ryth_redirect, pathname);

      return response;
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
