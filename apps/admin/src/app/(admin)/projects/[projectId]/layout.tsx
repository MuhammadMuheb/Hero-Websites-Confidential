import type { ReactNode } from "react";
import { WorkspaceTree } from "@/components/workspace/WorkspaceTree";
import { ProjectStatusBadge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { NoPermission } from "@/components/ui/NoPermission";
import { projectOpenUrl } from "@/lib/project-open-url";
import { projectContext } from "@/lib/repo/ctx";

export default async function WorkspaceLayout({ children, params }: { children: ReactNode; params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const ctx = await projectContext(projectId);
  if (ctx.denied) return <NoPermission what="this project" />;
  const { project } = ctx;

  if (project.status === "archived") {
    return (
      <EmptyState
        title={`${project.name} is archived`}
        description="Archived projects are read-only and hidden from Our Network. A Super Admin can set the status back in Settings."
        action={
          <ButtonLink href="/projects" variant="primary">
            Back to projects
          </ButtonLink>
        }
      />
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
      <WorkspaceTree projectId={project.id} projectName={project.name} badge={<ProjectStatusBadge status={project.status} />} counts={{ "listings/tours": project.cards }} liveUrl={projectOpenUrl(project)} />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
