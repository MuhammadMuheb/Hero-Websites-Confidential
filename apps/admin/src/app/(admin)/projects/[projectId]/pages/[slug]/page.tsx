import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageEditor } from "@/components/workspace/PageEditor";
import { EmptyState } from "@/components/ui/EmptyState";
import { ButtonLink } from "@/components/ui/Button";
import { NoPermission } from "@/components/ui/NoPermission";
import { can } from "@/lib/auth/permissions";
import { getPageDef } from "@/lib/content/pages";
import { gateFor, getPageState } from "@/lib/repo/content";
import { projectContext } from "@/lib/repo/ctx";

type Params = Promise<{ projectId: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  return { title: getPageDef(slug)?.title ?? "Page" };
}

export default async function PageEditorRoute({ params }: { params: Params }) {
  const { projectId, slug } = await params;
  const def = getPageDef(slug);
  if (!def) notFound();
  const ctx = await projectContext(projectId);
  if (ctx.denied) return <NoPermission what="this project" />;
  const { user, project } = ctx;

  if (slug !== "home" && !project.domain) {
    return (
      <EmptyState
        title="Set the project domain first"
        description="Pages other than Home are stored under the project's domain. A Super Admin can add it in Settings."
        action={user.role === "super_admin" ? <ButtonLink href="/settings?tab=projects" variant="primary">Open settings</ButtonLink> : undefined}
      />
    );
  }

  const state = await getPageState(project, slug);
  const checks = await gateFor(project, slug, state.draft);

  return (
    <PageEditor
      key={`${slug}-${state.version}-${state.updatedAt}`}
      projectSlug={project.slug}
      projectName={project.name}
      pageSlug={slug}
      def={def}
      state={state}
      initialChecks={checks}
      canEdit={can(user, "draft:write", project.slug)}
      canPublish={can(user, "publish", project.slug)}
    />
  );
}
