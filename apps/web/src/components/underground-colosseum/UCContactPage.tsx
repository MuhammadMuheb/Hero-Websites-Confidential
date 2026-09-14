import Link from '@/components/NetworkLink';
import { SafeImage } from '@/components/SafeImage';
import { UCFooter, UCHeader } from './UCShared';
import { HERO_IMAGE } from '@/lib/underground-colosseum';

/**
 * Contact page — per the blueprint's §07 spec: a contact method plus the
 * affiliate disclosure statement covering all three partner programs. A
 * mailto link rather than a submission form, since there's no backend here
 * to actually receive form submissions — a form that silently goes nowhere
 * would be worse than an honest mailto.
 *
 * Revamped from a single mailto button + disclosure paragraph into a full
 * credibility section: the absence of a form is a deliberate honesty-first
 * choice (see the file header above and the blueprint's §2 note on About &
 * Contact), so this page now says that plainly instead of just quietly
 * routing everything through one link — plus a routed-by-topic contact
 * grid, a response-time trust strip mirroring About's stat grid, and a
 * restyled disclosure card with the three partners called out explicitly.
 */

const CONTACT_CHANNELS = [
  {
    subject: 'Question about a tour',
    label: 'General Questions',
    detail: 'Which tour fits your dates, group size, or budget — ask before you book.',
    icon: (
      <>
        <path d="M12 18h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.9.4-1 1-1 1.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      </>
    ),
  },
  {
    subject: 'Spotted something out of date',
    label: 'Spotted an Error',
    detail: 'Wrong price, changed inclusion, or a broken link — flag it and we fix it fast.',
    icon: (
      <>
        <path d="M12 9v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 16.5h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M10.3 4.4 2.9 17a2 2 0 0 0 1.7 3h14.8a2 2 0 0 0 1.7-3L13.7 4.4a2 2 0 0 0-3.4 0Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </>
    ),
  },
  {
    subject: 'Partnership inquiry',
    label: 'Partnerships & Press',
    detail: 'Tour operators, ticketing platforms, and journalists — reach out here.',
    icon: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M3 12h18" stroke="currentColor" strokeWidth="1.6" />
      </>
    ),
  },
];

const RESPONSE_STATS = [
  { value: '24h', label: 'Typical reply time', detail: 'On weekdays — sooner for time-sensitive booking questions.' },
  { value: '1', label: 'Person reads every email', detail: 'No support queue, no outsourced inbox.' },
  { value: '0', label: 'Auto-responders', detail: 'Every reply is written for your specific question.' },
  { value: '3', label: 'Partners fully disclosed', detail: 'GetYourGuide, Viator, and Tiqets — named, not buried in fine print.' },
];

function mailtoWithSubject(subject: string) {
  return `mailto:hello@undergroundcolosseum.com?subject=${encodeURIComponent(subject)}`;
}

export function UCContactPage() {
  return (
    <div className="bg-white">
      <UCHeader toursHref="/#tours" planHref="/#plan-your-visit" faqHref="/#faq" ctaHref="/#featured-tours" />

      <section className="border-b border-line">
        <div className="mx-auto max-w-[1200px] px-6 pt-6 sm:px-14">
          <nav aria-label="Breadcrumb" className="text-sm text-faint">
            <Link href="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-ink-muted">Contact</span>
          </nav>
        </div>
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 px-6 py-10 sm:px-14 sm:py-14 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Get in touch</p>
            <h1 className="mt-3 font-sans text-[34px] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-[42px]">
              Questions About Booking? We Read Every Message Ourselves
            </h1>
            <p className="mt-5 max-w-[52ch] text-[16px] leading-relaxed text-ink-muted">
              Spotted something out of date, unsure which tour fits your trip, or have a partnership question? Email
              us directly — there&rsquo;s no ticket queue and no auto-reply between you and an answer.
            </p>

            <a
              href="mailto:hello@undergroundcolosseum.com"
              className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-[6px] bg-accent px-6 text-sm font-bold text-white transition-colors hover:bg-accent-hover"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
                <path d="m3.5 6 8.5 7 8.5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              hello@undergroundcolosseum.com
            </a>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-media">
            <SafeImage
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              fill
              sizes="(min-width: 1024px) 560px, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper-tint py-14 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">What to expect</p>
          <h2 className="mt-2 font-sans text-[26px] font-extrabold leading-snug tracking-tight text-ink sm:text-[32px]">
            A Real Person, Not a Support Queue
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {RESPONSE_STATS.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-line bg-white p-5 text-center">
                <p className="font-sans text-[28px] font-extrabold leading-none tracking-tight text-accent">{stat.value}</p>
                <p className="mt-2 text-[13px] font-bold leading-snug text-ink">{stat.label}</p>
                <p className="mt-1.5 text-[12px] leading-snug text-faint">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line py-14 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Route your message</p>
          <h2 className="mt-2 font-sans text-[26px] font-extrabold leading-snug tracking-tight text-ink sm:text-[32px]">
            What Are You Reaching Out About?
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {CONTACT_CHANNELS.map((channel) => (
              <a
                key={channel.label}
                href={mailtoWithSubject(channel.subject)}
                className="group flex flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(26,26,26,0.08)]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/8 text-accent">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    {channel.icon}
                  </svg>
                </span>
                <h3 className="mt-4 font-sans text-[16px] font-bold leading-snug text-ink">{channel.label}</h3>
                <p className="mt-1.5 flex-1 text-sm text-ink-muted">{channel.detail}</p>
                <span className="mt-4 text-sm font-bold text-accent group-hover:underline">Email us &rarr;</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper-tint py-14 sm:py-16">
        <div className="mx-auto max-w-[760px] px-6 sm:px-14">
          <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
                  <path d="m8 12.5 2.5 2.5L16 9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h2 className="font-sans text-[17px] font-bold text-ink">Why there&rsquo;s no contact form here</h2>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
              A submission form implies something is queued, tracked, and answered by a team. That&rsquo;s not how
              this site works — it&rsquo;s one person, and a direct email is the honest version of that. A form that
              quietly went nowhere would be worse than no form at all, so we didn&rsquo;t build one.
            </p>
          </div>
        </div>
      </section>

      <section id="disclosure" className="scroll-mt-[85px] border-b border-line py-14 sm:py-16">
        <div className="mx-auto max-w-[760px] px-6 sm:px-14">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Transparency</p>
          <h2 className="mt-2 font-sans text-[26px] font-extrabold leading-snug tracking-tight text-ink sm:text-[32px]">
            How This Site Makes Money
          </h2>

          <div className="mt-8 rounded-2xl border border-line bg-paper-tint p-6 sm:p-8">
            <h3 className="font-sans text-[18px] font-bold text-ink">Affiliate Disclosure</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {['GetYourGuide', 'Viator', 'Tiqets'].map((partner) => (
                <span key={partner} className="rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold text-ink-muted">
                  {partner}
                </span>
              ))}
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
              Underground Colosseum participates in affiliate programs with the three partners above. When you book a
              tour through an outbound link on this site, we may earn a commission at no extra cost to you. This site
              independently compares tours across all three platforms and does not accept payment for placement — a
              tour appearing higher on a comparison reflects our own editorial judgment, not a sponsorship
              arrangement.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <div className="flex flex-col items-start gap-6 rounded-2xl border border-line bg-paper-tint p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h2 className="font-sans text-[20px] font-extrabold leading-snug tracking-tight text-ink">
                Ready to Pick a Tour?
              </h2>
              <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-ink-muted">
                Read the full independence story, or jump straight into the flagship comparison of every
                underground and arena-floor operator.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                href="/about"
                className="flex h-11 items-center justify-center whitespace-nowrap rounded-[6px] border border-accent px-6 text-sm font-medium text-accent transition-colors hover:bg-accent/8"
              >
                About This Site
              </Link>
              <Link
                href="/underground-arena-floor-tour"
                className="flex h-11 items-center justify-center whitespace-nowrap rounded-[6px] bg-accent px-6 text-sm font-bold text-white transition-colors hover:bg-accent-hover"
              >
                Compare Underground Tours
              </Link>
            </div>
          </div>
        </div>
      </section>

      <UCFooter />
    </div>
  );
}
