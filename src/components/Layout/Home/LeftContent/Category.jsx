import CardVertical from "@/components/Card/CardVertical";
import Slider from "@/components/Slider";
import { checkToken } from "@/helper/checkToken";
import { userStore } from "@/zustand/user";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";

export default function Category({ id, title }) {
  const { user } = userStore();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetch = async () => {
      setIsLoading(true);
      const { data } = await axios.get(
        `/api/browse/categories/${id}/playlists`,
      );
      setIsLoading(false);

      setData(data);
    };

    checkToken(fetch);
  }, [id, user]);

  console.log(data?.playlists?.items);

  return (
    <Slider
      id={`slider-${id}`}
      title={<Link href={`/section/${id}`} className={`hocus:underline`}>{title}</Link>}
      isLoading={isLoading}
    >
      {!isLoading &&
        data?.playlists?.items.map((item, i) => {
          const [image] = item.images;

          return (
            <SwiperSlide key={i}>
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
