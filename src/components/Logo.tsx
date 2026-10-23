import Link from 'next/link'

type Props = { name: string; doctor?: string | null }

/**
 * Logo: Zahn-Signet (SVG) + Wortmarke als echter Text.
 * Hinweis: public/brand/logo-mark.svg ist eine Nachzeichnung des gelieferten JPGs.
 * Bitte durch die Original-Vektordatei der Grafikerin / des Grafikers ersetzen.
 */
export function Logo({ name, doctor }: Props) {
  return (
    <Link href="/" className="logo" aria-label={`${name} – Startseite`}>
      <span className="logo__mark" aria-hidden="true" />
      <span className="logo__text">
        <span className="logo__name">{name}</span>
        {doctor && <span className="logo__doctor">{doctor}</span>}
      </span>
    </Link>
  )
}
