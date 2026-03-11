"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("API error reported:", error);
  }, [error]);

  return (
    <div className="flex h-full flex-col items-center justify-center p-6 text-white">
      <div className="animate-in fade-in zoom-in flex w-full max-w-md flex-col items-center rounded-2xl border border-[#282828] bg-[#181818] p-8 text-center shadow-2xl duration-500">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
          </svg>
        </div>

        <h1 className="mb-4 text-2xl font-bold">End of Service</h1>

        <p className="mb-6 leading-relaxed text-[#a7a7a7]">
          Due to changes from Spotify, this project is no longer able to work as
          intended.
        </p>

        <div className="flex w-full flex-col gap-3">
          <Link
            href="https://developer.spotify.com/blog/2026-02-06-update-on-developer-access-and-platform-security"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost flex w-full items-center justify-center gap-2 rounded-full border border-white/20"
          >
            Read Spotify&apos;s Policy Update
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 3h6v6" />
              <path d="M10 14 21 3" />
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
