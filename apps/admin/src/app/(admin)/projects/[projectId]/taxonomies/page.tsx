import type { Metadata } from "next";
import { TaxonomyEditor } from "@/components/workspace/TaxonomyEditor";
import { NoPermission } from "@/components/ui/NoPermission";
import { PageHeader } from "@/components/ui/PageHeader";
import { can } from "@/lib/auth/permissions";
import { projectContext } from "@/lib/repo/ctx";
import { getTaxonomies } from "@/lib/repo/misc";
import { listTours } from "@/lib/repo/tours";

export const metadata: Metadata = { title: "Taxonomies" };

export default async function TaxonomiesPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const ctx = await projectContext(projectId);
  if (ctx.denied) return <NoPermission what="this project" />;
  const { user, project } = ctx;
  const [taxonomies, tours] = await Promise.all([getTaxonomies(project.slug), listTours(project.slug)]);

  return (
    <>
      <PageHeader
        title="Taxonomies"
        description="Managed lists that cards point to. Cards appear on matching category and neighbourhood pages automatically."
        breadcrumbs={[{ label: project.name, href: `/projects/${project.id}` }, { label: "Taxonomies" }]}
      />
      <TaxonomyEditor projectSlug={project.slug} initial={taxonomies} canEdit={can(user, "nav:edit", project.slug)} tours={tours} />
    </>
  );
}
