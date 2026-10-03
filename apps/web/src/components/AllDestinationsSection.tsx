'use client';

import { EXTERNAL_LINK, useNetworkSites } from './NetworkProvider';

/** "Our Network": all sister sites as clean white cards. */
export function AllDestinationsSection() {
  const sites = useNetworkSites();
  if (sites.length === 0) return null; // never an empty block
  return (
    <section className="bg-cream-deep py-16 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-deep">Italy Tours Network</p>
          <h2 className="mt-3 font-hero text-[30px] font-black leading-tight tracking-[-0.02em] text-ink sm:text-[40px]">
            Our <span className="text-brand">Network</span>
          </h2>
          <p className="mt-3 text-base text-ink-muted">More hand-picked experiences across Italy.</p>
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sites.map((site, index) => (
            <li key={site.slug}>
              <a
                href={site.publicUrl}
                {...EXTERNAL_LINK}
                className="group flex h-full items-center gap-4 rounded-[18px] border border-ink/5 bg-paper p-5 shadow-card-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-card-hover"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft font-hero text-sm font-extrabold text-brand">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 font-hero text-[15px] font-bold leading-snug text-ink group-hover:text-brand">
                  {site.name}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-gold-deep transition-transform group-hover:translate-x-0.5">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
