# Sanfte Zahnmedizin AG – Website

Website for the dental practice of Dr. L. Tulani in Gossau SG. It replaces praxis-baerenklau.ch.

**Stack:** Next.js 16 (App Router) · Payload CMS 3 (inside the same app, admin at `/admin`) · SQLite · TypeScript · plain CSS with design tokens · hosted at Infomaniak (Switzerland).

Everything stays in Switzerland: the code, the database (one SQLite file) and uploaded images all live on the Infomaniak web hosting. There are no tracking cookies and no Google Fonts requests (fonts are self-hosted via `@fontsource`), and the map link goes to OpenStreetMap.

---

## Local development

Requirements: Node `^22.23.4` or `>=24.22.1`, pnpm 10 (`corepack enable`).

```bash
cp .env.example .env          # then set PAYLOAD_SECRET (openssl rand -hex 32)
pnpm install
pnpm seed                     # fills the DB with the content of the old website
pnpm dev                      # http://localhost:3000  ·  admin: http://localhost:3000/admin
```

On first visit to `/admin`, Payload asks you to create the first admin user.

In development Payload syncs the DB schema automatically ("push" mode). The local DB is `data/payload.db`. Delete it to start fresh.

### Scripts

| Script | What it does |
|---|---|
| `pnpm dev` | Dev server |
| `pnpm build` | Production build (`.next/standalone`) |
| `pnpm typecheck` | TypeScript check |
| `pnpm seed` | Seed/refresh content in the local dev DB (idempotent, matched by slug) |
| `pnpm seed:production` | Create `data/production.db` via migrations + seed. This is what you upload on first deploy |
| `pnpm generate:types` | Regenerate `src/payload-types.ts` after changing collections |
| `pnpm migrate:create <name>` | Create a DB migration after changing collections/fields |

---

## Project structure

```
src/
  app/(frontend)/        public website (German, lang="de-CH")
    page.tsx             home
    leistungen/          services overview + /leistungen/[slug]
    team/  kontakt/      team, contact & directions
    [slug]/              free pages (Impressum, Datenschutz, …)
  app/(payload)/         Payload admin + REST/GraphQL API (generated, don't edit)
  app/sitemap.ts         /sitemap.xml (generated from the CMS)
  app/robots.ts          /robots.txt
  collections/           Services, TeamMembers, Pages, Media, Users
  globals/               Practice (address, hours, phone …), HomePage
  components/            Header, Footer, JsonLd (schema.org Dentist), …
  lib/                   data fetching (payload.ts), helpers (site.ts)
  migrations/            DB migrations, run automatically on server start
  seed/                  initial content
scripts/
  supervisor.mjs         process manager on Infomaniak (restarts after deploy)
  backup.sh              DB + media backup
public/brand/            logo mark (SVG)
```

### Content model (what the practice can edit in `/admin`)

- **Praxisdaten** (global): name, phone, email, online booking URL, address, coordinates, opening hours, emergency note. Used in the header, footer, contact page and the Google structured data.
- **Startseite** (global): hero, intro and highlights, SEO.
- **Leistungen**: one page per treatment at `/leistungen/<slug>`, which is important for SEO. `featured` = shown on the home page.
- **Team**: members with photo, bio and qualifications. Check `Zahnärztin / Zahnarzt` for dentists, so they appear in the structured data.
- **Seiten**: Impressum, Datenschutz and other free pages at `/<slug>`.
- **Medien**: images, automatically resized and converted to WebP.

### Adding features later

- **New field or collection:** edit `src/collections/*` → `pnpm generate:types` → `pnpm migrate:create add-xyz` → commit. The migration runs on the server at the next start.
- **Online booking:** paste the OneDoc (or other) booking link into *Praxisdaten → Kontakt*. All "Termin" buttons switch from "call" to "book online".
- **Contact form:** add a Payload collection `inquiries` and an email adapter (Infomaniak SMTP). Don't collect health data in it.
- **More languages:** enable Payload `localization` and add a `[locale]` segment and `hreflang` tags.

---

## Deployment to Infomaniak

How it works: GitHub Actions builds the app and uploads it over SSH into `releases/<commit>`. It then points the `current` symlink at the new release and writes `CURRENT_RELEASE`. `supervisor.mjs`, which Infomaniak runs as the Node.js app, sees the change and restarts the server. DB migrations run automatically on start.

Layout on the server:

```
<DEPLOY_PATH>/
  supervisor.mjs   backup.sh   CURRENT_RELEASE
  current -> releases/<sha>
  releases/<sha>/  (server.js, .next/static, public, node_modules)
  shared/.env      shared/data/payload.db      shared/media/
  backups/
```

### One-time setup

1. **Infomaniak:** order Web Hosting and attach the domain. Under *Web hosting → SSH*, create an SSH user and add a **deploy key** (a new key pair just for GitHub). Note the host, user and home path.
2. **Pick a `DEPLOY_PATH`** outside the public web root, e.g. `/home/clients/<id>/sanfte-app`.
3. **Create `shared/.env`** on the server:
   ```bash
   mkdir -p $DEPLOY_PATH/shared/data $DEPLOY_PATH/shared/media
   cat > $DEPLOY_PATH/shared/.env <<'EOF'
   NODE_ENV=production
   PORT=3000                       # the port Infomaniak assigns to the Node.js site
   HOSTNAME=0.0.0.0
   DATABASE_URL=file:/ABSOLUTE/PATH/TO/shared/data/payload.db
   MEDIA_DIR=/ABSOLUTE/PATH/TO/shared/media
   PAYLOAD_SECRET=<openssl rand -hex 32>
   NEXT_PUBLIC_SERVER_URL=https://www.sanfte-zahnmedizin.ch
   EOF
   ```
4. **Upload the initial content:** locally run `pnpm seed:production`, then
   `scp data/production.db <user>@<host>:$DEPLOY_PATH/shared/data/payload.db`
   (optional: the server also starts with an empty DB and runs the migrations).
5. **GitHub repo → Settings → Secrets and variables → Actions**
   - Secrets: `SSH_HOST`, `SSH_USER`, `SSH_PRIVATE_KEY` (the deploy key), `DEPLOY_PATH`
   - Variable: `SITE_URL` = `https://www.sanfte-zahnmedizin.ch`
   - Create an environment named `production`. Optional: require approval before each deploy.
6. **Push to `main`.** The first workflow run creates `releases/`, `current` and `supervisor.mjs`.
7. **Infomaniak Manager → Node.js site:** execution folder `DEPLOY_PATH`, start command `node supervisor.mjs`, Node 22 LTS (or 24) and the port from step 3. Start it, then enable SSL (Let's Encrypt) for the domain.
8. **Cron job** (Manager → Cron jobs), daily at 03:15: `cd $DEPLOY_PATH && ./backup.sh daily`.

> Not verified yet against an actual Infomaniak account: the exact field names of the Node.js site settings, the assigned port, and whether `rsync`/`sqlite3` exist on the host. If `rsync` is missing, replace those steps with `scp -r`. Without `sqlite3`, backup.sh falls back to `cp`.
> Native modules (`sharp`, `libsql`) are built on `ubuntu-latest` (Linux x64 glibc), which should match Infomaniak's servers.

### Rollback

```bash
cd $DEPLOY_PATH && ls -1dt releases/*/      # pick a previous release
ln -sfn releases/<old-sha> current && echo <old-sha> > CURRENT_RELEASE
```
If a migration changed the DB, also restore `backups/<…>-pre-deploy/payload.db`.

---

## Before go-live – checklist

**Content** (search the admin for `[BITTE PRÜFEN]` / `[BITTE ERGÄNZEN]`):
- [ ] Have Dr. Tulani check the service texts (Swiss medical advertising must be factual)
- [ ] Bio and qualifications of Dr. Tulani; add the other 5 team members with photos
- [ ] Real practice photos (hero image on the start page, service pages)
- [ ] Impressum: UID / Handelsregister, responsible person
- [ ] Datenschutzerklärung (revDSG): use a Swiss generator and have it checked
- [ ] Emergency service info, directions/parking, coordinates (lat/lng) in *Praxisdaten*
- [ ] New email address on the new domain (currently still `info@praxis-baerenklau.ch`)
- [ ] `areaServed` towns in `src/components/JsonLd.tsx`

**Brand**
- [ ] Replace `public/brand/logo-mark.svg` with the designer's original vector file. The current file is an auto-trace of the JPG.
- [ ] Decide on the blue "N" in the second logo variant (currently not used)

**SEO / migration**
- [ ] 301 redirects from praxis-baerenklau.ch (all old URLs) to the new domain
- [ ] Google Business Profile: new name, website and hours
- [ ] Update name, address and phone on local.ch, search.ch and the SSO member directory
- [ ] Google Search Console: verify the domain, submit `/sitemap.xml`, use the "Change of address" tool
- [ ] Test with Google's Rich Results Test (Dentist schema)
- [ ] Lighthouse: performance, accessibility (WCAG 2.2 AA), SEO

## Design tokens

Defined at the top of `src/app/(frontend)/styles.css`:

| Token | Value | Use |
|---|---|---|
| `--c-bronze` | `#AC7030` | logo colour, surfaces, large type (3.9:1 contrast, not for body text) |
| `--c-bronze-dark` | `#7E5020` | links, buttons, small accent text (passes AA) |
| `--c-ink` | `#222222` | text (from the wordmark) |
| `--c-bg-warm` | `#FAF7F2` | tinted sections |

Headings are set in Jost (close to the logo's geometric sans) and body text in Source Sans 3.
