import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Benutzer', plural: 'Benutzer' },
  admin: {
    useAsTitle: 'email',
    group: 'Einstellungen',
  },
  auth: true,
  fields: [{ name: 'name', type: 'text', label: 'Name' }],
}
