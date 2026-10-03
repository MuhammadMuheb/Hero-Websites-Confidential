import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EmptyState } from "@/components/ui/EmptyState";
import { NoPermission } from "@/components/ui/NoPermission";
import { PageHeader } from "@/components/ui/PageHeader";
import { projectContext } from "@/lib/repo/ctx";

const LISTINGS: Record<string, { title: string; description: string }> = {
  neighbourhoods: { title: "Neighbourhoods", description: "Area pages, each showing its own tours." },
  blog: { title: "Blog", description: "Posts, categories and authors." },
  guides: { title: "Guides and Stories", description: "Short guide cards." },
};

type Params = Promise<{ projectId: string; type: string }>;

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }): Promise<Metadata> {
  const { type } = await params;
  return { title: LISTINGS[type]?.title ?? "Listing" };
}

export default async function ListingPlaceholder({ params }: { params: Params }) {
  const { projectId, type } = await params;
  const listing = LISTINGS[type];
  if (!listing) notFound();
  const ctx = await projectContext(projectId);
  if (ctx.denied) return <NoPermission what="this project" />;
  const { project } = ctx;

  return (
    <>
      <PageHeader title={listing.title} description={listing.description} breadcrumbs={[{ label: project.name, href: `/projects/${project.id}/pages/home` }, { label: "Listings" }, { label: listing.title }]} />
      <EmptyState title="Not available in this release" description="Editing for this listing is planned after the first release. Existing content on the public site is not affected." />
    </>
  );
}
