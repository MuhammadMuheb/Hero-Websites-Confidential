# Persistent Memory (mem0 / Zep)

Status: **both configured in `.mcp.json`.** mem0 needs an API key from you (env var, not
committed). Zep needs a one-time OAuth login — no key to manage.

## What this is

Cross-session memory for AI assistants working in this repo: instead of re-explaining
architecture decisions every session, the assistant writes short notes ("added rate limiting
to X, because Y") to a memory store and can search it back later.

## mem0

`.mcp.json` registers the **official** mem0 MCP server (`@mem0/mcp-server`, published by the
mem0.ai team — verified via npm registry maintainer emails, not a community lookalike):

```json
"mem0": {
  "command": "npx",
  "args": ["-y", "@mem0/mcp-server"],
  "env": { "MEM0_API_KEY": "${MEM0_API_KEY}" }
}
```

`${MEM0_API_KEY}` is read from your environment, never committed — `.gitignore` already
excludes `.env` / `.env.local`. To activate:

1. Get an API key from https://app.mem0.ai (Settings → API Keys).
2. Create `.env.local` in the repo root with `MEM0_API_KEY=your-key-here`, or set it as a
   machine-level env var (`setx MEM0_API_KEY "your-key-here"` on Windows, then restart your
   terminal).
3. Restart Claude Code / the MCP connection. `mem0` tools (`mem0.add`, `mem0.search`) should
   then be available.

You never need to paste the raw key into chat for this — it only needs to exist on your
machine.

## Zep

### Correction from earlier

I initially couldn't find an official Zep MCP package on npm/PyPI and flagged Zep as blocked.
You then attached Zep's own GitHub repo (`zep-main.zip`), which clears this up: Zep ships a
**local Go-based MCP server** at `mcp/zep-mcp-server/` in that repo, but its own README marks
it explicitly:

> **Deprecated:** This MCP server is no longer maintained. Use the official Zep Memory MCP
> server instead.

So the local Go server is intentionally not the current path — I did not wire it up. The
current official path, per Zep's docs, is a **hosted remote MCP server**, which is a
meaningfully different setup than mem0's:

- **Endpoint:** `https://api.getzep.com/mcp` (same URL for managed cloud; self-hosted/BYOC
  deployments use the same `/mcp` path on their own API infrastructure)
- **Auth:** OAuth 2.1 with PKCE, not a static API key — you log in once (Google Workspace by
  default, or an enterprise IdP like Entra ID/Okta on Zep's Enterprise plan), and access
  tokens auto-renew. There's no `ZEP_API_KEY` to put anywhere.
- **Scope:** this connects an AI agent to a *person's* memory in Zep (end-user identity via
  the IdP), which is a different mental model than mem0's per-project API key — worth knowing
  before you rely on it for "repo-wide AI assistant memory" the same way mem0 is used here.

`.mcp.json` now has:

```json
"zep": {
  "type": "http",
  "url": "https://api.getzep.com/mcp"
}
```

No `clientId` — Zep supports OAuth dynamic client registration, so Claude Code discovers the
flow automatically. To activate: run `claude mcp login zep` (or use the `/mcp` panel in
Claude Code) and complete the Google Workspace / IdP login in your browser. A Zep project
needs to exist first (sign up at https://app.getzep.com) and, per Zep's docs, an admin sets up
the identity-provider connection at the project level before this will authenticate.

## Using both together

mem0 and Zep aren't redundant here: mem0 is the simple "assistant remembers this repo" layer
(API-key based, easy to set up, matches the other three tools' config style). Zep is
identity-scoped, OAuth-gated, and graph-structured — worth it if you specifically want
per-person memory (e.g. for a future user-facing feature in `apps/web`), less necessary just
for AI-assisted development on this codebase. Both are wired up; use whichever fits the task.
