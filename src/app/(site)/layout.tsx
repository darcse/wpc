import type {Metadata, Viewport} from 'next'
import type {ReactNode} from 'react'

import {SiteShell} from '@/components/site/SiteShell'
import {SITE_NAME, SITE_TAGLINE} from '@/lib/site'

import './site.css'

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_TAGLINE,
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function SiteLayout({children}: {children: ReactNode}) {
  return <SiteShell>{children}</SiteShell>
}
