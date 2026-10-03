import type { Role } from "@/lib/types";

export interface SessionUser {
  uid: string;
  email: string;
  displayName: string;
  role: Role;
  propertyIds: string[];
}

export type Action =
  | "draft:write"
  | "draft:submit"
  | "publish"
  | "delete"
  | "project:create"
  | "project:archive"
  | "user:manage"
  | "nav:edit"
  | "settings"
  | "audit:view"
  | "project:view";

export class PermissionError extends Error {
  constructor(message = "You do not have permission to do that.") {
    super(message);
    this.name = "PermissionError";
  }
}

export function canAccessProject(user: SessionUser, propertySlug: string): boolean {
  return user.role === "super_admin" || user.propertyIds.includes(propertySlug);
}

interface Context {
  /** uid that created the resource, needed for "own drafts only" rules. */
  ownerUid?: string;
  /** true when the resource is already published or in review (contributors may not delete these). */
  isDraft?: boolean;
}

/**
 * Pure permission matrix (blueprint section 6). Project scoping applies to every
 * project-scoped action; Super Admin is the only role that is not scoped.
 */
export function can(user: SessionUser, action: Action, propertySlug?: string, ctx: Context = {}): boolean {
  const scoped = propertySlug !== undefined;
  if (scoped && !canAccessProject(user, propertySlug)) return false;

  switch (action) {
    case "project:view":
    case "draft:write":
    case "draft:submit":
      return scoped ? true : user.role === "super_admin";
    case "publish":
    case "nav:edit":
      return user.role !== "contributor";
    case "delete":
      if (user.role !== "contributor") return true;
      return ctx.isDraft === true && ctx.ownerUid === user.uid;
    case "project:create":
    case "project:archive":
    case "settings":
      return user.role === "super_admin";
    case "user:manage":
      return user.role !== "contributor";
    case "audit:view":
      return true;
  }
}

/**
 * May the actor change or suspend this user? The role must be assignable by the actor, and
 * every project the user belongs to must be inside the actor's own scope (no cross-property reach).
 */
export function canManageUser(actor: SessionUser, target: { role: Role; propertyIds: string[] }): boolean {
  if (!assignableRoles(actor).includes(target.role)) return false;
  return actor.role === "super_admin" || target.propertyIds.every((p) => canAccessProject(actor, p));
}

/** Roles the actor may assign or invite. */
export function assignableRoles(user: SessionUser): Role[] {
  if (user.role === "super_admin") return ["super_admin", "admin", "contributor"];
  if (user.role === "admin") return ["contributor"];
  return [];
}
