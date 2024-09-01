"use client";

import CardVertical from "@/components/Card/CardVertical";
import Slider from "@/components/Slider";
import Link from "next/link";
import { SwiperSlide } from "swiper/react";

export default function SliderPlaylist({
  id,
  title,
  data,
  isLoading,
  isLoadingClassName = `!max-w-[calc(100%/2)] @md:!max-w-[calc(100%/3)] @2xl:!max-w-[calc(100%/4)] @5xl:!max-w-[calc(100%/5)]`,
}) {
  return (
    <Slider
      id={`slider-${id}`}
      title={title}
      isLoading={isLoading}
      isLoadingClassName={isLoadingClassName}
    >
      {data?.items.map((item, i) => {
        const [image] = item.images ?? item.track.album.images;

        return (
          <SwiperSlide
            key={i}
            className={`!max-w-[calc(100%/2)] @md:!max-w-[calc(100%/3)] @2xl:!max-w-[calc(100%/4)] @5xl:!max-w-[calc(100%/5)]`}
          >
            <Link
              href={`/${item.type ?? item.track.type}/${item.id ?? item.track.id}`}
              className={`block rounded-xl p-2 hocus:bg-neutral`}
            >
              <CardVertical name={item.name ?? item.track.name} image={image.url} />
            </Link>
          </SwiperSlide>
        );
      })}
    </Slider>
  );
}
