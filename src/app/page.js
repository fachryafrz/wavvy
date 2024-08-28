import RightContent from "@/components/Layout/RightContent";
import React from "react";

export default function Home() {
  return (
    <>
      {/* Left Content */}
      <div className={`p-4 lg:col-span-8 lg:row-start-1 xl:col-span-9`}>
        <span>Home</span>
      </div>

      {/* Right Content */}
      <RightContent />
    </>
  );
}
