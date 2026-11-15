import type {GenreListItem} from '@/sanity/queries/genres'

import {GenreCard} from './GenreCard'

export function GenreList({genres}: {genres: GenreListItem[]}) {
  if (genres.length === 0) {
    return (
      <p className="border border-border bg-surface px-space-lg py-space-xl text-body-md text-text-muted">
        아직 등록된 장르가 없습니다
      </p>
    )
  }

  return (
    <ul className="grid grid-cols-1 gap-space-md min-[800px]:grid-cols-2 min-[1024px]:grid-cols-3">
      {genres.map((genre) => (
        <li key={genre._id} className="min-w-0">
          <GenreCard genre={genre} />
        </li>
      ))}
    </ul>
  )
}
