import type { CollectionConfig } from 'payload'

import { seoField, slugField } from '@/fields'

/** Freie Seiten wie Impressum oder Datenschutz. Erreichbar unter /<slug>. */
export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Seite', plural: 'Seiten' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Inhalte',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', label: 'Titel', required: true },
    slugField(),
    { name: 'body', type: 'richText', label: 'Inhalt' },
    {
      name: 'showInFooter',
      type: 'checkbox',
      label: 'Im Footer verlinken',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'noindex',
      type: 'checkbox',
      label: 'Nicht von Suchmaschinen indexieren',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    seoField,
  ],
}
