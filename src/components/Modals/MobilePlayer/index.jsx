"use client";

import { useEffect } from "react";
import TopBar from "./TopBar";
import Info from "./Info";
import Control from "./Control";

export default function MobilePlayer() {
  // State

  // Hooks

  // Lifecycle
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        document.getElementById("mobilePlayer").close();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <dialog id="mobilePlayer" className="modal modal-bottom">
      <div className="modal-box flex h-full max-h-none w-full max-w-none flex-col justify-between rounded-none bg-base-200 bg-opacity-80 p-4 pb-12 backdrop-blur">
        {/* Top Bar */}
        <section>
          <TopBar />
        </section>

        {/* Album, Title, Artist */}
        <section>
          <Info />
        </section>

        {/* Player */}
        <section>
          <Control />
        </section>
      </div>
    </dialog>
  );
}
