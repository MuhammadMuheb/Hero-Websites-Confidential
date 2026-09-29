/**
 * Master-design pages for the 12 network sites.
 *
 * Every component here is built only from the Street Food Rome master pieces
 * (Hero inner mode, section eyebrow + font-hero title with one green word,
 * TourCard, FAQAccordion, cream / cream-deep / ink bands). Only the content
 * passed in changes per site.
 */
import Link from '@/components/NetworkLink';
import { Hero } from '@/components/Hero';
import { SafeImage } from '@/components/SafeImage';
import { FAQAccordion } from '@/components/FAQAccordion';
import { TourCard } from '@/components/cards/TourCard';
import type { TourDoc } from '@/lib/firestore';

/* ------------------------------------------------------------------ */
/* Shared bits                                                          */
/* ------------------------------------------------------------------ */

interface LinkItem {
  label: string;
  href: string;
}

function SectionTitle({
  eyebrow,
  title,
  center = true,
}: {
  eyebrow: string;
  /** [before, green word, after] */
  title: [string, string, string];
  center?: boolean;
}) {
  return (
    <div className={center ? 'text-center' : ''}>
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-deep">{eyebrow}</p>
      <h2 className="mt-3 font-hero text-[28px] font-black leading-tight tracking-[-0.02em] text-ink sm:text-[38px]">
        {title[0]}
        <span className="text-brand">{title[1]}</span>
        {title[2]}
      </h2>
    </div>
  );
}

function ChipRow({ items }: { items: LinkItem[] }) {
  return (
    <div className="flex flex-nowrap justify-center gap-2 overflow-x-auto">
      {items.map((item) => (
        <Link
          key={`${item.label}-${item.href}`}
          href={item.href}
          className="shrink-0 whitespace-nowrap rounded-full border border-line bg-paper px-4 py-2 text-sm font-semibold text-ink transition-colors duration-200 hover:border-brand hover:bg-accent-soft hover:text-brand"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

function TourGrid({ tours }: { tours: TourDoc[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {tours.map((tour, i) => (
        <TourCard key={tour.slug} tour={tour} priority={i < 4} href={`/go/${tour.slug}`} />
      ))}
    </div>
  );
}

function FaqBlock({ faqs, eyebrow = 'Good to know', title }: { faqs: { question: string; answer: string }[]; eyebrow?: string; title: [string, string, string] }) {
  if (faqs.length === 0) return null;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  };
  return (
    <section className="bg-cream py-16 sm:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-3xl px-6">
        <SectionTitle eyebrow={eyebrow} title={title} />
        <div className="mt-10">
          <FAQAccordion items={faqs} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Money (compare) + support (plan) pages                               */
/* ------------------------------------------------------------------ */

export interface MasterContent {
  kind: 'compare' | 'plan';
  href: string;
  title: string;
  description: string;
  image: { src: string; alt: string } | null;
  intro: string[];
  atAGlance: { label: string; value: string }[];
  highlights: string[];
  sections: { heading: string; paragraphs: string[] }[];
  verdict: { heading: string; body: string } | null;
  faqs: { question: string; answer: string }[];
  related: LinkItem | null;
}

interface LooseSection {
  heading?: string;
  title?: string;
  body?: string | string[];
}
interface LooseContent {
  href?: string;
  navTitle?: string;
  h1?: string;
  metaTitle?: string;
  metaDescription?: string;
  heroImage?: { src: string; alt: string };
  intro?: string[];
  atAGlance?: { label: string; value: string }[];
  sections?: LooseSection[];
  verdict?: { heading: string; body: string };
  faqs?: { question: string; answer: string }[];
  relatedSupportHref?: string;
  relatedSupportLabel?: string;
  relatedMoneyHref?: string;
  relatedMoneyLabel?: string;
  hook?: string;
  highlights?: string[];
  body?: string;
}

/** Turns any site's money/support content object into one shape. */
export function normalizeContent(raw: unknown, kind: 'compare' | 'plan', path: string): MasterContent {
  const c = (raw ?? {}) as LooseContent;
  const sections = (c.sections ?? []).map((s) => ({
    heading: s.heading ?? s.title ?? '',
    paragraphs: Array.isArray(s.body) ? s.body : s.body ? [s.body] : [],
  }));
  if (sections.length === 0 && c.body) sections.push({ heading: '', paragraphs: c.body.split(/\n{2,}/) });
  const relatedHref = c.relatedSupportHref ?? c.relatedMoneyHref;
  const relatedLabel = c.relatedSupportLabel ?? c.relatedMoneyLabel;
  return {
    kind,
    href: c.href ?? path,
    title: c.h1 ?? c.navTitle ?? c.metaTitle ?? '',
    description: c.metaDescription ?? '',
    image: c.heroImage ?? null,
    intro: c.intro ?? (c.hook ? [c.hook] : []),
    atAGlance: c.atAGlance ?? [],
    highlights: c.highlights ?? [],
    sections,
    verdict: c.verdict ?? null,
    faqs: c.faqs ?? [],
    related: relatedHref && relatedLabel ? { href: relatedHref, label: relatedLabel } : null,
  };
}

export function MasterContentPage({
  content,
  siteName,
  tours,
  moreLinks,
}: {
  content: MasterContent;
  siteName: string;
  tours: TourDoc[];
  moreLinks: LinkItem[];
}) {
  const isCompare = content.kind === 'compare';
  return (
    <>
      <Hero imageUrl={content.image?.src ?? null} title={content.title} subtitle={content.description} />

      {/* Intro + at a glance */}
      {content.intro.length > 0 || content.atAGlance.length > 0 || content.highlights.length > 0 ? (
        <section className="bg-cream py-14 sm:py-16">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-6 sm:px-10 lg:grid-cols-[1.6fr_1fr]">
            <div className="space-y-4 text-[17px] leading-relaxed text-ink-muted">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-deep">
                {isCompare ? 'Compare & book' : 'Plan your visit'}
              </p>
              {content.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {content.atAGlance.length > 0 || content.highlights.length > 0 ? (
              <aside className="h-fit rounded-[22px] border border-ink/5 bg-paper p-6 shadow-card-soft">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-deep">At a glance</p>
                <dl className="mt-4 divide-y divide-line">
                  {content.atAGlance.map((item) => (
                    <div key={item.label} className="flex items-start justify-between gap-4 py-3">
                      <dt className="text-sm font-semibold text-ink">{item.label}</dt>
                      <dd className="text-right text-sm text-ink-muted">{item.value}</dd>
                    </div>
                  ))}
                  {content.highlights.map((h) => (
                    <div key={h} className="py-3 text-sm text-ink">
                      {h}
                    </div>
                  ))}
                </dl>
              </aside>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Tours */}
      {isCompare && tours.length > 0 ? (
        <section className="bg-cream-deep py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle eyebrow="Tours we compared" title={['Top ', 'Picks', ` for ${content.title}`]} />
            <div className="mt-12">
              <TourGrid tours={tours} />
            </div>
          </div>
        </section>
      ) : null}

      {/* Body sections */}
      {content.sections.length > 0 ? (
        <section className="bg-cream py-16 sm:py-20">
          <div className="mx-auto max-w-3xl space-y-12 px-6">
            {content.sections.map((section, i) => (
              <div key={`${section.heading}-${i}`}>
                {section.heading ? (
                  <h2 className="font-hero text-[24px] font-extrabold leading-snug text-ink sm:text-[28px]">{section.heading}</h2>
                ) : null}
                <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-ink-muted">
                  {section.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Verdict: dark band like How We Choose */}
      {content.verdict ? (
        <section className="bg-ink py-16 text-cream-text sm:py-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">Our Verdict</p>
            <h2 className="mt-3 font-hero text-[28px] font-black leading-tight sm:text-[36px]">{content.verdict.heading}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-cream-text/80">{content.verdict.body}</p>
          </div>
        </section>
      ) : null}

      {/* Tours for planning pages sit after the text */}
      {!isCompare && tours.length > 0 ? (
        <section className="bg-cream-deep py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle eyebrow={`Book with ${siteName}`} title={['Tours That ', 'Fit', ' This Plan']} />
            <div className="mt-12">
              <TourGrid tours={tours} />
            </div>
          </div>
        </section>
      ) : null}

      <FaqBlock faqs={content.faqs} title={['Your ', 'Questions', ', Answered']} />

      {/* Keep planning */}
      <section className="border-t border-line bg-cream py-14">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
          <SectionTitle eyebrow="Keep planning" title={['More From ', siteName, '']} />
          {content.related ? (
            <div className="mt-8 flex justify-center">
              <Link
                href={content.related.href}
                className="inline-flex h-12 items-center rounded-full bg-brand px-7 text-sm font-bold text-cream transition-colors hover:bg-brand-dark"
              >
                {content.related.label} →
              </Link>
            </div>
          ) : null}
          <div className="mt-8">
            <ChipRow items={moreLinks.filter((l) => l.href !== content.href)} />
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Tours hub                                                            */
/* ------------------------------------------------------------------ */

export function MasterToursPage({
  siteName,
  heroImage,
  title,
  subtitle,
  tours,
  categories,
  guides,
}: {
  siteName: string;
  heroImage: string;
  title: string;
  subtitle: string;
  tours: TourDoc[];
  categories: LinkItem[];
  guides: LinkItem[];
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${siteName}: ${title}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: tours.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.title })),
    },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero imageUrl={heroImage} title={title} subtitle={subtitle} />
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Filter by category" title={['Choose Your ', 'Experience', '']} />
          <div className="mt-8">
            <ChipRow items={[{ label: 'All Tours', href: '/tours' }, ...categories]} />
          </div>
          <p className="mt-10 text-center text-ink/70">All {tours.length} tours</p>
          <div className="mt-8">
            <TourGrid tours={tours} />
          </div>
        </div>
      </section>
      {guides.length > 0 ? (
        <section className="border-t border-line bg-cream-deep py-14">
          <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
            <SectionTitle eyebrow="Not sure which to pick?" title={['Read Our ', 'Guides', '']} />
            <div className="mt-8">
              <ChipRow items={guides} />
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Blog / guides hub                                                    */
/* ------------------------------------------------------------------ */

export interface GuideItem {
  href: string;
  title: string;
  description: string;
  image?: { src: string; alt: string };
  kind: 'compare' | 'plan';
}

function GuideCard({ guide }: { guide: GuideItem }) {
  return (
    <Link
      href={guide.href}
      className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-ink/5 bg-paper shadow-card-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-media">
        {guide.image ? (
          <SafeImage
            src={guide.image.src}
            alt={guide.image.alt}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-deep">
          {guide.kind === 'compare' ? 'Compare & book' : 'Plan your visit'}
        </span>
        <h3 className="mt-2 font-hero text-[18px] font-extrabold leading-snug text-ink group-hover:text-brand">{guide.title}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-[15px] leading-relaxed text-ink-muted">{guide.description}</p>
        <span className="mt-4 text-sm font-bold text-brand">Read the guide →</span>
      </div>
    </Link>
  );
}

export function MasterGuidesPage({
  siteName,
  heroImage,
  guides,
}: {
  siteName: string;
  heroImage: string;
  guides: GuideItem[];
}) {
  const plan = guides.filter((g) => g.kind === 'plan');
  const compare = guides.filter((g) => g.kind === 'compare');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${siteName} Blog`,
    hasPart: guides.map((g) => ({ '@type': 'Article', headline: g.title, description: g.description })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero imageUrl={heroImage} title={`${siteName} Blog`} subtitle="Honest comparisons and planning tips, in plain words." />
      {plan.length > 0 ? (
        <section className="bg-cream py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle eyebrow="Plan your visit" title={['Planning ', 'Guides', '']} />
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {plan.map((g) => (
                <GuideCard key={g.href} guide={g} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
      {compare.length > 0 ? (
        <section className="bg-cream-deep py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle eyebrow="Compare & book" title={['Tour ', 'Comparisons', '']} />
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {compare.map((g) => (
                <GuideCard key={g.href} guide={g} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ + Contact                                                         */
/* ------------------------------------------------------------------ */

export function MasterFAQPage({
  siteName,
  city,
  heroImage,
  faqs,
}: {
  siteName: string;
  city: string;
  heroImage: string;
  faqs: { question: string; answer: string }[];
}) {
  return (
    <>
      <Hero imageUrl={heroImage} title={`Questions About ${city}?`} subtitle="We've got answers" />
      <FaqBlock faqs={faqs} eyebrow={`${siteName} FAQ`} title={['Common ', 'Questions', '']} />
      <section className="border-t border-line bg-cream-deep py-14 text-center">
        <p className="text-base text-ink-muted">Still have a question?</p>
        <Link
          href="/contact"
          className="mt-4 inline-flex h-12 items-center rounded-full bg-brand px-7 text-sm font-bold text-cream transition-colors hover:bg-brand-dark"
        >
          Contact {siteName}
        </Link>
      </section>
    </>
  );
}

export function MasterContactPage({
  siteName,
  city,
  heroImage,
  email,
  faqs,
}: {
  siteName: string;
  city: string;
  heroImage: string;
  email: string;
  faqs: { question: string; answer: string }[];
}) {
  return (
    <>
      <Hero imageUrl={heroImage} title="Get In Touch" subtitle="We'd love to hear from you" />
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow={siteName} title={['Contact ', 'Us', '']} />
          <div className="mb-16 mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h3 className="mb-6 font-display text-2xl font-bold text-ink">Ways to Reach Us</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-gold-deep">Email</p>
                  <a href={`mailto:${email}`} className="mt-1 block text-lg text-ink hover:text-brand">
                    {email}
                  </a>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-gold-deep">Location</p>
                  <p className="mt-1 text-lg text-ink">{city}, Italy</p>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-gold-deep">Bookings</p>
                  <p className="mt-1 text-base text-ink-muted">
                    Tours are booked with our partner platforms. For a booking question, please contact the platform you booked with.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="mb-6 font-display text-2xl font-bold text-ink">Send a Message</h3>
              <p className="text-base leading-relaxed text-ink-muted">
                Have a question about a tour, a suggestion for this site, or feedback on a tour you took? Email us and we will get back to you.
              </p>
              <a
                href={`mailto:${email}`}
                className="mt-6 inline-flex h-12 items-center rounded-full bg-brand px-7 text-sm font-bold text-cream transition-colors hover:bg-brand-dark"
              >
                Email {siteName}
              </a>
            </div>
          </div>
          {faqs.length > 0 ? (
            <div className="border-t border-line pt-12">
              <h3 className="mb-6 font-display text-2xl font-bold text-ink">Quick Answers</h3>
              <div className="space-y-4">
                {faqs.slice(0, 3).map((item) => (
                  <div key={item.question} className="rounded-control bg-cream-deep p-4">
                    <p className="mb-2 font-semibold text-ink">{item.question}</p>
                    <p className="text-ink/70">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Areas / neighbourhoods hub + single area                             */
/* ------------------------------------------------------------------ */

export interface AreaCardItem {
  name: string;
  description: string;
  href: string;
  image?: { src: string; alt: string };
}

function AreaCard({ area }: { area: AreaCardItem }) {
  return (
    <Link
      href={area.href}
      className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-ink/5 bg-paper shadow-card-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      {area.image ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-media">
          <SafeImage
            src={area.image.src}
            alt={area.image.alt}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-hero text-[18px] font-extrabold leading-snug text-ink group-hover:text-brand">{area.name}</h3>
        <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-muted">{area.description}</p>
        <span className="mt-4 text-sm font-bold text-brand">Learn more →</span>
      </div>
    </Link>
  );
}

export function MasterAreasPage({
  siteName,
  heroImage,
  title,
  subtitle,
  eyebrow,
  sectionTitle,
  areas,
  tours,
  guides,
}: {
  siteName: string;
  heroImage: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  /** [before, green word, after] */
  sectionTitle: [string, string, string];
  areas: AreaCardItem[];
  tours: TourDoc[];
  guides: LinkItem[];
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${siteName}: ${title}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: areas.map((a, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: { '@type': 'Place', name: a.name, description: a.description },
      })),
    },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero imageUrl={heroImage} title={title} subtitle={subtitle} />
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow={eyebrow} title={sectionTitle} />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((a) => (
              <AreaCard key={`${a.name}-${a.href}`} area={a} />
            ))}
          </div>
        </div>
      </section>
      {tours.length > 0 ? (
        <section className="bg-cream-deep py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle eyebrow={`Book with ${siteName}`} title={['Tours That ', 'Cover', ' These Areas']} />
            <div className="mt-12">
              <TourGrid tours={tours} />
            </div>
          </div>
        </section>
      ) : null}
      {guides.length > 0 ? (
        <section className="border-t border-line bg-cream py-14">
          <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
            <SectionTitle eyebrow="Keep planning" title={['Read Our ', 'Guides', '']} />
            <div className="mt-8">
              <ChipRow items={guides} />
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

export function MasterAreaPage({
  siteName,
  heroImage,
  place,
  area,
  tours,
  otherAreas,
  guides,
}: {
  siteName: string;
  heroImage: string;
  place: string;
  area: { name: string; description: string };
  tours: TourDoc[];
  otherAreas: LinkItem[];
  guides: LinkItem[];
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: `${area.name}, ${place}`,
    description: area.description,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero imageUrl={heroImage} title={`${area.name}, ${place}`} subtitle={area.description} />
      <section className="bg-cream py-14 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-4 px-6 text-[17px] leading-relaxed text-ink-muted">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-deep">Plan your visit</p>
          <p>
            {place} is a large site, so it helps to decide in advance which areas matter most to you. Use the guides below to plan
            your route and how much time you need, or pick a guided tour that covers the main highlights.
          </p>
        </div>
      </section>
      {tours.length > 0 ? (
        <section className="bg-cream-deep py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle eyebrow={`Book with ${siteName}`} title={['Tours of ', place, '']} />
            <div className="mt-12">
              <TourGrid tours={tours} />
            </div>
          </div>
        </section>
      ) : null}
      <section className="border-t border-line bg-cream py-14">
        <div className="mx-auto max-w-[1200px] space-y-12 px-6 sm:px-10">
          {otherAreas.length > 0 ? (
            <div>
              <SectionTitle eyebrow="Explore more" title={['More ', 'Areas', ` of ${place}`]} />
              <div className="mt-8">
                <ChipRow items={otherAreas} />
              </div>
            </div>
          ) : null}
          {guides.length > 0 ? (
            <div>
              <SectionTitle eyebrow="Keep planning" title={['Read Our ', 'Guides', '']} />
              <div className="mt-8">
                <ChipRow items={guides} />
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
