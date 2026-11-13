import type {ReactNode} from 'react'

import {siteFontVariables} from '@/lib/fonts'

import {SiteFooter} from './SiteFooter'
import {SiteHeader} from './SiteHeader'

export function SiteShell({children}: {children: ReactNode}) {
  return (
    <div data-theme="dark" className={`${siteFontVariables} site-root font-sans`}>
      <SiteHeader />
      <main className="flex w-full flex-1 flex-col pt-16">{children}</main>
      <SiteFooter />
    </div>
  )
}
