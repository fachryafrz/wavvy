/* eslint-disable @next/next/no-img-element */
import PlaylistCardSmall from "@/components/Playlist/CardSmall";
import { useFetch } from "@/helper/fetch";
import { userStore } from "@/zustand/user";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  BarcodeOutline,
  CalendarOutline,
  HeartOutline,
  MicOutline,
  MusicalNoteOutline,
  StatsChart,
  TimeOutline,
} from "react-ionicons";

export default function SidebarContent() {
  const { user } = userStore();

  const [sidebar, setSidebar] = useState([
    {
      section: "",
      links: [
        {
          title: "Feed",
          href: "/",
          icon: <BarcodeOutline />,
        },
        // {
        //   title: "Playlists",
        //   href: "/playlists",
        //   icon: <MusicalNoteOutline />,
        // },
        {
          title: "Podcasts",
          href: "/podcasts",
          icon: <MicOutline />,
        },
      ],
    },
    {
      section: "Your Music",
      links: [
        {
          title: "Saved Tracks",
          href: "/me/tracks",
          icon: <HeartOutline />,
        },
        // {
        //   title: "Listen Later",
        //   href: "/listen-later",
        //   icon: <TimeOutline />,
        // },
        {
          title: "History",
          href: "/me/recently-played",
          icon: <CalendarOutline />,
        },
      ],
    },
  ]);

  const { data, error, loading } = useFetch({
    endpoint: "/api/me/playlists",
  });

  useEffect(() => {
    if (!user) {
      setSidebar((sidebar) =>
        sidebar.filter((section) => section.section !== "Your Playlists"),
      );

      return;
    }

    const isAlreadyInSidebar = sidebar.some(
      (section) => section.section === "Your Playlists",
    );

    if (!isAlreadyInSidebar) {
      if (data?.items.length > 0) {
        const playlistsObject = {
          section: "Your Playlists",
          links: data.items.map((playlist) => ({
            title: playlist.name,
            href: `/${playlist.type}/${playlist.id}`,
            image: playlist.images[0].url,
          })),
        };

        setSidebar((sidebar) => [...sidebar, playlistsObject]);
      }
    }
  }, [user, data]);

  return (
    <>
      <Link href={`/`}>
        <figure className={`flex items-center justify-center px-4`}>
          <svg
            id="logo-70"
            width="60"
            height="48"
            viewBox="0 0 78 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {" "}
            <path
              d="M18.5147 0C15.4686 0 12.5473 1.21005 10.3934 3.36396L3.36396 10.3934C1.21005 12.5473 0 15.4686 0 18.5147C0 24.8579 5.14214 30 11.4853 30C14.5314 30 17.4527 28.7899 19.6066 26.636L24.4689 21.7737C24.469 21.7738 24.4689 21.7736 24.4689 21.7737L38.636 7.6066C39.6647 6.57791 41.0599 6 42.5147 6C44.9503 6 47.0152 7.58741 47.7311 9.78407L52.2022 5.31296C50.1625 2.11834 46.586 0 42.5147 0C39.4686 0 36.5473 1.21005 34.3934 3.36396L15.364 22.3934C14.3353 23.4221 12.9401 24 11.4853 24C8.45584 24 6 21.5442 6 18.5147C6 17.0599 6.57791 15.6647 7.6066 14.636L14.636 7.6066C15.6647 6.57791 17.0599 6 18.5147 6C20.9504 6 23.0152 7.58748 23.7311 9.78421L28.2023 5.31307C26.1626 2.1184 22.5861 0 18.5147 0Z"
              className="ccustom"
              fill="#ff6337"
            ></path>{" "}
            <path
              d="M39.364 22.3934C38.3353 23.4221 36.9401 24 35.4853 24C33.05 24 30.9853 22.413 30.2692 20.2167L25.7982 24.6877C27.838 27.8819 31.4143 30 35.4853 30C38.5314 30 41.4527 28.7899 43.6066 26.636L62.636 7.6066C63.6647 6.57791 65.0599 6 66.5147 6C69.5442 6 72 8.45584 72 11.4853C72 12.9401 71.4221 14.3353 70.3934 15.364L63.364 22.3934C62.3353 23.4221 60.9401 24 59.4853 24C57.0498 24 54.985 22.4127 54.269 20.2162L49.798 24.6873C51.8377 27.8818 55.4141 30 59.4853 30C62.5314 30 65.4527 28.7899 67.6066 26.636L74.636 19.6066C76.7899 17.4527 78 14.5314 78 11.4853C78 5.14214 72.8579 0 66.5147 0C63.4686 0 60.5473 1.21005 58.3934 3.36396L39.364 22.3934Z"
              className="ccustom"
              fill="#ff6337"
            ></path>{" "}
          </svg>
        </figure>

        <h1 className={`sr-only`}>{process.env.NEXT_PUBLIC_APP_NAME}</h1>
      </Link>

      <div className={`flex flex-col gap-8 py-4`}>
        {sidebar.map((sidebar, i) => {
          return (
            <div key={i} className={`flex flex-col gap-2`}>
              {sidebar.section && (
                <div className={`pl-4`}>
                  <h2 className={`section-title`}>{sidebar.section}</h2>
                </div>
              )}

              <ul key={i}>
                {sidebar.links.map((link, i) => {
                  return (
                    <li key={link.href}>
                      <PlaylistCardSmall link={link} />
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}

        {loading && (
          <div className={`flex items-center justify-center`}>
            <span className={`loading loading-spinner`} />
          </div>
        )}
      </div>
    </>
  );
}
