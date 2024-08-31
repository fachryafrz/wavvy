"use client";

import "swiper/css";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { checkToken } from "@/helper/checkToken";
import axios from "axios";
import { userStore } from "@/zustand/user";
import Link from "next/link";
import CardVertical from "@/components/Card/CardVertical";
import { ChevronBack, ChevronForward } from "react-ionicons";
import Slider from "@/components/Slider";

export default function RecentlyPlayed() {
  const { user } = userStore();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchRecentlyPlayed = async () => {
      setIsLoading(true);
      const { data } = await axios.get(`/api/me/player/recently-played`);
      setIsLoading(false);

      setData(data);
    };

    checkToken(fetchRecentlyPlayed);
  }, [user]);

  return (
    <Slider
      id={`recentlyPlayed`}
      title={`Recently Played`}
      isLoading={isLoading}
      isLoadingClassName={`!max-w-[calc(100%/2)] @md:!max-w-[calc(100%/3)] @2xl:!max-w-[calc(100%/4)]`}
    >
      {!isLoading &&
        data?.items.map((item, i) => {
          const [image] = item.track.album.images;

          return (
            <SwiperSlide
              key={i}
              className={`!max-w-[calc(100%/2)] @md:!max-w-[calc(100%/3)] @2xl:!max-w-[calc(100%/4)]`}
            >
              <Link
                href={`/track/${item.track.id}`}
                className={`block rounded-xl p-2 hocus:bg-neutral`}
              >
                <CardVertical
                  name={item.track.name}
                  image={image.url}
                  info={item.track.artists
                    .map((artist) => artist.name)
                    .join(", ")}
                />
              </Link>
            </SwiperSlide>
          );
        })}
    </Slider>
  );
}
