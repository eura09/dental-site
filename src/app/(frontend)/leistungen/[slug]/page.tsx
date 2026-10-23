import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { BookingButton, CallButton } from '@/components/BookingButton'
import { JsonLd } from '@/components/JsonLd'
import { RichText } from '@/components/RichText'
import { asMedia, getPractice, getService, getServices } from '@/lib/payload'
import { absoluteUrl } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const [service, practice] = await Promise.all([getService(slug), getPractice()])
  if (!service) return {}
  return {
    title: service.seo?.title || `${service.title} in ${practice.address.city}`,
    description: service.seo?.description || service.summary,
    alternates: { canonical: `/leistungen/${service.slug}` },
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const [service, practice, all] = await Promise.all([
    getService(slug),
    getPractice(),
    getServices(),
  ])
  if (!service) notFound()
  const image = asMedia(service.image)
  const others = all.filter((s) => s.id !== service.id).slice(0, 4)

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Startseite', item: absoluteUrl('/') },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Leistungen',
              item: absoluteUrl('/leistungen'),
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: service.title,
              item: absoluteUrl(`/leistungen/${service.slug}`),
            },
          ],
        }}
      />
      <article className="section">
        <div className="container container--narrow">
          <nav className="breadcrumb" aria-label="Brotkrumen">
            <Link href="/">Startseite</Link> / <Link href="/leistungen">Leistungen</Link> /{' '}
            <span>{service.title}</span>
          </nav>
          <h1>{service.title}</h1>
          <p className="lead">{service.summary}</p>
          {image?.url && (
            <Image
              className="article-image"
              src={image.sizes?.hero?.url || image.url}
              alt={image.alt}
              width={image.width ?? 1600}
              height={image.height ?? 1067}
              sizes="(max-width: 800px) 100vw, 760px"
            />
          )}
          <RichText data={service.body} />

          <aside className="cta-box">
            <h2>Haben Sie Fragen zu «{service.title}»?</h2>
            <p>Wir beraten Sie gerne persönlich und nehmen uns Zeit für Ihre Fragen.</p>
            <div className="btn-row">
              <BookingButton practice={practice} />
              <CallButton practice={practice} />
            </div>
          </aside>

          {!!others.length && (
            <nav className="related" aria-label="Weitere Leistungen">
              <h2>Weitere Leistungen</h2>
              <ul>
                {others.map((s) => (
                  <li key={s.id}>
                    <Link href={`/leistungen/${s.slug}`}>{s.title}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </article>
    </>
  )
}
