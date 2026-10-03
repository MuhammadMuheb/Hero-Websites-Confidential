"use server";

import { requirePermission } from "@/lib/auth/session";
import { UserError, guard, ok } from "@/lib/actions-util";
import type { ActionResult } from "@/lib/types";

export interface LinkCheck {
  /** "up" when the address answered with a success or a redirect; "down" otherwise. */
  state: "up" | "down";
  detail: string;
}

/** Hosts that must never be fetched from the server: this is a check of public websites only. */
function isPublicHost(host: string): boolean {
  const h = host.toLowerCase();
  if (!h.includes(".") || h === "localhost" || /\.(local|localhost|internal|lan|home|corp)$/.test(h)) return false;
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(h) || h.includes(":") || h.startsWith("[")) return false; // IP addresses
  return true;
}

/**
 * On-demand "Check link" for an external address in the navbar or footer: one HEAD request, three seconds at most,
 * and only the result is returned. It reads nothing from the page and changes nothing.
 */
export async function checkExternalLink(slug: string, url: string): Promise<ActionResult<LinkCheck>> {
  return guard(async () => {
    await requirePermission("project:view", slug);
    let parsed: URL;
    try {
      parsed = new URL(String(url).trim());
    } catch {
      throw new UserError("That is not a valid address.");
    }
    if (parsed.protocol !== "https:") throw new UserError("Only https:// links can be checked.");
    if (!isPublicHost(parsed.hostname)) throw new UserError("Only public websites can be checked.");

    try {
      const res = await fetch(parsed, { method: "HEAD", redirect: "manual", signal: AbortSignal.timeout(3000), cache: "no-store" });
      // Some sites refuse HEAD (405/403); they are still reachable.
      const reachable = res.status < 400 || res.status === 405 || res.status === 403;
      return ok({ state: reachable ? "up" : "down", detail: reachable ? `Answered (HTTP ${res.status}).` : `The site answered HTTP ${res.status}.` });
    } catch {
      return ok({ state: "down", detail: "No answer within 3 seconds." });
    }
  });
}
