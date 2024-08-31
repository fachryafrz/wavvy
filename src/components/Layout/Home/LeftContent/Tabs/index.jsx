import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import TabPlaylists from "./Playlists";
import TabArtists from "./Artists";
import TabTracks from "./Tracks";

export default function HomeTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [tabParam, setTabParam] = useState("tracks");

  // const tabParam = searchParams.get("tab") || "tracks";
  const tabs = [
    {
      title: "Your Top Tracks",
      tab: "tracks",
    },
    {
      title: "Your Top Artists",
      tab: "artists",
    },
    {
      title: "Popular Playlists",
      tab: "playlists",
    },
  ];

  const handleTabChange = (tab) => {
    setTabParam(tab.tab);
  };

  return (
    <div className={`mt-4 flex flex-col gap-2 sm:gap-4`}>
      {/* Tabs */}
      <div
        className={`relative flex items-center gap-6 before:absolute before:-top-4 before:left-0 before:h-0.5 before:w-full before:bg-neutral`}
      >
        {tabs.map((tab, index) => {
          const isActive = tab.tab.includes(tabParam);

          return (
            <button
              key={tab.href}
              onClick={() => handleTabChange(tab)}
              className={`nav-link relative !bg-transparent text-sm font-medium hocus:bg-transparent hocus:opacity-50 ${isActive ? "active-top" : ""}`}
            >
              <h2>{tab.title}</h2>
            </button>
          );
        })}
      </div>

      {/* List */}
      <div className={`-mx-1`}>
        {tabParam === "tracks" && <TabTracks />}

        {tabParam === "artists" && <TabArtists />}

        {tabParam === "playlists" && <TabPlaylists />}
      </div>
    </div>
  );
}
