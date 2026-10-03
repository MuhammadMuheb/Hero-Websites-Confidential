import type { Metadata } from "next";
import { ProjectForm } from "@/components/ProjectForm";
import { NoPermission } from "@/components/ui/NoPermission";
import { PageHeader } from "@/components/ui/PageHeader";
import { can } from "@/lib/auth/permissions";
import { requireUser } from "@/lib/auth/session";

export const metadata: Metadata = { title: "New project" };

export default async function NewProjectPage() {
  const user = await requireUser();
  if (!can(user, "project:create")) return <NoPermission what="creating projects" />;
  return (
    <>
      <PageHeader
        title="New project"
        breadcrumbs={[{ label: "Projects", href: "/projects" }, { label: "New project" }]}
        description="After creating the project you can import a content JSON file, preview it and save it as drafts."
      />
      <ProjectForm />
    </>
  );
}
