import type { Practice } from '@/payload-types'

export const SITE_URL = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(
  /\/$/,
  '',
)

export const absoluteUrl = (path = '/') => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`

export const NAV = [
  { href: '/leistungen', label: 'Leistungen' },
  { href: '/team', label: 'Team' },
  { href: '/kontakt', label: 'Kontakt' },
] as const

const DAY_ORDER = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'] as const
const DAY_DE: Record<string, string> = {
  Mo: 'Mo',
  Tu: 'Di',
  We: 'Mi',
  Th: 'Do',
  Fr: 'Fr',
  Sa: 'Sa',
  Su: 'So',
}
const DAY_SCHEMA: Record<string, string> = {
  Mo: 'Monday',
  Tu: 'Tuesday',
  We: 'Wednesday',
  Th: 'Thursday',
  Fr: 'Friday',
  Sa: 'Saturday',
  Su: 'Sunday',
}

/** "Mo, Di, Mi, Do, Fr" -> "Mo–Fr" */
export const formatDays = (days: string[] = []): string => {
  const idx = [...days].map((d) => DAY_ORDER.indexOf(d as never)).sort((a, b) => a - b)
  const groups: number[][] = []
  for (const i of idx) {
    const last = groups[groups.length - 1]
    if (last && i === last[last.length - 1] + 1) last.push(i)
    else groups.push([i])
  }
  return groups
    .map((g) => {
      const a = DAY_DE[DAY_ORDER[g[0]]]
      const b = DAY_DE[DAY_ORDER[g[g.length - 1]]]
      return g.length > 2 ? `${a}–${b}` : g.map((i) => DAY_DE[DAY_ORDER[i]]).join(', ')
    })
    .join(', ')
}

/** Fasst Zeitfenster mit gleichen Tagen zusammen: "Mo–Fr: 08:00–12:00, 13:00–17:00" */
export const groupOpeningHours = (hours: Practice['openingHours'] = []) => {
  const map = new Map<string, string[]>()
  for (const h of hours ?? []) {
    const key = formatDays(h.days as string[])
    map.set(key, [...(map.get(key) ?? []), `${h.opens}–${h.closes}`])
  }
  return [...map.entries()].map(([days, times]) => ({ days, times }))
}

export const schemaDays = (days: string[] = []) => days.map((d) => DAY_SCHEMA[d]).filter(Boolean)

export const mapUrl = (p: Practice) => {
  if (p.geo?.lat && p.geo?.lng) {
    return `https://www.openstreetmap.org/?mlat=${p.geo.lat}&mlon=${p.geo.lng}#map=17/${p.geo.lat}/${p.geo.lng}`
  }
  const q = encodeURIComponent(`${p.address.street}, ${p.address.zip} ${p.address.city}`)
  return `https://www.openstreetmap.org/search?query=${q}`
}
