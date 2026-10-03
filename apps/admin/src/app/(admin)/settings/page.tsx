import type { Metadata } from "next";
import { DeleteProjectButton } from "@/components/DeleteProjectButton";
import { ProjectNameLink } from "@/components/ProjectNameLink";
import { UsersManager } from "@/components/UsersManager";
import { ProjectStatusBadge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { NoPermission } from "@/components/ui/NoPermission";
import { PageHeader } from "@/components/ui/PageHeader";
import { Table, Td, Th } from "@/components/ui/Table";
import { Tabs } from "@/components/ui/Tabs";
import { can } from "@/lib/auth/permissions";
import { requireUser } from "@/lib/auth/session";
import { getNetwork, listProjectSummaries } from "@/lib/repo/properties";
import { listUsers } from "@/lib/repo/misc";

export const metadata: Metadata = { title: "Settings" };

const TABS = [
  { id: "users", label: "Users & roles" },
  { id: "projects", label: "Projects" },
  { id: "network", label: "Our Network" },
  { id: "integrations", label: "Integrations" },
];

export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const { tab } = await searchParams;
  const user = await requireUser();
  // Contributors have no settings; Admin manages contributors, Super Admin everything.
  if (!can(user, "user:manage")) return <NoPermission what="settings" />;

  const active = TABS.some((t) => t.id === tab) ? (tab as string) : "users";
  // The Network and Integrations tabs do not use the project list, and the user list is fetched in
  // parallel with it rather than after it.
  const needsProjects = active === "users" || active === "projects";
  const [projects, users] = await Promise.all([needsProjects ? listProjectSummaries(user) : Promise.resolve([]), active === "users" ? listUsers(user) : Promise.resolve([])]);
  const canManageProjects = can(user, "project:archive");

  return (
    <>
      <PageHeader title="Settings" />
      <Tabs tabs={TABS} active={active} basePath="/settings" />

      {active === "users" && (
        <UsersManager users={users} projects={projects.map((p) => ({ id: p.id, name: p.name }))} actor={{ uid: user.uid, role: user.role, propertyIds: user.propertyIds }} />
      )}

      {active === "projects" &&
        (projects.length === 0 ? (
          <EmptyState title="No projects yet" description="Projects you create or are assigned to are listed here." />
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>Project</Th>
                <Th>Domain</Th>
                <Th>Public URL</Th>
                <Th>Status</Th>
                <Th>
                  <span className="sr-only">Actions</span>
                </Th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id}>
                  <Td className="font-medium">
                    <ProjectNameLink project={p} />
                  </Td>
                  <Td className="text-ink-muted">{p.domain || "-"}</Td>
                  <Td className="font-mono text-xs text-ink-muted">{p.publicUrl || "-"}</Td>
                  <Td>
                    <ProjectStatusBadge status={p.status} />
                  </Td>
                  <Td>
                    {canManageProjects && (
                      <div className="flex items-center gap-2">
                        <ButtonLink href={`/projects/edit/${p.id}`} size="sm">
                          Edit
                        </ButtonLink>
                        <DeleteProjectButton slug={p.id} name={p.name} status={p.status} />
                      </div>
                    )}
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        ))}

      {active === "network" && <NetworkTab />}

      {active === "integrations" && <EmptyState title="No integrations connected" description="Nothing is connected to external services yet." />}
    </>
  );
}

async function NetworkTab() {
  const network = await getNetwork();
  if (network.length === 0) return <EmptyState title="No live projects yet" description="A project appears in Our Network when its status is Live and it has a public URL." />;
  return (
    <Card title={`Our Network (${network.length})`} bodyClassName="p-0">
      <ul className="divide-y divide-line">
        {network.map((n) => (
          <li key={n.publicUrl} className="flex items-center justify-between gap-3 px-4 py-3">
            <span className="font-medium">{n.name}</span>
            <span className="font-mono text-xs text-ink-muted">{n.publicUrl}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
