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

export default function Slider({
  id,
  title,
  isLoading = false,
  children,
  ...props
}) {
  const breakpoints = {
    640: {
      slidesPerGroup: 3,
    },
    768: {
      slidesPerGroup: 4,
    },
  };

  return (
    <div className={`flex w-full max-w-full flex-col`}>
      <header className={`flex items-center justify-between`}>
        <h2 className={`text-xl font-medium`}>{title}</h2>

        <div>
          <button
            id={`${id}_prev`}
            className={`btn btn-square btn-ghost btn-sm bg-transparent`}
          >
            <ChevronBack color={`#ffffff`} />
          </button>
          <button
            id={`${id}_next`}
            className={`btn btn-square btn-ghost btn-sm bg-transparent`}
          >
            <ChevronForward color={`#ffffff`} />
          </button>
        </div>
      </header>

      <div className={`@container`}>
        <Swiper
          modules={[Navigation]}
          slidesPerView={`auto`}
          slidesPerGroup={2}
          spaceBetween={0}
          navigation={{
            nextEl: `#${id}_next`,
            prevEl: `#${id}_prev`,
          }}
          breakpoints={props.breakpoints ? props.breakpoints : breakpoints}
          className={`!-ml-2`}
        >
          {isLoading && (
            <div>
              {[...Array(5)].map((_, i) => (
                <SwiperSlide key={i} className={props.isLoadingClassName}>
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

          {children}
        </Swiper>
      </div>
    </div>
  );
}
