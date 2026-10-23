import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { BookingButton, CallButton } from '@/components/BookingButton'
import { dentistSchema, JsonLd } from '@/components/JsonLd'
import { OpeningHours } from '@/components/OpeningHours'
import { RichText } from '@/components/RichText'
import { ServiceCard } from '@/components/ServiceCard'
import { asMedia, getHomePage, getPractice, getServices, getTeam } from '@/lib/payload'
import { mapUrl } from '@/lib/site'

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHomePage()
  return {
    title: home.seo?.title ? { absolute: home.seo.title } : undefined,
    description: home.seo?.description ?? undefined,
    alternates: { canonical: '/' },
  }
}

export default async function HomePage() {
  const [home, practice, services, allServices, team] = await Promise.all([
    getHomePage(),
    getPractice(),
    getServices({ featuredOnly: true }),
    getServices(),
    getTeam(),
  ])
  const heroImage = asMedia(home.hero?.image)
  const dentists = team.filter((m) => m.isDentist)

  return (
    <>
      <JsonLd data={dentistSchema(practice, { services: allServices, team })} />

      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__text">
            {practice.tagline && <p className="eyebrow">{practice.tagline}</p>}
            <h1>{home.hero?.title}</h1>
            {home.hero?.text && <p className="lead">{home.hero.text}</p>}
            <div className="btn-row">
              <BookingButton practice={practice} />
              <CallButton practice={practice} />
            </div>
          </div>
          <div className="hero__media">
            {heroImage?.url ? (
              <Image
                src={heroImage.sizes?.hero?.url || heroImage.url}
                alt={heroImage.alt}
                width={heroImage.width ?? 1600}
                height={heroImage.height ?? 1067}
                priority
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            ) : (
              <div className="hero__placeholder" aria-hidden="true">
                <span className="logo__mark logo__mark--large" />
              </div>
            )}
          </div>
        </div>
      </section>

      {home.intro?.title && (
        <section className="section">
          <div className="container intro">
            <div>
              <h2>{home.intro.title}</h2>
              <RichText data={home.intro.body} />
            </div>
            {!!home.intro.highlights?.length && (
              <ul className="highlights">
                {home.intro.highlights.map((h) => (
                  <li key={h.id}>
                    <h3>{h.title}</h3>
                    {h.text && <p>{h.text}</p>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {!!services.length && (
        <section className="section section--tint">
          <div className="container">
            <div className="section__head">
              <h2>Unsere Leistungen</h2>
              <Link href="/leistungen">Alle Leistungen →</Link>
            </div>
            <ul className="cards">
              {services.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </ul>
          </div>
        </section>
      )}

      {!!dentists.length && (
        <section className="section">
          <div className="container team-teaser">
            <h2>Ihr Zahnarzt</h2>
            {dentists.map((m) => (
              <p key={m.id} className="lead">
                <strong>{m.name}</strong> – {m.role}
              </p>
            ))}
            <Link className="btn btn--secondary" href="/team">
              Das ganze Team kennenlernen
            </Link>
          </div>
        </section>
      )}

      <section className="section section--tint">
        <div className="container contact-strip">
          <div>
            <h2>Öffnungszeiten</h2>
            <OpeningHours practice={practice} />
          </div>
          <div>
            <h2>So finden Sie uns</h2>
            <address>
              {practice.address.street}
              <br />
              {practice.address.zip} {practice.address.city}
            </address>
            <p>
              <a href={mapUrl(practice)} target="_blank" rel="noopener">
                Auf der Karte anzeigen
              </a>
            </p>
            <div className="btn-row">
              <BookingButton practice={practice} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
