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
      id={id}
      title={title}
      isLoading={isLoading}
      isLoadingClassName={isLoadingClassName}
    >
      {data?.map((item, i) => {
        const [image] =
          item.images ?? item.album?.images ?? item.track?.album?.images;

        return (
          <SwiperSlide
            key={i}
            className={`!max-w-[calc(100%/2)] @md:!max-w-[calc(100%/3)] @2xl:!max-w-[calc(100%/4)] @5xl:!max-w-[calc(100%/5)]`}
          >
            <CardVertical
              id={item.id ?? item.track.id}
              uri={item.uri ?? item.track.uri}
              name={item.name ?? item.track.name}
              image={image?.url ?? "/maskable/maskable_icon_x192.png"}
              link={`/${item.type ?? item.track.type}/${item.id ?? item.track.id}`}
            />
          </SwiperSlide>
        );
      })}
    </Slider>
  );
}
