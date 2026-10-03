"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { updateTheme } from "@/app/actions/projects";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Field, Input } from "@/components/ui/Field";
import { useToast } from "@/components/ui/Toast";
import type { Theme } from "@/lib/types";

export function ThemeForm({ projectSlug, theme: initial, canEdit }: { projectSlug: string; theme: Theme; canEdit: boolean }) {
  const router = useRouter();
  const { notify } = useToast();
  const [pending, startTransition] = useTransition();
  const [theme, setTheme] = useState(initial);
  const [error, setError] = useState<string | null>(null);

  return (
    <Card>
      <form
        className="max-w-xl space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setError(null);
          startTransition(async () => {
            const r = await updateTheme(projectSlug, theme);
            if (!r.ok) return setError(`${r.error} ${r.issues?.join("; ") ?? ""}`.trim());
            notify(r.data.revalidateError ? "Saved, but the public site could not be refreshed." : "Theme saved", { tone: r.data.revalidateError ? "error" : "success" });
            router.refresh();
          });
        }}
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {(["primary", "dark", "accent"] as const).map((k) => (
            <Field key={k} label={`${k[0].toUpperCase()}${k.slice(1)} colour`} htmlFor={`th-${k}`}>
              <div className="flex items-center gap-2">
                <input aria-label={`${k} colour picker`} type="color" disabled={!canEdit} value={theme[k]} onChange={(e) => setTheme({ ...theme, [k]: e.target.value.toUpperCase() })} className="h-9 w-10 shrink-0 rounded-control border border-line bg-surface p-1" />
                <Input id={`th-${k}`} value={theme[k]} disabled={!canEdit} className="font-mono text-xs" onChange={(e) => setTheme({ ...theme, [k]: e.target.value })} />
              </div>
            </Field>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Heading font" htmlFor="th-fh">
            <Input id="th-fh" value={theme.fontHeading} disabled={!canEdit} onChange={(e) => setTheme({ ...theme, fontHeading: e.target.value })} />
          </Field>
          <Field label="Body font" htmlFor="th-fb">
            <Input id="th-fb" value={theme.fontBody} disabled={!canEdit} onChange={(e) => setTheme({ ...theme, fontBody: e.target.value })} />
          </Field>
        </div>
        {error && (
          <p role="alert" className="rounded-control bg-danger-soft px-3 py-2 text-[13px] text-danger">
            {error}
          </p>
        )}
        {canEdit ? (
          <Button type="submit" variant="primary" disabled={pending}>
            {pending ? "Saving..." : "Save theme"}
          </Button>
        ) : (
          <p className="text-[13px] text-ink-muted">Only Admin and Super Admin can change the theme.</p>
        )}
      </form>
    </Card>
  );
}
