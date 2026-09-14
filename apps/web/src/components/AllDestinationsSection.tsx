import Link from '@/components/NetworkLink';
import { NETWORK_SITES } from '@/lib/tours';

export function AllDestinationsSection() {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-14">
        <div className="text-center">
          <h2 className="font-sans text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            Our Network
          </h2>
          <p className="mt-2 text-base text-faint">Other sites in our affiliate network.</p>
        </div>

        {/* Sister properties in the same affiliate network — clean static text only, no href yet. */}
        <ul className="mx-auto mt-10 grid max-w-[720px] grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
          {NETWORK_SITES.map((site) => (
            <li key={site.number}>
              <Link
                href={`/${site.slug}`}
                className="text-sm text-ink-muted transition-colors hover:text-accent"
              >
                {site.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
