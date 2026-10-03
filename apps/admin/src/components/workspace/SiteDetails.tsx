"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { TextField } from "./fields";

interface FieldDef {
  key: string;
  label: string;
  hint?: string;
  max: number;
  long?: boolean;
  /** Returns a message when the value is not acceptable. */
  check: (value: string) => string | null;
}

const required = (v: string) => (v.trim() === "" ? "This cannot be empty." : null);
const target = (v: string) => {
  const t = v.trim();
  if (t.startsWith("/") && !t.startsWith("//")) return t === t.toLowerCase() ? null : "Site paths are lower case, for example /tours.";
  return /^(https:\/\/|mailto:|tel:)\S+$/i.test(t) ? null : "Use a site path like /tours, or a full https:// address.";
};

/** The single values of the header and the footer: what they say, and where the button goes. */
const FIELDS: Record<"navbar" | "footer", { title: string; note: string; fields: FieldDef[] }> = {
  navbar: {
    title: "Header",
    note: "The name at the left of the header (also used in the footer's copyright line) and the button at the right.",
    fields: [
      { key: "siteTitle", label: "Site title", max: 60, check: required },
      { key: "ctaLabel", label: "Button text", max: 30, check: required },
      { key: "ctaHref", label: "Button opens", hint: "A page path such as /tours, or a full https:// address.", max: 300, check: target },
    ],
  },
  footer: {
    title: "Contact column and bottom line",
    note: "The details under Contact Us and the line at the very bottom of the footer.",
    fields: [
      { key: "contactEmail", label: "Contact email", max: 120, check: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? null : "Enter a valid email address.") },
      { key: "contactLines", label: "Lines under the email", hint: "One line per row. Up to 6.", max: 720, long: true, check: (v) => (v.split("\n").filter((l) => l.trim()).length > 6 ? "Use at most 6 lines." : null) },
      { key: "contactBadge", label: "Small badge", max: 80, check: () => null },
      { key: "bottomNote", label: "Bottom line", max: 300, long: true, check: () => null },
    ],
  },
};

/** What is stored for a field: the lines of the contact column are a list, the rest are text. */
const toText = (v: unknown): string => (Array.isArray(v) ? v.map(String).join("\n") : typeof v === "string" ? v : "");
const toStored = (key: string, text: string): unknown => (key === "contactLines" ? text.split("\n").map((l) => l.trim()).filter(Boolean) : text.trim());

export function SiteDetails({ kind, initial, canEdit, onSave }: { kind: "navbar" | "footer"; initial: Record<string, unknown>; canEdit: boolean; onSave: (patch: Record<string, unknown>) => Promise<boolean> }) {
  const def = FIELDS[kind];
  const start = Object.fromEntries(def.fields.map((f) => [f.key, toText(initial[f.key])]));
  const [saved, setSaved] = useState<Record<string, string>>(start);
  const [values, setValues] = useState<Record<string, string>>(start);
  const [busy, setBusy] = useState(false);

  const problems = Object.fromEntries(def.fields.map((f) => [f.key, f.check(values[f.key] ?? "")]));
  const dirty = def.fields.some((f) => (values[f.key] ?? "").trim() !== (saved[f.key] ?? "").trim());
  const invalid = def.fields.some((f) => problems[f.key] !== null);

  const save = async () => {
    setBusy(true);
    const patch = Object.fromEntries(def.fields.map((f) => [f.key, toStored(f.key, values[f.key] ?? "")]));
    const ok = await onSave(patch);
    setBusy(false);
    if (ok) {
      const next = Object.fromEntries(def.fields.map((f) => [f.key, (values[f.key] ?? "").trim()]));
      setValues(next);
      setSaved(next);
    }
  };

  return (
    <section className="mb-4 rounded-card border border-line bg-surface p-5 shadow-card">
      <h3 className="text-sm font-semibold text-ink">{def.title}</h3>
      <p className="mb-4 text-xs text-ink-muted">{def.note}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {def.fields.map((f) => (
          <div key={f.key} className={f.long ? "sm:col-span-2" : undefined}>
            <TextField label={f.label} value={values[f.key] ?? ""} max={f.max} long={f.long} rows={3} hint={f.hint} readOnly={!canEdit} onChange={(v) => setValues((s) => ({ ...s, [f.key]: v }))} />
            {(values[f.key] ?? "").trim() !== (saved[f.key] ?? "").trim() && problems[f.key] && (
              <p role="alert" className="mt-1 text-xs text-danger">
                {problems[f.key]}
              </p>
            )}
          </div>
        ))}
      </div>
      {canEdit && (
        <div className="mt-4 flex items-center gap-3 border-t border-line pt-4">
          <Button variant="primary" disabled={busy || !dirty || invalid} onClick={save}>
            {busy ? "Saving..." : "Save"}
          </Button>
          <span className="text-[13px] text-ink-muted">{dirty ? "You have changes that are not saved yet." : "Everything is saved."}</span>
        </div>
      )}
    </section>
  );
}
