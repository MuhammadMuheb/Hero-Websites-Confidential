import "server-only";
import { projectLiveUrl } from "@/lib/project-url";
import type { Project } from "@/lib/types";

/**
 * Where the admin's own links (the project name, "open site") go.
 *
 * That is the project's live address, with one development exception: on a developer machine the main site's
 * domain may not be connected yet (it can sit on a registrar's parking page), so the link opens the web app that is
 * running locally (WEB_BASE_URL) instead. In production this is exactly projectLiveUrl.
 */
export function projectOpenUrl(project: Pick<Project, "publicUrl" | "domain">): string | null {
  if (process.env.NODE_ENV !== "production") {
    const web = process.env.WEB_BASE_URL?.trim();
    const mainDomain = (process.env.SITE_DOMAIN?.trim() || "streetfoodrome.com").toLowerCase();
    if (web && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(web) && project.domain?.trim().toLowerCase() === mainDomain) return web;
  }
  return projectLiveUrl(project);
}
