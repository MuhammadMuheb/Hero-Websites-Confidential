import type { Metadata } from "next";
import { ToursManager } from "@/components/workspace/ToursManager";
import { NoPermission } from "@/components/ui/NoPermission";
import { can } from "@/lib/auth/permissions";
import { projectContext } from "@/lib/repo/ctx";
import { getTaxonomies } from "@/lib/repo/misc";
import { listTours } from "@/lib/repo/tours";

export const metadata: Metadata = { title: "Tours" };

export default async function ToursPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const ctx = await projectContext(projectId);
  if (ctx.denied) return <NoPermission what="this project" />;
  const { user, project } = ctx;
  const [tours, taxonomies] = await Promise.all([listTours(project.slug), getTaxonomies(project.slug)]);
  return <ToursManager projectSlug={project.slug} projectName={project.name} tours={tours} taxonomies={taxonomies} canPublish={can(user, "publish", project.slug)} />;
}
