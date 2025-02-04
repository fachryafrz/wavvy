import SkeletonCard from "./Card";

export default function SkeletonGrid({ type }) {
  const ITEM_COUNT = 6;

  return (
    <ul
      className={`grid grid-cols-2 @lg:grid-cols-3 @3xl:grid-cols-4 @5xl:grid-cols-5 @6xl:grid-cols-6`}
    >
      {Array(ITEM_COUNT)
        .fill(0)
        .map((_, i) => (
          <li key={i}>
            <SkeletonCard type={type} />
          </li>
        ))}
    </ul>
  );
}
