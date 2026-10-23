/**
 * Füllt die Datenbank mit den Startinhalten (Daten der bisherigen Website).
 * Ausführen mit:  pnpm seed
 * Kann mehrfach ausgeführt werden – bestehende Einträge werden anhand des Slugs aktualisiert.
 *
 * ⚠ Texte mit [BITTE PRÜFEN] / [BITTE ERGÄNZEN] vor dem Livegang mit der Praxis abstimmen.
 */
import config from '@payload-config'
import { getPayload } from 'payload'

import { richText } from './richtext'

const services = [
  {
    title: 'Prophylaxe & Dentalhygiene',
    slug: 'prophylaxe-dentalhygiene',
    summary:
      'Regelmässige Kontrollen und professionelle Zahnreinigung – die beste Grundlage für gesunde Zähne und gesundes Zahnfleisch.',
    body: richText(
      'Vorbeugen ist die sanfteste Zahnmedizin. Bei der Dentalhygiene entfernen wir Beläge und Zahnstein, auch an Stellen, die mit der Zahnbürste schwer erreichbar sind.',
      '## Was Sie erwartet',
      [
        'Gründliche Reinigung und Politur',
        'Kontrolle von Zähnen und Zahnfleisch',
        'Persönliche Tipps zur Mundpflege zu Hause',
      ],
    ),
  },
  {
    title: 'Parodontitis-Behandlung',
    slug: 'parodontitis',
    summary:
      'Zahnfleischbluten oder Zahnfleischrückgang? Wir erkennen und behandeln Entzündungen des Zahnhalteapparats frühzeitig.',
    body: richText(
      'Parodontitis ist eine Entzündung des Zahnhalteapparats und verläuft oft lange ohne Schmerzen. Unbehandelt kann sie zu Zahnverlust führen.',
      'Nach einer genauen Abklärung reinigen wir die Zahnfleischtaschen und begleiten Sie mit regelmässigen Nachkontrollen.',
    ),
  },
  {
    title: 'Implantologie',
    slug: 'zahnimplantate',
    summary: 'Zahnimplantate als festsitzender Ersatz für einzelne oder mehrere fehlende Zähne.',
    body: richText(
      'Ein Implantat ersetzt die Zahnwurzel und trägt eine Krone, Brücke oder Prothese. Vor jeder Behandlung klären wir mit Ihnen ausführlich, ob ein Implantat für Sie geeignet ist, und erstellen einen transparenten Kostenvoranschlag.',
    ),
  },
  {
    title: 'Aligner – unsichtbare Zahnkorrektur',
    slug: 'aligner',
    summary: 'Zähne sanft ausrichten mit transparenten, herausnehmbaren Schienen.',
    body: richText(
      'Aligner sind durchsichtige Kunststoffschienen, die Ihre Zähne schrittweise in die gewünschte Position bewegen. Sie sind im Alltag kaum sichtbar und lassen sich zum Essen und Putzen herausnehmen.',
    ),
  },
  {
    title: 'Ästhetische Zahnmedizin',
    slug: 'aesthetische-zahnmedizin',
    summary:
      'Natürlich schöne Zähne – zum Beispiel mit Bleaching, zahnfarbenen Füllungen oder Veneers.',
    body: richText(
      'Wir legen Wert auf Ergebnisse, die natürlich aussehen und zu Ihnen passen. Gemeinsam besprechen wir, welche Möglichkeiten für Sie in Frage kommen.',
    ),
  },
  {
    title: 'Kronen, Brücken & Prothesen',
    slug: 'kronen-bruecken-prothesen',
    summary: 'Hochwertiger Zahnersatz, der Funktion und Ästhetik Ihrer Zähne wiederherstellt.',
    body: richText(
      'Ob einzelne Krone, Brücke oder herausnehmbare Prothese: Wir planen Ihren Zahnersatz sorgfältig und beraten Sie zu Materialien und Kosten.',
    ),
  },
  {
    title: 'CEREC – Zahnersatz in einer Sitzung',
    slug: 'cerec',
    summary:
      'Keramik-Kronen und -Inlays, in der Praxis gefertigt und oft in nur einer Sitzung eingesetzt.',
    body: richText(
      'Mit dem CEREC-System scannen wir Ihren Zahn digital – ohne unangenehme Abdruckmasse. Die Restauration aus Keramik wird direkt in der Praxis hergestellt und kann häufig noch am selben Tag eingesetzt werden.',
    ),
  },
  {
    title: 'Wurzelbehandlung',
    slug: 'wurzelbehandlung',
    summary: 'Zahnerhaltende Wurzelbehandlung mit Vergrösserungshilfen für hohe Präzision.',
    body: richText(
      'Ist der Zahnnerv entzündet, kann eine Wurzelbehandlung den Zahn oft erhalten. Wir arbeiten dabei mit Lupenbrillen, um feinste Strukturen genau zu erkennen.',
    ),
  },
  {
    title: 'Kiefergelenk & Zähneknirschen',
    slug: 'kiefergelenk-zaehneknirschen',
    summary: 'Hilfe bei Kieferschmerzen, Verspannungen und nächtlichem Zähneknirschen (CMD).',
    body: richText(
      'Zähneknirschen und Kiefergelenksbeschwerden können Zähne abnutzen und Verspannungen verursachen. Nach einer Abklärung kann zum Beispiel eine individuell angepasste Aufbissschiene helfen.',
    ),
  },
  {
    title: 'Kinderzahnmedizin',
    slug: 'kinderzahnmedizin',
    summary: 'Einfühlsame Betreuung für unsere kleinsten Patientinnen und Patienten.',
    body: richText(
      'Wir nehmen uns Zeit, damit sich Kinder bei uns wohlfühlen und der Zahnarztbesuch zu einer positiven Erfahrung wird.',
    ),
  },
]

const pages = [
  {
    title: 'Impressum',
    slug: 'impressum',
    showInFooter: true,
    noindex: true,
    body: richText(
      'Sanfte Zahnmedizin AG',
      'Herisauerstrasse 75, 9200 Gossau SG, Schweiz',
      'Telefon: 071 383 99 11 · E-Mail: info@praxis-baerenklau.ch',
      'Vertretungsberechtigte Person: Dr. med. dent. L. Tulani [BITTE PRÜFEN]',
      'Handelsregister / UID: [BITTE ERGÄNZEN]',
      'Zuständige Aufsichtsbehörde: [BITTE ERGÄNZEN]',
    ),
  },
  {
    title: 'Datenschutzerklärung',
    slug: 'datenschutz',
    showInFooter: true,
    noindex: true,
    body: richText(
      '[BITTE ERGÄNZEN] Datenschutzerklärung nach dem Schweizer Datenschutzgesetz (revDSG). Am besten mit einem Generator für Schweizer Unternehmen erstellen und von der Praxis prüfen lassen.',
      'Hinweise für die Erstellung: Hosting bei Infomaniak (Schweiz), keine Tracking-Cookies, ggf. Online-Terminbuchung über einen Drittanbieter.',
    ),
  },
]

async function upsert(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: 'services' | 'pages',
  data: Record<string, unknown> & { slug: string },
) {
  const existing = await payload.find({
    collection,
    where: { slug: { equals: data.slug } },
    limit: 1,
  })
  if (existing.docs[0]) {
    await payload.update({ collection, id: existing.docs[0].id, data: data as never })
    return 'aktualisiert'
  }
  await payload.create({ collection, data: data as never })
  return 'erstellt'
}

async function seed() {
  const payload = await getPayload({ config })

  await payload.updateGlobal({
    slug: 'practice',
    data: {
      name: 'Sanfte Zahnmedizin AG',
      legalName: 'Sanfte Zahnmedizin AG',
      doctor: 'Dr. L. Tulani',
      tagline: 'Zahnarztpraxis in Gossau SG',
      description:
        'Zahnarztpraxis in Gossau SG, nahe St. Gallen: Prophylaxe, Implantate, CEREC-Kronen in einer Sitzung, Wurzelbehandlung, Kinderzahnmedizin und mehr.',
      phone: '071 383 99 11',
      phoneE164: '+41713839911',
      email: 'info@praxis-baerenklau.ch',
      bookingUrl: '',
      address: {
        street: 'Herisauerstrasse 75',
        zip: '9200',
        city: 'Gossau SG',
        region: 'SG',
        country: 'CH',
      },
      directions: '[BITTE ERGÄNZEN] z. B. Parkplätze vor der Praxis, Bushaltestelle in der Nähe.',
      openingHours: [
        { days: ['Mo', 'Tu', 'We', 'Th', 'Fr'], opens: '08:00', closes: '12:00' },
        { days: ['Mo', 'Tu', 'We', 'Th', 'Fr'], opens: '13:00', closes: '17:00' },
      ],
      hoursNote: 'Termine nach Vereinbarung',
      emergency:
        'Bei Zahnschmerzen während der Öffnungszeiten rufen Sie uns bitte direkt an – wir finden kurzfristig einen Termin. Ausserhalb der Öffnungszeiten: [BITTE ERGÄNZEN: regionaler zahnärztlicher Notfalldienst].',
    },
  })
  payload.logger.info('Praxisdaten gespeichert')

  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      hero: {
        title: 'Sanfte Zahnmedizin in Gossau – nahe St. Gallen',
        text: 'Moderne Zahnmedizin mit viel Ruhe und Zeit für Sie. Von der Prophylaxe bis zum Implantat – verständlich erklärt und auf Sie abgestimmt.',
      },
      intro: {
        title: 'Willkommen in unserer Praxis',
        body: richText(
          'Wir möchten, dass Sie sich bei uns gut aufgehoben fühlen – auch wenn Sie mit einem mulmigen Gefühl zum Zahnarzt kommen. Deshalb erklären wir jeden Schritt und nehmen uns Zeit für Ihre Fragen.',
        ),
        highlights: [
          { title: 'Sanft & verständlich', text: 'Wir erklären jeden Behandlungsschritt in Ruhe.' },
          {
            title: 'Moderne Technik',
            text: 'Digitale Abdrücke und CEREC-Keramik in einer Sitzung.',
          },
          {
            title: 'Transparente Kosten',
            text: 'Vor grösseren Behandlungen erhalten Sie einen Kostenvoranschlag.',
          },
        ],
      },
      seo: {
        title: 'Zahnarzt Gossau SG – Sanfte Zahnmedizin AG | nahe St. Gallen',
        description:
          'Zahnarztpraxis Dr. L. Tulani in Gossau SG: Prophylaxe, Implantate, CEREC, Wurzelbehandlung und Kinderzahnmedizin. Jetzt Termin vereinbaren: 071 383 99 11.',
      },
    },
  })
  payload.logger.info('Startseite gespeichert')

  for (const [i, s] of services.entries()) {
    const result = await upsert(payload, 'services', { ...s, order: (i + 1) * 10, featured: i < 6 })
    payload.logger.info(`Leistung "${s.title}" ${result}`)
  }

  for (const p of pages) {
    const result = await upsert(payload, 'pages', p)
    payload.logger.info(`Seite "${p.title}" ${result}`)
  }

  const team = await payload.find({
    collection: 'team-members',
    where: { name: { like: 'Tulani' } },
    limit: 1,
  })
  if (!team.docs[0]) {
    await payload.create({
      collection: 'team-members',
      data: {
        name: 'Dr. Lulzim Tulani',
        role: 'Zahnarzt, Inhaber',
        isDentist: true,
        order: 10,
        bio: richText(
          '[BITTE ERGÄNZEN] Werdegang und Schwerpunkte – Text von der bisherigen Website übernehmen.',
        ),
        qualifications: [
          { text: 'Zertifikat Implantologie [BITTE PRÜFEN]' },
          { text: 'CEREC Masterkurs [BITTE PRÜFEN]' },
        ],
      },
    })
    payload.logger.info('Teammitglied Dr. Tulani erstellt')
  }

  payload.logger.info('✓ Seed abgeschlossen')
  process.exit(0)
}

// Top-level await: `payload run` beendet den Prozess, sobald das Modul geladen ist.
try {
  await seed()
} catch (err) {
  console.error(err)
  process.exit(1)
}
