import type { GlobalConfig } from 'payload'

export const DAYS = [
  { label: 'Montag', value: 'Mo' },
  { label: 'Dienstag', value: 'Tu' },
  { label: 'Mittwoch', value: 'We' },
  { label: 'Donnerstag', value: 'Th' },
  { label: 'Freitag', value: 'Fr' },
  { label: 'Samstag', value: 'Sa' },
  { label: 'Sonntag', value: 'Su' },
] as const

/** Stammdaten der Praxis: werden in Header, Footer, Kontakt und den Google-Daten (JSON-LD) verwendet. */
export const Practice: GlobalConfig = {
  slug: 'practice',
  label: 'Praxisdaten',
  admin: { group: 'Einstellungen' },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Allgemein',
          fields: [
            { name: 'name', type: 'text', label: 'Praxisname', required: true },
            { name: 'legalName', type: 'text', label: 'Firmenname (Impressum)' },
            { name: 'doctor', type: 'text', label: 'Zahnarzt (Zeile unter dem Logo)' },
            { name: 'tagline', type: 'text', label: 'Slogan' },
            {
              name: 'description',
              type: 'textarea',
              label: 'Kurzbeschreibung der Praxis',
              admin: { description: 'Standard-Beschreibung für Google & Social Media.' },
            },
          ],
        },
        {
          label: 'Kontakt',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'phone', type: 'text', label: 'Telefon (Anzeige)', required: true },
                {
                  name: 'phoneE164',
                  type: 'text',
                  label: 'Telefon (international)',
                  required: true,
                  admin: { description: 'Für Links, z. B. +41713839911' },
                },
              ],
            },
            { name: 'email', type: 'email', label: 'E-Mail', required: true },
            {
              name: 'bookingUrl',
              type: 'text',
              label: 'Online-Terminbuchung (URL)',
              admin: {
                description: 'z. B. Link zu OneDoc. Wenn leer, wird die Telefonnummer gezeigt.',
              },
            },
            {
              name: 'address',
              type: 'group',
              label: 'Adresse',
              fields: [
                { name: 'street', type: 'text', label: 'Strasse', required: true },
                {
                  type: 'row',
                  fields: [
                    { name: 'zip', type: 'text', label: 'PLZ', required: true },
                    { name: 'city', type: 'text', label: 'Ort', required: true },
                    { name: 'region', type: 'text', label: 'Kanton', defaultValue: 'SG' },
                  ],
                },
                { name: 'country', type: 'text', label: 'Land (ISO)', defaultValue: 'CH' },
              ],
            },
            {
              name: 'geo',
              type: 'group',
              label: 'Koordinaten',
              admin: { description: 'Für Google und den Karten-Link.' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'lat', type: 'number', label: 'Breitengrad' },
                    { name: 'lng', type: 'number', label: 'Längengrad' },
                  ],
                },
              ],
            },
            { name: 'directions', type: 'textarea', label: 'Anfahrt / Parkplätze' },
          ],
        },
        {
          label: 'Öffnungszeiten',
          fields: [
            {
              name: 'openingHours',
              type: 'array',
              label: 'Öffnungszeiten',
              labels: { singular: 'Zeitfenster', plural: 'Zeitfenster' },
              admin: {
                description:
                  'Ein Eintrag pro Zeitfenster, z. B. Mo–Fr 08:00–12:00 und Mo–Fr 13:00–17:00.',
              },
              fields: [
                {
                  name: 'days',
                  type: 'select',
                  label: 'Tage',
                  hasMany: true,
                  required: true,
                  options: DAYS.map((d) => ({ label: d.label, value: d.value })),
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'opens',
                      type: 'text',
                      label: 'Von',
                      required: true,
                      admin: { placeholder: '08:00' },
                    },
                    {
                      name: 'closes',
                      type: 'text',
                      label: 'Bis',
                      required: true,
                      admin: { placeholder: '12:00' },
                    },
                  ],
                },
              ],
            },
            {
              name: 'hoursNote',
              type: 'text',
              label: 'Hinweis zu den Öffnungszeiten',
              admin: { description: 'z. B. "Termine nach Vereinbarung"' },
            },
            {
              name: 'emergency',
              type: 'textarea',
              label: 'Notfall-Hinweis',
              admin: {
                description:
                  'Was Patienten bei Zahnschmerzen ausserhalb der Öffnungszeiten tun sollen.',
              },
            },
          ],
        },
      ],
    },
  ],
}
