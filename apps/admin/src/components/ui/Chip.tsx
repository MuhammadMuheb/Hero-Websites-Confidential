import clsx from "clsx";
import type { ReactNode } from "react";

export type ChipTone = "green" | "amber" | "blue" | "red" | "grey";

const TONES: Record<ChipTone, string> = {
  green: "bg-primary-soft text-primary border-primary/25",
  amber: "bg-warning-soft text-warning border-warning/25",
  blue: "bg-info-soft text-info border-info/25",
  red: "bg-danger-soft text-danger border-danger/25",
  grey: "bg-canvas text-ink-muted border-line",
};

/** A small status label. It always carries text, so colour is never the only signal. */
export function Chip({ tone = "grey", children, title, className }: { tone?: ChipTone; children: ReactNode; title?: string; className?: string }) {
  return (
    <span title={title} className={clsx("inline-flex items-center whitespace-nowrap rounded-full border px-2 py-0.5 text-xs font-medium", TONES[tone], className)}>
      {children}
    </span>
  );
}
