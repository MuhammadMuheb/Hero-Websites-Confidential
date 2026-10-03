"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { ImageUploader } from "@/components/ui/ImageUploader";
import { blankLike } from "@/lib/content/pages";

const IMAGE_KEYS = new Set(["src", "url", "imageUrl", "ogImage", "image", "logoUrl"]);
const NAV_LISTS = new Set(["navbar", "footer", "children"]);
const NAV_ITEM = { label: "", href: "", cta: false, children: [] };
const LONG_KEYS = new Set(["description", "subtitle", "body", "answer", "text", "privacy", "terms", "cookie", "affiliate", "metaDescription"]);

export function humanize(key: string): string {
  const s = key.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

interface Props {
  name: string;
  label: string;
  value: unknown;
  onChange: (next: unknown) => void;
  readOnly?: boolean;
  /** Objects may gain new keys (About and Contact have no fixed shape). Strict schemas reject unknown keys. */
  freeform?: boolean;
  /** Inside a list item card: no extra frame or title around a group. */
  bare?: boolean;
}

/**
 * Generic editor for any JSON-like content. Strings, numbers, groups and lists are edited in place;
 * list items get move up / move down / remove buttons (the keyboard-friendly alternative to drag and drop).
 */
export function JsonField({ name, label, value, onChange, readOnly, freeform, bare }: Props) {
  const id = useId();

  if (Array.isArray(value)) return <ListField name={name} label={label} value={value} onChange={onChange} readOnly={readOnly} freeform={freeform} />;

  if (value && typeof value === "object") {
    return <GroupField name={name} label={label} value={value as Record<string, unknown>} onChange={onChange} readOnly={readOnly} freeform={freeform} bare={bare} />;
  }

  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={value} disabled={readOnly} onChange={(e) => onChange(e.target.checked)} />
        {label}
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <Field label={label} htmlFor={id}>
        <Input id={id} type="number" value={Number.isFinite(value) ? value : 0} disabled={readOnly} onChange={(e) => onChange(Number(e.target.value))} />
      </Field>
    );
  }

  const text = typeof value === "string" ? value : "";
  const key = name.split(".").pop()?.replace(/\[\d+\]$/, "") ?? "";
  const long = text.length > 90 || text.includes("\n") || LONG_KEYS.has(key);
  const isImage = IMAGE_KEYS.has(key);
  const isHtml = ["privacy", "terms", "cookie", "affiliate"].includes(key);
  const hint = isHtml ? "Basic HTML is allowed (p, h2, h3, strong, em, ul, ol, li, a). Anything else is removed on save." : undefined;

  return (
    <Field label={label} htmlFor={id} hint={hint}>
      {long ? (
        <Textarea id={id} rows={isHtml ? 12 : 4} value={text} disabled={readOnly} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <div className="flex gap-2">
          <Input id={id} value={text} disabled={readOnly} onChange={(e) => onChange(e.target.value)} />
          {isImage && !readOnly && <ImageUploader onUploaded={onChange} />}
        </div>
      )}
      {isImage && text.startsWith("http") && (
        // eslint-disable-next-line @next/next/no-img-element -- a small preview of an arbitrary external image
        <img src={text} alt="" className="mt-2 h-24 w-auto max-w-full rounded-control border border-line object-cover" />
      )}
    </Field>
  );
}

function GroupField({ name, label, value, onChange, readOnly, freeform, bare }: Props & { value: Record<string, unknown> }) {
  const [newKey, setNewKey] = useState("");
  const keys = Object.keys(value);
  const addKey = () => {
    const k = newKey.trim();
    if (!/^[A-Za-z][A-Za-z0-9]{0,39}$/.test(k) || k in value) return;
    onChange({ ...value, [k]: "" });
    setNewKey("");
  };

  return (
    <div className={bare ? "space-y-4" : "space-y-4 rounded-card border border-line bg-canvas/60 p-4"}>
      {!bare && <h3 className="text-sm font-semibold text-ink">{label}</h3>}
      {keys.length === 0 && <p className="text-[13px] text-ink-muted">Nothing here yet.{freeform ? " Add a field below." : ""}</p>}
      {keys.map((k) => (
        <JsonField key={k} name={`${name}.${k}`} label={humanize(k)} value={value[k]} readOnly={readOnly} freeform={freeform} onChange={(next) => onChange({ ...value, [k]: next })} />
      ))}
      {freeform && !readOnly && (
        <div className="flex items-end gap-2 border-t border-line pt-3">
          <Field label="New field name" htmlFor={`${name}-newkey`} hint="Letters and digits, for example heading">
            <Input id={`${name}-newkey`} value={newKey} onChange={(e) => setNewKey(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addKey())} />
          </Field>
          <Button size="sm" onClick={addKey} disabled={!newKey.trim()}>
            Add field
          </Button>
        </div>
      )}
    </div>
  );
}

function ListField({ name, label, value, onChange, readOnly, freeform }: Props & { value: unknown[] }) {
  const set = (next: unknown[]) => onChange(next);
  const move = (i: number, d: -1 | 1) => {
    const t = i + d;
    if (t < 0 || t >= value.length) return;
    const next = [...value];
    [next[i], next[t]] = [next[t], next[i]];
    set(next);
  };
  const listKey = name.split(".").pop()?.replace(/\[\d+\]$/, "") ?? "";
  const template = value.length > 0 ? blankLike(value[0]) : NAV_LISTS.has(listKey) ? NAV_ITEM : undefined;
  const iconButton = "rounded p-1.5 text-ink-muted hover:bg-surface hover:text-ink disabled:opacity-30";

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold text-ink">{label}</h3>
        <span className="text-xs text-ink-muted">
          {value.length} {value.length === 1 ? "item" : "items"}
        </span>
      </div>
      {value.length === 0 && <p className="rounded-control border border-dashed border-line px-3 py-4 text-center text-[13px] text-ink-muted">Nothing here yet.</p>}
      {value.map((item, i) => (
        <div key={i} className="rounded-card border border-line bg-canvas/60">
          <div className="flex items-center justify-between gap-2 border-b border-line px-3 py-1">
            <span className="text-xs font-medium text-ink-muted">
              {label} {i + 1}
            </span>
            {!readOnly && (
              <span className="flex items-center">
                <button type="button" aria-label={`Move ${label} ${i + 1} up`} disabled={i === 0} onClick={() => move(i, -1)} className={iconButton}>
                  <Icon name="up" size={16} />
                </button>
                <button type="button" aria-label={`Move ${label} ${i + 1} down`} disabled={i === value.length - 1} onClick={() => move(i, 1)} className={iconButton}>
                  <Icon name="down" size={16} />
                </button>
                <button type="button" aria-label={`Remove ${label} ${i + 1}`} onClick={() => set(value.filter((_, n) => n !== i))} className="rounded p-1.5 text-danger hover:bg-danger-soft">
                  <Icon name="close" size={16} />
                </button>
              </span>
            )}
          </div>
          <div className="p-3">
            <JsonField name={`${name}[${i}]`} label={`${label} ${i + 1}`} value={item} readOnly={readOnly} freeform={freeform} bare onChange={(next) => set(value.map((v, n) => (n === i ? next : v)))} />
          </div>
        </div>
      ))}
      {!readOnly && (
        <div className="flex flex-wrap gap-2">
          {template !== undefined ? (
            <Button size="sm" onClick={() => set([...value, template])}>
              <Icon name="plus" size={16} /> Add item
            </Button>
          ) : (
            <>
              <Button size="sm" onClick={() => set([...value, ""])}>
                <Icon name="plus" size={16} /> Add text item
              </Button>
              {freeform && (
                <Button size="sm" onClick={() => set([...value, {}])}>
                  <Icon name="plus" size={16} /> Add group item
                </Button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
