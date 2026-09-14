# AI Tooling Status (4 tools referenced in root CLAUDE.md)

Docs for all four live under `docs/ai-tooling/`. Actual repo state as verified
2026-09-14 (don't trust the docs' "Status:" line alone — re-check if it matters):

1. **Repo mapping / Serena** — `.mcp.json` now exists at repo root (created
   2026-09-14, see item 4 below) registering `serena` per
   [repo-navigation.md](../../docs/ai-tooling/repo-navigation.md). Still requires
   `uv`/`uvx` installed locally (one-time, per machine) and the MCP server
   approval prompt on first launch — **not yet verified working in a live
   session**; fall back to Grep/Glob/Read until it's confirmed connected.
2. **Repomix** — `repomix.config.json` exists at root and `pnpm repomix` script is
   wired in root `package.json`, but the `repomix` package itself is **not actually
   installed** in `node_modules` (declared as devDependency but missing — `pnpm repomix`
   fails with "not recognized"). Workaround: `npx --yes repomix@1.18.0` runs it without
   installing. Output goes to `.repomix/repomix-output.xml` (gitignored, xml style,
   line numbers on, security check on). Last regenerated 2026-09-14: 153 files,
   ~459K tokens, 1.69M chars, no security issues flagged. Note: `.claude/memories/*.md`
   is NOT picked up by the current `repomix.config.json` (still 153 files after adding
   them) — check `ignore.useDefaultPatterns`/gitignore interaction if those should be
   included later. Regenerate after significant code changes rather than trusting a
   stale snapshot. See [repomix.md](../../docs/ai-tooling/repomix.md) for config details.
3. **Prompt caching** — guidance-only doc, verified accurate: `apps/web` has no direct
   Anthropic API calls in production code (grepped for `anthropic`/`@anthropic-ai`/
   `claude-`, zero hits outside node_modules). Nothing to configure now; the doc's
   `cache_control` example is ready to copy if/when a concierge-chat-style feature is
   added. The one actionable-today guidance (keep `CLAUDE.md`/`docs/ai-tooling/*.md`
   stable mid-session, don't re-order Repomix output) is behavioral, not a repo change.
4. **Persistent memory (mem0/Zep)** — `.mcp.json` created 2026-09-14 with both `mem0`
   (`@mem0/mcp-server`, reads `MEM0_API_KEY` from env — not set anywhere yet) and `zep`
   (hosted `https://api.getzep.com/mcp`, OAuth) entries, matching
   [persistent-memory.md](../../docs/ai-tooling/persistent-memory.md). **Config exists;
   neither is actually active yet** — doc's claim of "both configured" was aspirational
   before this session (no `.mcp.json` existed at all). Remaining steps only the human
   user can do: (a) mem0 — sign up at app.mem0.ai, create an API key, put it in
   `.env.local` as `MEM0_API_KEY=...` (gitignored) or a machine env var, restart Claude
   Code; (b) Zep — create a project at app.getzep.com, then run `claude mcp login zep`
   (or the `/mcp` panel) and complete OAuth in browser. Neither can be completed by an
   assistant session — both need a human to obtain credentials/complete browser login.

## Root CLAUDE.md CRG section
The root `CLAUDE.md` has an auto-generated block (`crg-dev-kit`) mandating CRG
tools (`get_review_context`, `query_graph`, etc.) for all exploration. A later,
manually-added section in the same file explicitly overrides this: treat CRG as
optional, not mandatory, and use plain file tools when CRG isn't available (it
isn't, in this session — no CRG MCP tools are present). `check-crg.sh` and
`setup-crg.ps1` exist at repo root if CRG setup is ever revisited.
