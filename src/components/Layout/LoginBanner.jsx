"use client";

export default function LoginBanner() {
  return (
    <div
      className={`rounded-xl bg-gradient-to-tl from-[#3E2532] via-[#24202B] via-60% to-[#24202B] p-6 @container`}
    >
      <div
        className={`flex flex-col @lg:items-center justify-between gap-6 @lg:flex-row`}
      >
        <div className={`flex flex-col gap-2`}>
          <h2 className={`text-pretty text-xl font-medium @sm:text-2xl`}>
            Unlock the power of {process.env.NEXT_PUBLIC_APP_NAME}
          </h2>

          <p className={`max-w-[270px] text-sm font-medium text-neutral-500`}>
            Enjoy any music by login to {process.env.NEXT_PUBLIC_APP_NAME}. Find
            your rhythm. Enjoy unlimited music.
          </p>
        </div>

        <button
          onClick={() => document.getElementById("login").click()}
          className={`btn btn-primary max-w-fit rounded-full text-white`}
        >
          Start Listening
        </button>
      </div>

      {/* Image of Rhythmic when Logged In (Coming Soon) */}
      {/* <figure></figure> */}
    </div>
  );
}
