import "server-only";
import { z } from "zod";
import { PermissionError } from "@/lib/auth/permissions";
import { formatIssues } from "@/lib/validation/schemas";
import type { ActionResult } from "@/lib/types";

export const ok = <T>(data: T): ActionResult<T> => ({ ok: true, data });
export const fail = (error: string, issues?: string[]): ActionResult<never> => ({ ok: false, error, issues });

export class UserError extends Error {
  constructor(
    message: string,
    public issues?: string[],
  ) {
    super(message);
  }
}

/** Turns thrown errors into safe, readable results. Internals are logged, never returned. */
export async function guard<T>(fn: () => Promise<ActionResult<T>>): Promise<ActionResult<T>> {
  try {
    return await fn();
  } catch (e) {
    if (e instanceof PermissionError) return fail(e.message);
    if (e instanceof UserError) return fail(e.message, e.issues);
    if (e instanceof z.ZodError) return fail("Some fields are invalid.", formatIssues(e));
    console.error("[action]", e);
    return fail("Something went wrong. Please try again.");
  }
}

export const PAGE_SLUGS = ["home", "about", "contact", "faq", "legal", "navigation"] as const;
export type PageSlug = (typeof PAGE_SLUGS)[number];
export const isPageSlug = (s: string): s is PageSlug => (PAGE_SLUGS as readonly string[]).includes(s);
