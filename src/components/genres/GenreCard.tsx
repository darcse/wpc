import Image from 'next/image'
import Link from 'next/link'

import {urlFor} from '@/sanity/lib/image'
import type {GenreListItem} from '@/sanity/queries/genres'

function formatYears(
  originYear?: number | null,
  endYear?: number | null,
): string | null {
  if (originYear == null && endYear == null) return null
  if (originYear != null && endYear != null) {
    return `${originYear}–${endYear}`
  }
  if (originYear != null) return `${originYear}–`
  return String(endYear)
}

export function GenreCard({genre}: {genre: GenreListItem}) {
  const years = formatYears(genre.originYear, genre.endYear)
  const hasImage = Boolean(genre.image?.asset?._ref)
  const imageUrl = hasImage
    ? urlFor(genre.image!)
        .width(720)
        .height(480)
        .fit('crop')
        .auto('format')
        .url()
    : null
  const alt = genre.image?.alt?.trim() || genre.name

  return (
    <Link
      href={`/genres/${genre.slug}`}
      className="group flex min-h-11 flex-col border border-border bg-surface transition-colors hover:bg-surface-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-surface-canvas">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={alt}
            fill
            sizes="(max-width: 800px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div
            className="absolute inset-0 bg-surface-hover"
            aria-hidden
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-space-sm p-space-md">
        <div className="space-y-space-xs">
          <h2 className="font-display text-title-editorial text-text group-hover:text-accent">
            {genre.name}
          </h2>
          {genre.nameAlt ? (
            <p className="font-mono text-meta-code text-text-muted">
              {genre.nameAlt}
            </p>
          ) : null}
        </div>

        {(years || genre.parentGenre?.name) && (
          <p className="font-mono text-meta-timestamp text-text-subtle">
            {[years, genre.parentGenre?.name].filter(Boolean).join(' · ')}
          </p>
        )}

        {genre.summary ? (
          <p className="text-body-md text-text-muted">{genre.summary}</p>
        ) : null}
      </div>
    </Link>
  )
}
