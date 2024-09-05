"use client";

import TrackDetailsHero from "./Hero";

export default function TrackDetails({ track }) {
  return (
    <div>
      {/* Hero */}
      <section>
        <TrackDetailsHero track={track} />
      </section>

      {/* Other Details */}
    </div>
  );
}
