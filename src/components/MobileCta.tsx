import Link from 'next/link'

import type { Practice } from '@/payload-types'

/** Fixe Leiste auf dem Handy: Anrufen + Termin. Das, was Patienten am häufigsten suchen. */
export function MobileCta({ practice }: { practice: Practice }) {
  return (
    <div className="mobile-cta" role="region" aria-label="Schnellkontakt">
      <a href={`tel:${practice.phoneE164}`} className="mobile-cta__item">
        Anrufen
      </a>
      {practice.bookingUrl ? (
        <a
          href={practice.bookingUrl}
          target="_blank"
          rel="noopener"
          className="mobile-cta__item mobile-cta__item--primary"
        >
          Termin buchen
        </a>
      ) : (
        <Link href="/kontakt" className="mobile-cta__item mobile-cta__item--primary">
          Kontakt &amp; Anfahrt
        </Link>
      )}
    </div>
  )
}
