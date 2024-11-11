import Link from "next/link";
import CardVertical from "../Card/CardVertical";

export default function Item({ items }) {
  return (
    <ul
      className={`grid grid-cols-2 @lg:grid-cols-3 @3xl:grid-cols-4 @5xl:grid-cols-5 @6xl:grid-cols-6`}
    >
      {items?.map((item) => {
        const [image] =
          item.images ?? item.album?.images ?? item.track?.album?.images;

        return (
          <li key={item.id}>
            <Link
              href={`/${item.type}/${item.id}`}
              className={`block rounded-xl p-2 hocus:bg-neutral`}
            >
              <CardVertical
                name={item.name ?? item.track.name}
                image={image?.url ?? "/maskable/maskable_icon_x192.png"}
                type={item.type ?? item.track.type}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
