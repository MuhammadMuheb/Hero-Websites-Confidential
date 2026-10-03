import "server-only";

export type RevalidateTag = "home" | "navigation" | "network" | "tours" | "pages";

export interface RevalidateResult {
  ok: boolean;
  error?: string;
}

/**
 * Asks the public site to refresh (blueprint D7). The secret travels in a header,
 * never in the query string. A missing configuration is reported as a failure,
 * never ignored.
 */
export async function revalidateWeb(tags: RevalidateTag[]): Promise<RevalidateResult> {
  const base = process.env.WEB_BASE_URL?.replace(/\/+$/, "");
  const secret = process.env.REVALIDATE_SECRET;
  if (!base || !secret) return { ok: false, error: "WEB_BASE_URL or REVALIDATE_SECRET is not configured" };

  const unique = Array.from(new Set(tags));
  try {
    for (const tag of unique) {
      const res = await fetch(`${base}/api/revalidate`, {
        method: "POST",
        headers: { "content-type": "application/json", "x-revalidate-secret": secret },
        body: JSON.stringify({ tag }),
        signal: AbortSignal.timeout(10_000),
        cache: "no-store",
      });
      if (!res.ok) return { ok: false, error: `Public site answered ${res.status} for tag "${tag}"` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Could not reach the public site" };
  }
}
