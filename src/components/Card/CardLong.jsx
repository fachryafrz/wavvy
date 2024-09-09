"use client";

/* eslint-disable @next/next/no-img-element */
import React from "react";
import { EllipsisVertical, Play } from "react-ionicons";
import TrackCard from "../Track/Card";
import Link from "next/link";
import numeral from "numeral";

export default function CardLong({
  item,
  link,
  image,
  secondInfo,
  thirdInfo,
  smallInfo,
  cta = true,
}) {
  return (
    <div
      className={`grid grid-cols-6 items-center gap-2 @lg:grid-cols-12 hocus:rounded-lg hocus:bg-neutral`}
    >
      {/* Image, Title */}
      <div
        className={`col-span-4 ${secondInfo && thirdInfo ? `@lg:col-span-5` : secondInfo || thirdInfo ? `@lg:col-span-8` : `@lg:col-span-11`}`}
      >
        <TrackCard
          name={
            <Link href={link} className={`hocus:underline`}>
              {item.name}
            </Link>
          }
          image={image}
          info={smallInfo}
        />
      </div>

      {/* Second Info */}
      {secondInfo && (
        <div className={`col-span-3 hidden justify-start @lg:flex`}>
          <span className={`line-clamp-1 text-sm font-medium`}>
            {secondInfo}
          </span>
        </div>
      )}

      {/* Third Info */}
      {thirdInfo && (
        <div className={`col-span-3 hidden justify-center @lg:flex`}>
          <span className={`line-clamp-1 text-sm font-medium`}>
            {thirdInfo}
          </span>
        </div>
      )}

      {/* Play, Options */}
      {cta && (
        <div
          className={`col-span-2 col-start-6 flex justify-end pr-1 @lg:col-start-12`}
        >
          <button className={`btn btn-square btn-ghost btn-sm`}>
            <Play color={`#ffffff`} width={`20px`} height={`20px`} />
          </button>
          <button className={`btn btn-square btn-ghost btn-sm`}>
            <EllipsisVertical
              color={`#ffffff`}
              width={`20px`}
              height={`20px`}
            />
          </button>
        </div>
      )}
    </div>
  );
}
