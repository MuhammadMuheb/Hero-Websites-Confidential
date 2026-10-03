import "server-only";

/** The web app sends this header on every response (apps/web/next.config.js). */
const SERVED_BY_HEADER = "x-served-by";
const SERVED_BY_VALUE = "italy-tours-web";

export type DomainStatus =
  | { state: "none" }
  | { state: "connected" }
  | { state: "other"; httpStatus: number }
  | { state: "unreachable" };

/**
 * Does this domain really reach the web app? A domain can resolve and answer 200 and still show something else,
 * for example a registrar's parking page, so the answer is checked for the web app's own header.
 * Never throws; a slow or dead domain is reported as "unreachable" after five seconds.
 */
export async function checkDomain(domain: string): Promise<DomainStatus> {
  if (!domain) return { state: "none" };
  try {
    const res = await fetch(`https://${domain}/robots.txt`, {
      redirect: "manual",
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
      headers: { "user-agent": "isekaidigital-admin-domain-check" },
    });
    return res.headers.get(SERVED_BY_HEADER) === SERVED_BY_VALUE ? { state: "connected" } : { state: "other", httpStatus: res.status };
  } catch {
    return { state: "unreachable" };
  }
}
