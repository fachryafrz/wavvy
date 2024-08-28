import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import TabPlaylists from "./Playlists";
import TabArtists from "./Artists";
import TabAlbums from "./Albums";
import TabStreams from "./Streams";

export default function HomeTabs() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tabParam = searchParams.get("tab") || "playlists";
  const tabs = [
    {
      title: "Playlists",
      href: "/?tab=playlists",
    },
    {
      title: "Artists",
      href: "/?tab=artists",
    },
    {
      title: "Albums",
      href: "/?tab=albums",
    },
    {
      title: "Streams",
      href: "/?tab=streams",
    },
  ];

  return (
    <div className={`flex flex-col gap-2 sm:gap-4`}>
      {/* Tabs */}
      <div
        className={`relative flex items-center gap-6 overflow-x-auto py-4 before:absolute before:-top-4 before:left-0 before:h-0.5 before:w-full before:bg-neutral sm:overflow-x-visible sm:py-0`}
      >
        {tabs.map((tab, index) => {
          const isActive = tab.href.includes(`tab=${tabParam}`);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`nav-link relative !bg-transparent text-sm font-medium hocus:bg-transparent hocus:opacity-50 ${isActive ? "active-top" : ""}`}
            >
              <h2>{tab.title}</h2>
            </Link>
          );
        })}
      </div>

      {/* List */}
      <div>
        {tabParam === "playlists" && <TabPlaylists />}

        {tabParam === "artists" && <TabArtists />}

        {tabParam === "albums" && <TabAlbums />}

        {tabParam === "streams" && <TabStreams />}
      </div>
    </div>
  );
}
