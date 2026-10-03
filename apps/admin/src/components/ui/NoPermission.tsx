import { ButtonLink } from "./Button";
import { EmptyState } from "./EmptyState";

/** The "no permission" state required on every screen. */
export function NoPermission({ what = "this screen" }: { what?: string }) {
  return (
    <EmptyState
      title="You do not have access"
      description={`Your role or project assignment does not include ${what}. Ask a Super Admin if you think this is a mistake.`}
      action={
        <ButtonLink href="/projects" variant="primary">
          Back to projects
        </ButtonLink>
      }
    />
  );
}
