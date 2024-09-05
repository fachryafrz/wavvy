/* eslint-disable @next/next/no-img-element */

export default function CardVertical({ name, image, info, type }) {
  return (
    <article className={`flex flex-col gap-2`}>
      <figure
        className={`overflow-hidden aspect-square ${type === `artist` ? `rounded-full` : `rounded-lg`}`}
      >
        <img src={image} alt={name} loading="lazy" draggable="false" />
      </figure>

      <div className={`flex flex-col gap-1`}>
        <h3
          title={name}
          className={`line-clamp-1 font-medium hocus:underline ${type === `artist` ? `text-center` : `text-start`}`}
        >
          {name}
        </h3>

        {info && (
          <span className={`line-clamp-2 text-xs font-medium text-neutral-500`}>
            {info}
          </span>
        )}
      </div>
    </article>
  );
}
