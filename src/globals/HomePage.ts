import type { GlobalConfig } from 'payload'

import { seoField } from '@/fields'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Startseite',
  admin: { group: 'Inhalte' },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Einstieg (oben)',
      fields: [
        { name: 'title', type: 'text', label: 'Überschrift', required: true },
        { name: 'text', type: 'textarea', label: 'Text' },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Bild' },
      ],
    },
    {
      name: 'intro',
      type: 'group',
      label: 'Über die Praxis',
      fields: [
        { name: 'title', type: 'text', label: 'Überschrift' },
        { name: 'body', type: 'richText', label: 'Text' },
        {
          name: 'highlights',
          type: 'array',
          label: 'Stichpunkte',
          maxRows: 6,
          fields: [
            { name: 'title', type: 'text', label: 'Titel', required: true },
            { name: 'text', type: 'textarea', label: 'Text' },
          ],
        },
      ],
    },
    seoField,
  ],
}
