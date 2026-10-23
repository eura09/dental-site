import type { Metadata } from 'next'

import { BookingButton, CallButton } from '@/components/BookingButton'
import { OpeningHours } from '@/components/OpeningHours'
import { getPractice } from '@/lib/payload'
import { mapUrl } from '@/lib/site'

export async function generateMetadata(): Promise<Metadata> {
  const practice = await getPractice()
  return {
    title: 'Kontakt & Anfahrt',
    description: `Termin vereinbaren bei der ${practice.name}: ${practice.address.street}, ${practice.address.zip} ${practice.address.city}. Telefon ${practice.phone}.`,
    alternates: { canonical: '/kontakt' },
  }
}

export default async function ContactPage() {
  const practice = await getPractice()
  return (
    <section className="section">
      <div className="container">
        <h1>Kontakt &amp; Anfahrt</h1>
        <p className="lead">Wir vereinbaren schnell und unkompliziert Ihren Wunschtermin.</p>

        <div className="contact-grid">
          <div className="panel">
            <h2>Termin &amp; Kontakt</h2>
            <p>
              Telefon: <a href={`tel:${practice.phoneE164}`}>{practice.phone}</a>
              <br />
              E-Mail: <a href={`mailto:${practice.email}`}>{practice.email}</a>
            </p>
            <div className="btn-row">
              <BookingButton practice={practice} />
              <CallButton practice={practice} />
            </div>
            <p className="muted">
              Bitte senden Sie keine Gesundheitsdaten per E-Mail. Rufen Sie uns bei Fragen zu Ihrer
              Behandlung an.
            </p>
          </div>

          <div className="panel">
            <h2>Öffnungszeiten</h2>
            <OpeningHours practice={practice} />
          </div>

          <div className="panel">
            <h2>Adresse</h2>
            <address>
              {practice.legalName || practice.name}
              <br />
              {practice.address.street}
              <br />
              {practice.address.zip} {practice.address.city}
            </address>
            {practice.directions && <p>{practice.directions}</p>}
            <p>
              <a href={mapUrl(practice)} target="_blank" rel="noopener">
                Auf der Karte anzeigen (OpenStreetMap)
              </a>
            </p>
          </div>

          {practice.emergency && (
            <div className="panel panel--accent">
              <h2>Notfall</h2>
              <p>{practice.emergency}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
