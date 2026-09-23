'use client';

import { usePathname } from 'next/navigation';
import Link from '@/components/NetworkLink';
import { NETWORK_SITES } from '@/lib/tours';

const SUGGESTIONS = [
  { label: 'Compare tours', href: '/tours', note: 'Every option side by side, with honest prices.' },
  { label: 'Guides & tips', href: '/blog', note: 'Planning advice written first-hand.' },
  { label: 'FAQ', href: '/faq', note: 'Quick answers on booking and logistics.' },
  { label: 'Contact', href: '/contact', note: 'Ask us directly — we reply within 24 hours.' },
];

/** Body of the branded 404 page; reads the URL so it names the right property. */
export function NotFoundContent() {
  const pathname = usePathname() ?? '/';
  const site = NETWORK_SITES.find((s) => s.slug === pathname.split('/')[1]);
  const siteName = site?.name ?? 'Street Food Rome';

  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32">
      <p className="rounded-full bg-accent-soft px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-accent">Error 404</p>
      <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">This page took a wrong turn</h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted">
        The page you were looking for isn&rsquo;t on {siteName}. It may have moved, or the link may be out of date.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-[48px] items-center rounded-control bg-accent px-7 text-base font-bold text-white shadow-glow transition-colors duration-200 hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Back to {siteName}
      </Link>
      <ul className="mt-14 grid w-full grid-cols-1 gap-3 text-left sm:grid-cols-2">
        {SUGGESTIONS.map((s) => (
          <li key={s.href}>
            <Link
              href={s.href}
              className="flex h-full flex-col rounded-panel border border-line bg-white p-5 transition-colors duration-200 hover:border-accent/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <span className="font-semibold text-ink">
                {s.label} <span aria-hidden="true" className="text-accent">&rarr;</span>
              </span>
              <span className="mt-1 text-sm text-ink-muted">{s.note}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
