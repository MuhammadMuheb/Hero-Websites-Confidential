# Repo Mapping & Semantic Code Search

Status: **configured** (Serena MCP server registered in `.mcp.json`). One-time local setup still required — see Prerequisites.

## What this is

Two complementary techniques for navigating this codebase without reading whole files:

1. **Aider-style repo map** — a ranked, symbol-level summary of the repo (file → top-level
   declarations, imports, call relationships) built with `tree-sitter`. It's what Repomix's
   `--style` output and Serena's `get_symbols_overview` are both approximations of; we're using
   Serena as the live, queryable version of this rather than a static file, since a static map
   goes stale the moment someone edits `apps/web/src/lib/*.ts`.
2. **Serena MCP server** — wraps language-server-protocol operations (`find_symbol`,
   `find_referencing_symbols`, `get_symbols_overview`, `replace_symbol_body`, etc.) as MCP tools,
   so an AI assistant can jump to a symbol's definition or find every caller without reading
   the surrounding file.

## Why this repo benefits

`apps/web/src/lib/*-content.ts` are large, repetitive per-tour content files (30–48 KB each:
`pompeii-day-trip-content.ts`, `rome-vespa-content.ts`, `underground-colosseum-content.ts`, etc.),
and `MASTER-NETWORK-BLUEPRINT.md` is ~84 KB. Reading these in full to find one export or one
section wastes a large fraction of the context window. Symbol/section-level lookups avoid that.

## Prerequisites (one-time, per machine)

Serena is launched via `uvx`, which needs [uv](https://docs.astral.sh/uv/) installed:

```powershell
# Windows (PowerShell)
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

No separate `pip install` step is needed — `uvx` fetches and caches Serena from GitHub on first
launch. Restart your terminal / Claude Code after installing `uv` so `uvx` is on PATH.

## Configuration

`.mcp.json` (repo root) registers the server:

```json
{
  "mcpServers": {
    "serena": {
      "command": "uvx",
      "args": ["--from", "git+https://github.com/oraios/serena", "serena",
                "start-mcp-server", "--context", "ide-assistant", "--project", "."]
    }
  }
}
```

Claude Code picks up project-scoped `.mcp.json` automatically; on first use it will ask you to
approve the server.

## Workflow guidance for AI assistants working in this repo

- Prefer `get_symbols_overview` on a `lib/*-content.ts` file over reading it in full when you
  only need to know what it exports.
- Prefer `find_symbol` / `find_referencing_symbols` over `Grep` when the question is "where is
  `X` defined" or "who calls `X`" — it resolves via the TS language server rather than text
  matching, so it's accurate across renames and re-exports.
- Fall back to a normal file read when you actually need the full content (e.g., editing a
  whole content block, or the file isn't yet indexed).
- This is guidance, not a hard rule — unlike the CRG instructions elsewhere in this repo's
  CLAUDE.md (see the note in the root CLAUDE.md), nothing here should be treated as mandatory
  or as disabling normal file tools when they're the faster path.
