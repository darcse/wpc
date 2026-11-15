import {fetchWithTags} from '../lib/fetch'

/**
 * Flat genre list for PAGE-001.
 * Sort: originYear ascending, nulls last (`originYear == null` is false first),
 * then name ascending. Verified against GROQ: false < true in order().
 */
export const genresListQuery = `*[
  _type == "genre" &&
  !(_id in path("drafts.**")) &&
  defined(slug.current)
] | order(originYear == null, originYear asc, name asc) {
  _id,
  name,
  nameAlt,
  "slug": slug.current,
  summary,
  originYear,
  endYear,
  image{
    asset,
    hotspot,
    crop,
    alt
  },
  parentGenre->{
    _id,
    name,
    "slug": slug.current
  }
}`

export type GenreListItem = {
  _id: string
  name: string
  nameAlt?: string | null
  slug: string
  summary?: string | null
  originYear?: number | null
  endYear?: number | null
  image?: {
    asset?: {_ref?: string; _type?: string} | null
    hotspot?: unknown
    crop?: unknown
    alt?: string | null
  } | null
  parentGenre?: {
    _id: string
    name: string
    slug?: string | null
  } | null
}

export function getGenresList() {
  return fetchWithTags<GenreListItem[]>(genresListQuery, {tags: ['genre']})
}
