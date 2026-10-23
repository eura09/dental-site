import type { Field } from 'payload'

/** URL-Slug, wird aus dem Titel erzeugt, falls leer. */
export const slugField = (sourceField = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  label: 'URL-Slug',
  admin: {
    position: 'sidebar',
    description: 'Teil der URL, z. B. "zahnimplantate". Wird aus dem Titel erzeugt, wenn leer.',
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        const source = value || data?.[sourceField]
        return typeof source === 'string' ? slugify(source) : value
      },
    ],
  },
})

export const slugify = (input: string): string =>
  input
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

/** SEO-Felder für Titel und Beschreibung in Suchmaschinen. */
export const seoField: Field = {
  name: 'seo',
  type: 'group',
  label: 'SEO',
  admin: {
    description: 'Optional. Wenn leer, werden Titel und Kurzbeschreibung verwendet.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Meta-Titel',
      admin: { description: 'Ideal: 50–60 Zeichen, inkl. Ort (z. B. "… in Gossau SG").' },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Meta-Beschreibung',
      admin: { description: 'Ideal: 140–160 Zeichen.' },
    },
  ],
}

export const orderField: Field = {
  name: 'order',
  type: 'number',
  label: 'Reihenfolge',
  defaultValue: 100,
  admin: { position: 'sidebar', description: 'Kleinere Zahl = weiter oben.' },
}
