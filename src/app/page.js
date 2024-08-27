import React from "react";

export default function Home() {
  return (
    <>
      <div className={`p-4 lg:col-span-8 lg:row-start-1 xl:col-span-9`}>
        <span>Home</span>
      </div>

      {/* Right Sidebar */}
      <div
        className={`bg-base-200 p-4 lg:col-span-4 lg:col-start-9 xl:col-span-3 xl:col-start-10`}
      >
        Right
      </div>
    </>
  );
}
