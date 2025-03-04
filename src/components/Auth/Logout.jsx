/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";

export default function Logout({ user }) {
  const profilePicture = user.images?.find((image) => image.width === 300).url;

  return (
    <Link href={`/user/${user.id}`} prefetch={false} className={`flex`}>
      <figure
        className={`flex aspect-square w-10 overflow-hidden rounded-full border-2 border-base-100 outline outline-2 outline-primary`}
      >
        <img
          src={profilePicture}
          alt={user.display_name}
          width={40}
          height={40}
          draggable="false"
        />
      </figure>
    </Link>
  );
}
