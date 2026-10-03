import clsx from "clsx";
import { projectOpenUrl } from "@/lib/project-open-url";
import type { Project } from "@/lib/types";

/**
 * The project name. When the project has a public address, the name is a link that opens the live
 * site in a new tab. Without one it is plain text.
 */
export function ProjectNameLink({ project, className }: { project: Pick<Project, "name" | "publicUrl" | "domain">; className?: string }) {
  const url = projectOpenUrl(project);
  if (!url) return <span className={className}>{project.name}</span>;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" title={`Open ${url}`} className={clsx("text-primary underline-offset-2 hover:underline focus-visible:underline", className)}>
      {project.name}
      <span aria-hidden="true"> &#8599;</span>
      <span className="sr-only"> (opens {url} in a new tab)</span>
    </a>
  );
}
