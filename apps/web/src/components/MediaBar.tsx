/**
 * Deliberately generic, representative publication-style names — not real
 * outlets. Street Food Rome hasn't actually been featured by any press yet,
 * so naming real, identifiable news organizations here would be a false
 * endorsement claim, not a design choice. Swap these for real mentions once
 * they exist.
 *
 * Each entry gets its own distinct typographic treatment (mixing two serif
 * families, italics, weight, case and tracking) so the row reads like a set
 * of real, individually-designed mastheads rather than one uniform list.
 * Kept to 10 — enough for two clean rows without crowding.
 */
const OUTLETS: { name: string; className: string }[] = [
  { name: 'Rome Food Weekly', className: 'font-display text-xl font-semibold' },
  { name: 'The Culinary Explorer', className: 'font-playfair text-lg italic' },
  { name: 'Global Foodie Digest', className: 'font-sans text-base font-extrabold' },
  { name: 'Taste of Italy Review', className: 'font-display text-lg font-medium' },
  { name: 'Wanderlust Kitchen', className: 'font-sans text-base font-bold lowercase tracking-tight' },
  { name: 'The Local Table', className: 'font-display text-lg font-bold' },
  { name: 'Trattoria Times', className: 'font-playfair text-lg font-bold italic' },
  { name: 'The Roaming Fork', className: 'font-sans text-base font-extrabold italic' },
  { name: 'Italia Uncovered', className: 'font-sans text-sm font-black uppercase tracking-wide' },
  { name: 'Slow Food Chronicle', className: 'font-display text-lg italic' },
];

export function MediaBar() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-14">
        {/* 5-column grid at desktop (10 items, 2 clean rows); fewer columns on
            smaller screens so the whitespace-nowrap names never fight for
            space and overlap. */}
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 items-center justify-items-center gap-x-6 gap-y-8 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-5 lg:gap-x-10 lg:gap-y-10">
          {OUTLETS.map((outlet) => (
            <span
              key={outlet.name}
              className={`text-center text-faint grayscale transition-colors hover:text-ink-muted lg:whitespace-nowrap ${outlet.className}`}
            >
              {outlet.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
