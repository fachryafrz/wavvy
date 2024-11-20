"use client";

import { useErrorAlert } from "@/zustand/error-alert";
import { useRouter } from "next/navigation";

export default function PremiumAlert() {
  const router = useRouter();

  const { setErrorAlert } = useErrorAlert();

  const handlePremium = () => {
    router.push("https://open.spotify.com/premium");
  };

  const handleClose = () => {
    setErrorAlert(null);
    document.getElementById("premiumAlert").close();
  };

  return (
    <dialog
      id="premiumAlert"
      className="modal backdrop:bg-black backdrop:bg-opacity-90 backdrop:backdrop-blur"
    >
      <div className="modal-box max-w-md p-0">
        <div
          className={`rounded-xl bg-gradient-to-tl from-[#3E2532] via-[#24202B] via-60% to-[#24202B] p-6 @container`}
        >
          <div
            className={`flex flex-col justify-between gap-6 @lg:flex-row @lg:items-center`}
          >
            <div className={`flex flex-col gap-2`}>
              <h2 className={`text-pretty text-xl font-medium @sm:text-2xl`}>
                Premium Required
              </h2>

              <p className={`text-pretty text-sm font-medium text-neutral-500`}>
                Listen to all music around the world! Get Premium now and enjoy
                music without limits!
              </p>

              <div className={`mt-4`}>
                <button
                  onClick={handlePremium}
                  className={`btn btn-primary rounded-full`}
                >
                  Go Premium
                </button>
                <button
                  onClick={handleClose}
                  className={`btn btn-ghost rounded-full`}
                >
                  Not now
                </button>
              </div>
            </div>
          </div>

          {/* Image of Ryth when Logged In (Coming Soon) */}
          {/* <figure></figure> */}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
