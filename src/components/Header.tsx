import Link from 'next/link'

import { NAV } from '@/lib/site'
import type { Practice } from '@/payload-types'

import { BookingButton } from './BookingButton'
import { Logo } from './Logo'

export function Header({ practice }: { practice: Practice }) {
  return (
    <header className="site-header">
      <a className="skip-link" href="#inhalt">
        Zum Inhalt springen
      </a>
      <div className="container site-header__inner">
        <Logo name={practice.name} doctor={practice.doctor} />

        <nav className="site-nav" aria-label="Hauptnavigation">
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <BookingButton practice={practice} className="site-nav__cta" />
        </nav>

        {/* Mobile Navigation ohne JavaScript */}
        <details className="mobile-nav">
          <summary aria-label="Menü öffnen">
            <span className="mobile-nav__icon" aria-hidden="true" />
            Menü
          </summary>
          <ul>
            <li>
              <Link href="/">Startseite</Link>
            </li>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </header>
  )
}
