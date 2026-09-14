# Project Overview

**Italy Tours Platform** — a pnpm/Turborepo monorepo. One Next.js app (`apps/web`)
serves a *network* of ~13 affiliate tour-booking microsites ("properties"), each
its own brand/domain, sharing one codebase, one Firestore backend, and a common
content/routing model. Property registry lives in
[`apps/web/src/lib/tours.ts`](../../apps/web/src/lib/tours.ts) → `NETWORK_SITES`.

## Stack
- Package manager: pnpm (`packageManager: pnpm@9.7.0`), workspaces = `apps/*`, `packages/*`
- Build orchestration: Turborepo (`turbo.json`)
- App: Next.js (App Router) + TypeScript, Tailwind CSS
- Backend: Firebase/Firestore (`apps/web/src/lib/firestore.ts`)
- Deploy: Vercel (`apps/web/vercel.json`)

## Commands (run from repo root unless noted)
- `pnpm dev` — turbo run dev (all apps)
- `pnpm web:dev` — dev server for just `@italy-tours/web`
- `pnpm build` / `pnpm lint` / `pnpm typecheck` / `pnpm test` — turbo pipelines
- `pnpm repomix` — condense repo via Repomix (see `repomix.config.json`)

## Top-level layout
- `apps/web/` — the Next.js application (only app in the monorepo today)
- `packages/tsconfig/` — shared TS config package
- `infra/env/` — env var files referenced by `turbo.json` globalDependencies
- `docs/ai-tooling/` — docs for the 4 AI-tooling additions (repo nav, repomix,
  prompt-caching, persistent-memory) — see [ai-tooling.md](ai-tooling.md)
- `MASTER-NETWORK-BLUEPRINT.md` — canonical 13-property blueprint spec (root)
- `STATUS.md` — human-maintained build-status log; **goes stale** — cross-check
  against `NETWORK_SITES` / actual `lib/*-content.ts` files, don't trust blindly
- `CLAUDE.md` (root) — contains an auto-generated "MANDATORY: use CRG tools"
  section from a third-party `crg-dev-kit` tool; a later note in the same file
  says CRG's tools are **not actually installed/configured** in this repo and
  the mandate should be treated as one option, not a hard requirement — use
  normal Read/Glob/Grep since no CRG MCP tools are present in this session

## Not yet done
- No test suite currently exists in `apps/web` despite `turbo run test` being wired up
- CRG, Serena MCP, mem0/Zep are referenced in docs but not confirmed active —
  see [ai-tooling.md](ai-tooling.md) for exact status of each
