import Link from '@/components/NetworkLink';
import { SafeImage } from './SafeImage';

const STEPS = [
  {
    title: 'Walk it First',
    description: 'Every tour on this site has been taken in person before it was ever recommended.',
    image: 'https://images.unsplash.com/photo-1488374713501-52264e3df371?w=600&h=400&fit=crop',
    href: '#',
  },
  {
    title: 'Stay Off the Tourist Track',
    description:
      'We look for real neighbourhoods and family-run kitchens, not the stops every guidebook already sends you to.',
    image: 'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=600&h=400&fit=crop',
    href: '#',
  },
  {
    title: 'Judge it Honestly',
    description:
      "If a tour disappoints, it doesn't make the list — no exceptions for who's paying the commission.",
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop',
    href: '#',
  },
  {
    title: 'Keep it Personal',
    description: 'One person writes this site. Every review reflects an actual visit, not a template.',
    image: 'https://images.unsplash.com/photo-1504674900968-f0cbe0e78c90?w=600&h=400&fit=crop',
    href: '#',
  },
];

export function HowWeChooseSection() {
  return (
    <section className="bg-paper-tint py-16 sm:py-20">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-14">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Our Philosophy</p>
          <h2 className="mt-2 font-display text-[28px] font-bold leading-snug tracking-tight text-ink sm:text-[36px]">
            How We Choose Our Tours
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
            Four principles guide every recommendation on this site — personal experience, honesty, and quality above all else.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <Link
              key={step.title}
              href={step.href}
              className="group flex flex-col overflow-hidden rounded-media border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-media">
                <SafeImage
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-gradient text-sm font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-display text-[16px] font-bold leading-snug text-ink">{step.title}</h3>
                <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-ink-muted">{step.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-accent">
                  Discover
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
