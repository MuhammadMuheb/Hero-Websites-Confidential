const PLATFORMS = [
  { name: 'Viator', href: 'https://www.viator.com' },
  { name: 'GetYourGuide', href: 'https://www.getyourguide.com' },
  { name: 'Tripadvisor', href: 'https://www.tripadvisor.com' },
];

export function TrustPointsSection() {
  return (
    <section className="bg-paper py-10">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-14">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold">Book with trusted platforms</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {PLATFORMS.map((platform) => (
              <a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-ink hover:text-accent transition-colors"
              >
                {platform.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
