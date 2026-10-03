import "server-only";
import { createHash } from "node:crypto";
import { adminDb } from "@/lib/firebase/admin";

/**
 * Fixed-window counter stored in Firestore (in-memory counters do not work on
 * serverless). Returns false when the caller is over the limit.
 */
export async function rateLimit(bucket: string, key: string, limit: number, windowSeconds: number): Promise<boolean> {
  const windowStart = Math.floor(Date.now() / 1000 / windowSeconds);
  const id = createHash("sha256").update(`${bucket}:${key}:${windowStart}`).digest("hex").slice(0, 40);
  const ref = adminDb().collection("rateLimits").doc(id);
  const count = await adminDb().runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const next = ((snap.data()?.count as number | undefined) ?? 0) + 1;
    tx.set(ref, { count: next, bucket, expiresAt: new Date((windowStart + 2) * windowSeconds * 1000) });
    return next;
  });
  return count <= limit;
}
