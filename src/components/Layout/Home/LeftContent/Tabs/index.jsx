import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import TabPlaylists from "./Playlists";
import TabArtists from "./Artists";
import TabTracks from "./Tracks";
import TabNewReleases from "./NewReleases";
import TabSavedTracks from "./SavedTracks";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";

export default function HomeTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [tabParam, setTabParam] = useState("top-tracks");

  // const tabParam = searchParams.get("tab") || "tracks";
  const tabs = [
    {
      title: "Your Top Songs",
      tab: "top-tracks",
    },
    {
      title: "Your Top Artists",
      tab: "top-artists",
    },
    {
      title: "Popular Playlists",
      tab: "popular-playlists",
    },
    {
      title: "New Releases",
      tab: "new-releases",
    },
    {
      title: "Saved Songs",
      tab: "saved-tracks",
    },
  ];

  const handleTabChange = (tab) => {
    setTabParam(tab);
  };

  return (
    <div className={`flex flex-col h-full`}>
      {/* Tabs */}
      {/* <div
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
      </div> */}

      <div className="relative flex w-full items-center before:absolute before:left-0 before:top-0.5 before:h-0.5 before:w-full before:bg-neutral">
        <Swiper
          modules={[FreeMode]}
          freeMode={true}
          slidesPerView={`auto`}
          spaceBetween={24}
          className={`!mx-0 !py-4`}
        >
          {tabs.map((tab, index) => {
            const isActive = tab.tab.includes(tabParam);

            return (
              <SwiperSlide key={tab.href} className={`!max-w-fit`}>
                <button
                  key={tab.href}
                  onClick={() => handleTabChange(tab.tab)}
                  className={`nav-link relative !bg-transparent text-sm font-medium hocus:bg-transparent hocus:opacity-50 ${isActive ? "active-top" : ""}`}
                >
                  <h2>{tab.title}</h2>
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* List */}
      <div className={`-mx-1 h-full min-h-[368px]`}>
        {tabParam === "top-tracks" && <TabTracks />}
        {tabParam === "top-artists" && <TabArtists />}
        {tabParam === "popular-playlists" && <TabPlaylists />}
        {tabParam === "new-releases" && <TabNewReleases />}
        {tabParam === "saved-tracks" && <TabSavedTracks />}
      </div>
    </div>
  );
}
