"use client";

import "swiper/css";
import 'swiper/css/navigation';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import { checkToken } from "@/helper/checkToken";
import axios from "axios";
import { userStore } from "@/zustand/user";
import Link from "next/link";
import CardVertical from "@/components/Card/CardVertical";
import { ChevronBack, ChevronForward } from "react-ionicons";

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
    <div className={`flex w-full max-w-full flex-col`}>
      <header className={`flex items-center justify-between`}>
        <h2 className={`text-xl font-medium`}>Recently Played</h2>

        <div>
          <button
            id={`recentlyPlayedPrev`}
            className={`btn btn-square btn-ghost btn-sm bg-transparent`}
          >
            <ChevronBack color={`#ffffff`} />
          </button>
          <button
            id={`recentlyPlayedNext`}
            className={`btn btn-square btn-ghost btn-sm bg-transparent`}
          >
            <ChevronForward color={`#ffffff`} />
          </button>
        </div>
      </header>

      <div>
        <Swiper
          modules={[Navigation]}
          slidesPerView={3}
          slidesPerGroup={3}
          spaceBetween={0}
          navigation={{
            nextEl: "#recentlyPlayedNext",
            prevEl: "#recentlyPlayedPrev",
          }}
          breakpoints={{
            768: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
          }}
          className={`!-ml-2`}
        >
          {isLoading && (
            <div>
              {[...Array(5)].map((_, i) => (
                <SwiperSlide key={i}>
                  <div
                    className={`flex w-full flex-col gap-2 p-2 [&_*]:animate-pulse [&_*]:bg-neutral-500 [&_*]:bg-opacity-50`}
                  >
                    <figure
                      className={`block aspect-square w-full rounded-lg`}
                    ></figure>

                    <div className={`flex flex-col gap-1 !bg-opacity-0`}>
                      <span className={`h-4 rounded`}></span>

                      <span className={`h-2 w-20 max-w-full rounded-sm`}></span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </div>
          )}

          {!isLoading &&
            data?.items.map((item, i) => {
              return (
                <SwiperSlide key={i}>
                  <Link
                    href={`/track/${item.track.id}`}
                    className={`block rounded-xl p-2 hocus:bg-neutral`}
                  >
                    <CardVertical track={item.track} />
                  </Link>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
}
