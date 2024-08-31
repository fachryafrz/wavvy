"use client";

import CardVertical from "@/components/Card/CardVertical";
import Slider from "@/components/Slider";
import Link from "next/link";
import { SwiperSlide } from "swiper/react";

export default function SliderPlaylist({ id, title, data }) {
  return (
    <Slider
      id={`slider-${id}`}
      title={
        <Link href={`/me/playlists`} className={`hocus:underline`}>
          {title}
        </Link>
      }
      breakpoints={{
        480: {
          slidesPerGroup: 3,
        },
        704: {
          slidesPerGroup: 4,
        },
        1312: {
          slidesPerGroup: 5,
        },
      }}
    >
      {data.items.map((item, i) => {
        const [image] = item.images;

        return (
          <SwiperSlide
            key={i}
            className={`!max-w-[calc(100%/2)] @md:!max-w-[calc(100%/3)] @2xl:!max-w-[calc(100%/4)] @5xl:!max-w-[calc(100%/5)]`}
          >
            <Link
              href={`/playlist/${item.id}`}
              className={`block rounded-xl p-2 hocus:bg-neutral`}
            >
              <CardVertical name={item.name} image={image.url} />
            </Link>
          </SwiperSlide>
        );
      })}
    </Slider>
  );
}
