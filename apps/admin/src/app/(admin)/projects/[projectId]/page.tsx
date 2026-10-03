import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Chip, type ChipTone } from "@/components/ui/Chip";
import { EmptyState } from "@/components/ui/EmptyState";
import { NoPermission } from "@/components/ui/NoPermission";
import { PageHeader } from "@/components/ui/PageHeader";
import { LinkRows } from "@/components/workspace/LinkRows";
import { ProjectSettingsButton } from "@/components/workspace/ProjectSettingsButton";
import { SectionRows } from "@/components/workspace/SectionRows";
import { SiteOutline } from "@/components/workspace/SiteOutline";
import { TaxonomyEditor } from "@/components/workspace/TaxonomyEditor";
import { ToursManager } from "@/components/workspace/ToursManager";
import { can } from "@/lib/auth/permissions";
import { LINK_TARGETS, OUTLINE_IDS, buildOutline } from "@/lib/content/outline";
import { getPageDef } from "@/lib/content/pages";
import { projectOpenUrl } from "@/lib/project-open-url";
import { gateFor, getPageState } from "@/lib/repo/content";
import { projectContext } from "@/lib/repo/ctx";
import { getTaxonomies } from "@/lib/repo/misc";
import { listTours } from "@/lib/repo/tours";
import type { ProjectStatus } from "@/lib/types";

export const metadata: Metadata = { title: "Project" };

const STATUS: Record<ProjectStatus, { label: string; tone: ChipTone }> = {
  live: { label: "Live", tone: "green" },
  coming_soon: { label: "Coming soon", tone: "amber" },
  archived: { label: "Archived", tone: "grey" },
};

const LOOK_ROWS = [
  { title: "Theme and brand", note: "Colours and fonts shown across the site.", path: "global/theme" },
  { title: "SEO defaults", note: "The Home page title, description and sharing image.", path: "global/seo" },
  { title: "Content import", note: "Fill the project from a content file.", path: "import" },
];

export default async function ProjectEditor({ params, searchParams }: { params: Promise<{ projectId: string }>; searchParams: Promise<{ item?: string }> }) {
  const { projectId } = await params;
  const { item: requested } = await searchParams;
  const ctx = await projectContext(projectId);
  if (ctx.denied) return <NoPermission what="this project" />;
  const { user, project } = ctx;

  const item = requested && OUTLINE_IDS.includes(requested) ? requested : "home";
  const base = `/projects/${project.id}`;
  const liveUrl = projectOpenUrl(project);

  // Counts for the outline come from the project's own data.
  const [navState, taxonomies] = await Promise.all([getPageState(project, "navigation"), getTaxonomies(project.slug)]);
  const navbarCount = ((navState.draft.data.navbar as unknown[]) ?? []).length;
  const footerCount = ((navState.draft.data.footer as unknown[]) ?? []).length;
  const outline = buildOutline({ navbar: navbarCount, footer: footerCount, tours: project.cards, areas: taxonomies.neighbourhoods.length });

  const canPublish = can(user, "publish", project.slug);
  const status = STATUS[project.status];

  let detail: React.ReactNode;
  const def = getPageDef(item);

  if (item === "navbar" || item === "footer") {
    const checks = await gateFor(project, "navigation", navState.draft);
    detail = (
      <LinkRows
        key={`${item}-${navState.version}-${navState.updatedAt}`}
        projectSlug={project.slug}
        kind={item}
        state={navState}
        checks={checks}
        canEdit={can(user, "nav:edit", project.slug)}
        canPublish={canPublish}
        pages={LINK_TARGETS}
        automatic={
          item === "navbar"
            ? [
                { label: "Tours & Blog", note: "From your tours and posts" },
                { label: "Our Network", note: "From live projects" },
              ]
            : [
                { label: "Our Network", note: "From live projects" },
                { label: "Contact details", note: "From the project settings" },
              ]
        }
      />
    );
  } else if (def) {
    if (item !== "home" && !project.domain) {
      detail = (
        <EmptyState
          title="Set the project domain first"
          description="Pages other than Home are stored under the project's domain. Add it in Project settings."
          action={
            <ButtonLink href={`/projects/edit/${project.id}`} variant="primary">
              Open project settings
            </ButtonLink>
          }
        />
      );
    } else {
      const state = await getPageState(project, item);
      const checks = await gateFor(project, item, state.draft);
      detail = <SectionRows key={`${item}-${state.version}-${state.updatedAt}`} projectSlug={project.slug} domain={project.domain} pageSlug={item} def={def} state={state} checks={checks} canEdit={can(user, "draft:write", project.slug)} canPublish={canPublish} />;
    }
  } else if (item === "tours") {
    const tours = await listTours(project.slug);
    detail = <ToursManager projectSlug={project.slug} projectName={project.name} tours={tours} taxonomies={taxonomies} canPublish={canPublish} embedded />;
  } else if (item === "neighbourhoods") {
    detail = (
      <>
        <h2 className="mb-1 text-[20px] font-semibold tracking-tight text-ink">Neighbourhoods</h2>
        <p className="mb-4 max-w-2xl text-[13px] text-ink-muted">Areas, categories and cities that tours point to. Tours appear on the matching pages automatically.</p>
        <TaxonomyEditor projectSlug={project.slug} initial={taxonomies} canEdit={can(user, "nav:edit", project.slug)} />
      </>
    );
  } else if (item === "blog") {
    detail = (
      <>
        <h2 className="mb-1 text-[20px] font-semibold tracking-tight text-ink">Blog</h2>
        <EmptyState
          title="Blog posts and guides are not edited here yet"
          description="They stay on the live site as they are. Editing them in the admin comes in a later phase."
          action={
            liveUrl ? (
              <a href={`${liveUrl.replace(/\/$/, "")}/blog`} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 items-center rounded-control border border-line bg-surface px-4 text-sm font-medium hover:bg-canvas">
                View the blog on the live site <span aria-hidden="true">&nbsp;&#8599;</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : undefined
          }
        />
      </>
    );
  } else {
    detail = (
      <>
        <h2 className="mb-4 text-[20px] font-semibold tracking-tight text-ink">Theme, SEO and Import</h2>
        <ul className="rounded-card border border-line bg-surface shadow-card">
          {LOOK_ROWS.map((r) => (
            <li key={r.path} className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 last:border-0">
              <div>
                <p className="text-sm font-medium text-ink">{r.title}</p>
                <p className="text-xs text-ink-muted">{r.note}</p>
              </div>
              <ButtonLink href={`${base}/${r.path}`} variant="primary" size="sm">
                Open
              </ButtonLink>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={project.name}
        badge={<Chip tone={status.tone}>{status.label}</Chip>}
        breadcrumbs={[{ label: "Projects", href: "/projects" }, { label: project.name }]}
        actions={
          <>
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-8 items-center gap-1 rounded-control border border-line bg-surface px-3 text-[13px] font-medium text-ink hover:bg-canvas">
                View live site <span aria-hidden="true">&#8599;</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
            {can(user, "project:archive") && <ProjectSettingsButton project={project} />}
          </>
        }
      />
      {!liveUrl && <p className="-mt-3 mb-4 text-[13px] text-warning">No address set. Add a public URL in Project settings.</p>}

      <div className="grid gap-6 lg:grid-cols-[232px_minmax(0,1fr)]">
        <SiteOutline groups={outline} selected={item} base={base} />
        <div className="min-w-0">{detail}</div>
      </div>
    </>
  );
}
