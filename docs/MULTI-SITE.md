# How sites are served (multi-site)

One `apps/web` deployment serves **every project**. The admin (`apps/admin`) writes projects to Firestore; the web
app reads them. A new project needs no code and no new deployment.

```
 apps/admin  ──writes──▶  Firestore  ◀──reads──  apps/web  ◀── visitors (any domain)
  New project              properties/{slug}      middleware: host → project
  (name, domain, ...)      tours, siteContent,    generic template per project
                           sites/{domain}/pages
```

## Request flow

1. A request arrives with a `Host` header (`middleware.ts`, `lib/tenant-host.ts`).
2. **Legacy hosts** keep the original Street Food Rome pages: `SITE_DOMAIN` (default `streetfoodrome.com`), `localhost`,
   `*.vercel.app` previews and anything in `LEGACY_HOSTS`.
3. **Any other host** is rewritten to `/sites/<host>/<path>`. The generic template in `app/sites/[site]/` looks the
   project up by `properties.domain` (`lib/tenants.ts`) and renders it from Firestore (`lib/tenant-data.ts`).
4. An unknown or archived domain is a 404. A project with no complete published Home shows a "Coming soon" page.

## What a project gets automatically

| URL | Source in Firestore |
|---|---|
| `/` | `siteContent/{slug}.published.data` (Home), shown as "Coming soon" until it is complete |
| `/tours`, `/tours/{slug}`, `/tours/category/{category}` | `tours` where `propertySlug == {slug}` and published (no `status`, or `published`) |
| `/about`, `/contact`, `/faq` | `sites/{domain}/pages/{slug}` (published) |
| `/privacy`, `/terms`, `/cookie-policy`, `/affiliate-disclosure` | the `legal` page of the project |
| `/robots.txt`, `/sitemap.xml` | generated for the project's own domain |
| header and footer | the project's name, logo, contact email, Our Network (other live projects) |
| colours | the project's theme (`primary`, `dark`, `accent`) as CSS variables |

Colours and fonts come from the theme; the template is shared, so layout is the same for every project.

## Add a project (any number of them)

1. **Admin** → *+ New project*: name, slug, **domain** (for example `romevespa.com`), contact email.
   A domain belongs to one project (`www.` counts as the same site).
2. **Admin** → *Open* the project: import or edit Home, About, FAQ, Legal and the tour cards, then publish.
3. **Vercel**: add the domain to the *web* project, and point the domain's DNS at Vercel. This is the one step that
   is not inside this repo. (It can be automated with the Vercel Domains API if wanted.)
4. Nothing else. The project is served as soon as its domain reaches the web app.

To see a project **before** its DNS is ready, open `https://<web preview or localhost>/sites/<domain>`. Pages opened
this way are `noindex`. The path is blocked on the production legacy domain.

## Keeping the web app fresh

The admin calls `POST ${WEB_BASE_URL}/api/revalidate` (header `x-revalidate-secret`) after changes, with the tags
`network` (projects, domains), `home`, `pages`, `tours`. Set `WEB_BASE_URL` and `REVALIDATE_SECRET` in the admin and
`REVALIDATE_SECRET` in the web project. One web deployment means one `WEB_BASE_URL` for all projects. Without a
refresh, project data is cached for 60 seconds and page content for 5 minutes.

## Environment variables (web)

| Variable | Meaning |
|---|---|
| `SITE_DOMAIN` | domain of the legacy site (default `streetfoodrome.com`) |
| `PROPERTY_SLUG` | slug of the legacy site's project (default `street-food-rome`) |
| `LEGACY_HOSTS` | optional, comma-separated extra hosts served by the legacy pages |
| `FIREBASE_*`, `REVALIDATE_SECRET` | as before |

## Limits (by design, for now)

- The Street Food Rome pages stay on their own code (neighbourhood guides, blog, category pages, search). The
  generic template covers Home, tours, standard pages, robots and sitemap. More sections can be added to
  `app/sites/[site]/` and every project gets them at once.
- The generic Home shows the sections the admin's Home form has (hero, chips, tours, categories, how we choose).
- Search, blog and neighbourhood pages are not part of the generic template yet.
- Legal and page text is HTML/text saved in the admin (legal HTML is sanitised when it is saved there).

## Our Network and the live link

- **Our Network** lists every project that is not archived and has an address (its public URL, or `https://` plus its
  domain). A new project appears as soon as it is created with a domain; the admin refreshes the web app's `network`
  tag (needs `WEB_BASE_URL` and `REVALIDATE_SECRET` on both apps), and without it the list is at most a minute old.
- The project name in the admin opens that same address. If it shows a parking page, the domain is not connected yet:
  the project's Edit page checks the domain (the web app sends `X-Served-By: italy-tours-web`) and says what to do.
  Connecting a domain = add it (and `www.`) in the Vercel **web** project, then set the DNS records Vercel shows.

## Starting content for the network projects

`apps/admin/scripts/seed-network-projects.mts` gives every project that has at least three published tours a
complete Home and a navigation (draft and published), built from the project's own name, contact email and tours.
It writes only what is missing, never touches domains, status or tours, and is a dry run unless `--apply` is passed:

```bash
cd apps/admin
npx tsx --env-file=../../infra/env/.env scripts/seed-network-projects.mts          # dry run
npx tsx --env-file=../../infra/env/.env scripts/seed-network-projects.mts --apply  # write
```

As soon as a project has a domain that points at the web app, `/` shows that Home, `/tours` lists its tours and the
header and footer come from its navigation. The navbar only links to pages that exist (Home and Tours to begin
with); About, FAQ and the others join when they are written and published.
