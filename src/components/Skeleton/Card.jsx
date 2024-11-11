export default function SkeletonItem({ type }) {
  const ITEM_COUNT = 6;

  const loadingClass = `animate-pulse bg-neutral-400 bg-opacity-50`;

  return (
    <ul
      className={`grid grid-cols-2 @lg:grid-cols-3 @3xl:grid-cols-4 @5xl:grid-cols-5 @6xl:grid-cols-6`}
    >
      {Array(ITEM_COUNT)
        .fill(0)
        .map((_, i) => (
          <li key={i}>
            <div className={`flex flex-col gap-2 p-2`}>
              {/* Poster */}
              <span
                className={`block aspect-square ${type === `artist` ? `rounded-full` : `rounded-lg`} ${loadingClass}`}
              ></span>

              {/* Info */}
              <span
                className={`block h-6 w-2/3 rounded ${type === `artist` ? `mx-auto` : ``} ${loadingClass}`}
              ></span>
            </div>
          </li>
        ))}
    </ul>
  );
}
