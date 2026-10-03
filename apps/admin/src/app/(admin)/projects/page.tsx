import type { Metadata } from "next";
import { Suspense } from "react";
import { ProjectsTable } from "@/components/ProjectsTable";
import { PageHeader } from "@/components/ui/PageHeader";
import { can } from "@/lib/auth/permissions";
import { requireUser } from "@/lib/auth/session";
import { projectOpenUrl } from "@/lib/project-open-url";
import { listProjects } from "@/lib/repo/properties";

export const metadata: Metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const user = await requireUser();
  const projects = await listProjects(user);
  // The link target is worked out here (it needs server settings); the table only renders it.
  const rows = projects.map((p) => ({ ...p, openUrl: projectOpenUrl(p) }));

  return (
    <>
      <PageHeader title="Projects" description="All websites in one place. Open a project to edit its pages and cards." />
      <Suspense fallback={<div className="h-64 animate-pulse rounded-card bg-line/40" aria-hidden="true" />}>
        <ProjectsTable rows={rows} canCreate={can(user, "project:create")} canManage={can(user, "project:archive")} />
      </Suspense>
    </>
  );
}
