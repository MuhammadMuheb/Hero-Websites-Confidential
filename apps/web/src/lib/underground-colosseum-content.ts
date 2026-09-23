/**
 * Real content for every Underground Colosseum page beyond the homepage —
 * the 5 money pages and 6 support pages defined in the site's blueprint
 * (§03 target hierarchy, §07 page templates). Each entry supplies exactly
 * what MoneyPageTemplate.tsx / SupportPageTemplate.tsx need to render a
 * complete, unique page: its own H1, meta title/description, hero image,
 * body sections, and FAQ block — matching the blueprint's requirement that
 * every page ships with unique metadata, an H1, and its own content rather
 * than a shared boilerplate paragraph reworded per page.
 */

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface ContentSection {
  heading: string;
  body: string[];
}

export interface AtAGlanceItem {
  label: string;
  value: string;
}

export interface MoneyPageContent {
  href: string;
  navTitle: string;
  h1: string;
  keyword: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: { src: string; alt: string };
  intro: string[];
  /** Scannable summary box rendered next to the intro — every value here is restated from this page's own sections/verdict below, not new information, so the page reads as denser without introducing anything unverified. */
  atAGlance: AtAGlanceItem[];
  sections: ContentSection[];
  verdict: { heading: string; body: string };
  faqs: FaqEntry[];
  relatedSupportHref: string;
  relatedSupportLabel: string;
}

export interface SupportPageContent {
  href: string;
  navTitle: string;
  h1: string;
  keyword: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: { src: string; alt: string };
  sections: ContentSection[];
  faqs: FaqEntry[];
  relatedMoneyHref: string;
  relatedMoneyLabel: string;
}

export const MONEY_PAGE_CONTENT: MoneyPageContent[] = [
  {
    href: '/money/underground-arena-floor-tour',
    navTitle: 'Underground & Arena Floor Tour',
    h1: 'Underground & Arena Floor Tour: The Full Comparison',
    keyword: 'colosseum underground tour',
    metaTitle: 'Colosseum Underground Tour — Compare Every Arena Floor Option',
    metaDescription:
      'Every Colosseum underground and arena-floor tour compared side by side — what each one actually includes, how far ahead to book, and which is worth the extra cost.',
    heroImage: { src: 'https://images.unsplash.com/photo-1580502255216-32c910c0840c', alt: 'Close-up of the Colosseum’s arched tiers glowing gold at sunset' },
    intro: [
      'Only a small fraction of Colosseum visitors ever see the hypogeum — the underground network of tunnels, animal cages, and lift shafts beneath the arena floor. Every operator that sells access to it (GetYourGuide, Viator, Tiqets) is booking the same restricted, timed entry through the Colosseum authority; what differs is the guide, the group size, and whether the arena floor itself is included.',
      "This page compares the underground tours actually worth booking, so you're not choosing blind between near-identical listings.",
    ],
    atAGlance: [
      { label: 'Price band', value: '€50–110' },
      { label: 'Group size', value: '12–25 (private: 6–10)' },
      { label: 'Arena floor', value: 'Add-on on some tours — confirm before booking' },
      { label: 'Book by', value: '2–3 weeks ahead in peak season' },
    ],
    sections: [
      {
        heading: 'What "underground access" actually includes',
        body: [
          'Every underground tour includes entry through the Gladiator\'s Gate into the hypogeum — the corridors and mechanical lift shafts once used to move animals and performers up into the arena. Most itineraries pair this with standard Colosseum entry (tiers 1 and 2) plus the Roman Forum and Palatine Hill on the same ticket.',
          'Arena floor access is a separate add-on on some tours and bundled by default on others — check this specifically, since it\'s the single biggest difference in what you\'ll actually see and the main reason prices vary from €50 to €110+ across otherwise similar listings.',
        ],
      },
      {
        heading: 'Small group vs. larger group underground tours',
        body: [
          'Underground groups are capped much smaller than standard Colosseum tours regardless of operator — the tunnels themselves are narrow and the Colosseum authority limits how many people move through at once. Expect 12–25 people even on a "small group" underground tour, and closer to 6–10 on tours explicitly marketed as private or semi-private.',
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: 'If arena-floor access matters to you — and for most first-time visitors, it\'s the actual reason to book underground at all — confirm it\'s included before you compare on price. A slightly more expensive tour with arena floor included usually beats a cheaper one that only covers the hypogeum corridors.',
    },
    faqs: [
      {
        question: 'Can you actually stand on the arena floor?',
        answer: 'Yes — only on tours that specifically include arena-floor access, a separate add-on from standard Colosseum entry on some listings.',
      },
      {
        question: 'How far ahead should I book underground access?',
        answer: 'Underground and arena-floor slots are limited and sell out; book at least 2–3 weeks ahead in peak season (May–September).',
      },
      {
        question: 'Do I need my passport?',
        answer: 'Yes — a passport or valid photo ID is mandatory for underground access due to Colosseum security regulations, and you can be refused entry without one.',
      },
    ],
    relatedSupportHref: '/support/how-underground-access-really-works',
    relatedSupportLabel: 'How Underground Access Really Works',
  },
  {
    href: '/money/skip-the-line-colosseum-tickets',
    navTitle: 'Skip-the-Line Tickets',
    h1: 'Skip-the-Line Colosseum Tickets, Explained',
    keyword: 'skip the line colosseum',
    metaTitle: 'Skip-the-Line Colosseum Tickets — What Each Ticket Type Actually Skips',
    metaDescription:
      'Skip-the-line Colosseum tickets compared: what they actually bypass, which ticket types include the Forum and Palatine Hill, and when skip-the-line isn\'t enough.',
    heroImage: { src: 'https://images.unsplash.com/photo-1699012462295-bace478f27bc', alt: 'Crowds of visitors gathered outside the Colosseum on a sunny day' },
    intro: [
      '"Skip the line" gets used loosely across every ticket platform, and it doesn\'t mean the same thing on every listing. At the Colosseum specifically, it usually means skipping the security/ticket-collection queue at the main entrance — not necessarily a faster route through the monument itself once you\'re inside.',
    ],
    atAGlance: [
      { label: 'Ticket types', value: 'Full Experience · Fast Track · Guided' },
      { label: 'Combined sites', value: 'Colosseum + Forum + Palatine Hill' },
      { label: 'Book at the gate?', value: 'No — online only, in advance' },
      { label: 'Queue skipped', value: 'General-admission line (45–90 min peak season)' },
    ],
    sections: [
      {
        heading: 'The three real ticket types',
        body: [
          'Full Experience tickets cover the Colosseum, Roman Forum, and Palatine Hill on one combined entry, valid for a single visit to each site within 24 hours. Fast Track tickets are the same combined entry with a reserved, skip-the-line time slot at the Colosseum specifically. Guided skip-the-line tours bundle the same access with a live guide and headset — worth it if you want context, not just faster entry.',
        ],
      },
      {
        heading: 'Where skip-the-line still means waiting',
        body: [
          'Even with a skip-the-line ticket, expect a short security screening line at the entrance — that part isn\'t skippable for anyone. What you\'re actually avoiding is the general-admission ticket queue, which can run 45–90 minutes in peak season.',
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: 'A guided skip-the-line tour is the better value over a bare fast-track ticket for most first-timers — the price difference is usually small, and a good guide adds more than the extra 20–30 minutes you save by skipping the line alone.',
    },
    faqs: [
      {
        question: "What's the difference between skip-the-line and arena-floor access?",
        answer: 'Skip-the-line only shortens entry queues; arena-floor access is a separate, timed add-on that lets you walk the reconstructed floor itself.',
      },
      {
        question: 'Does skip-the-line include the Roman Forum and Palatine Hill?',
        answer: 'Most combined tickets do — check that the listing says "Colosseum, Forum & Palatine" rather than Colosseum-only.',
      },
      {
        question: 'Can I buy skip-the-line tickets at the gate?',
        answer: 'No — skip-the-line and fast-track slots must be booked in advance online; on-site ticket windows only sell standard, unreserved entry when available.',
      },
    ],
    relatedSupportHref: '/support/opening-hours-beating-the-crowds',
    relatedSupportLabel: 'Opening Hours & Beating the Crowds',
  },
  {
    href: '/money/private-vs-group-colosseum-tour',
    navTitle: 'Private vs. Group Tour',
    h1: 'Private vs. Group Colosseum Tour: Which Fits You?',
    keyword: 'private colosseum tour',
    metaTitle: 'Private vs. Group Colosseum Tour — Price, Pace & Who Each Suits',
    metaDescription:
      'Private and group Colosseum tours compared on price, group size, and pace — a straight breakdown of who each format actually suits.',
    heroImage: { src: 'https://images.unsplash.com/photo-1567613747183-fcc1e30a18eb', alt: 'The Colosseum’s curved travertine facade seen up close' },
    intro: [
      'The itinerary is usually identical between a group and a private version of the same Colosseum tour — same sites, same access level. What changes is who else is standing next to you, how much the guide can adapt to your questions, and the price per person.',
    ],
    atAGlance: [
      { label: 'Group tour price', value: '€50–90 / person' },
      { label: 'Private tour price', value: '€200–300+ (up to 6 people)' },
      { label: 'Semi-private', value: '6–10 people, mid-range price' },
      { label: 'Pace', value: 'Fixed schedule (group) vs. flexible (private)' },
    ],
    sections: [
      {
        heading: 'Group tours: the default for most visitors',
        body: [
          'Standard group tours run 15–30 people per guide, cost the least per person (typically €50–90), and follow a fixed script and pace. Fine for most travelers, less fine if you have mobility needs, young kids who need frequent breaks, or want to linger somewhere the group has already moved on from.',
        ],
      },
      {
        heading: 'Private tours: pace and flexibility, at a price',
        body: [
          'Private tours cost roughly 2–4x a group seat (often €200–300+ for a small group of up to 6), but you set the pace, can skip sections that don\'t interest you, and get a guide who answers off-script questions properly. Worth it for anniversary trips, families with very young kids, or travelers who specifically want the underground plus extra time on the arena floor without being rushed along by a group of 25.',
        ],
      },
      {
        heading: 'Semi-private: the middle ground',
        body: [
          'Some operators sell semi-private slots capped at 6–10 people at a price between the two — a reasonable option if pure private is out of budget but you still want a smaller group than standard.',
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: 'Book group for a straightforward first visit on a budget; book private specifically when you have a reason to need the flexibility — mobility needs, a tight schedule, or wanting real one-on-one time with the guide on underground details.',
    },
    faqs: [
      {
        question: 'What\'s the difference between a group tour and a private tour?',
        answer: 'The itinerary is the same for both — on a private tour you get a dedicated guide and set the pace yourself, rather than following a fixed group schedule.',
      },
      {
        question: 'Is a private tour worth it for two people?',
        answer: 'Usually only if flexibility matters more than cost to you — for two adults with no special needs, a small group tour covers the same ground for a fraction of the price.',
      },
      {
        question: 'Can I upgrade from group to private after booking?',
        answer: 'Not directly — you\'ll need to cancel (check the cancellation window) and rebook the private listing, since they\'re separate products with separate guides.',
      },
    ],
    relatedSupportHref: '/support/getting-there-metro-meeting-points',
    relatedSupportLabel: 'Getting There: Metro & Meeting Points',
  },
  {
    href: '/money/colosseum-with-kids-family-guide',
    navTitle: 'With Kids / Family Guide',
    h1: 'Colosseum with Kids: The Family Guide',
    keyword: 'colosseum with kids',
    metaTitle: 'Colosseum with Kids — Age Limits, Kid-Paced Tours & Practical Tips',
    metaDescription:
      'Visiting the Colosseum with kids: age minimums for underground access, kid-paced tour options, and the practical details that actually matter on the day.',
    heroImage: { src: 'https://images.unsplash.com/photo-1689474848417-6462511846f8', alt: 'The Colosseum on a bright afternoon with visitors walking the surrounding street' },
    intro: [
      'The Colosseum is genuinely one of the better ancient sites for kids — gladiators and animal-lift mechanisms hold attention in a way a lot of ruins don\'t. The underground specifically has age and mobility restrictions worth knowing before you book, though, and standard group-tour pacing can wear younger kids out fast.',
    ],
    atAGlance: [
      { label: 'Underground age minimum', value: '6–8 years (operator-dependent)' },
      { label: 'Strollers', value: 'Fine on tiers 1–2, not on the underground route' },
      { label: 'Best time', value: 'Morning slots — cooler and quieter' },
      { label: 'Seating', value: 'Very limited — plan breaks outside' },
    ],
    sections: [
      {
        heading: 'Age limits on underground access',
        body: [
          'Most operators set a minimum age of 6–8 for underground tours — the walkways are narrow, uneven, and involve stairs with no lift access in several sections. Below that age, standard Colosseum entry (tiers 1–2) has no age restriction and is a better fit.',
        ],
      },
      {
        heading: 'Kid-paced tour options',
        body: [
          'A handful of operators run family-specific departures — smaller groups, more frequent stops, and a guide who frames the history in gladiator-and-arena terms kids actually engage with rather than a standard historical-architecture script.',
        ],
      },
      {
        heading: 'Practical logistics',
        body: [
          'Shade is scarce and stone floors reflect heat — bring water and hats regardless of season. Strollers aren\'t practical on the underground route (stairs, uneven ground) but are fine on standard tiers 1–2. Morning slots are cooler and less crowded than afternoon.',
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: 'For kids under 6, skip underground and do standard Colosseum + Forum instead — it\'s less restrictive and plenty engaging. For 8+, a kid-paced underground tour is worth the small premium over a standard group slot.',
    },
    faqs: [
      {
        question: 'Is the underground tour suitable for young kids?',
        answer: 'Most operators set a minimum age around 6–8 for underground routes; consider a standard tiers 1–2 visit instead for younger children.',
      },
      {
        question: 'Are strollers allowed inside the Colosseum?',
        answer: 'Strollers are fine on the standard tiers but impractical on the underground route, which involves stairs and uneven surfaces with no lift access in places.',
      },
      {
        question: 'Is there anywhere to sit down inside?',
        answer: 'Seating is limited — most of the interior is standing/walking only, so budget for breaks outside the monument if you\'re visiting with young children.',
      },
    ],
    relatedSupportHref: '/colosseum-forum-palatine-itinerary',
    relatedSupportLabel: 'Colosseum + Forum + Palatine Itinerary',
  },
  {
    href: '/money/best-colosseum-tour-by-visitor-type',
    navTitle: 'Best Tour by Visitor Type',
    h1: 'The Best Colosseum Tour, by Visitor Type',
    keyword: 'best colosseum tour',
    metaTitle: 'Best Colosseum Tour for You — First-Timers, History Buffs & More',
    metaDescription:
      'Which Colosseum tour actually fits you: first-timers, history buffs, short-on-time visitors, budget travelers, and evening visitors, each matched to the right ticket type.',
    heroImage: { src: 'https://images.unsplash.com/photo-1552432552-06c0b0a94dda', alt: 'Wide view of the Colosseum under a sweeping cloudy sky' },
    intro: [
      '"Best" depends entirely on what you\'re optimizing for. Instead of one generic recommendation, here\'s the tour type that actually fits five common situations.',
    ],
    atAGlance: [
      { label: 'Visitor types covered', value: 'First-timers · History buffs · Short on time · Budget · Evening' },
      { label: 'Typical length', value: '90 min (self-paced) to a half-day combo' },
      { label: 'Decide by', value: 'Time, budget, or depth of interest' },
      { label: 'Not recommended', value: 'Picking whatever ranks highest on a review aggregator' },
    ],
    sections: [
      {
        heading: 'First-timers',
        body: [
          'A standard guided tour covering the Colosseum, Roman Forum, and Palatine Hill with skip-the-line entry. You get the full historical arc in one 2.5–3 hour outing without needing to plan a return trip.',
        ],
      },
      {
        heading: 'History buffs',
        body: [
          'Go underground. The hypogeum is where the actual staging mechanics of the games happened — trapdoors, animal lifts, gladiator holding cells — and it\'s the detail a standard tour skips entirely.',
        ],
      },
      {
        heading: 'Short on time',
        body: [
          'A self-paced audio-guide ticket with fast-track entry. No fixed schedule to match, and you control how long you spend at each section — ideal if you have 90 minutes rather than a half day.',
        ],
      },
      {
        heading: 'Budget travelers',
        body: [
          'Standard fast-track entry without a guide is the cheapest way in that still skips the ticket line — pair it with a free walking-tour app or a printed guide if you still want context.',
        ],
      },
      {
        heading: 'Evening / sunset visitors',
        body: [
          'Special evening openings (seasonal, not year-round) run smaller groups through the monument after standard hours — worth checking availability for if you\'re visiting in summer, when evening slots run latest.',
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: 'Match the tour to the constraint that actually matters to you — time, budget, or depth of interest — rather than picking whatever ranks highest on a review aggregator.',
    },
    faqs: [
      {
        question: 'What\'s the single best Colosseum tour for a first visit?',
        answer: 'A standard guided tour covering the Colosseum, Roman Forum, and Palatine Hill with skip-the-line entry — it covers the essential history without requiring extra planning.',
      },
      {
        question: 'Is a self-guided ticket enough, or do I need a guide?',
        answer: 'A self-guided audio ticket works fine if you\'re short on time or on a budget; a live guide adds real value if the underground or arena floor is involved, since a lot of the context isn\'t on posted signage.',
      },
      {
        question: 'How long should I budget for a Colosseum visit?',
        answer: 'Anywhere from 90 minutes for a self-paced, fast-track visit up to a full half-day if you\'re combining the Colosseum with the Roman Forum and Palatine Hill — match the length to which visitor type above fits you.',
      },
    ],
    relatedSupportHref: '/support/is-the-underground-worth-it',
    relatedSupportLabel: 'Is the Underground Worth It?',
  },
];

export const SUPPORT_PAGE_CONTENT: SupportPageContent[] = [
  {
    href: '/support/how-underground-access-really-works',
    navTitle: 'How Underground Access Really Works',
    h1: 'How Colosseum Underground Access Really Works',
    keyword: 'colosseum underground access',
    metaTitle: 'How Colosseum Underground Access Works: Booking & Entry',
    metaDescription:
      'How Colosseum underground (hypogeum) access actually works: how tickets are released, how entry happens through the Gladiator\'s Gate, and what security requires.',
    heroImage: { src: 'https://images.unsplash.com/photo-1632851853187-dae5c83372dc', alt: 'The Colosseum seen through greenery on a sunny day' },
    sections: [
      {
        heading: 'What the hypogeum actually is',
        body: [
          'The hypogeum is the two-level network of tunnels and chambers built beneath the Colosseum\'s arena floor in the 1st century AD. It held animal cages, gladiator holding areas, and a system of wooden lift shafts and pulleys used to raise scenery, animals, and performers directly onto the arena above — the actual staging mechanism behind the spectacles, hidden from the audience.',
        ],
      },
      {
        heading: 'How you actually get in',
        body: [
          'Underground access is guided-only — there\'s no self-guided ticket for this section, unlike standard tiers. Entry is through the Gladiator\'s Gate, a separate access point from the main tourist entrance, at a fixed time slot tied to your booking. Groups are kept small and are moved through on a schedule set by the Colosseum authority, not the tour operator, which is why timing is strict and latecomers can be turned away.',
        ],
      },
      {
        heading: 'Booking lead time',
        body: [
          'Official Colosseum tickets for underground slots are typically released about 30 days ahead and can sell out within minutes for popular dates. Authorized resellers (GetYourGuide, Viator, Tiqets) often hold separate allocations with more flexible availability and cancellation policies, which is why they\'re usually the more reliable route if official tickets are already gone for your date.',
        ],
      },
      {
        heading: 'What security requires',
        body: [
          'A passport or valid government photo ID is mandatory for underground access specifically — a photo of your ID or a driver\'s license alone is not accepted by most operators. Bags above a certain size may need to be checked or left with the group; airport-style security screening applies at entry.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How far ahead should I book underground access?',
        answer: 'Book at least 2–3 weeks ahead in peak season (May–September); official tickets specifically can sell out within minutes of release, about 30 days before the date.',
      },
      {
        question: 'Can I visit the underground without a guide?',
        answer: 'No — underground access is guided-only; there is no self-guided ticket option for the hypogeum, unlike standard Colosseum tiers.',
      },
      {
        question: 'What happens if I\'m late for my underground slot?',
        answer: 'Groups move on a fixed schedule set by the Colosseum authority — arriving late can mean losing your slot entirely, so plan to arrive at least 20–30 minutes early.',
      },
    ],
    relatedMoneyHref: '/money/underground-arena-floor-tour',
    relatedMoneyLabel: 'Compare Underground & Arena Floor Tours',
  },
  {
    href: '/support/opening-hours-beating-the-crowds',
    navTitle: 'Opening Hours & Beating the Crowds',
    h1: 'Colosseum Opening Hours & Beating the Crowds',
    keyword: 'colosseum opening hours',
    metaTitle: 'Colosseum Opening Hours 2026 & the Best Times to Avoid Crowds',
    metaDescription:
      'Full seasonal Colosseum opening hours plus the actual best times to visit — first entry, last entry, and which months and days run quietest.',
    heroImage: { src: 'https://images.unsplash.com/photo-1552432552-06c0b0a94dda', alt: 'Wide view of the Colosseum under a sweeping cloudy sky' },
    sections: [
      {
        heading: 'Full seasonal hours',
        body: [
          'Opening hours shift several times a year and track sunset rather than a fixed schedule: 8:30am–4:30pm from the last Sunday of October to February 15; 8:30am–5:00pm February 16–March 15; 8:30am–5:30pm March 16 to the last Saturday of March; 8:30am–7:15pm from the last Sunday of March through August 31 (the longest window of the year); 8:30am–7:00pm in September; and 8:30am–6:30pm from October 1 to the last Sunday of October. The monument is closed January 1, May 1, and December 25. Last entry is typically one hour before closing — always confirm the current hours when you book, since these shift slightly year to year.',
        ],
      },
      {
        heading: 'Best time of day',
        body: [
          'First entry (right at 8:30am) and the last two hours before closing are consistently the quietest — most tour groups and day-trippers cluster in the late-morning to early-afternoon window. If your ticket allows a choice of entry time, either end of the day is the better pick.',
        ],
      },
      {
        heading: 'Best time of year',
        body: [
          'Early spring (March) and late autumn (November) get roughly half the visitor volume of peak summer, with more comfortable temperatures than July–August. If your travel dates are flexible, this is the single biggest lever for a less crowded visit.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What time is least crowded at the Colosseum?',
        answer: 'The first entry slot of the day and the last two hours before closing are consistently the quietest, since most groups visit mid-morning through early afternoon.',
      },
      {
        question: 'Is the Colosseum open on public holidays?',
        answer: 'It\'s closed on January 1, May 1, and December 25 — open with standard seasonal hours on other Italian public holidays.',
      },
      {
        question: 'How far in advance does last entry apply?',
        answer: 'Last entry is typically one hour before the posted closing time — arriving right at that cutoff means a rushed visit, so aim to arrive at least 2 hours before closing.',
      },
    ],
    relatedMoneyHref: '/money/skip-the-line-colosseum-tickets',
    relatedMoneyLabel: 'See Skip-the-Line Ticket Options',
  },
  {
    href: '/support/arena-floor-walkthrough-photos',
    navTitle: 'Arena Floor Walkthrough (Photos)',
    h1: 'Arena Floor Walkthrough: What You\'ll Actually See',
    keyword: 'colosseum arena floor',
    metaTitle: 'Colosseum Arena Floor Walkthrough — Photos & What to Expect',
    metaDescription:
      'A first-hand, photo-led walkthrough of the Colosseum arena floor — from the Gladiator\'s Gate to the reconstructed floor and the view most visitors never get.',
    heroImage: { src: 'https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8', alt: 'The Colosseum at dusk seen from the cobblestone approach' },
    sections: [
      {
        heading: 'The approach',
        body: [
          'Arena-floor tours enter through the Gladiator\'s Gate, a separate access point from the general public entrance. The walk in is deliberately atmospheric — narrow stone corridors that open suddenly onto the arena, the same sightline gladiators themselves would have had.',
        ],
      },
      {
        heading: 'Standing on the reconstructed floor',
        body: [
          'The floor itself is a partial modern reconstruction (the original wooden floor is long gone), built to give an accurate sense of the arena\'s actual scale and level — something you can\'t get from the surrounding stands, where the drop to the original arena level is obvious and disorienting. From here, the tiered seating rises around you the way it would have for a 1st-century audience of up to 50,000.',
        ],
      },
      {
        heading: 'Looking down into the hypogeum',
        body: [
          'Sections of the arena floor are open, giving a direct view down into the hypogeum chambers below — the closest most visitors get to understanding how the lift and trapdoor mechanisms actually connected to the show happening above.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is photography allowed on the arena floor?',
        answer: 'Yes — photography is permitted throughout the arena floor and hypogeum sections on guided tours, tripods excepted on most operators\' policies.',
      },
      {
        question: 'Is the arena floor the same as the underground tour?',
        answer: 'They\'re related but distinct — arena floor access is walking on the reconstructed floor itself, while underground/hypogeum access is the tunnel network beneath it; some tours include both, some only one.',
      },
    ],
    relatedMoneyHref: '/money/underground-arena-floor-tour',
    relatedMoneyLabel: 'Compare Underground & Arena Floor Tours',
  },
  {
    href: '/support/getting-there-metro-meeting-points',
    navTitle: 'Getting There: Metro & Meeting Points',
    h1: 'Getting to the Colosseum: Metro & Meeting Points',
    keyword: 'how to get to colosseum',
    metaTitle: 'How to Get to the Colosseum — Metro, Walking & Meeting Points',
    metaDescription:
      'How to get to the Colosseum by metro, on foot, or by taxi, plus where most guided tours actually meet before entry.',
    heroImage: { src: 'https://images.unsplash.com/photo-1567613747183-fcc1e30a18eb', alt: 'The Colosseum’s curved travertine facade seen up close' },
    sections: [
      {
        heading: 'By metro',
        body: [
          'Line B stops directly at "Colosseo" station, a two-minute walk from the monument\'s main entrance — the simplest and most reliable option from almost anywhere in central Rome. Trains run roughly every 6–10 minutes during the day.',
        ],
      },
      {
        heading: 'On foot',
        body: [
          'From most central accommodation (Monti, the historic center, Trastevere via the river crossings), the Colosseum is a 15–35 minute walk through genuinely scenic streets — a reasonable option if you\'re not in a hurry and want to pass other sights along the way.',
        ],
      },
      {
        heading: 'Where tours actually meet',
        body: [
          'Most guided tours meet at a designated point near the Arch of Constantine or outside Metro Colosseo — check your specific booking confirmation, since meeting points vary by operator and this is the single most common reason people miss their slot.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Which metro line goes to the Colosseum?',
        answer: 'Line B stops directly at "Colosseo" station, about a two-minute walk from the main entrance.',
      },
      {
        question: 'How early should I arrive for a guided tour?',
        answer: 'Arrive at least 20–30 minutes before your scheduled time — meeting points can be crowded and easy to miss, especially for underground tours with strict entry windows.',
      },
    ],
    relatedMoneyHref: '/money/private-vs-group-colosseum-tour',
    relatedMoneyLabel: 'Compare Private & Group Tours',
  },
  {
    href: '/colosseum-forum-palatine-itinerary',
    navTitle: 'Colosseum + Forum + Palatine Itinerary',
    h1: 'Colosseum, Forum & Palatine Hill: A Half-Day Itinerary',
    keyword: 'colosseum forum palatine itinerary',
    metaTitle: 'Colosseum, Forum & Palatine Itinerary: A Half-Day Plan',
    metaDescription:
      'A realistic half-day itinerary combining the Colosseum, Roman Forum, and Palatine Hill, plus the combo-ticket rule most visitors miss.',
    heroImage: { src: 'https://images.unsplash.com/photo-1663143050642-69240b347b2b', alt: 'Full daytime view of the Colosseum exterior' },
    sections: [
      {
        heading: 'The combo-ticket rule that trips people up',
        body: [
          'A single combined ticket covers all three sites, but it\'s valid for exactly one entry per site within a 24-hour window — you can\'t re-enter the Colosseum later the same day on the same ticket. Plan your route in one direction rather than backtracking.',
        ],
      },
      {
        heading: 'A realistic order',
        body: [
          'Start at the Colosseum first thing (8:30am entry beats the crowds and the heat), spend 60–90 minutes there including underground if booked, then walk five minutes to the Roman Forum entrance. Budget 90 minutes to two hours for the Forum — it\'s larger and involves more walking than people expect. Finish at Palatine Hill, which connects directly from the Forum, for the views over both sites as the light gets better in late afternoon.',
        ],
      },
      {
        heading: 'Realistic timing',
        body: [
          'Budget a full half-day (4–5 hours) rather than the "2 hours" some listings suggest — the Forum and Palatine Hill are genuinely large sites with a lot of uneven ground, and rushing them defeats the point of visiting at all.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I visit the Forum and Palatine Hill without visiting the Colosseum?',
        answer: 'Yes — the combined ticket covers entry to each site once, but you\'re not required to use every part of it in the same visit, as long as it\'s within the 24-hour validity window.',
      },
      {
        question: 'Which order should I visit the three sites in?',
        answer: 'Colosseum first (to beat the morning crowds and heat), then the Roman Forum, finishing at Palatine Hill, which connects directly from the Forum without backtracking.',
      },
    ],
    relatedMoneyHref: '/money/best-colosseum-tour-by-visitor-type',
    relatedMoneyLabel: 'Find the Best Tour for You',
  },
  {
    href: '/support/is-the-underground-worth-it',
    navTitle: 'Is the Underground Worth It?',
    h1: 'Is the Colosseum Underground Worth It?',
    keyword: 'is colosseum underground worth it',
    metaTitle: 'Is the Colosseum Underground Worth It? An Honest Breakdown',
    metaDescription:
      'An honest cost-benefit breakdown of the Colosseum underground tour — who it\'s worth the extra money for, and when standard entry is genuinely enough.',
    heroImage: { src: 'https://images.unsplash.com/photo-1704915332184-68202025c9ba', alt: 'Wide daytime view of the full Colosseum exterior' },
    sections: [
      {
        heading: 'Short answer',
        body: [
          'Yes, if you book the arena-floor add-on directly — the underground-only tunnels are interesting but abstract without seeing how they connected to the arena above. With arena-floor access included, the whole staging mechanism finally makes sense, and that\'s the difference that justifies the extra cost for most visitors.',
        ],
      },
      {
        heading: 'When it isn\'t worth the extra cost',
        body: [
          'If your budget is genuinely tight, or you\'re visiting with kids under the underground\'s age minimum, standard Colosseum entry (tiers 1–2) plus the Forum and Palatine Hill already covers the essential historical experience. The underground adds depth, not a fundamentally different visit — worth it for enthusiasm, not essential for a first, budget-conscious trip.',
        ],
      },
      {
        heading: 'The honest cost-benefit',
        body: [
          'Underground access typically adds €30–60 per person over standard entry. For history-focused travelers or a second/return visit to Rome, that premium is easy to justify. For a first, fast-paced trip covering many sites in a few days, it\'s a reasonable one to skip without much regret.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is the underground tour worth it if I only have one day in Rome?',
        answer: 'Probably not the top priority — with only one day, standard skip-the-line entry to the Colosseum, Forum, and Palatine Hill covers more ground; save the underground for a return trip if time is genuinely tight.',
      },
      {
        question: 'Is arena-floor access worth booking separately if it\'s not included?',
        answer: 'Yes, if it\'s available as an add-on — it\'s the single feature that makes the underground tunnels make sense, more so than the tunnels themselves.',
      },
    ],
    relatedMoneyHref: '/money/underground-arena-floor-tour',
    relatedMoneyLabel: 'Compare Underground & Arena Floor Tours',
  },
];

export function getMoneyPageContent(href: string): MoneyPageContent | undefined {
  return MONEY_PAGE_CONTENT.find((p) => p.href === href);
}

export function getSupportPageContent(href: string): SupportPageContent | undefined {
  return SUPPORT_PAGE_CONTENT.find((p) => p.href === href);
}
