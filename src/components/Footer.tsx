import Link from 'next/link'

import { mapUrl, NAV } from '@/lib/site'
import type { Page, Practice } from '@/payload-types'

import { OpeningHours } from './OpeningHours'

export function Footer({ practice, pages }: { practice: Practice; pages: Page[] }) {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <p className="site-footer__title">{practice.name}</p>
          {practice.doctor && <p>{practice.doctor}</p>}
          <address>
            {practice.address.street}
            <br />
            {practice.address.zip} {practice.address.city}
          </address>
          <p>
            <a href={mapUrl(practice)} target="_blank" rel="noopener">
              Route planen
            </a>
          </p>
        </div>

        <div>
          <p className="site-footer__title">Kontakt</p>
          <p>
            <a href={`tel:${practice.phoneE164}`}>{practice.phone}</a>
            <br />
            <a href={`mailto:${practice.email}`}>{practice.email}</a>
          </p>
        </div>

        <div>
          <p className="site-footer__title">Öffnungszeiten</p>
          <OpeningHours practice={practice} />
        </div>

        <nav aria-label="Fusszeile">
          <p className="site-footer__title">Navigation</p>
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            {pages.map((p) => (
              <li key={p.id}>
                <Link href={`/${p.slug}`}>{p.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="container site-footer__bottom">
        <p>
          © {year} {practice.legalName || practice.name}
        </p>
      </div>
    </footer>
  )
}
