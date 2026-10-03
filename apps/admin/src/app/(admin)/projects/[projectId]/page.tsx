import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { NoPermission } from "@/components/ui/NoPermission";
import { PageHeader } from "@/components/ui/PageHeader";
import { getPageState } from "@/lib/repo/content";
import { projectContext } from "@/lib/repo/ctx";
import { projectOpenUrl } from "@/lib/project-open-url";
import type { IconName, PageState } from "@/lib/types";

export const metadata: Metadata = { title: "Project" };

type Params = Promise<{ projectId: string }>;

function StatusBadge({ state, dirty }: { state: PageState; dirty?: boolean }) {
  if (dirty) return <Badge tone="amber">Unsaved draft</Badge>;
  return state.status === "published" ? <Badge tone="green">Live</Badge> : <Badge tone="grey">Draft</Badge>;
}

interface BlockProps {
  icon: IconName;
  title: string;
  summary: string;
  href: string;
  status?: React.ReactNode;
  children?: React.ReactNode;
}

/** One top-level block of the site. Its button leads to the items inside it. */
function Block({ icon, title, summary, href, status, children }: BlockProps) {
  return (
    <section className="flex flex-col rounded-card border border-line bg-surface p-5 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-control bg-primary-soft text-primary">
          <Icon name={icon} size={20} />
        </span>
        {status}
      </div>
      <h2 className="mt-4 text-base font-semibold text-ink">{title}</h2>
      <p className="mt-1 text-[13px] text-ink-muted">{summary}</p>
      {children && <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px]">{children}</div>}
      <div className="mt-auto pt-5">
        <ButtonLink href={href} variant="primary" size="sm">
          <Icon name="pencil" size={14} /> Edit {title.toLowerCase()}
        </ButtonLink>
      </div>
    </section>
  );
}

const SUB_LINK = "text-primary underline-offset-2 hover:underline";

export default async function ProjectOverview({ params }: { params: Params }) {
  const { projectId } = await params;
  const ctx = await projectContext(projectId);
  if (ctx.denied) return <NoPermission what="this project" />;
  const { project } = ctx;
  const base = `/projects/${project.id}`;

  const [home, nav] = await Promise.all([getPageState(project, "home"), getPageState(project, "navigation")]);
  const navbar = ((nav.draft.data.navbar as unknown[]) ?? []).length;
  const footer = ((nav.draft.data.footer as unknown[]) ?? []).length;
  const homeSections = home.draft.layout.filter((l) => l.visible).length;
  const liveUrl = projectOpenUrl(project);

  return (
    <>
      <PageHeader
        title={project.name}
        description="Pick a block to edit. Everything you save here goes straight to the live site."
        actions={
          <>
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-8 items-center gap-1 rounded-control border border-line bg-surface px-3 text-[13px] font-medium text-ink hover:bg-canvas">
                View live site <span aria-hidden="true">&#8599;</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
            <ButtonLink href={`/projects/edit/${project.id}`} size="sm">
              Project settings
            </ButtonLink>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Block icon="menu" title="Navbar" summary={`${navbar} ${navbar === 1 ? "link" : "links"} at the top of every page.`} href={`${base}/global/navbar`} status={<StatusBadge state={nav} />} />
        <Block icon="layout" title="Home page" summary={`${homeSections} sections, from the hero to the contact details.`} href={`${base}/pages/home`} status={<StatusBadge state={home} />} />
        <Block icon="menu" title="Footer" summary={`${footer} ${footer === 1 ? "column" : "columns"} of links at the bottom of every page.`} href={`${base}/global/footer`} status={<StatusBadge state={nav} />} />
        <Block icon="file" title="Other pages" summary="Story, contact details, questions and legal text." href={`${base}/pages/about`}>
          <Link href={`${base}/pages/about`} className={SUB_LINK}>About</Link>
          <Link href={`${base}/pages/contact`} className={SUB_LINK}>Contact</Link>
          <Link href={`${base}/pages/faq`} className={SUB_LINK}>FAQ</Link>
          <Link href={`${base}/pages/legal`} className={SUB_LINK}>Legal</Link>
        </Block>
        <Block icon="tag" title="Tours" summary={`${project.cards} ${project.cards === 1 ? "tour" : "tours"}, with their categories and areas.`} href={`${base}/listings/tours`}>
          <Link href={`${base}/taxonomies`} className={SUB_LINK}>Categories and areas</Link>
        </Block>
        <Block icon="settings" title="Look and SEO" summary="Colours, fonts, search titles and the content import." href={`${base}/global/theme`}>
          <Link href={`${base}/global/theme`} className={SUB_LINK}>Theme and brand</Link>
          <Link href={`${base}/global/seo`} className={SUB_LINK}>SEO defaults</Link>
          <Link href={`${base}/import`} className={SUB_LINK}>Import</Link>
        </Block>
      </div>
    </>
  );
}
