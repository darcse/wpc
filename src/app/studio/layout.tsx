import type {ReactNode} from 'react'

/**
 * Studio must not inherit public-site Tailwind, fonts, or chrome.
 * Site CSS is imported only under (site)/ and app/not-found.tsx.
 */
export default function StudioLayout({children}: {children: ReactNode}) {
  return children
}
