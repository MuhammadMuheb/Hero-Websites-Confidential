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
}

/**
 * Generic editor for any JSON-like content. Strings, numbers, groups and lists are edited in place;
 * list items get move up / move down / remove buttons (the keyboard-friendly alternative to drag and drop).
 */
export function JsonField({ name, label, value, onChange, readOnly, freeform }: Props) {
  const id = useId();

  if (Array.isArray(value)) return <ListField name={name} label={label} value={value} onChange={onChange} readOnly={readOnly} freeform={freeform} />;

  if (value && typeof value === "object") {
    return <GroupField name={name} label={label} value={value as Record<string, unknown>} onChange={onChange} readOnly={readOnly} freeform={freeform} />;
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
  const hint = ["privacy", "terms", "cookie", "affiliate"].includes(key) ? "Basic HTML is allowed (p, h2, h3, strong, em, ul, ol, li, a). Anything else is removed on save." : undefined;

  return (
    <Field label={label} htmlFor={id} hint={hint}>
      {long ? (
        <Textarea id={id} rows={key.length > 0 && ["privacy", "terms", "cookie", "affiliate"].includes(key) ? 12 : 4} value={text} disabled={readOnly} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <div className="flex gap-2">
          <Input id={id} value={text} disabled={readOnly} onChange={(e) => onChange(e.target.value)} />
          {isImage && !readOnly && <ImageUploader onUploaded={onChange} />}
        </div>
      )}
    </Field>
  );
}

function GroupField({ name, label, value, onChange, readOnly, freeform }: Props & { value: Record<string, unknown> }) {
  const [newKey, setNewKey] = useState("");
  const keys = Object.keys(value);
  const addKey = () => {
    const k = newKey.trim();
    if (!/^[A-Za-z][A-Za-z0-9]{0,39}$/.test(k) || k in value) return;
    onChange({ ...value, [k]: "" });
    setNewKey("");
  };

  return (
    <fieldset className="space-y-3 rounded-control border border-line p-3">
      <legend className="px-1 text-[13px] font-semibold text-ink">{label}</legend>
      {keys.length === 0 && <p className="text-[13px] text-ink-muted">This group is empty.{freeform ? " Add a field below." : ""}</p>}
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
    </fieldset>
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

  return (
    <fieldset className="space-y-3 rounded-control border border-line p-3">
      <legend className="px-1 text-[13px] font-semibold text-ink">
        {label} ({value.length})
      </legend>
      {value.length === 0 && <p className="text-[13px] text-ink-muted">No items yet.</p>}
      {value.map((item, i) => (
        <div key={i} className="flex items-start gap-2">
          <div className="min-w-0 flex-1">
            <JsonField name={`${name}[${i}]`} label={`${label} ${i + 1}`} value={item} readOnly={readOnly} freeform={freeform} onChange={(next) => set(value.map((v, n) => (n === i ? next : v)))} />
          </div>
          {!readOnly && (
            <div className="flex shrink-0 flex-col gap-1 pt-6">
              <button type="button" aria-label={`Move ${label} ${i + 1} up`} disabled={i === 0} onClick={() => move(i, -1)} className="rounded p-1 text-ink-muted hover:bg-canvas disabled:opacity-30">
                <Icon name="up" size={16} />
              </button>
              <button type="button" aria-label={`Move ${label} ${i + 1} down`} disabled={i === value.length - 1} onClick={() => move(i, 1)} className="rounded p-1 text-ink-muted hover:bg-canvas disabled:opacity-30">
                <Icon name="down" size={16} />
              </button>
              <button type="button" aria-label={`Remove ${label} ${i + 1}`} onClick={() => set(value.filter((_, n) => n !== i))} className="rounded p-1 text-danger hover:bg-danger-soft">
                <Icon name="close" size={16} />
              </button>
            </div>
          )}
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
    </fieldset>
  );
}
