"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";

export default function Type() {
  const pathname = usePathname();

  const [origin, page, query, type] = pathname.split("/");

  const [tabParam, setTabParam] = useState("");

  const tabs = [
    {
      title: "All",
      href: `/search/${query}/`,
    },
    {
      title: "Songs",
      href: `/search/${query}/tracks`,
    },
    {
      title: "Artists",
      href: `/search/${query}/artists`,
    },
    {
      title: "Albums",
      href: `/search/${query}/albums`,
    },
    {
      title: "Playlists",
      href: `/search/${query}/playlists`,
    },
  ];

  useEffect(() => {
    setTabParam(`/search/${query}/${type ?? ""}`);
  }, [query, type]);

  return (
    <div
      className={`sticky top-0 z-40 -mx-2 bg-base-100 bg-opacity-90 backdrop-blur`}
    >
      <Swiper
        modules={[FreeMode]}
        freeMode={true}
        slidesPerView={`auto`}
        spaceBetween={8}
        className={`!mx-0 !p-2`}
      >
        {tabs.map((tab, index) => {
          const isActive = tab.href === tabParam;

          return (
            <SwiperSlide key={tab.title} className={`!max-w-fit`}>
              <Link
                href={tab.href}
                prefetch={false}
                className={`btn btn-ghost btn-sm rounded-full ${isActive ? "bg-white text-black" : "bg-neutral text-white"}`}
              >
                <h2>{tab.title}</h2>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
