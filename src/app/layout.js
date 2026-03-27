import "./globals.css";
import { Suspense } from "react";
import { CookiesProvider } from "next-client-cookies/server";
import TanStackQuery from "@/providers/TanStackQuery";
import { Roboto } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Sidebar from "@/components/Layout/Sidebar";
import { cookies } from "next/headers";
import { SPOTIFY_ACCESS_TOKEN } from "@/lib/constants";
import Providers from "@/components/Layout/ProgressBarProvider";
import { siteConfig } from "@/config/site";
import Link from "next/link";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
  userScalable: true,
  colorScheme: "dark",
};

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: `%s - ${siteConfig.name}`,
    default: siteConfig.name,
  },
  description: siteConfig.description,
  openGraph: {
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    images: {
      url: "/maskable/maskable_icon_x512.png",
      width: 512,
      height: 512,
    },
  },
  robots: {
    index: false,
    follow: false,
    noimageindex: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function RootLayout({ children }) {
  // const cookiesStore = cookies();

  const gtagId = process.env.GA_MEASUREMENT_ID;
  // const authorizationURL = process.env.AUTHORIZATION_URL;
  // const client_id = process.env.CLIENT_ID;

  // const AUTH_TOKEN = cookiesStore.get(SPOTIFY_ACCESS_TOKEN).value;

  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>
          <CookiesProvider>
            <TanStackQuery>
              {/* <Sidebar
                authorizationURL={authorizationURL}
                client_id={client_id}
                AUTH_TOKEN={AUTH_TOKEN}
              > */}
              <div className="grid min-h-svh place-content-center">
                <div className="flex w-full max-w-md flex-col items-center rounded-2xl border border-[#282828] bg-[#181818] p-8 text-center shadow-2xl duration-500">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                      <path d="M12 9v4"></path>
                      <path d="M12 17h.01"></path>
                    </svg>
                  </div>
                  <h1 className="mb-4 text-2xl font-bold">End of Service</h1>
                  <p className="mb-6 leading-relaxed text-[#a7a7a7]">
                    Due to changes from Spotify, this project is no longer able
                    to work as intended.
                  </p>
                  <div className="flex w-full flex-col gap-3">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost flex w-full items-center justify-center gap-2 rounded-full border border-white/20"
                      href="https://developer.spotify.com/blog/2026-02-06-update-on-developer-access-and-platform-security"
                    >
                      Read Spotify&apos;s Policy Update
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M15 3h6v6"></path>
                        <path d="M10 14 21 3"></path>
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              {/* </Sidebar> */}
            </TanStackQuery>
          </CookiesProvider>

          <GoogleAnalytics gaId={gtagId} />
        </Providers>
      </body>
    </html>
  );
}
