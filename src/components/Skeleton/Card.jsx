export default function SkeletonCard({ type }) {
  const loadingClass = `animate-pulse bg-neutral-400 bg-opacity-50`;

  return (
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
  );
}
