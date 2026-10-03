"use server";

import { revalidatePath } from "next/cache";
import { adminAuth, adminBucket, adminDb } from "@/lib/firebase/admin";
import { requirePermission } from "@/lib/auth/session";
import { getProject, slugExists } from "@/lib/repo/properties";
import { gateFor, getPageState } from "@/lib/repo/content";
import { writeAudit } from "@/lib/repo/audit";
import { gatePasses } from "@/lib/publish/gate";
import { revalidateWeb } from "@/lib/publish/revalidate";
import { projectCreateSchema, projectUpdateSchema, themeSchema } from "@/lib/validation/schemas";
import { UserError, fail, guard, ok } from "@/lib/actions-util";
import type { ActionResult } from "@/lib/types";

/**
 * A domain may belong to only one project: the public site chooses the project from the request's host, so two
 * projects on one domain would be ambiguous. "www." and the bare domain count as the same.
 */
async function assertDomainFree(domain: string, ownSlug?: string): Promise<void> {
  if (!domain) return;
  const snap = await adminDb().collection("properties").where("domain", "in", [domain, `www.${domain}`]).get();
  const other = snap.docs.find((d) => d.id !== ownSlug);
  if (other) throw new UserError(`That domain is already used by ${String(other.data().name ?? other.id)}.`, ["domain: already in use"]);
}

export async function createProject(input: unknown): Promise<ActionResult<{ slug: string; revalidateError?: string }>> {
  return guard(async () => {
    const user = await requirePermission("project:create");
    const data = projectCreateSchema.parse(input);
    if (data.status === "live") throw new UserError("New projects start as Coming soon. Publish the Home page first, then switch to Live.");
    if (await slugExists(data.slug)) throw new UserError("That slug is already used by another project.", ["slug: already exists"]);
    await assertDomainFree(data.domain);

    const ref = adminDb().collection("properties").doc(data.slug);
    await ref.create({ ...data, defaultLocale: "en", createdAt: new Date(), createdBy: user.uid, updatedAt: new Date() });
    await writeAudit({ actor: user, propertySlug: data.slug, entityType: "property", entityId: data.slug, action: "create", summary: `Created project ${data.name}`, after: data });
    // The public site resolves a project from its domain and caches the lookup: refresh it so the new domain works at once.
    const r = await revalidateWeb(["network"]);
    if (!r.ok) await writeAudit({ actor: user, propertySlug: data.slug, entityType: "revalidate", entityId: "network", action: "update", summary: `Revalidation FAILED (new project): ${r.error}` });
    revalidatePath("/projects");
    return ok({ slug: data.slug, revalidateError: r.ok ? undefined : r.error });
  });
}

/** Typed confirmation is required to archive (blueprint section 13). */
export async function updateProject(slug: string, input: unknown, confirmName?: string): Promise<ActionResult<{ revalidateError?: string }>> {
  return guard(async () => {
    const user = await requirePermission("settings", slug);
    const project = await getProject(user, slug);
    if (!project) throw new UserError("Project not found.");
    const data = projectUpdateSchema.parse(input);
    await assertDomainFree(data.domain, slug);

    if (data.status === "archived" && project.status !== "archived" && confirmName?.trim() !== project.name) {
      throw new UserError("Type the project name exactly to confirm archiving.");
    }
    if (data.status === "live" && project.status !== "live") {
      const home = await getPageState(project, "home");
      if (home.version < 1) throw new UserError("Publish the Home page before setting the project live.");
      if (!data.publicUrl) throw new UserError("A public URL is required to go live.");
      const checks = await gateFor(project, "home", home.draft);
      if (!gatePasses(checks)) {
        throw new UserError("The Home page does not pass the publish checks yet.", checks.filter((c) => !c.ok).map((c) => `${c.label}${c.detail ? ` (${c.detail})` : ""}`));
      }
    }

    await adminDb().collection("properties").doc(slug).update({ ...data, updatedAt: new Date() });
    const networkChanged = project.status !== data.status || project.publicUrl !== data.publicUrl || project.name !== data.name;
    await writeAudit({
      actor: user,
      propertySlug: slug,
      entityType: "property",
      entityId: slug,
      action: "update",
      summary: project.status !== data.status ? `Status ${project.status} to ${data.status}` : "Updated project settings",
      before: { name: project.name, domain: project.domain, publicUrl: project.publicUrl, status: project.status, contactEmail: project.contactEmail },
      after: data,
    });

    let revalidateError: string | undefined;
    if (networkChanged) {
      const r = await revalidateWeb(["network"]);
      if (!r.ok) {
        revalidateError = r.error;
        await writeAudit({ actor: user, propertySlug: slug, entityType: "revalidate", entityId: "network", action: "update", summary: `Revalidation FAILED (network): ${r.error}` });
      }
    }
    revalidatePath("/projects");
    revalidatePath("/settings");
    return ok({ revalidateError });
  });
}

const DELETE_CHUNK = 400;

/** Deletes every document a query matches, in batches, and returns how many there were. Safe to re-run. */
async function deleteQueryDocs(query: FirebaseFirestore.Query): Promise<number> {
  const db = adminDb();
  let total = 0;
  for (;;) {
    const snap = await query.limit(DELETE_CHUNK).get();
    if (snap.empty) return total;
    const batch = db.batch();
    snap.docs.forEach((d) => batch.delete(d.ref));
    await batch.commit();
    total += snap.size;
  }
}

export interface DeleteProjectResult {
  removed: { cards: number; redirects: number; images: number; users: number };
  revalidateError?: string;
}

/**
 * Permanently deletes a project and everything stored for it (Super Admin only).
 *
 * Removed: its cards, redirects, taxonomies, navigation, Home content, its domain's pages (unless another
 * project shares the domain), its uploaded images, its assignment on every user, and finally the project
 * record itself. After this the project URL is a 404 for everyone and it no longer appears in Our Network.
 *
 * The project record is deleted LAST, so a failure part-way leaves the project visible and the action can
 * simply be run again (every step is idempotent). The audit log keeps one entry; audit entries are never
 * deleted. A project that is Live must be switched off first so a click cannot take a running site down.
 */
export async function deleteProject(slug: string, confirmSlug: string): Promise<ActionResult<DeleteProjectResult>> {
  return guard(async () => {
    const user = await requirePermission("project:archive");
    const project = await getProject(user, slug);
    if (!project) throw new UserError("Project not found.");
    if (String(confirmSlug).trim() !== project.slug) throw new UserError(`Type the project slug "${project.slug}" exactly to confirm.`);
    if (project.status === "live") throw new UserError("This project is Live. Set its status to Coming soon or Archived first, then delete it.");

    const db = adminDb();

    const cards = await deleteQueryDocs(db.collection("tours").where("propertySlug", "==", slug));
    const redirects = await deleteQueryDocs(db.collection("redirects").where("propertySlug", "==", slug));
    await Promise.all([db.collection("taxonomies").doc(slug).delete(), db.collection("navigation").doc(slug).delete(), db.collection("siteContent").doc(slug).delete()]);

    // Pages live under the project's domain; leave them alone if another project still uses the same domain.
    if (project.domain) {
      const sameDomain = await db.collection("properties").where("domain", "==", project.domain).get();
      if (!sameDomain.docs.some((d) => d.id !== slug)) await db.recursiveDelete(db.collection("sites").doc(project.domain));
    }

    // Uploaded images (private bucket, projects/<slug>/...). A storage problem is logged, not fatal.
    let images = 0;
    try {
      const [files] = await adminBucket().getFiles({ prefix: `projects/${slug}/` });
      images = files.length;
      await Promise.all(files.map((f) => f.delete({ ignoreNotFound: true })));
    } catch (e) {
      console.error("[deleteProject] could not remove images", e);
    }

    // Nobody keeps access to a project that no longer exists: drop the slug from their assignments and claims.
    const assigned = await db.collection("users").where("propertyIds", "array-contains", slug).get();
    for (const doc of assigned.docs) {
      const data = doc.data();
      const propertyIds = (Array.isArray(data.propertyIds) ? (data.propertyIds as string[]) : []).filter((p) => p !== slug);
      await doc.ref.update({ propertyIds });
      await adminAuth().setCustomUserClaims(doc.id, { role: data.role, propertyIds });
    }

    await db.recursiveDelete(db.collection("properties").doc(slug));

    await writeAudit({
      actor: user,
      propertySlug: slug,
      entityType: "property",
      entityId: slug,
      action: "delete",
      summary: `Deleted project ${project.name} (${cards} cards, ${redirects} redirects, ${images} images)`,
      before: { name: project.name, domain: project.domain, publicUrl: project.publicUrl, status: project.status },
    });

    // Tell the public site to stop serving it (Our Network, cards, pages). Not fatal if it cannot be reached.
    const r = await revalidateWeb(["network", "tours", "pages", "home", "navigation"]);
    if (!r.ok) await writeAudit({ actor: user, propertySlug: slug, entityType: "revalidate", entityId: "network", action: "update", summary: `Revalidation FAILED (delete project): ${r.error}` });

    revalidatePath("/projects");
    revalidatePath("/settings");
    revalidatePath("/");
    return ok({ removed: { cards, redirects, images, users: assigned.size }, revalidateError: r.ok ? undefined : r.error });
  });
}

export async function updateTheme(slug: string, input: unknown): Promise<ActionResult<{ revalidateError?: string }>> {
  return guard(async () => {
    const user = await requirePermission("nav:edit", slug);
    const theme = themeSchema.parse(input);
    const project = await getProject(user, slug);
    if (!project) return fail("Project not found.");
    await adminDb().collection("properties").doc(slug).update({ theme, updatedAt: new Date() });
    await writeAudit({ actor: user, propertySlug: slug, entityType: "theme", entityId: slug, action: "update", summary: "Updated theme", before: project.theme, after: theme });
    const r = await revalidateWeb(["home", "navigation"]);
    if (!r.ok) await writeAudit({ actor: user, propertySlug: slug, entityType: "revalidate", entityId: "home", action: "update", summary: `Revalidation FAILED (theme): ${r.error}` });
    return ok({ revalidateError: r.ok ? undefined : r.error });
  });
}
