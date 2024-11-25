import { useRouter } from "next/navigation";

export default function Info({ track }) {
  const router = useRouter();

  return (
    <form method="dialog">
      <div className={`space-y-4`}>
        {/* Album */}
        <figure>
          {track?.album.images.length > 0 ? (
            <img
              src={track?.album.images[0].url}
              alt=""
              draggable="false"
              className={`mx-auto max-w-[350px] object-contain`}
            />
          ) : (
            <img
              src={`/maskable/maskable_icon_x512.png`}
              alt=""
              draggable="false"
              className={`mx-auto max-w-[350px] object-contain`}
            />
          )}
        </figure>

        {/* Title & Artist */}
        <div>
          <h2 className={`line-clamp-1 text-xl font-medium`}>
            {track?.name ? (
              <button
                onClick={() => router.push(`/${track?.type}/${track?.id}`)}
                className={`hocus:underline`}
              >
                {track.name}
              </button>
            ) : (
              "Nothing Playing"
            )}
          </h2>
          <div className={`line-clamp-1 text-sm font-medium text-neutral-500`}>
            {track?.artists.map((artist) => {
              const [app, type, id] = artist.uri.split(":");

              return (
                <>
                  <button
                    key={artist.id}
                    onClick={() => router.push(`/${type}/${id}`)}
                    className={`hocus:underline`}
                  >
                    {artist.name}
                  </button>
                  <span className={`last:hidden`}>, </span>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </form>
  );
}
