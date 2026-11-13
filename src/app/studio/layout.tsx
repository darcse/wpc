import type {ReactNode} from 'react'

import './studio.css'

/**
 * Studio must not inherit public-site Tailwind, fonts, or chrome.
 * Site CSS is imported only under (site)/ and app/not-found.tsx.
 * studio.css only resets body margin (F1 regression after T-010).
 */
export default function StudioLayout({children}: {children: ReactNode}) {
  return children
}
