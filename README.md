# Italy Tours Network

A pnpm + Turborepo monorepo with two apps that share one Firebase project.

| App | What it is | Port |
|---|---|---|
| [`apps/web`](apps/web) | The public websites. One deployment serves every project by domain. | 3000 |
| [`apps/admin`](apps/admin) | The Master Admin: projects, content editors, users and roles. Writes what the web app reads. | 3001 |

```
apps/web     public sites (Next.js 15)            ─┐
apps/admin   admin panel (Next.js 15)              ├── Firebase (Firestore, Auth, Storage)
infra/       env examples, Firebase rules         ─┘
packages/    shared TypeScript config
scripts/     seed and crawl scripts
docs/        architecture notes (docs/MULTI-SITE.md)
```

How a project becomes a website without code: [docs/MULTI-SITE.md](docs/MULTI-SITE.md).

## Run locally

Node 20.9 or newer and pnpm 9.

```bash
pnpm install
cp infra/env/.env.example infra/env/.env      # Firebase credentials for apps/web
cp apps/admin/.env.example apps/admin/.env.local   # credentials and settings for apps/admin
pnpm dev                                      # both apps (turbo)
pnpm --filter @italy-tours/web dev            # only the web app
pnpm admin:dev                                # only the admin
```

Create the first Super Admin (the admin has no public sign-up):

```bash
ADMIN_BOOTSTRAP_EMAIL=you@example.com node --env-file=apps/admin/.env.local apps/admin/scripts/bootstrap-super-admin.mjs
```

## Checks

```bash
pnpm typecheck      # both apps
pnpm lint
pnpm test           # admin unit tests
pnpm build
```

CI (`.github/workflows/ci.yml`) runs typecheck, tests and a production build of both apps on pushes and pull
requests to `main` and `staging`. Never commit `.env` files or key files; the repository ignores them.

## Deploy (Vercel)

Two Vercel projects from this repository, each with its own Root Directory and environment variables:

| Project | Root Directory | Notes |
|---|---|---|
| web | `apps/web` | add every project's domain here; `SITE_DOMAIN`, `PROPERTY_SLUG`, `FIREBASE_*`, `REVALIDATE_SECRET` |
| admin | `apps/admin` | `FIREBASE_*`, `FIREBASE_WEB_API_KEY`, `NEXT_PUBLIC_FIREBASE_*`, `WEB_BASE_URL`, `REVALIDATE_SECRET` |

Both `vercel.json` files install and build from the repository root with `--filter`.
