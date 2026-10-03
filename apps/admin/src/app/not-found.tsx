import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-canvas px-4">
      <div className="text-center">
        <p className="text-sm font-semibold text-primary">404</p>
        <h1 className="mt-1 text-[24px] font-semibold text-ink">Page not found</h1>
        <p className="mt-1 text-ink-muted">This page does not exist or has been moved.</p>
        <div className="mt-4 flex justify-center">
          <ButtonLink href="/projects" variant="primary">Back to projects</ButtonLink>
        </div>
      </div>
    </main>
  );
}
