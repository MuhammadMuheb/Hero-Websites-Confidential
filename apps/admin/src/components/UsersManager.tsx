"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { changeRole, deleteUser, inviteUser, setUserPassword, setUserSuspended, updateUserProfile } from "@/app/actions/users";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { EmptyState } from "@/components/ui/EmptyState";
import { Field, Input, Select } from "@/components/ui/Field";
import { Table, Td, Th } from "@/components/ui/Table";
import { useToast } from "@/components/ui/Toast";
import { assignableRoles } from "@/lib/auth/permissions";
import type { AdminUser, Role } from "@/lib/types";

const ROLE_LABEL = { super_admin: "Super Admin", admin: "Admin", contributor: "Contributor" } as const;

interface Props {
  users: AdminUser[];
  projects: { id: string; name: string }[];
  actor: { uid: string; role: Role; propertyIds: string[] };
}

function ProjectPicker({ projects, value, onChange }: { projects: Props["projects"]; value: string[]; onChange: (v: string[]) => void }) {
  if (projects.length === 0) return <p className="text-[13px] text-ink-muted">No projects exist yet.</p>;
  return (
    <fieldset className="space-y-1.5 rounded-control border border-line p-3">
      <legend className="px-1 text-[13px] font-medium">Assigned projects</legend>
      {projects.map((p) => (
        <label key={p.id} className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={value.includes(p.id)} onChange={(e) => onChange(e.target.checked ? [...value, p.id] : value.filter((x) => x !== p.id))} />
          {p.name}
        </label>
      ))}
    </fieldset>
  );
}

export function UsersManager({ users, projects, actor }: Props) {
  const router = useRouter();
  const { notify } = useToast();
  const [pending, startTransition] = useTransition();
  const roles = useMemo(() => assignableRoles({ uid: actor.uid, role: actor.role, propertyIds: actor.propertyIds, email: "", displayName: "" }), [actor.uid, actor.role, actor.propertyIds]);
  const scopable = useMemo(() => (actor.role === "super_admin" ? projects : projects.filter((p) => actor.propertyIds.includes(p.id))), [actor.role, actor.propertyIds, projects]);
  const projectNames = useMemo(() => new Map(projects.map((p) => [p.id, p.name])), [projects]);

  const [inviteOpen, setInviteOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState<Role>(roles[roles.length - 1] ?? "contributor");
  const [propertyIds, setPropertyIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);

  const [editing, setEditing] = useState<AdminUser | null>(null);
  const [editRole, setEditRole] = useState<Role>("contributor");
  const [editProjects, setEditProjects] = useState<string[]>([]);

  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  const openEdit = (u: AdminUser) => {
    setEditing(u);
    setEditRole(u.role);
    setEditProjects(u.propertyIds);
    setEditName(u.displayName);
    setEditEmail(u.email);
    setNewPassword("");
    setConfirmEmail("");
    setError(null);
  };

  const failMessage = (r: { error: string; issues?: string[] }) => `${r.error} ${r.issues?.join("; ") ?? ""}`.trim();

  const canManage = (u: AdminUser) => u.id !== actor.uid && roles.includes(u.role);

  return (
    <>
      <div className="mb-3 flex justify-end">
        {roles.length > 0 && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setInviteOpen(true);
              setLink(null);
              setError(null);
            }}
          >
            + Invite user
          </Button>
        )}
      </div>

      {users.length === 0 ? (
        <EmptyState title="No users to show" description="Invite the first user to give them access." />
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>User</Th>
              <Th>Role</Th>
              <Th>Projects</Th>
              <Th>Status</Th>
              <Th>Last sign-in</Th>
              <Th>
                <span className="sr-only">Actions</span>
              </Th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <Td>
                  <span className="font-medium">{u.displayName}</span>
                  <span className="block text-xs text-ink-muted">{u.email}</span>
                </Td>
                <Td>
                  <Badge tone={u.role === "super_admin" ? "green" : u.role === "admin" ? "blue" : "grey"}>{ROLE_LABEL[u.role]}</Badge>
                </Td>
                <Td className="text-ink-muted">{u.role === "super_admin" ? "All projects" : u.propertyIds.length === 0 ? "None" : u.propertyIds.map((id) => projectNames.get(id) ?? id).join(", ")}</Td>
                <Td>
                  <Badge tone={u.status === "active" ? "green" : "red"}>{u.status === "active" ? "Active" : "Suspended"}</Badge>
                </Td>
                <Td className="whitespace-nowrap text-ink-muted">{u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString("en-GB", { dateStyle: "short", timeStyle: "short" }) : "Never"}</Td>
                <Td>{canManage(u) && <Button size="sm" onClick={() => openEdit(u)}>Manage</Button>}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Drawer open={inviteOpen} title="Invite user" onClose={() => setInviteOpen(false)}>
        {link ? (
          <div className="space-y-3">
            <p>The user was created. Send them this one-time link so they can choose their own password. It is shown only now.</p>
            <textarea readOnly aria-label="Password setup link" value={link} rows={5} className="w-full rounded-control border border-line bg-canvas p-2 font-mono text-xs" onFocus={(e) => e.currentTarget.select()} />
            <div className="flex gap-2">
              <Button
                variant="primary"
                onClick={async () => {
                  await navigator.clipboard.writeText(link).catch(() => undefined);
                  notify("Link copied");
                }}
              >
                Copy link
              </Button>
              <Button onClick={() => setInviteOpen(false)}>Done</Button>
            </div>
          </div>
        ) : (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setError(null);
              startTransition(async () => {
                const r = await inviteUser({ email, displayName, role, propertyIds });
                if (!r.ok) return setError(`${r.error} ${r.issues?.join("; ") ?? ""}`.trim());
                setLink(r.data.setupLink);
                setEmail("");
                setDisplayName("");
                setPropertyIds([]);
                router.refresh();
              });
            }}
          >
            <Field label="Name" htmlFor="inv-name">
              <Input id="inv-name" required value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            </Field>
            <Field label="Email" htmlFor="inv-email">
              <Input id="inv-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </Field>
            <Field label="Role" htmlFor="inv-role">
              <Select id="inv-role" value={role} onChange={(e) => setRole(e.target.value as Role)}>
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {ROLE_LABEL[r]}
                  </option>
                ))}
              </Select>
            </Field>
            {role !== "super_admin" && <ProjectPicker projects={scopable} value={propertyIds} onChange={setPropertyIds} />}
            {error && (
              <p role="alert" className="rounded-control bg-danger-soft px-3 py-2 text-[13px] text-danger">
                {error}
              </p>
            )}
            <Button type="submit" variant="primary" disabled={pending}>
              {pending ? "Inviting..." : "Send invitation"}
            </Button>
          </form>
        )}
      </Drawer>

      <Drawer open={editing !== null} title={editing ? `Manage ${editing.displayName}` : ""} onClose={() => setEditing(null)}>
        {editing && (
          <div className="space-y-4">
            <section className="space-y-3 border-b border-line pb-4">
              <h3 className="text-[13px] font-semibold">Details</h3>
              <Field label="Name" htmlFor="ed-name">
                <Input id="ed-name" value={editName} onChange={(e) => setEditName(e.target.value)} />
              </Field>
              <Field label="Email" htmlFor="ed-email" hint={actor.role === "super_admin" ? "Changing the email signs the user out everywhere." : "Only a Super Admin can change the email."}>
                <Input id="ed-email" type="email" value={editEmail} disabled={actor.role !== "super_admin"} onChange={(e) => setEditEmail(e.target.value)} />
              </Field>
              <Button
                disabled={pending || (editName === editing.displayName && editEmail === editing.email)}
                onClick={() =>
                  startTransition(async () => {
                    setError(null);
                    const r = await updateUserProfile(editing.id, { displayName: editName, email: editEmail });
                    if (!r.ok) return setError(failMessage(r));
                    notify("Details saved");
                    setEditing(null);
                    router.refresh();
                  })
                }
              >
                Save details
              </Button>
            </section>

            <section className="space-y-3 border-b border-line pb-4">
              <h3 className="text-[13px] font-semibold">Password</h3>
              <Field label="New password" htmlFor="ed-pass" hint="At least 12 characters. Takes effect at once and signs the user out everywhere. Share it with them over a private channel.">
                <Input id="ed-pass" type="password" autoComplete="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </Field>
              <Button
                disabled={pending || newPassword.length === 0}
                onClick={() =>
                  startTransition(async () => {
                    setError(null);
                    const r = await setUserPassword(editing.id, newPassword);
                    if (!r.ok) return setError(failMessage(r));
                    setNewPassword("");
                    notify("Password updated");
                  })
                }
              >
                Update password
              </Button>
            </section>

            <Field label="Role" htmlFor="ed-role" hint="A role change takes effect immediately: the user is signed out everywhere.">
              <Select id="ed-role" value={editRole} onChange={(e) => setEditRole(e.target.value as Role)}>
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {ROLE_LABEL[r]}
                  </option>
                ))}
              </Select>
            </Field>
            {editRole !== "super_admin" && <ProjectPicker projects={scopable} value={editProjects} onChange={setEditProjects} />}
            {error && (
              <p role="alert" className="rounded-control bg-danger-soft px-3 py-2 text-[13px] text-danger">
                {error}
              </p>
            )}
            <div className="flex flex-wrap justify-between gap-2 border-t border-line pt-4">
              <Button
                variant={editing.status === "active" ? "danger" : "secondary"}
                disabled={pending}
                onClick={() =>
                  startTransition(async () => {
                    const r = await setUserSuspended(editing.id, editing.status === "active");
                    if (!r.ok) return setError(r.error);
                    notify(editing.status === "active" ? "User suspended" : "User reactivated");
                    setEditing(null);
                    router.refresh();
                  })
                }
              >
                {editing.status === "active" ? "Suspend user" : "Reactivate user"}
              </Button>
              <Button
                variant="primary"
                disabled={pending}
                onClick={() =>
                  startTransition(async () => {
                    const r = await changeRole(editing.id, editRole, editRole === "super_admin" ? [] : editProjects);
                    if (!r.ok) return setError(r.error);
                    notify("Role updated");
                    setEditing(null);
                    router.refresh();
                  })
                }
              >
                Save changes
              </Button>
            </div>

            <section className="space-y-3 rounded-control border border-danger/40 p-3">
              <h3 className="text-[13px] font-semibold text-danger">Delete user</h3>
              <p className="text-[13px] text-ink-muted">Permanently removes the account from sign-in and the database. Access ends immediately. This cannot be undone.</p>
              <Field label={`Type ${editing.email} to confirm`} htmlFor="ed-confirm">
                <Input id="ed-confirm" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} autoComplete="off" />
              </Field>
              <Button
                variant="danger"
                disabled={pending || confirmEmail.trim().toLowerCase() !== editing.email.toLowerCase()}
                onClick={() =>
                  startTransition(async () => {
                    setError(null);
                    const r = await deleteUser(editing.id, confirmEmail);
                    if (!r.ok) return setError(failMessage(r));
                    notify("User deleted");
                    setEditing(null);
                    router.refresh();
                  })
                }
              >
                Delete user permanently
              </Button>
            </section>
          </div>
        )}
      </Drawer>
    </>
  );
}
