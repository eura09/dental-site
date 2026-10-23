import { absoluteUrl, schemaDays, SITE_URL } from '@/lib/site'
import type { Practice, Service, TeamMember } from '@/payload-types'

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify + Escape von "<" verhindert, dass Inhalte das Script-Tag schliessen.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}

/** schema.org/Dentist – wichtig für die lokale Suche bei Google. */
export function dentistSchema(
  practice: Practice,
  opts: { services?: Service[]; team?: TeamMember[] } = {},
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    '@id': `${SITE_URL}/#praxis`,
    name: practice.name,
    legalName: practice.legalName || undefined,
    description: practice.description || undefined,
    url: SITE_URL,
    logo: absoluteUrl('/brand/logo-mark.svg'),
    image: absoluteUrl('/brand/logo-mark.svg'),
    telephone: practice.phoneE164,
    email: practice.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: practice.address.street,
      postalCode: practice.address.zip,
      addressLocality: practice.address.city,
      addressRegion: practice.address.region || undefined,
      addressCountry: practice.address.country || 'CH',
    },
    geo:
      practice.geo?.lat && practice.geo?.lng
        ? { '@type': 'GeoCoordinates', latitude: practice.geo.lat, longitude: practice.geo.lng }
        : undefined,
    openingHoursSpecification: (practice.openingHours ?? []).map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: schemaDays(h.days as string[]),
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: ['Gossau SG', 'St. Gallen', 'Flawil', 'Herisau', 'Andwil', 'Gaiserwald'].map(
      (name) => ({
        '@type': 'City',
        name,
      }),
    ),
    availableService: opts.services?.map((s) => ({
      '@type': 'MedicalProcedure',
      name: s.title,
      url: absoluteUrl(`/leistungen/${s.slug}`),
    })),
    employee: opts.team
      ?.filter((m) => m.isDentist)
      .map((m) => ({ '@type': 'Person', name: m.name, jobTitle: m.role })),
  }
}
