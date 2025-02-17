"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Results() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));

  return (
    <div className={`grid flex-1 grid-cols-4`}>
      {[...Array(20)].map((_, i) => (
        <div key={i}>Card</div>
      ))}
    </div>
  );
}
