import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ThemeForm } from "@/components/workspace/ThemeForm";
import { PageEditor } from "@/components/workspace/PageEditor";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { NoPermission } from "@/components/ui/NoPermission";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectStatusBadge } from "@/components/ui/Badge";
import { Table, Td, Th } from "@/components/ui/Table";
import { can } from "@/lib/auth/permissions";
import { NAVIGATION_SECTIONS, getPageDef } from "@/lib/content/pages";
import { gateFor, getPageState } from "@/lib/repo/content";
import { projectContext } from "@/lib/repo/ctx";
import { getNetwork } from "@/lib/repo/properties";
import { listRedirects } from "@/lib/repo/misc";

const TITLES: Record<string, string> = { navbar: "Navbar", footer: "Footer", theme: "Theme and brand", seo: "SEO defaults", redirects: "Redirects", network: "Our Network" };

type Params = Promise<{ projectId: string; item: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { item } = await params;
  return { title: TITLES[item] ?? "Global settings" };
}

export default async function GlobalItemPage({ params }: { params: Params }) {
  const { projectId, item } = await params;
  if (!TITLES[item]) notFound();
  const ctx = await projectContext(projectId);
  if (ctx.denied) return <NoPermission what="this project" />;
  const { user, project } = ctx;
  const crumbs = [{ label: project.name, href: `/projects/${project.id}/pages/home` }, { label: "Global" }, { label: TITLES[item] }];

  if (item === "navbar" || item === "footer") {
    const state = await getPageState(project, "navigation");
    const checks = await gateFor(project, "navigation", state.draft);
    return (
      <PageEditor
        key={`nav-${item}-${state.version}-${state.updatedAt}`}
        projectSlug={project.slug}
        projectName={project.name}
        pageSlug="navigation"
        def={NAVIGATION_SECTIONS}
        onlySection={item}
        breadcrumbGroup="Global"
        state={state}
        initialChecks={checks}
        canEdit={can(user, "nav:edit", project.slug)}
        canPublish={can(user, "publish", project.slug)}
      />
    );
  }

  if (item === "seo") {
    const def = getPageDef("home")!;
    const state = await getPageState(project, "home");
    const checks = await gateFor(project, "home", state.draft);
    return (
      <PageEditor
        key={`seo-${state.version}-${state.updatedAt}`}
        projectSlug={project.slug}
        projectName={project.name}
        pageSlug="home"
        def={def}
        onlySection="seo"
        breadcrumbGroup="Global"
        state={state}
        initialChecks={checks}
        canEdit={can(user, "draft:write", project.slug)}
        canPublish={can(user, "publish", project.slug)}
      />
    );
  }

  if (item === "theme") {
    return (
      <>
        <PageHeader title="Theme and brand" breadcrumbs={crumbs} description={`Colours and fonts shown across ${project.name}.`} />
        <ThemeForm projectSlug={project.slug} theme={project.theme} canEdit={can(user, "nav:edit", project.slug)} />
      </>
    );
  }

  if (item === "redirects") {
    const rows = await listRedirects(project.slug);
    return (
      <>
        <PageHeader title="Redirects" breadcrumbs={crumbs} description="A 301 entry is created automatically when the slug of a published card changes." />
        {rows.length === 0 ? (
          <EmptyState title="No redirects yet" description="They appear here after a published slug is changed." />
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>From</Th>
                <Th>To</Th>
                <Th>Created</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.from}>
                  <Td className="font-mono text-xs">{r.from}</Td>
                  <Td className="font-mono text-xs">{r.to}</Td>
                  <Td className="text-ink-muted">{r.createdAt ? new Date(r.createdAt).toLocaleDateString("en-GB") : "-"}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </>
    );
  }

  // network
  const network = await getNetwork();
  return (
    <>
      <PageHeader title="Our Network" breadcrumbs={crumbs} description="Projects with status Live and a public URL, shown in the navbar dropdown and footer of every site." />
      {network.length === 0 ? (
        <EmptyState title="No live projects yet" description="A project joins the network when a Super Admin sets it to Live with a public URL." />
      ) : (
        <Card bodyClassName="p-0">
          <ul className="divide-y divide-line">
            {network.map((n) => (
              <li key={n.publicUrl} className="flex items-center justify-between gap-3 px-4 py-3">
                <span className="font-medium">{n.name}</span>
                <span className="flex items-center gap-2 font-mono text-xs text-ink-muted">
                  {n.publicUrl}
                  <ProjectStatusBadge status="live" />
                </span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </>
  );
}
