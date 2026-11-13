'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useEffect, useId, useState} from 'react'

import {NAV_LINKS, SITE_NAME} from '@/lib/site'

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-surface-canvas/90 backdrop-blur-md">
      <div className="flex h-16 w-full items-center justify-between gap-space-md px-margin-mobile md:px-gutter">
        <Link
          href="/"
          onClick={closeMenu}
          className="font-display text-title-editorial text-text transition-colors hover:text-accent"
        >
          {SITE_NAME}
        </Link>

        <nav
          className="hidden items-center gap-space-xs md:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-space-sm py-space-sm text-body-sm transition-colors ${
                  active
                    ? 'bg-surface-hover font-medium text-accent'
                    : 'text-text-muted hover:bg-surface hover:text-text'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center border border-border bg-surface text-text md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="font-mono text-meta-badge uppercase tracking-widest">
            {open ? 'Close' : 'Menu'}
          </span>
        </button>
      </div>

      <div
        id={menuId}
        hidden={!open}
        className="border-t border-border bg-surface-canvas md:hidden"
      >
        <nav className="flex flex-col px-margin-mobile py-space-sm" aria-label="Mobile">
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`flex min-h-11 items-center px-space-sm text-body-md transition-colors ${
                  active
                    ? 'bg-surface-hover text-accent'
                    : 'text-text-muted hover:bg-surface hover:text-text'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
