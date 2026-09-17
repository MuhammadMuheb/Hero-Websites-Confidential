import { PDTAuthorBox, PDTFooter } from './PDTShared';

export function PDTContactPage() {
  return (
    <div className="pdt-scope">
      <section className="border-b border-line py-14 sm:py-20">
        <div className="mx-auto max-w-[760px] px-6 sm:px-14">
          <h1 className="font-display text-[34px] font-bold leading-[1.12] tracking-tight text-ink sm:text-[48px]">
            Contact
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-muted">
            Have a question about a Pompeii day trip, a trip recommendation that should be on this site, or feedback on a tour you&apos;ve taken? Get in touch.
          </p>
          <div className="mt-8 rounded-media border border-line bg-paper-tint p-6">
            <p className="text-sm text-ink-muted">
              Email us at{' '}
              <a href="mailto:hello@pompeiidaytrip.com" className="font-semibold text-accent hover:underline">
                hello@pompeiidaytrip.com
              </a>
            </p>
          </div>
        </div>
      </section>
      <PDTAuthorBox />
      <PDTFooter />
    </div>
  );
}
