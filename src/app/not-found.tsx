import type {Metadata} from 'next'
import Link from 'next/link'

import {SiteShell} from '@/components/site/SiteShell'
import {SITE_NAME} from '@/lib/site'

import './(site)/site.css'

export const metadata: Metadata = {
  title: `Page not found — ${SITE_NAME}`,
}

export default function NotFound() {
  return (
    <SiteShell>
      <div className="flex flex-1 flex-col justify-center px-margin-mobile py-space-xl md:px-margin">
        <div className="max-w-xl space-y-space-md border border-border bg-surface p-space-lg">
          <p className="font-mono text-meta-badge uppercase tracking-widest text-text-subtle">
            404
          </p>
          <h1 className="font-display text-headline-sm text-text">
            Page not found
          </h1>
          <p className="text-body-md text-text-muted">
            요청한 페이지를 찾을 수 없습니다.
          </p>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center border border-border bg-surface-hover px-space-md text-body-sm text-text transition-colors hover:border-accent hover:text-accent"
          >
            Back to home
          </Link>
        </div>
      </div>
    </SiteShell>
  )
}
