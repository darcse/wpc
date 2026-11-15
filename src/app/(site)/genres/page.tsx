import type {Metadata} from 'next'

import {GenreList} from '@/components/genres/GenreList'
import {SiteContainer} from '@/components/site/SiteContainer'
import {getGenresList} from '@/sanity/queries/genres'

export const metadata: Metadata = {
  title: {absolute: 'Genres — Wet Pillow Club'},
  description: '슈게이징과 주변 장르의 계보를 시작 연도순으로 모은 목록',
}

export default async function GenresPage() {
  const genres = await getGenresList()

  return (
    <SiteContainer className="flex flex-1 flex-col gap-space-lg py-space-xl">
      <header className="space-y-space-sm">
        <p className="font-mono text-meta-badge uppercase tracking-widest text-accent">
          Index
        </p>
        <h1 className="font-display text-headline-lg-mobile text-text md:text-headline-lg">
          Genres
        </h1>
      </header>
      <GenreList genres={genres} />
    </SiteContainer>
  )
}
