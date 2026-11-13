import Link from 'next/link'

import {AI_DISCLAIMER, NAV_LINKS, SITE_NAME, SITE_TAGLINE} from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface-canvas">
      <div className="flex w-full flex-col gap-space-lg px-margin-mobile py-space-xl md:px-gutter">
        <div className="flex flex-col gap-space-md border border-border p-space-lg md:flex-row md:items-start md:justify-between">
          <div className="max-w-md space-y-space-sm">
            <p className="font-display text-title-editorial text-text">{SITE_NAME}</p>
            <p className="text-body-sm text-text-muted">{SITE_TAGLINE}</p>
          </div>
          <nav className="flex flex-wrap gap-space-sm" aria-label="Footer">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="min-h-11 min-w-11 inline-flex items-center px-space-sm text-body-sm text-text-muted transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="font-sans text-meta-timestamp text-text-subtle">
          {AI_DISCLAIMER}
        </p>
      </div>
    </footer>
  )
}
