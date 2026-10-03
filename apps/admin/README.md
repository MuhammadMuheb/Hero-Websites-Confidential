# isekaidigital: Master Admin (`apps/admin`)

Admin panel for the Italy Tours Network. It moves website content out of code into Firestore so text, cards, prices, ratings, images and the Our Network list change without a deployment.

## Screens

- **Projects**: one card per website.
  - The project **name** is a link that opens the live site in a new tab (its public URL, or https:// plus its domain).
  - **Open** goes to the project's editor pages (Home, About, Contact, FAQ, Legal, Navbar, Footer, Theme, Tours, Taxonomies, Content import). Inside a project the sidebar also links to the **Live site** and to **Project settings**.
  - **Edit** (Super Admin) opens the project settings: name, domain, public URL, status, contact email, logo and theme, with Delete at the bottom.
  - **Delete** (Super Admin, typed confirmation, never while Live) permanently removes the project and everything stored for it, including its cards, content, redirects, images and user assignments.
  - **+ New project** (Super Admin).
- **Settings**: users and roles, the Projects list (with Edit and Delete) and the Our Network list.

There is no dashboard, activity screen or analytics screen.

## Decisions

| Topic | Decision |
|---|---|
| Package manager | npm workspaces (the repo already used them). The blueprint says pnpm + turbo; not switched. |
| Package name | `@isekaidigital/admin` (existing). Blueprint says `@italy-tours/admin`. |
| Data access | Server only: `firebase-admin` in Server Actions and Route Handlers. `firestore.rules` and `storage.rules` deny all client access. |
| Sign-in | Server-side password check (Identity Toolkit REST) then `createSessionCookie`: httpOnly, SameSite=Lax, Secure in production, 5 days. Invite-only. |
| Roles | Firebase custom claims `role` + `propertyIds`, mirrored in `users/{uid}`. `requirePermission()` is the first line of every action. |
| Scoping | Super Admin sees all projects. Admin and Contributor are limited to their `propertyIds` (least privilege). |
| Drafts | Draft and published live side by side. A draft write never touches fields the public site reads. |
| Project slug | Fixed after creation (it is the document id). |
| Edge runtime | Middleware only checks the cookie exists. Verification (including revocation) runs in Node. |

## Run

```bash
npm install
cp .env.example apps/admin/.env.local   # then fill in the values
npm run dev          # http://localhost:3000
npm run typecheck && npm run lint && npm test -w apps/admin && npm run build
```

Node 20 or newer. A production build can run beside a dev server with `NEXT_DIST_DIR=.next-prod npm run build -w apps/admin` (the dev server and the build otherwise share `.next`).

## First-time setup (do in this order)

1. **Security first.** Revoke the old service-account key in Google Cloud, create a new one, make the GitHub repository private, `git rm` the committed env file and push. Git history keeps old keys, so the revocation is what matters.
2. Fill `apps/admin/.env.local` from `.env.example`. Never commit it.
3. Deploy the deny-all rules in `firestore.rules` and `storage.rules`.
4. Create the first Super Admin (no public sign-up exists):

   ```bash
   ADMIN_BOOTSTRAP_EMAIL=you@example.com node --env-file=apps/admin/.env.local scripts/bootstrap-super-admin.mjs
   ```

   Without `ADMIN_BOOTSTRAP_PASSWORD` the script prints a one-time link to set the password. A password passed in is accepted only if it has at least 12 characters, and nothing is written to disk.
5. Sign in at `/login`, create a project, then import or edit its content.

## Firestore contract (for the public site)

| Collection | Notes |
|---|---|
| `properties/{slug}` | name, domain, publicUrl, status (`coming_soon`/`live`/`archived`), theme, contactEmail. **Our Network** = documents with `status == "live"` and an https `publicUrl`. |
| `siteContent/{slug}` | Home. `published = { meta, layout, data }`; `published.data` follows the SiteConfig shape (`hero`, `chips[20]`, `namesStrip[10]`, `categories[5]`, `howWeChoose[4]`, `placesTabs[3]`, `seo`, `contactEmail`). Read `published`, never `draft`. |
| `sites/{domain}/pages/{slug}` | About, Contact, FAQ, Legal. Same envelope; legacy top-level `title`, `metaTitle`, `metaDesc` and `faqs` are refreshed on publish. |
| `navigation/{slug}` | `published.data.navbar` and `published.data.footer`. |
| `tours` | Existing shape kept. New optional fields: `price`, `rating`, `images[]`, `shortDescription`, `status`, `draft`, `version`, `createdBy`. Missing `status` means published. `trashed` must be hidden. |
| `redirects/{slug}__{from}` | `{ from, to }` created when a published slug changes. The public site should serve these as 301s. |
| `taxonomies/{slug}` | Managed lists for cards. |
| `users/{uid}`, `auditLogs/{id}` | Admin only. The audit log is append-only: the code only ever calls `create()`. |

Publishing posts `{ "tag": "home" | "pages" | "navigation" | "tours" | "network" }` to `${WEB_BASE_URL}/api/revalidate` with the secret in the `x-revalidate-secret` header. A failure is shown to the editor, written to the activity log, and can be retried from the editor.

## Structure

```
apps/admin/src
  app/
    actions/         Server Actions: auth, projects, content, tours, import, users
    api/upload/      Image upload (permission, size, real image check, WebP, Cloud Storage)
    login/  robots.ts  middleware.ts
    (admin)/         Dashboard, projects, project workspace, activity, analytics, settings
  components/        ui/, layout/, workspace/ (PageEditor, JsonField, ToursManager, ImportPanel ...)
  lib/
    auth/            permissions (pure matrix), session, rate-limit
    repo/            Firestore access (audit, content, tours, properties, misc)
    publish/         gate (publish checks), revalidate
    validation/      zod schemas
    import/          content file parsing and preview
    content/         page definitions and empty templates
scripts/bootstrap-super-admin.mjs
```

## Status against the blueprint

P1 is implemented in code. Items needing a live Firebase project to verify are listed in the hand-over notes; the unit tests cover the permission matrix, import validation, the publish gates and the sanitiser. P2 items (analytics, URL import, AI copy, trash UI, messages, diff viewer, CSV export, enforced MFA, PDF/DOCX import, drag-and-drop) are intentionally not built and show explicit empty states.
