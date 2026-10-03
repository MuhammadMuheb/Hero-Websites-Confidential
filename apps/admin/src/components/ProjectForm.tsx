"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createProject, updateProject, updateTheme } from "@/app/actions/projects";
import { DeleteProjectButton } from "@/components/DeleteProjectButton";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/Field";
import { ImageUploader } from "@/components/ui/ImageUploader";
import { useToast } from "@/components/ui/Toast";
import type { Project, Theme } from "@/lib/types";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const DEFAULT_THEME: Theme = { primary: "#1F7A4D", dark: "#14352A", accent: "#C8962B", fontHeading: "Inter", fontBody: "Inter" };

function Issues({ error, issues }: { error: string | null; issues: string[] }) {
  if (!error) return null;
  return (
    <div role="alert" className="rounded-control bg-danger-soft px-3 py-2 text-[13px] text-danger">
      <p className="font-medium">{error}</p>
      {issues.length > 0 && (
        <ul className="mt-1 list-disc pl-5">
          {issues.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** New project (project undefined) or project settings (Super Admin only; the server enforces it). */
export function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter();
  const { notify } = useToast();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [issues, setIssues] = useState<string[]>([]);

  const [name, setName] = useState(project?.name ?? "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(project));
  const [domain, setDomain] = useState(project?.domain ?? "");
  const [publicUrl, setPublicUrl] = useState(project?.publicUrl ?? "");
  const [status, setStatus] = useState(project?.status ?? "coming_soon");
  const [contactEmail, setContactEmail] = useState(project?.contactEmail ?? "");
  const [logoUrl, setLogoUrl] = useState(project?.logoUrl ?? "");
  const [theme, setTheme] = useState<Theme>(project?.theme ?? DEFAULT_THEME);
  const [confirmName, setConfirmName] = useState("");

  const archiving = project && status === "archived" && project.status !== "archived";

  const submit = () => {
    setError(null);
    setIssues([]);
    startTransition(async () => {
      if (!project) {
        const r = await createProject({ name, slug, domain, publicUrl, status, contactEmail, logoUrl, theme });
        if (!r.ok) {
          setError(r.error);
          return setIssues(r.issues ?? []);
        }
        notify(r.data.revalidateError ? "Project created, but the public site could not be refreshed yet." : "Project created", { tone: r.data.revalidateError ? "error" : "success" });
        router.push(`/projects/${r.data.slug}/import`);
        router.refresh();
        return;
      }
      const r = await updateProject(project.slug, { name, domain, publicUrl, status, contactEmail, logoUrl }, confirmName);
      if (!r.ok) {
        setError(r.error);
        return setIssues(r.issues ?? []);
      }
      const t = await updateTheme(project.slug, theme);
      if (!t.ok) {
        setError(t.error);
        return setIssues(t.issues ?? []);
      }
      notify(r.data.revalidateError || t.data.revalidateError ? "Saved, but the public site could not be refreshed." : "Project saved", { tone: r.data.revalidateError || t.data.revalidateError ? "error" : "success" });
      router.refresh();
    });
  };

  return (
    <>
    <form
      className="max-w-2xl space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <Field label="Name" htmlFor="p-name" hint="2 to 60 characters.">
        <Input
          id="p-name"
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (!slugEdited) setSlug(slugify(e.target.value));
          }}
        />
      </Field>
      <Field label="Slug" htmlFor="p-slug" hint={project ? "The slug cannot be changed after creation." : "Lowercase letters, digits and hyphens. Unique."}>
        <Input
          id="p-slug"
          required
          value={slug}
          disabled={Boolean(project)}
          className="font-mono text-xs"
          onChange={(e) => {
            setSlugEdited(true);
            setSlug(e.target.value);
          }}
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Domain" htmlFor="p-domain" hint="Hostname only, for example streetfoodrome.com (www is the same site). Each domain belongs to one project. Once the domain points at the web app, this project is served there automatically.">
          <Input id="p-domain" value={domain} onChange={(e) => setDomain(e.target.value)} />
        </Field>
        <Field label="Public URL" htmlFor="p-url" hint="Must start with https://. This exact value is the Our Network link. Leave it empty to use https:// plus the domain.">
          <Input id="p-url" type="url" value={publicUrl} onChange={(e) => setPublicUrl(e.target.value)} />
        </Field>
        <Field label="Status" htmlFor="p-status" hint="Live needs a public URL and a Home page that passes the publish checks. Any project that is not archived and has a domain or public URL is listed in Our Network.">
          <Select id="p-status" value={status} onChange={(e) => setStatus(e.target.value as typeof status)}>
            <option value="coming_soon">Coming soon</option>
            {project && <option value="live">Live</option>}
            <option value="archived">Archived</option>
          </Select>
        </Field>
        <Field label="Contact email" htmlFor="p-email">
          <Input id="p-email" type="email" required value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
        </Field>
      </div>

      <Field label="Logo URL" htmlFor="p-logo">
        <div className="flex gap-2">
          <Input id="p-logo" type="url" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} />
          {project && <ImageUploader project={project.slug} onUploaded={setLogoUrl} />}
        </div>
        {!project && <p className="text-xs text-ink-muted">Image upload becomes available right after the project is created.</p>}
      </Field>

      <fieldset className="space-y-3 rounded-control border border-line p-3">
        <legend className="px-1 text-[13px] font-semibold">Theme</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {(["primary", "dark", "accent"] as const).map((k) => (
            <Field key={k} label={`${k[0].toUpperCase()}${k.slice(1)} colour`} htmlFor={`t-${k}`}>
              <div className="flex items-center gap-2">
                <input aria-label={`${k} colour picker`} type="color" value={theme[k]} onChange={(e) => setTheme({ ...theme, [k]: e.target.value.toUpperCase() })} className="h-9 w-10 shrink-0 rounded-control border border-line bg-surface p-1" />
                <Input id={`t-${k}`} value={theme[k]} className="font-mono text-xs" onChange={(e) => setTheme({ ...theme, [k]: e.target.value })} />
              </div>
            </Field>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Heading font" htmlFor="t-fh">
            <Input id="t-fh" value={theme.fontHeading} onChange={(e) => setTheme({ ...theme, fontHeading: e.target.value })} />
          </Field>
          <Field label="Body font" htmlFor="t-fb">
            <Input id="t-fb" value={theme.fontBody} onChange={(e) => setTheme({ ...theme, fontBody: e.target.value })} />
          </Field>
        </div>
      </fieldset>

      {archiving && (
        <Field label={`Type "${project.name}" to confirm archiving`} htmlFor="p-confirm" hint="Archived projects disappear from Our Network.">
          <Input id="p-confirm" value={confirmName} onChange={(e) => setConfirmName(e.target.value)} />
        </Field>
      )}

      <Issues error={error} issues={issues} />

      <div className="flex gap-2">
        <Button type="submit" variant="primary" disabled={pending}>
          {pending ? "Saving..." : project ? "Save project" : "Create project"}
        </Button>
        <Button onClick={() => router.push("/projects")} disabled={pending}>
          {project ? "Back to projects" : "Cancel"}
        </Button>
      </div>
    </form>

    {/* Outside the form on purpose: its confirmation field must not submit the settings form. */}
    {project && (
      <section className="mt-8 max-w-2xl space-y-3 rounded-control border border-danger/40 p-4">
        <h3 className="text-[13px] font-semibold text-danger">Danger zone</h3>
        <p className="text-[13px] text-ink-muted">Deleting a project permanently removes it and everything stored for it. Its link stops working for everyone.</p>
        <DeleteProjectButton slug={project.slug} name={project.name} status={project.status} cards={project.cards} size="md" redirectTo="/projects" />
      </section>
    )}
    </>
  );
}
