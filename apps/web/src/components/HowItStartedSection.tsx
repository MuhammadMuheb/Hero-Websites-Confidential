import Link from '@/components/NetworkLink';
import { SafeImage } from './SafeImage';

const CARDS = [
  {
    title: 'Moved for a Semester, Stayed for a Decade',
    description: 'What started as one semester abroad turned into more than ten years in Rome — long enough to know which market stalls are worth the walk.',
    image: 'https://images.unsplash.com/photo-1504674900968-f0cbe0e78c90?w=600&h=400&fit=crop',
    href: '#',
  },
  {
    title: 'Got Tired of Sending the Same Three Names',
    description: 'Friends kept asking for restaurant names. Writing it down properly turned into something longer than a message thread.',
    image: 'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=600&h=400&fit=crop',
    href: '#',
  },
  {
    title: 'Street Food Rome Was Born',
    description: 'A single-author site with one rule: nothing gets recommended without being eaten, walked, and paid for first.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop',
    href: '#',
  },
  {
    title: 'Walked Every Street',
    description: 'Every neighbourhood explored on foot. Every market stall visited. Every recommendation tested personally.',
    image: 'https://images.unsplash.com/photo-1488374713501-52264e3df371?w=600&h=400&fit=crop',
    href: '#',
  },
];

export function HowItStartedSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-14">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Our Journey</p>
          <h2 className="mt-2 font-display text-[28px] font-bold leading-snug tracking-tight text-ink sm:text-[36px]">
            How It Started
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
            From a semester abroad to over a decade living in Rome — discover the story behind Street Food Rome.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group flex flex-col overflow-hidden rounded-media border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-media">
                <SafeImage
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-display text-[16px] font-bold leading-snug text-ink">{card.title}</h3>
                <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-ink-muted">{card.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-accent">
                  Learn More
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
