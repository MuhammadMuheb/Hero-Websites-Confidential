# Prompt Caching

Status: **guidance only** — there's nothing to "install." Anthropic's prompt caching is a
built-in feature of the Claude API (you mark stable blocks of a request with `cache_control`
and repeated calls reuse the cached prefix instead of reprocessing it). It doesn't apply to
this repo as a package, because a scan of `apps/web` found no direct calls to the Anthropic
API in the product code — this is a Next.js marketing/booking site (Firestore, Unsplash,
analytics), not an AI-feature app. So this doc covers the two places caching is actually
relevant here.

## 1. AI-assisted development sessions in this repo (relevant now)

When you (or an AI assistant) are working in this repo through the Claude API/Claude Code,
caching is automatic at the infrastructure level for content that stays identical between
turns — but only if that content is structured to stay stable and appears early/consistently
in context. Practical guidance for this repo:

- Keep `CLAUDE.md` and the `docs/ai-tooling/*.md` files stable during a session — avoid
  editing them mid-session unless the guidance itself changed, since edits invalidate the
  cached prefix.
- When packing large content for one-shot review (e.g. via Repomix, see
  `docs/ai-tooling/repomix.md`), keep the packed file's structure/order consistent across
  repeated calls in the same session rather than regenerating it with different flags each
  time — a differently-ordered pack is a cache miss even if the underlying files didn't change.
- The large `lib/*-content.ts` files (30–48 KB each) are exactly the kind of bulky, rarely-
  changing content that benefits most from caching if they're read into context — prefer
  reading one in full once per session and referring back to it, rather than re-reading it
  each turn.

## 2. If an AI feature is added to the product later

If this project ever calls the Anthropic API directly (e.g. a trip-planning chat concierge,
an FAQ assistant), structure the request so static material — system prompt, tour content,
FAQ text — is marked cacheable and appears before the per-request user message. Example using
the TypeScript SDK:

```ts
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

const response = await anthropic.messages.create({
  model: "claude-sonnet-5",
  max_tokens: 1024,
  system: [
    {
      type: "text",
      text: TOUR_CATALOG_AND_POLICIES_TEXT, // large, stable, changes rarely
      cache_control: { type: "ephemeral" },
    },
  ],
  messages: [{ role: "user", content: userQuestion }],
});
```

Rules of thumb: put the largest, most stable content first and mark it `cache_control`; put
the actual per-user question last and unmarked; don't mark content that changes every request
(that just adds overhead with no reuse). Anthropic's own caching guide has the current
minimum cacheable size and pricing details — check `docs.claude.com` before implementing,
since those numbers can change.
