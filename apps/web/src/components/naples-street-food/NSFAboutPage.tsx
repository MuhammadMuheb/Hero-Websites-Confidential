import { NSFAuthorBox, NSFFooter, NSFHeader } from './NSFShared';

export function NSFAboutPage() {
  return (
    <div className="nsf-scope">
      <NSFHeader />
      <section className="border-b border-line py-14 sm:py-20">
        <div className="mx-auto max-w-[760px] px-6 sm:px-14">
          <h1 className="font-display text-[34px] font-bold leading-[1.12] tracking-tight text-ink sm:text-[48px]">
            About Naples Street Food
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-muted">
            Naples Street Food is an independent guide to Naples&apos; most authentic food experiences. Every tour listed here has been personally visited and tested to ensure it represents real Neapolitan food culture, not tourist traps.
          </p>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-muted">
            We&apos;re not affiliated with any restaurant, tour operator, or booking platform. Our recommendations are based solely on first-hand experience and what actually represents Naples&apos; street food identity.
          </p>
        </div>
      </section>
      <NSFAuthorBox />
      <NSFFooter />
    </div>
  );
}
