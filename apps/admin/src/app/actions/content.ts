"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requirePermission } from "@/lib/auth/session";
import { getProject } from "@/lib/repo/properties";
import { gateFor, getPageState, publishDraft, sanitizeDraft, setInReview, writeDraft } from "@/lib/repo/content";
import { writeAudit } from "@/lib/repo/audit";
import { gatePasses, type GateCheck } from "@/lib/publish/gate";
import { revalidateWeb, type RevalidateTag } from "@/lib/publish/revalidate";
import { UserError, guard, isPageSlug, ok } from "@/lib/actions-util";
import type { ActionResult, PageDraft, Project } from "@/lib/types";

const draftSchema = z.object({
  meta: z.object({ title: z.string().max(200), metaTitle: z.string().max(300), metaDesc: z.string().max(600) }),
  layout: z.array(z.object({ id: z.string().max(60), visible: z.boolean() })).max(50),
  data: z.record(z.string(), z.unknown()),
});

const MAX_DRAFT_BYTES = 400_000;

async function load(slug: string, pageSlug: string): Promise<{ project: Project }> {
  if (!isPageSlug(pageSlug)) throw new UserError("Unknown page.");
  const user = await requirePermission("project:view", slug);
  const project = await getProject(user, slug);
  if (!project) throw new UserError("Project not found.");
  return { project };
}

const tagFor = (pageSlug: string): RevalidateTag => (pageSlug === "home" ? "home" : pageSlug === "navigation" ? "navigation" : "pages");

/** Live publish checks for the editor sidebar (the server re-runs them on publish). */
export async function checkPage(slug: string, pageSlug: string, draft: unknown): Promise<ActionResult<GateCheck[]>> {
  return guard(async () => {
    const { project } = await load(slug, pageSlug);
    const parsed = draftSchema.parse(draft);
    return ok(await gateFor(project, pageSlug, parsed as PageDraft));
  });
}

export async function saveDraft(slug: string, pageSlug: string, draft: unknown): Promise<ActionResult<{ savedAt: string }>> {
  return guard(async () => {
    // Navigation is a global item: Admin and Super Admin only.
    const user = await requirePermission(pageSlug === "navigation" ? "nav:edit" : "draft:write", slug);
    const { project } = await load(slug, pageSlug);
    const parsed = draftSchema.parse(draft);
    if (JSON.stringify(parsed).length > MAX_DRAFT_BYTES) throw new UserError("This page is too large to save.");
    const clean = sanitizeDraft(pageSlug, parsed as PageDraft);

    await writeDraft(project, pageSlug, clean, user, (tx, before) =>
      writeAudit({ actor: user, propertySlug: slug, entityType: "page", entityId: pageSlug, action: "update", summary: `Saved draft of ${pageSlug}`, before, after: clean }, tx),
    );
    revalidatePath(`/projects/${slug}`, "layout");
    return ok({ savedAt: new Date().toISOString() });
  });
}

export async function submitForReview(slug: string, pageSlug: string): Promise<ActionResult> {
  return guard(async () => {
    const user = await requirePermission("draft:submit", slug);
    const { project } = await load(slug, pageSlug);
    await setInReview(project, pageSlug, user, (tx) =>
      writeAudit({ actor: user, propertySlug: slug, entityType: "page", entityId: pageSlug, action: "update", summary: `Submitted ${pageSlug} for review` }, tx),
    );
    revalidatePath(`/projects/${slug}`, "layout");
    return ok(undefined);
  });
}

export interface PublishResult {
  version: number;
  revalidateError?: string;
}

/**
 * Validate, then copy draft to published in one transaction together with the audit entry,
 * then ask the public site to refresh. A failed refresh is shown and logged, never silent.
 */
export async function publishPage(slug: string, pageSlug: string): Promise<ActionResult<PublishResult>> {
  return guard(async () => {
    const user = await requirePermission("publish", slug);
    const { project } = await load(slug, pageSlug);
    const state = await getPageState(project, pageSlug);

    const checks = await gateFor(project, pageSlug, state.draft);
    if (!gatePasses(checks)) {
      throw new UserError("Publish checks failed.", checks.filter((c) => !c.ok).map((c) => `${c.label}${c.detail ? `: ${c.detail}` : ""}`));
    }

    const version = await publishDraft(project, pageSlug, user, (tx, v) =>
      writeAudit({ actor: user, propertySlug: slug, entityType: "page", entityId: pageSlug, action: "publish", summary: `Published ${pageSlug} v${v}`, after: state.draft }, tx),
    );

    const r = await revalidateWeb([tagFor(pageSlug)]);
    if (!r.ok) {
      await writeAudit({ actor: user, propertySlug: slug, entityType: "revalidate", entityId: pageSlug, action: "publish", summary: `Revalidation FAILED (${tagFor(pageSlug)}): ${r.error}` });
    }
    revalidatePath(`/projects/${slug}`, "layout");
    return ok({ version, revalidateError: r.ok ? undefined : r.error });
  });
}

/** Manual retry after a failed refresh. */
export async function retryRevalidate(slug: string, pageSlug: string): Promise<ActionResult<{ revalidateError?: string }>> {
  return guard(async () => {
    const user = await requirePermission("publish", slug);
    await load(slug, pageSlug);
    const r = await revalidateWeb([tagFor(pageSlug)]);
    await writeAudit({
      actor: user,
      propertySlug: slug,
      entityType: "revalidate",
      entityId: pageSlug,
      action: "publish",
      summary: r.ok ? `Revalidation retry succeeded (${tagFor(pageSlug)})` : `Revalidation FAILED (${tagFor(pageSlug)}): ${r.error}`,
    });
    return ok({ revalidateError: r.ok ? undefined : r.error });
  });
}
