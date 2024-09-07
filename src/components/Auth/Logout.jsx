/* eslint-disable @next/next/no-img-element */
"use client";

import { useAuth } from "@/hooks/auth";
import { userStore } from "@/zustand/user";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExitOutline, PersonCircle } from "react-ionicons";

export default function Logout() {
  const { user } = userStore();
  const { mutate } = useAuth();
  const router = useRouter();

  const logout = async () => {
    await axios.delete(`/api/auth/logout`).then(() => {
      mutate(null);
      router.refresh();
    });
  };

  const profilePicture = user.images.find((image) => image.width === 300).url;

  return (
    <div>
      <div className="dropdown dropdown-end dropdown-hover">
        <div tabIndex={0} role="button" className="">
          <figure
            className={`flex aspect-square w-10 overflow-hidden rounded-full border-2 border-base-100 outline outline-2 outline-primary`}
          >
            <img
              src={profilePicture}
              alt={user.display_name}
              loading="lazy"
              draggable="false"
            />
          </figure>
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] w-52 rounded-box bg-base-200 p-2 shadow"
        >
          <li>
            <Link href={`/me`} className={`font-medium`}>
              <PersonCircle color={"#ffffff"} height="24px" width="24px" />

              <span className={`line-clamp-1`}>{user.display_name}</span>
            </Link>
          </li>
          <li>
            <button
              onClick={logout}
              className={`font-medium text-error active:!text-error hocus:!text-error`}
            >
              <ExitOutline color={"#b91c1c"} height="24px" width="24px" />

              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
