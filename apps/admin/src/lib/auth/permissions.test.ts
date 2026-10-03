import { describe, expect, it } from "vitest";
import { assignableRoles, can, canManageUser, type SessionUser } from "./permissions";
import { isLiveDoc } from "@/lib/content/live";

const user = (role: SessionUser["role"], propertyIds: string[] = [], uid = "u1"): SessionUser => ({ uid, email: "a@b.c", displayName: "A", role, propertyIds });

describe("permission matrix (blueprint section 6)", () => {
  it("rejects a Contributor publishing or deleting published content, even in an assigned project", () => {
    const c = user("contributor", ["rome"]);
    expect(can(c, "publish", "rome")).toBe(false);
    expect(can(c, "delete", "rome", { ownerUid: "someone-else", isDraft: false })).toBe(false);
    expect(can(c, "delete", "rome", { ownerUid: "u1", isDraft: false })).toBe(false);
  });

  it("lets a Contributor delete only their own drafts", () => {
    const c = user("contributor", ["rome"]);
    expect(can(c, "delete", "rome", { ownerUid: "u1", isDraft: true })).toBe(true);
    expect(can(c, "delete", "rome", { ownerUid: "u2", isDraft: true })).toBe(false);
  });

  it("scopes a Contributor to assigned projects", () => {
    const c = user("contributor", ["rome"]);
    expect(can(c, "draft:write", "rome")).toBe(true);
    expect(can(c, "draft:write", "pompeii")).toBe(false);
    expect(can(c, "project:view", "pompeii")).toBe(false);
  });

  it("scopes Admin to assigned projects but allows publish and soft delete there", () => {
    const a = user("admin", ["rome"]);
    expect(can(a, "publish", "rome")).toBe(true);
    expect(can(a, "delete", "rome", { ownerUid: "x", isDraft: false })).toBe(true);
    expect(can(a, "publish", "pompeii")).toBe(false);
  });

  it("limits project creation, archiving and settings to Super Admin", () => {
    for (const role of ["admin", "contributor"] as const) {
      expect(can(user(role, ["rome"]), "project:create")).toBe(false);
      expect(can(user(role, ["rome"]), "project:archive", "rome")).toBe(false);
      expect(can(user(role, ["rome"]), "settings", "rome")).toBe(false);
    }
    expect(can(user("super_admin"), "project:create")).toBe(true);
    expect(can(user("super_admin"), "settings", "any")).toBe(true);
  });

  it("denies navigation, theme and Our Network edits to Contributors", () => {
    expect(can(user("contributor", ["rome"]), "nav:edit", "rome")).toBe(false);
    expect(can(user("admin", ["rome"]), "nav:edit", "rome")).toBe(true);
  });

  it("restricts who may assign which roles", () => {
    expect(assignableRoles(user("super_admin"))).toEqual(["super_admin", "admin", "contributor"]);
    expect(assignableRoles(user("admin"))).toEqual(["contributor"]);
    expect(assignableRoles(user("contributor"))).toEqual([]);
  });
});

describe("cross-property user management", () => {
  const admin = user("admin", ["rome"]);
  it("lets an Admin manage Contributors only when all their projects are in the Admin's scope", () => {
    expect(canManageUser(admin, { role: "contributor", propertyIds: ["rome"] })).toBe(true);
    expect(canManageUser(admin, { role: "contributor", propertyIds: ["pompeii"] })).toBe(false);
    expect(canManageUser(admin, { role: "contributor", propertyIds: ["rome", "pompeii"] })).toBe(false);
  });
  it("never lets an Admin manage Admins or Super Admins, nor a Contributor anyone", () => {
    expect(canManageUser(admin, { role: "admin", propertyIds: ["rome"] })).toBe(false);
    expect(canManageUser(admin, { role: "super_admin", propertyIds: [] })).toBe(false);
    expect(canManageUser(user("contributor", ["rome"]), { role: "contributor", propertyIds: ["rome"] })).toBe(false);
  });
  it("lets a Super Admin manage anyone", () => {
    expect(canManageUser(user("super_admin"), { role: "admin", propertyIds: ["pompeii"] })).toBe(true);
  });
});

describe("live content detection", () => {
  it("treats a published card with a pending edit as live, so a Contributor cannot delete it", () => {
    expect(isLiveDoc({ status: "published" })).toBe(true);
    expect(isLiveDoc({})).toBe(true); // legacy card without status
    expect(isLiveDoc({ status: "draft" })).toBe(false);
    expect(isLiveDoc({ status: "trashed" })).toBe(false);
    const c = user("contributor", ["rome"]);
    expect(can(c, "delete", "rome", { ownerUid: "u1", isDraft: !isLiveDoc({ status: "published" }) })).toBe(false);
  });
});
