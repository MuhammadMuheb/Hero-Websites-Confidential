"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { saveTaxonomies } from "@/app/actions/tours";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { useToast } from "@/components/ui/Toast";
import type { Taxonomies, Tour } from "@/lib/types";

const GROUPS: { key: keyof Taxonomies; title: string }[] = [
  { key: "categories", title: "Tour categories" },
  { key: "neighbourhoods", title: "Neighbourhoods" },
  { key: "cities", title: "Cities" },
  { key: "blogCategories", title: "Blog categories" },
];

type TourRef = Pick<Tour, "id" | "title" | "status" | "category" | "neighbourhood" | "city">;

/** Which tours still use a value of a list. Only these three lists are referenced by tours. */
function usedBy(tours: TourRef[], key: keyof Taxonomies, value: string): TourRef[] {
  const field = key === "categories" ? "category" : key === "neighbourhoods" ? "neighbourhood" : key === "cities" ? "city" : null;
  return field ? tours.filter((x) => x.status !== "trashed" && x[field] === value) : [];
}

export function TaxonomyEditor({ projectSlug, initial, canEdit, tours = [], only }: { projectSlug: string; initial: Taxonomies; canEdit: boolean; tours?: TourRef[]; /** Show only these lists (the editor groups them under different headings). */ only?: (keyof Taxonomies)[] }) {
  const router = useRouter();
  const { notify } = useToast();
  const [pending, startTransition] = useTransition();
  const [tax, setTax] = useState(initial);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [dirty, setDirty] = useState(false);
  const [blocked, setBlocked] = useState<{ key: keyof Taxonomies; value: string; list: TourRef[] } | null>(null);

  const add = (key: keyof Taxonomies) => {
    const v = (draft[key] ?? "").trim();
    if (!v || tax[key].some((x) => x.toLowerCase() === v.toLowerCase())) return;
    setTax({ ...tax, [key]: [...tax[key], v] });
    setDraft({ ...draft, [key]: "" });
    setDirty(true);
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        {GROUPS.filter((g) => !only || only.includes(g.key)).map((g) => (
          <Card key={g.key} title={`${g.title} (${tax[g.key].length})`}>
            {tax[g.key].length === 0 ? (
              <p className="mb-3 text-[13px] text-ink-muted">Nothing here yet.</p>
            ) : (
              <ul className="mb-3 flex flex-wrap gap-2">
                {tax[g.key].map((i) => (
                  <li key={i} className="flex items-center gap-1">
                    <Badge>{i}</Badge>
                    {canEdit && (
                      <button
                        type="button"
                        aria-label={`Remove ${i}`}
                        className="rounded p-0.5 text-danger hover:bg-danger-soft"
                        onClick={() => {
                          const list = usedBy(tours, g.key, i);
                          if (list.length > 0) return setBlocked({ key: g.key, value: i, list });
                          setTax({ ...tax, [g.key]: tax[g.key].filter((x) => x !== i) });
                          setDirty(true);
                        }}
                      >
                        <Icon name="close" size={14} />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
            {canEdit && (
              <div className="flex gap-2">
                <Input
                  aria-label={`Add to ${g.title}`}
                  placeholder="Add an item"
                  value={draft[g.key] ?? ""}
                  maxLength={80}
                  onChange={(e) => setDraft({ ...draft, [g.key]: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add(g.key))}
                />
                <Button size="sm" onClick={() => add(g.key)}>
                  Add
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
      {canEdit ? (
        <div className="mt-4">
          <Button
            variant="primary"
            disabled={pending || !dirty}
            onClick={() =>
              startTransition(async () => {
                const r = await saveTaxonomies(projectSlug, tax);
                if (!r.ok) return notify(r.error, { tone: "error" });
                setDirty(false);
                notify("Lists saved");
                router.refresh();
              })
            }
          >
            {pending ? "Saving..." : "Save lists"}
          </Button>
        </div>
      ) : (
        <p className="mt-4 text-[13px] text-ink-muted">Only Admin and Super Admin can change the managed lists.</p>
      )}
      <Modal
        open={blocked !== null}
        title="This item is still in use"
        size="md"
        onClose={() => setBlocked(null)}
        footer={
          <>
            <Button onClick={() => setBlocked(null)}>Cancel</Button>
            {blocked && (
              <ButtonLink href={`/projects/${projectSlug}?item=tours&${blocked.key === "neighbourhoods" ? "area" : "category"}=${encodeURIComponent(blocked.value)}`} variant="primary">
                Reassign
              </ButtonLink>
            )}
          </>
        }
      >
        {blocked && (
          <div className="space-y-3 text-sm">
            <p>
              <strong>{blocked.value}</strong> cannot be removed while {blocked.list.length} {blocked.list.length === 1 ? "tour uses" : "tours use"} it. Give these tours another value first.
            </p>
            <ul className="list-disc space-y-0.5 pl-5 text-[13px] text-ink-muted">
              {blocked.list.slice(0, 8).map((x) => (
                <li key={x.id}>{x.title}</li>
              ))}
            </ul>
            {blocked.list.length > 8 && <p className="text-[13px] text-ink-muted">and {blocked.list.length - 8} more.</p>}
          </div>
        )}
      </Modal>
    </>
  );
}
