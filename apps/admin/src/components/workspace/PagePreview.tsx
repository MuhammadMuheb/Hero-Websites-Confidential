"use client";

import clsx from "clsx";
import { useState } from "react";
import type { PageSection } from "@/lib/types";

const DEVICES = [
  { id: "desktop", label: "Desktop", width: "w-full" },
  { id: "tablet", label: "Tablet", width: "w-3/4" },
  { id: "mobile", label: "Mobile", width: "w-1/2" },
] as const;

type DeviceId = (typeof DEVICES)[number]["id"];

/** Wireframe preview of the visible sections, in order. Replaced by a real draft preview later. */
export function PagePreview({ sections }: { sections: PageSection[] }) {
  const [device, setDevice] = useState<DeviceId>("desktop");
  const visible = sections.filter((s) => s.visible);
  const width = DEVICES.find((d) => d.id === device)?.width;

  return (
    <div className="rounded-card border border-line bg-surface shadow-card">
      <div role="group" aria-label="Preview size" className="flex items-center gap-1 border-b border-line p-2">
        {DEVICES.map((d) => (
          <button
            key={d.id}
            type="button"
            aria-pressed={device === d.id}
            onClick={() => setDevice(d.id)}
            className={clsx(
              "rounded-control px-2.5 py-1 text-xs font-medium",
              device === d.id ? "bg-primary-soft text-primary" : "text-ink-muted hover:bg-canvas",
            )}
          >
            {d.label}
          </button>
        ))}
      </div>
      <div className="bg-canvas p-3">
        <div className={clsx("mx-auto space-y-2 rounded-control border border-line bg-surface p-2 transition-all", width)}>
          <div className="h-3 rounded bg-primary-dark/80" aria-hidden="true" />
          {visible.length === 0 && <p className="py-6 text-center text-xs text-ink-muted">All sections are hidden.</p>}
          {visible.map((s, i) => (
            <div
              key={s.id}
              className={clsx("rounded bg-primary-soft px-2 py-1 text-[11px] text-primary", i === 0 ? "h-16" : "h-9")}
            >
              {s.label}
            </div>
          ))}
          <div className="h-5 rounded bg-primary-dark/80" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
