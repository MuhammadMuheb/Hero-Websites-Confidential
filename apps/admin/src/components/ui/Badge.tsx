import clsx from "clsx";
import type { ContentStatus, ProjectStatus } from "@/lib/types";

type Tone = "green" | "amber" | "blue" | "red" | "grey";

const TONES: Record<Tone, string> = {
  green: "bg-primary-soft text-primary border-primary/25",
  amber: "bg-warning-soft text-warning border-warning/25",
  blue: "bg-info-soft text-info border-info/25",
  red: "bg-danger-soft text-danger border-danger/25",
  grey: "bg-canvas text-ink-muted border-line",
};

export function Badge({ tone = "grey", children }: { tone?: Tone; children: React.ReactNode }) {
  return (
    <span className={clsx("inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium", TONES[tone])}>
      {children}
    </span>
  );
}

const CONTENT: Record<ContentStatus, { label: string; tone: Tone }> = {
  draft: { label: "Draft", tone: "grey" },
  in_review: { label: "In review", tone: "amber" },
  published: { label: "Published", tone: "green" },
  trashed: { label: "Trashed", tone: "red" },
};

const PROJECT: Record<ProjectStatus, { label: string; tone: Tone }> = {
  live: { label: "Live", tone: "green" },
  coming_soon: { label: "Coming soon", tone: "amber" },
  archived: { label: "Archived", tone: "grey" },
};

/** Status always carries text, never colour alone (WCAG). */
export function StatusBadge({ status }: { status: ContentStatus }) {
  const { label, tone } = CONTENT[status];
  return <Badge tone={tone}>{label}</Badge>;
}

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const { label, tone } = PROJECT[status];
  return <Badge tone={tone}>{label}</Badge>;
}
