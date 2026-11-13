import {SITE_NAME, SITE_TAGLINE} from '@/lib/site'

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col justify-center px-margin-mobile py-space-xl md:px-margin">
      <div className="max-w-2xl space-y-space-md border border-border bg-surface p-space-lg md:p-space-xl">
        <p className="font-mono text-meta-badge uppercase tracking-widest text-accent">
          Archive
        </p>
        <h1 className="font-display text-headline-lg-mobile text-text md:text-headline-lg">
          {SITE_NAME}
        </h1>
        <p className="text-body-lg text-text-muted">{SITE_TAGLINE}</p>
      </div>
    </div>
  )
}
