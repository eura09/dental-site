import type { CollectionConfig } from 'payload'

import { orderField, seoField, slugField } from '@/fields'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Leistung', plural: 'Leistungen' },
  defaultSort: 'order',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'featured', 'order', 'updatedAt'],
    group: 'Inhalte',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', label: 'Titel', required: true },
    slugField(),
    {
      name: 'summary',
      type: 'textarea',
      label: 'Kurzbeschreibung',
      required: true,
      admin: { description: '1–2 Sätze für Übersichten und Suchmaschinen.' },
    },
    { name: 'image', type: 'upload', relationTo: 'media', label: 'Bild' },
    { name: 'body', type: 'richText', label: 'Inhalt' },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Auf der Startseite zeigen',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    orderField,
    seoField,
  ],
}
