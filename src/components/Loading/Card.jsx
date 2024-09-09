import React from "react";

export default function LoadingCard({ responsive = false, info = true }) {
  return (
    <div className={`flex items-center gap-2 p-1`}>
      <span
        className={`block aspect-square w-full max-w-14 animate-pulse overflow-hidden rounded-lg bg-neutral-400 bg-opacity-50`}
      ></span>

      <div
        className={`w-full flex-col gap-1 [&_*]:block [&_*]:animate-pulse [&_*]:rounded [&_*]:bg-neutral-400 [&_*]:bg-opacity-50 ${responsive ? `hidden sm:flex` : `flex`}`}
      >
        <span className={`h-4 w-12 sm:w-28`}></span>

        {info && <span className={`h-2 w-8 !rounded-sm sm:w-14`}></span>}
      </div>
    </div>
  );
}
