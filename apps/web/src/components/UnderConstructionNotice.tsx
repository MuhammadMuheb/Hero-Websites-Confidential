/**
 * Rendered with no site chrome at all — Header and Footer both self-hide via
 * isUnbuiltNetworkRoute, so this is the entire page: a bare, centered 404-style
 * notice on a plain white screen, not a section within the normal site layout.
 */
export function UnderConstructionNotice({ siteName }: { siteName: string }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white px-6 text-center">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-faint">{siteName}</p>
        <p className="mt-2 text-sm font-bold uppercase tracking-[0.14em] text-accent">404</p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">Page not found</h1>
        <p className="mt-3 text-base text-ink-muted">This page hasn&rsquo;t been built yet.</p>
      </div>
    </div>
  );
}
