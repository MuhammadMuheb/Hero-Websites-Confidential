import type { Metadata } from "next";
import { ImportPanel } from "@/components/workspace/ImportPanel";
import { NoPermission } from "@/components/ui/NoPermission";
import { PageHeader } from "@/components/ui/PageHeader";
import { can } from "@/lib/auth/permissions";
import { projectContext } from "@/lib/repo/ctx";

export const metadata: Metadata = { title: "Content import" };

export default async function ImportPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const ctx = await projectContext(projectId);
  if (ctx.denied) return <NoPermission what="this project" />;
  const { user, project } = ctx;

  return (
    <>
      <PageHeader
        title="Content import"
        breadcrumbs={[{ label: project.name, href: `/projects/${project.id}` }, { label: "Tools" }, { label: "Content import" }]}
        description="Upload a content JSON file, review every change field by field, then save it as drafts. Imports never go straight to the live site."
      />
      <ImportPanel projectSlug={project.slug} canEdit={can(user, "draft:write", project.slug)} />
    </>
  );
}
