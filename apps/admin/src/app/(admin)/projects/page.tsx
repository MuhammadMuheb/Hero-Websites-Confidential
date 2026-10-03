import type { Metadata } from "next";
import { DeleteProjectButton } from "@/components/DeleteProjectButton";
import { ProjectNameLink } from "@/components/ProjectNameLink";
import { ProjectStatusBadge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { can } from "@/lib/auth/permissions";
import { requireUser } from "@/lib/auth/session";
import { listProjects } from "@/lib/repo/properties";

export const metadata: Metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const user = await requireUser();
  const projects = await listProjects(user);
  const canCreate = can(user, "project:create");
  const canManage = can(user, "project:archive");

  return (
    <>
      <PageHeader
        title="Projects"
        description="All websites in one place. Open a project to edit its pages and cards. Super Admin creates, edits and deletes projects; everyone else sees only what they are assigned."
        actions={canCreate ? <ButtonLink href="/projects/new" variant="primary">+ New project</ButtonLink> : undefined}
      />

      {projects.length === 0 ? (
        <EmptyState
          title="No projects to show"
          description={canCreate ? "Create your first project to get started." : "You have not been assigned to any project yet. Ask a Super Admin."}
          action={canCreate ? <ButtonLink href="/projects/new" variant="primary">+ New project</ButtonLink> : undefined}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((p) => (
            <Card key={p.id}>
              {/* The name opens the live site in a new tab; Open below goes to the project's editor pages. */}
              <h2 className="break-words text-base font-semibold">
                <ProjectNameLink project={p} />
              </h2>
              <p className="break-words text-[13px] text-ink-muted">{p.domain || "No domain set"}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <ProjectStatusBadge status={p.status} />
                <span className="text-[13px] text-ink-muted">{p.cards} cards</span>
              </div>
              <p className="mt-1 text-xs text-ink-muted">{p.lastEdit ? `Last edit ${new Date(p.lastEdit).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}` : "No edits yet"}</p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <ButtonLink href={`/projects/${p.id}`} variant="primary" size="sm">
                  Open
                </ButtonLink>
                {canManage && (
                  <>
                    <ButtonLink href={`/projects/edit/${p.id}`} size="sm">
                      Edit
                    </ButtonLink>
                    <DeleteProjectButton slug={p.id} name={p.name} status={p.status} cards={p.cards} />
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
