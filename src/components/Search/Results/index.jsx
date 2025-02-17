"use client";

import SkeletonCard from "@/components/Skeleton/Card";
import { useFilterToggle } from "@/zustand/filterToggle";
import { useRouter, useSearchParams } from "next/navigation";

export default function Results() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const { filterToggle } = useFilterToggle();

  return (
    <div className={`flex-1 @container`}>
      <div
        className={`-mx-2 -mt-2 grid grid-cols-2 @lg:grid-cols-3 @3xl:grid-cols-4 @5xl:grid-cols-5 @6xl:grid-cols-6`}
      >
        {[...Array(20)].map((_, i) => (
          <div key={i}>
            <SkeletonCard type={`track`} />
          </div>
        ))}
      </div>
    </div>
  );
}
