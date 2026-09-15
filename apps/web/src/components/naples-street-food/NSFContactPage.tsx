import { NSFAuthorBox, NSFFooter, NSFHeader } from './NSFShared';

export function NSFContactPage() {
  return (
    <div className="nsf-scope">
      <NSFHeader />
      <section className="border-b border-line py-14 sm:py-20">
        <div className="mx-auto max-w-[760px] px-6 sm:px-14">
          <h1 className="font-display text-[34px] font-bold leading-[1.12] tracking-tight text-ink sm:text-[48px]">
            Contact
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-muted">
            Have a question about a Naples food tour, a tour recommendation that should be on this site, or feedback on a tour you've taken? Get in touch.
          </p>
          <div className="mt-8 rounded-media border border-line bg-paper-tint p-6">
            <p className="text-sm text-ink-muted">
              Email us at{' '}
              <a href="mailto:hello@naplesstreetfood.com" className="font-semibold text-accent hover:underline">
                hello@naplesstreetfood.com
              </a>
            </p>
          </div>
        </div>
      </section>
      <NSFAuthorBox />
      <NSFFooter />
    </div>
  );
}
