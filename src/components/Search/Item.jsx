import CardVertical from "../Card/CardVertical";

export default function Item({ items }) {
  return (
    <ul
      className={`grid grid-cols-2 @lg:grid-cols-3 @3xl:grid-cols-4 @5xl:grid-cols-5 @6xl:grid-cols-6`}
    >
      {items?.map((item) => {
        if (!item) return null;

        const [image] =
          item.images ?? item.album?.images ?? item.track?.album?.images;

        return (
          <li key={item.id}>
            <CardVertical
              item={item.track ?? item}
              image={image?.url ?? "/maskable/maskable_icon_x192.png"}
            />
          </li>
        );
      })}
    </ul>
  );
}
