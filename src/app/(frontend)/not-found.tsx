import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="section">
      <div className="container container--narrow">
        <h1>Seite nicht gefunden</h1>
        <p className="lead">Die gesuchte Seite gibt es leider nicht (mehr).</p>
        <div className="btn-row">
          <Link className="btn btn--primary" href="/">
            Zur Startseite
          </Link>
          <Link className="btn btn--secondary" href="/kontakt">
            Kontakt
          </Link>
        </div>
      </div>
    </section>
  )
}
