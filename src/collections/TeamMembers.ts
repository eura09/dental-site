import type { CollectionConfig } from 'payload'

import { orderField } from '@/fields'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  labels: { singular: 'Teammitglied', plural: 'Team' },
  defaultSort: 'order',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'order'],
    group: 'Inhalte',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', type: 'text', label: 'Name', required: true },
    { name: 'role', type: 'text', label: 'Funktion', required: true },
    { name: 'photo', type: 'upload', relationTo: 'media', label: 'Foto' },
    { name: 'bio', type: 'richText', label: 'Werdegang / Beschreibung' },
    {
      name: 'qualifications',
      type: 'array',
      label: 'Qualifikationen',
      labels: { singular: 'Qualifikation', plural: 'Qualifikationen' },
      fields: [{ name: 'text', type: 'text', label: 'Qualifikation', required: true }],
    },
    {
      name: 'isDentist',
      type: 'checkbox',
      label: 'Zahnärztin / Zahnarzt',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Wird für die strukturierten Daten (Google) verwendet.',
      },
    },
    orderField,
  ],
}
