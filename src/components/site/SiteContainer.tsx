import type {ReactNode} from 'react'

/**
 * Shared content width for site pages (72rem / ~1152px).
 * Padding matches header margin tokens.
 */
export function SiteContainer({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`mx-auto w-full max-w-6xl px-margin-mobile md:px-gutter ${className}`.trim()}
    >
      {children}
    </div>
  )
}
