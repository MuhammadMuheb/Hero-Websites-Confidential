import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { NoPermission } from "@/components/ui/NoPermission";
import { projectContext } from "@/lib/repo/ctx";

/**
 * Wraps every screen of a project. The only navigation of a project is the outline on its editor page; the other
 * routes (pages, global items, tours, taxonomies, import) still open as full pages for bookmarks and links.
 */
export default async function WorkspaceLayout({ children, params }: { children: ReactNode; params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const ctx = await projectContext(projectId);
  if (ctx.denied) return <NoPermission what="this project" />;
  const { project } = ctx;

  if (project.status === "archived") {
    return (
      <EmptyState
        title={`${project.name} is archived`}
        description="Archived projects are read-only and hidden from Our Network. A Super Admin can set the status back in Project settings."
        action={
          <ButtonLink href="/projects" variant="primary">
            Back to projects
          </ButtonLink>
        }
      />
    );
  }

  return <>{children}</>;
}
