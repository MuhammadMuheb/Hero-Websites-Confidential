import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { DomainStatus } from "@/components/DomainStatus";
import { ProjectForm } from "@/components/ProjectForm";
import { ProjectNameLink } from "@/components/ProjectNameLink";
import { ProjectStatusBadge } from "@/components/ui/Badge";
import { NoPermission } from "@/components/ui/NoPermission";
import { PageHeader } from "@/components/ui/PageHeader";
import { can } from "@/lib/auth/permissions";
import { requireUser } from "@/lib/auth/session";
import { getProject, slugExists } from "@/lib/repo/properties";

export const metadata: Metadata = { title: "Edit project" };

type Params = Promise<{ projectId: string }>;

/** Project settings: name, domain, public URL, status, contact email, logo and theme, plus delete. Super Admin only. */
export default async function EditProjectPage({ params }: { params: Params }) {
  const { projectId } = await params;
  const user = await requireUser();
  if (!can(user, "settings", projectId)) {
    // A project that exists but is not yours is "no access"; one that does not exist is a 404 for everyone.
    if (await slugExists(projectId)) return <NoPermission what="editing this project" />;
    notFound();
  }

  const project = await getProject(user, projectId);
  if (!project) notFound();

  return (
    <>
      <PageHeader
        title="Edit project"
        breadcrumbs={[{ label: "Projects", href: "/projects" }, { label: project.name }]}
        description="Change the name, domain, public URL, status, contact email, logo and theme. The slug is fixed."
        badge={<ProjectStatusBadge status={project.status} />}
        actions={<ProjectNameLink project={project} className="text-sm font-medium" />}
      />
      {/* The check can take a few seconds when a domain is slow, so the form must not wait for it. */}
      <div className="mb-6">
        <Suspense fallback={<p className="max-w-2xl rounded-control border border-line bg-surface px-3 py-2 text-[13px] text-ink-muted">Checking the domain...</p>}>
          <DomainStatus domain={project.domain} />
        </Suspense>
      </div>
      <ProjectForm project={project} />
    </>
  );
}
