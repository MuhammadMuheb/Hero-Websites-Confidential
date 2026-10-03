import type { Tenant } from '@/lib/tenants';

/** Shown while a project has no complete published Home yet. Never a broken page. */
export function ComingSoon({ tenant }: { tenant: Tenant }) {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
      <p className="rounded-full bg-accent-soft px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-brand">Coming soon</p>
      <h1 className="mt-5 font-hero text-4xl font-black tracking-tight text-ink sm:text-5xl">{tenant.name}</h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted">We are putting the finishing touches on this site. Please check back soon.</p>
      {tenant.contactEmail && (
        <a href={`mailto:${tenant.contactEmail}`} className="mt-8 font-semibold text-brand hover:underline">
          {tenant.contactEmail}
        </a>
      )}
    </section>
  );
}
