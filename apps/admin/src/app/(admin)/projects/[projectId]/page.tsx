import type { Metadata } from "next";
import Link from "next/link";
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
import { ThemeForm } from "@/components/workspace/ThemeForm";
import { ToursManager } from "@/components/workspace/ToursManager";
import { can } from "@/lib/auth/permissions";
import { LINK_TARGETS, OUTLINE_IDS, buildOutline, pageForPath } from "@/lib/content/outline";
import { getPageDef } from "@/lib/content/pages";
import { projectOpenUrl } from "@/lib/project-open-url";
import { runPageGate } from "@/lib/publish/gate";
import { listActivity } from "@/lib/repo/activity";
import { gateContext, getPageState } from "@/lib/repo/content";
import { projectContext } from "@/lib/repo/ctx";
import { listRedirects, getTaxonomies } from "@/lib/repo/misc";
import { getNetwork } from "@/lib/repo/properties";
import { listTours } from "@/lib/repo/tours";
import type { ProjectStatus } from "@/lib/types";

export const metadata: Metadata = { title: "Project" };

const STATUS: Record<ProjectStatus, { label: string; tone: ChipTone }> = {
  live: { label: "Live", tone: "green" },
  coming_soon: { label: "Coming soon", tone: "amber" },
  archived: { label: "Archived", tone: "grey" },
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function Heading({ title, note }: { title: string; note?: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-[20px] font-semibold tracking-tight text-ink">{title}</h2>
      {note && <p className="mt-1 max-w-2xl text-[13px] text-ink-muted">{note}</p>}
    </div>
  );
}

const ROW = "flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 last:border-0";
const OUT = "inline-flex h-8 items-center rounded-control border border-line bg-surface px-3 text-[13px] font-medium text-ink hover:bg-canvas";

type Search = { item?: string; category?: string; area?: string };

export default async function ProjectEditor({ params, searchParams }: { params: Promise<{ projectId: string }>; searchParams: Promise<Search> }) {
  const { projectId } = await params;
  const { item: requested, category, area } = await searchParams;
  const ctx = await projectContext(projectId);
  if (ctx.denied) return <NoPermission what="this project" />;
  const { user, project } = ctx;

  const item = requested && OUTLINE_IDS.includes(requested) ? requested : "home";
  const base = `/projects/${project.id}`;
  const liveUrl = projectOpenUrl(project);
  const liveBase = liveUrl ? liveUrl.replace(/\/$/, "") : null;

  // Everything the outline counts comes from the project's own data, read at the same time.
  const [navState, taxonomies, redirects, network, tours] = await Promise.all([getPageState(project, "navigation"), getTaxonomies(project.slug), listRedirects(project.slug), getNetwork(), listTours(project.slug)]);
  const navbarLinks = (navState.draft.data.navbar as { label?: string; href?: string }[]) ?? [];
  const navbarPages = navbarLinks
    .map((l) => ({ label: String(l?.label ?? ""), page: l?.href && !/^[a-z]+:/i.test(l.href) ? pageForPath(l.href) : null }))
    .filter((l): l is { label: string; page: string } => l.label !== "" && l.page !== null);
  const activeTours = tours.filter((t) => t.status !== "trashed");
  const trashed = tours.filter((t) => t.status === "trashed");
  const outline = buildOutline({
    navbarPages,
    navbar: navbarLinks.length,
    footer: ((navState.draft.data.footer as unknown[]) ?? []).length,
    redirects: redirects.length,
    tours: activeTours.length,
    trashed: trashed.length,
    categories: taxonomies.categories.length,
    areas: taxonomies.neighbourhoods.length,
    cities: taxonomies.cities.length + taxonomies.blogCategories.length,
    network: network.length,
  });

  const canPublish = can(user, "publish", project.slug);
  const canLists = can(user, "nav:edit", project.slug);
  const status = STATUS[project.status];
  const def = getPageDef(item);
  const taxonomyTours = tours.map((t) => ({ id: t.id, title: t.title, status: t.status, category: t.category, neighbourhood: t.neighbourhood, city: t.city }));

  let detail: React.ReactNode;

  if (item === "navbar" || item === "footer") {
    const ctxGate = await gateContext(project, "navigation");
    const checks = runPageGate("navigation", navState.draft, ctxGate);
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
  } else if (item === "theme") {
    detail = (
      <>
        <Heading title="Theme and brand" note={`Colours and fonts shown across ${project.name}.`} />
        <ThemeForm projectSlug={project.slug} theme={project.theme} canEdit={canLists} />
      </>
    );
  } else if (item === "seo") {
    // The SEO defaults are the "SEO and contact" block of the Home page: same data, shown on its own.
    const home = getPageDef("home")!;
    const seoDef = { ...home, title: "SEO defaults", sections: home.sections.filter((s) => s.id === "seo") };
    const state = await getPageState(project, "home");
    const gateCtx = await gateContext(project, "home");
    detail = <SectionRows key={`seo-${state.version}-${state.updatedAt}`} projectSlug={project.slug} domain={project.domain} pageSlug="home" def={seoDef} state={state} checks={runPageGate("home", state.draft, gateCtx)} canEdit={can(user, "draft:write", project.slug)} canPublish={canPublish} gateCtx={{ tourSlugs: [...gateCtx.tourSlugs], otherMetaTitles: gateCtx.otherMetaTitles }} />;
  } else if (item === "redirects") {
    detail = (
      <>
        <Heading title="Redirects" note="A permanent redirect is created automatically when the slug of a published card changes, so old links keep working. This list is read only." />
        {redirects.length === 0 ? (
          <EmptyState title="No redirects yet" description="They appear here after a published slug is changed." />
        ) : (
          <div className="overflow-x-auto rounded-card border border-line bg-surface shadow-card">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead className="border-b border-line bg-canvas/60">
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  <th scope="col" className="px-4 py-2.5">From</th>
                  <th scope="col" className="px-2 py-2.5">To</th>
                  <th scope="col" className="px-4 py-2.5">Created</th>
                </tr>
              </thead>
              <tbody>
                {redirects.map((r) => (
                  <tr key={r.from} className="border-b border-line last:border-0">
                    <td className="px-4 py-2.5 font-mono text-xs">{r.from}</td>
                    <td className="px-2 py-2.5 font-mono text-xs">{r.to}</td>
                    <td className="px-4 py-2.5 text-ink-muted">{r.createdAt ? new Date(r.createdAt).toLocaleDateString("en-GB") : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </>
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
      const gateCtx = await gateContext(project, item);
      const checks = runPageGate(item, state.draft, gateCtx);
      const tourOptions = item === "home" ? activeTours.map((t) => ({ slug: t.slug, title: t.title })) : undefined;
      detail = <SectionRows tours={tourOptions} gateCtx={{ tourSlugs: [...gateCtx.tourSlugs], otherMetaTitles: gateCtx.otherMetaTitles }} key={`${item}-${state.version}-${state.updatedAt}`} projectSlug={project.slug} domain={project.domain} pageSlug={item} def={def} state={state} checks={checks} canEdit={can(user, "draft:write", project.slug)} canPublish={canPublish} />;
    }
  } else if (item === "tours") {
    detail = <ToursManager key={`${category ?? ""}-${area ?? ""}`} projectSlug={project.slug} projectName={project.name} tours={tours} taxonomies={taxonomies} canPublish={canPublish} embedded initialCategory={category} initialArea={area} />;
  } else if (item === "trash") {
    detail = <ToursManager projectSlug={project.slug} projectName={project.name} tours={tours} taxonomies={taxonomies} canPublish={canPublish} embedded initialStatus="trashed" heading={`Trash (${trashed.length})`} />;
  } else if (item === "neighbourhoods") {
    detail = (
      <>
        <Heading title="Neighbourhoods" note="One page for each area. Each page shows the tours that belong to it. The list of areas is under Taxonomies." />
        {taxonomies.neighbourhoods.length === 0 ? (
          <EmptyState title="No areas yet." description="Add your first area." action={<ButtonLink href={`${base}?item=areas`} variant="primary">Open the list of areas</ButtonLink>} />
        ) : (
          <ul className="rounded-card border border-line bg-surface shadow-card">
            {taxonomies.neighbourhoods.map((a) => {
              const n = activeTours.filter((t) => t.neighbourhood === a).length;
              return (
                <li key={a} className={ROW}>
                  <div>
                    <p className="text-sm font-medium text-ink">{a}</p>
                    <p className="text-xs text-ink-muted">
                      {n} {n === 1 ? "tour" : "tours"} &middot; <span className="font-mono">/neighborhoods/{slugify(a)}</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <ButtonLink href={`${base}?item=tours&area=${encodeURIComponent(a)}`} size="sm">
                      View tours
                    </ButtonLink>
                    {liveBase && (
                      <a href={`${liveBase}/neighborhoods/${slugify(a)}`} target="_blank" rel="noopener noreferrer" className={OUT}>
                        View on site <span aria-hidden="true">&nbsp;&#8599;</span>
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <p className="mt-3 text-[13px] text-ink-muted">
          To add, rename or remove an area, use{" "}
          <Link href={`${base}?item=areas`} className="font-medium text-primary underline-offset-2 hover:underline">
            Areas
          </Link>
          .
        </p>
      </>
    );
  } else if (item === "blog" || item === "guides") {
    const isBlog = item === "blog";
    detail = (
      <>
        <Heading title={isBlog ? "Blog" : "Guides and Stories"} />
        <EmptyState
          title={isBlog ? "Blog posts are not edited here yet" : "Guides and stories are not edited here yet"}
          description="They stay on the live site as they are. Editing them in the admin comes in a later phase."
          action={
            liveBase ? (
              <a href={`${liveBase}/${isBlog ? "blog" : "guides"}`} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 items-center rounded-control border border-line bg-surface px-4 text-sm font-medium hover:bg-canvas">
                View {isBlog ? "the blog" : "the guides"} on the live site <span aria-hidden="true">&nbsp;&#8599;</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : undefined
          }
        />
      </>
    );
  } else if (item === "categories" || item === "areas" || item === "cities") {
    const groups = item === "categories" ? (["categories"] as const) : item === "areas" ? (["neighbourhoods"] as const) : (["cities", "blogCategories"] as const);
    const title = item === "categories" ? "Tour categories" : item === "areas" ? "Areas" : "Cities and blog categories";
    const note = item === "categories" ? "The categories tours belong to. Each has its own page on the site." : item === "areas" ? "The areas tours belong to. Each has its own page on the site." : "The cities tours are in, and the categories blog posts use.";
    detail = (
      <>
        <Heading title={title} note={`${note} A value that tours still use cannot be removed.`} />
        <TaxonomyEditor key={item} projectSlug={project.slug} initial={taxonomies} canEdit={canLists} tours={taxonomyTours} only={[...groups]} />
      </>
    );
  } else if (item === "network") {
    detail = (
      <>
        <Heading title="Network sites" note="Every project that is not archived and has an address is listed here, and in the navbar dropdown and the footer of every site. The list builds itself: change a project's status or address in its Project settings." />
        {network.length === 0 ? (
          <EmptyState title="No sites in the network yet" description="A project joins when it has an address and is not archived." />
        ) : (
          <ul className="rounded-card border border-line bg-surface shadow-card">
            {network.map((n) => (
              <li key={n.publicUrl} className={ROW}>
                <span className="text-sm font-medium text-ink">{n.name}</span>
                <a href={n.publicUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-primary underline-offset-2 hover:underline">
                  {n.publicUrl}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  } else {
    const rows = await listActivity(user, project.slug);
    detail = (
      <>
        <Heading title="Audit log" note="Every change made in this project, newest first. Read only." />
        {rows.length === 0 ? (
          <EmptyState title="No changes recorded yet" description="Changes appear here as soon as someone saves or publishes." />
        ) : (
          <div className="overflow-x-auto rounded-card border border-line bg-surface shadow-card">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead className="border-b border-line bg-canvas/60">
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  <th scope="col" className="px-4 py-2.5">When</th>
                  <th scope="col" className="px-2 py-2.5">Who</th>
                  <th scope="col" className="px-2 py-2.5">Action</th>
                  <th scope="col" className="px-4 py-2.5">What</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b border-line align-top last:border-0">
                    <td className="whitespace-nowrap px-4 py-2.5 text-ink-muted">{r.when ? new Date(r.when).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }) : "-"}</td>
                    <td className="px-2 py-2.5">{r.who}</td>
                    <td className="px-2 py-2.5">
                      <Chip tone={r.action === "delete" ? "red" : r.action === "publish" ? "green" : "grey"}>{r.action || "update"}</Chip>
                    </td>
                    <td className="px-4 py-2.5 text-ink-muted">{r.summary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
