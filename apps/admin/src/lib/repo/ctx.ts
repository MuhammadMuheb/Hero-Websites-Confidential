import "server-only";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth/session";
import type { SessionUser } from "@/lib/auth/permissions";
import type { Project } from "@/lib/types";
import { getProject, slugExists } from "./properties";

export type ProjectContext = { user: SessionUser; project: Project; denied?: false } | { user: SessionUser; project?: undefined; denied: true };

/**
 * Loads the signed-in user and the project from the URL. A project that exists but is not
 * assigned to the user yields denied: true (the screen shows the no-permission state);
 * a project that does not exist is a 404.
 */
export async function projectContext(slug: string): Promise<ProjectContext> {
  const user = await requireUser();
  const project = await getProject(user, slug);
  if (project) return { user, project };
  if (await slugExists(slug)) return { user, denied: true };
  notFound();
}
