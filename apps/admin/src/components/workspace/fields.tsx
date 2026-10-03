"use client";

import clsx from "clsx";
import { useId, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Field, Input, Textarea } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { ImageUploader } from "@/components/ui/ImageUploader";

/** Building blocks of the section editors. Plain, labelled, and the same everywhere. */

const iconButton = "rounded p-1.5 text-ink-muted hover:bg-surface hover:text-ink disabled:opacity-30";

export function Counter({ value, min, max }: { value: string; min?: number; max: number }) {
  const n = value.trim().length;
  const bad = n > max || (min !== undefined && n < min);
  return (
    <span className={clsx("text-xs", bad ? "font-medium text-danger" : "text-ink-muted")}>
      {n} of {max}
      {min !== undefined ? ` (${min} to ${max})` : ""}
    </span>
  );
}

/** One text field with an optional hint and character counter. */
export function TextField({ label, value, onChange, hint, max, min, long, rows = 3, readOnly, placeholder }: { label: string; value: string; onChange: (v: string) => void; hint?: string; max?: number; min?: number; long?: boolean; rows?: number; readOnly?: boolean; placeholder?: string }) {
  const id = useId();
  return (
    <Field label={label} htmlFor={id} hint={hint}>
      {long ? <Textarea id={id} rows={rows} value={value} disabled={readOnly} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} /> : <Input id={id} value={value} disabled={readOnly} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />}
      {max !== undefined && (
        <div className="flex justify-end">
          <Counter value={value} min={min} max={max} />
        </div>
      )}
    </Field>
  );
}

/** An image: a preview, the address (or an upload), and the alt text when the image needs one. */
export function ImageField({ label, url, alt, onChange, withAlt = true, readOnly, hint }: { label: string; url: string; alt?: string; onChange: (next: { url: string; alt: string }) => void; withAlt?: boolean; readOnly?: boolean; hint?: string }) {
  const id = useId();
  const showPreview = /^https?:\/\//i.test(url);
  return (
    <div className="space-y-2">
      <p className="text-[13px] font-medium text-ink">{label}</p>
      <div className="flex flex-wrap items-start gap-3">
        {showPreview ? (
          // eslint-disable-next-line @next/next/no-img-element -- preview of an arbitrary external image
          <img src={url} alt="" className="h-20 w-32 shrink-0 rounded-control border border-line object-cover" />
        ) : (
          <span className="flex h-20 w-32 shrink-0 items-center justify-center rounded-control border border-dashed border-line text-xs text-ink-muted">No image</span>
        )}
        <div className="min-w-[220px] flex-1 space-y-2">
          <div className="flex gap-2">
            <label htmlFor={`${id}-url`} className="sr-only">
              {label} address
            </label>
            <Input id={`${id}-url`} value={url} disabled={readOnly} placeholder="https://" onChange={(e) => onChange({ url: e.target.value, alt: alt ?? "" })} className="font-mono text-[13px]" />
            {!readOnly && <ImageUploader label="Upload" onUploaded={(u) => onChange({ url: u, alt: alt ?? "" })} />}
          </div>
          {withAlt && (
            <div>
              <label htmlFor={`${id}-alt`} className="mb-1 flex items-center gap-2 text-xs font-medium text-ink">
                Alt text (required) {url.trim() !== "" && (alt ?? "").trim() === "" && <Chip tone="red">missing</Chip>}
              </label>
              <Input id={`${id}-alt`} value={alt ?? ""} disabled={readOnly} placeholder="Describe the image for people who cannot see it" onChange={(e) => onChange({ url, alt: e.target.value })} aria-invalid={url.trim() !== "" && (alt ?? "").trim() === ""} />
            </div>
          )}
        </div>
      </div>
      {hint && <p className="text-xs text-ink-muted">{hint}</p>}
    </div>
  );
}

/**
 * A list you can add to, remove from and reorder. Each entry is a card with its own number and buttons.
 * The limits are shown, and the buttons stop at them.
 */
export function ListEditor<T>({ title, hint, items, onChange, blank, min = 0, max, noun, render, readOnly, compact }: { title: string; hint?: string; items: T[]; onChange: (next: T[]) => void; blank: () => T; min?: number; max: number; noun: string; render: (item: T, update: (next: T) => void, index: number) => ReactNode; readOnly?: boolean; compact?: boolean }) {
  const move = (i: number, d: -1 | 1) => {
    const next = [...items];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    onChange(next);
  };
  const full = items.length >= max;
  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
        <span className="text-xs text-ink-muted">
          {items.length} of {max} &middot; at least {min}
        </span>
      </div>
      {hint && <p className="-mt-1 text-xs text-ink-muted">{hint}</p>}
      {items.length === 0 && <p className="rounded-control border border-dashed border-line px-3 py-4 text-center text-[13px] text-ink-muted">Nothing here yet.</p>}
      <ul className={clsx(compact ? "grid gap-2 sm:grid-cols-2" : "space-y-3")}>
        {items.map((item, i) => (
          <li key={i} className="rounded-card border border-line bg-canvas/60">
            <div className="flex items-center justify-between gap-2 border-b border-line px-3 py-1">
              <span className="text-xs font-medium text-ink-muted">
                {noun} {i + 1}
              </span>
              {!readOnly && (
                <span className="flex items-center">
                  <button type="button" aria-label={`Move ${noun} ${i + 1} up`} disabled={i === 0} onClick={() => move(i, -1)} className={iconButton}>
                    <Icon name="up" size={16} />
                  </button>
                  <button type="button" aria-label={`Move ${noun} ${i + 1} down`} disabled={i === items.length - 1} onClick={() => move(i, 1)} className={iconButton}>
                    <Icon name="down" size={16} />
                  </button>
                  <button type="button" aria-label={`Remove ${noun} ${i + 1}`} title={items.length <= min ? `At least ${min} are needed` : "Remove"} disabled={items.length <= min} onClick={() => onChange(items.filter((_, n) => n !== i))} className="rounded p-1.5 text-danger hover:bg-danger-soft disabled:opacity-30">
                    <Icon name="trash" size={16} />
                  </button>
                </span>
              )}
            </div>
            <div className="space-y-3 p-3">{render(item, (next) => onChange(items.map((x, n) => (n === i ? next : x))), i)}</div>
          </li>
        ))}
      </ul>
      {!readOnly && (
        <Button size="sm" disabled={full} onClick={() => onChange([...items, blank()])}>
          <Icon name="plus" size={16} /> Add {noun.toLowerCase()}
        </Button>
      )}
      {full && <p className="text-xs text-ink-muted">The most you can have is {max}.</p>}
    </section>
  );
}

/** A titled block of fields inside a section editor, with a dividing line. */
export function Group({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <section className="space-y-4 border-t border-line pt-5 first:border-0 first:pt-0">
      <div>
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
        {note && <p className="mt-0.5 text-xs text-ink-muted">{note}</p>}
      </div>
      {children}
    </section>
  );
}
