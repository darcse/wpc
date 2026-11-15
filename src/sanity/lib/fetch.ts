import type {QueryParams} from 'next-sanity'

import {client} from './client'

type FetchWithTagsOptions = {
  params?: QueryParams
  tags: string[]
}

/**
 * Server-side Sanity fetch with Next cache tags (CC OFF).
 * Always uses revalidate: false — pair with webhook tag revalidation.
 */
export function fetchWithTags<T>(
  query: string,
  {params = {}, tags}: FetchWithTagsOptions,
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {tags, revalidate: false},
  })
}
