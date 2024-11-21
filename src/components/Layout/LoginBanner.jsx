"use client";

export default function LoginBanner({ authorizationURL, client_id }) {
  const handleLogin = () => {
    document.getElementById("login").click();
  };

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-gradient-to-tl from-[#3E2532] via-[#24202B] via-60% to-[#24202B] p-6 @container`}
    >
      <div
        className={`relative z-10 flex flex-col justify-between gap-6 @lg:flex-row @lg:items-center`}
      >
        <div className={`flex flex-col gap-2`}>
          <h2 className={`text-pretty text-xl font-medium @sm:text-2xl`}>
            Unlock the power of {process.env.NEXT_PUBLIC_APP_NAME}
          </h2>

          <p className={`max-w-[270px] text-sm font-medium text-neutral-500`}>
            Enjoy any music by login to {process.env.NEXT_PUBLIC_APP_NAME}. Find
            your rythm. Enjoy unlimited music.
          </p>
        </div>

        <button
          type="button"
          onClick={handleLogin}
          className={`btn btn-primary max-w-fit rounded-full`}
        >
          Start Listening
        </button>
      </div>

      {/* Image of Ryth when Logged In (Coming Soon) */}
      <figure
        className={`-mx-6 -mb-6 @sm:m-0 flex items-end justify-end overflow-hidden after:absolute after:inset-0 after:hidden after:bg-gradient-to-tl after:from-transparent after:via-[#24202B] after:to-[#24202B] @sm:absolute @sm:inset-0 @sm:after:block`}
      >
        <img
          src="/screenshots/ryth-diagonal-720.png"
          draggable={false}
          alt=""
          className={`translate-x-[7px] translate-y-[15px] scale-150 @sm:w-[50%] @sm:-translate-x-[2px] @sm:translate-y-[18px]`}
        />
      </figure>
    </div>
  );
}
