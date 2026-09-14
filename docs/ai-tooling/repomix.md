# Repomix

Status: **installed and verified working** (test-packed a sample of this repo; see numbers below).

## What this is

[Repomix](https://repomix.com) packs a repository (or a subset of it) into a single condensed
file — optionally stripping comments, collapsing whitespace, and always excluding
`.gitignore`'d paths — so an AI assistant can be handed the whole relevant codebase in one
shot instead of exploring it file-by-file. It's the complement to Serena/repo-mapping
(`docs/ai-tooling/repo-navigation.md`): use Repomix when you want breadth (the whole picture
at once), use Serena when you want depth (one symbol, precisely).

## Verified test run

Installed `repomix@1.18.0` via `npx` and packed a representative sample of this repo (root
config files + `apps/web/src/{app,components,lib}` highlights) to confirm it actually works
before wiring it into the project permanently. Real output, not an estimate:

```
Total Files:  14 files
Total Tokens: 31,087 tokens
Total Chars:  128,769 chars
Security:     ✔ No suspicious files detected

Top files by token count:
1. apps/web/src/lib/pompeii-day-trip-content.ts  11,082 tokens (35.6%)
2. apps/web/src/lib/rome-vespa-content.ts         9,098 tokens (29.3%)
3. apps/web/src/lib/tours.ts                      3,643 tokens (11.7%)
```

The `lib/*-content.ts` files dominate token count, which matches what
`docs/ai-tooling/repo-navigation.md` already flags as the reason Serena's symbol-level lookups
are worth using for this repo — Repomix and Serena are solving the same underlying problem
(these files are large and repetitive) from opposite ends.

## Configuration

- `repomix.config.json` (repo root) — output to `.repomix/repomix-output.xml` (gitignored),
  excludes `node_modules`, `.next`, `.turbo`, build artifacts, the PDF, `media/`, and
  `.claude/worktrees/`; respects `.gitignore`; runs Repomix's built-in secret/security scan.
- `package.json` — added `repomix` as a devDependency and a `pnpm repomix` script.

## Usage

```bash
pnpm install        # pulls in the repomix devDependency
pnpm repomix         # packs the full repo per repomix.config.json
```

Output lands at `.repomix/repomix-output.xml`. For a narrower pack (e.g. just `apps/web`),
run `pnpm repomix -- --include "apps/web/**"` or point `--output` / `--include` flags at a
specific app/package when the monorepo makes a full pack too large to be useful.

## When to use it here

- Handing an AI assistant the whole `apps/web` app in one message (e.g. "review the tour page
  templates for consistency") rather than having it explore file by file.
- Producing a stable snapshot to paste into a different tool that doesn't have repo access.
- Not a replacement for Serena/normal file reads during iterative editing — it's a breadth tool
  for one-shot context, not a navigation tool.
