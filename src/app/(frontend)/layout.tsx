import '@fontsource-variable/jost'
import '@fontsource-variable/source-sans-3'
import './styles.css'

import type { Metadata, Viewport } from 'next'
import React from 'react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { MobileCta } from '@/components/MobileCta'
import { getFooterPages, getPractice } from '@/lib/payload'
import { SITE_URL } from '@/lib/site'

// Inhalte kommen live aus dem CMS (SQLite, sehr schnell). So sind Änderungen sofort sichtbar.
export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const practice = await getPractice()
  const city = practice.address?.city ?? ''
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${practice.name} – Zahnarzt in ${city}`,
      template: `%s | ${practice.name}`,
    },
    description: practice.description ?? undefined,
    openGraph: {
      type: 'website',
      locale: 'de_CH',
      siteName: practice.name,
    },
    icons: { icon: '/brand/logo-mark.svg' },
  }
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [practice, footerPages] = await Promise.all([getPractice(), getFooterPages()])

  return (
    <html lang="de-CH">
      <body>
        <Header practice={practice} />
        <main id="inhalt">{children}</main>
        <Footer practice={practice} pages={footerPages} />
        <MobileCta practice={practice} />
      </body>
    </html>
  )
}
