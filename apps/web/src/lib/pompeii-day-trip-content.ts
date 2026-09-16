/**
 * Real content for every Pompeii Day Trip page beyond the homepage — the 6
 * money pages and 6 support pages defined in the property's blueprint (Master
 * Network Blueprint §3.2.3 page tree). Each entry supplies exactly what
 * MoneyPageTemplate.tsx / SupportPageTemplate.tsx need to render a complete,
 * unique page: its own H1, meta title/description, hero image, body
 * sections, and FAQ block. Mirrors lib/private-vatican-content.ts's
 * structure exactly. All copy below is original and Pompeii-specific — no
 * sentence is reused from Underground Colosseum's or Private Vatican's
 * content files.
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
    href: '/money/pompeii-from-rome',
    navTitle: 'Pompeii from Rome',
    h1: 'Pompeii Day Trip from Rome: Train vs Tour, Honestly Compared',
    keyword: 'pompeii day trip from rome',
    metaTitle: 'Pompeii Day Trip From Rome: Train vs Tour, Honestly Compared',
    metaDescription: "Is a Pompeii day trip from Rome worth it? Real train times, tour options, and how much time you'll actually get on-site.",
    heroImage: { src: 'https://images.unsplash.com/photo-1686252183235-67dfafa22f60', alt: 'The ruins of ancient Pompeii under open sky, viewed from one of its old paved streets' },
    intro: [
      "It's a 2.5-hour round trip on the regional train alone — here's the honest train-vs-guided-tour math for a Rome-based day at Pompeii, including what a rushed day actually looks like.",
      "The trip breaks into two legs that people conflate: a fast Frecciarossa or Italo run from Rome to Naples (about 70 minutes), then a slower Circumvesuviana commuter line from Naples to Pompeii (about 35–40 minutes). A guided tour bundles both into one bus and removes the connection risk; the train route is cheaper but leaves you managing two separate tickets and a platform change in Naples.",
    ],
    atAGlance: [
      { label: 'Round-trip transit (train)', value: '~2.5 hours' },
      { label: 'Round-trip transit (tour bus)', value: '~4.5 hours' },
      { label: 'Realistic on-site time', value: '3–4 hours' },
      { label: 'Best departure', value: '7:00–7:30am train or pickup' },
    ],
    sections: [
      {
        heading: 'The train-vs-tour math',
        body: [
          "By train: Roma Termini to Napoli Centrale on a Frecciarossa or Italo high-speed train runs about 70 minutes each way, then the Circumvesuviana from Napoli Garibaldi (beneath the same station) to the Pompei Scavi–Villa dei Misteri stop adds another 35–40 minutes. Door to door, that's roughly 2.5 hours of travel each way if connections go smoothly — closer to 5 hours round trip once you include walking between platforms and waiting for a connecting departure.",
          "By guided tour: a bus from central Rome direct to the Pompeii archaeological park's entrance typically runs 2–2.5 hours each way, slower than the train but a single seat with no transfers, no ticket-machine queue in Naples, and a fixed pickup time that removes the risk of missing a Circumvesuviana connection.",
        ],
      },
      {
        heading: 'What a rushed day actually looks like',
        body: [
          "Self-organized by train, a 7am departure from Rome gets you into Pompeii by roughly 9:30–10am. Budgeting a realistic 3.5 hours on-site and the return trip, you're back in Rome around 6:30–7pm — a full day, but a workable one if the connections hold. Add any delay on the Circumvesuviana (a notoriously crowded, slower regional line) and that on-site window shrinks fast.",
          "A guided tour bus removes the connection risk entirely but eats more of the day in transit — most itineraries budget only 2.5–3 hours actually inside the archaeological park, since roughly half the group's day is spent on the bus in both directions.",
        ],
      },
      {
        heading: 'Best combo with a Naples add-on',
        body: [
          "Because the Circumvesuviana route passes directly through Naples, a self-organized train trip can add an hour or two in Naples on the way back — a slice of pizza near Napoli Centrale before the return Frecciarossa — without adding real extra transit time. Guided bus tours generally don't offer this flexibility, since the return departure is fixed for the whole group.",
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: "Take the train if you're comfortable managing one connection in Naples — it's faster, cheaper, and leaves room for a Naples stop on the way back. Book a guided bus tour if you'd rather remove any transfer risk entirely and don't mind a longer total travel time for a single, no-transfer seat.",
    },
    faqs: [
      {
        question: 'Is Pompeii doable as a day trip from Rome?',
        answer:
          "Yes, but it's a full day: roughly 2.5 hours of round-trip train travel plus 3+ hours on-site, so plan to leave early and expect to be back late evening.",
      },
      {
        question: 'Do I need to change trains in Naples?',
        answer:
          "Yes — the high-speed train from Rome terminates at Napoli Centrale, and the Circumvesuviana line to Pompeii departs from Napoli Garibaldi station directly beneath it, a short walk and a separate ticket from the high-speed leg.",
      },
      {
        question: 'Is a guided bus tour faster than the train from Rome?',
        answer:
          "No — a direct bus typically runs 2–2.5 hours each way versus roughly 1 hour 45 minutes by train including the Circumvesuviana connection, but it trades that extra time for a single seat with zero transfers.",
      },
    ],
    relatedSupportHref: '/support/getting-there-train-vs-tour',
    relatedSupportLabel: 'Getting There: Train vs. Tour',
  },
  {
    href: '/money/pompeii-from-naples',
    navTitle: 'Pompeii from Naples',
    h1: 'Pompeii from Naples: The Realistic Half-Day Trip',
    keyword: 'pompeii from naples',
    metaTitle: 'Pompeii from Naples: The Realistic Half-Day Trip',
    metaDescription: 'Naples is the closest base to Pompeii — real Circumvesuviana timing, half-day vs full-day, and how to avoid the platform pickpocket stretch.',
    heroImage: { src: 'https://images.unsplash.com/photo-1567202170721-bd01fbdea30a', alt: 'Aerial view of the Bay of Naples, with the short Circumvesuviana route to Pompeii running along the coast' },
    intro: [
      'Naples is the closest base to Pompeii by a wide margin — 30 minutes on the Circumvesuviana — which makes a half-day trip genuinely realistic, not just marketed as one.',
      "That short transit time is the entire case for basing in Naples over Rome for this specific trip: a Naples-based visitor can be walking through the Forum by mid-morning and back in the city for a late lunch, something a Rome day trip can't match.",
    ],
    atAGlance: [
      { label: 'One-way transit', value: '~30 minutes (Circumvesuviana)' },
      { label: 'Half-day feasible?', value: 'Yes — genuinely, not just marketed' },
      { label: 'Full-day option', value: 'Pompeii + Herculaneum or + Vesuvius' },
      { label: 'Trains per hour', value: '2–3 during the day' },
    ],
    sections: [
      {
        heading: 'Half-day vs. full-day split',
        body: [
          "A half-day trip from Naples — leave by 8:30am, spend 3 hours at Pompeii, be back in the city by 1pm — is realistic precisely because the transit burden is so light. That's enough time to see the Forum, the Amphitheatre, and two or three of the best-preserved houses without rushing.",
          'A full day opens up pairing Pompeii with Herculaneum (a short Circumvesuviana ride further toward Naples) or with the Vesuvius crater hike (a separate bus connection from the Pompei Scavi station) — either combination is realistic only because the base transit time from Naples is so short to begin with.',
        ],
      },
      {
        heading: 'Circumvesuviana timing and reliability notes',
        body: [
          "The Circumvesuviana runs roughly every 20–30 minutes on the Naples–Sorrento line, which passes directly through the Pompei Scavi–Villa dei Misteri stop right at the archaeological park's entrance. It is a commuter line, not a tourist train — expect basic rolling stock, no reserved seating, and standing room during peak commuting hours (early morning and early evening).",
        ],
      },
      {
        heading: 'Combining with a Naples morning',
        body: [
          "Because the transit time is so short, many visitors do a Naples morning first — a coffee and sfogliatella near the station — before catching a mid-morning Circumvesuviana departure, arriving at Pompeii by late morning with the whole afternoon still ahead.",
        ],
      },
      {
        heading: 'Avoiding the pickpocket-prone platform stretch',
        body: [
          "The Circumvesuviana platform at Napoli Garibaldi has a real, well-documented reputation for pickpocketing, particularly during crowded peak-hour departures. Keep bags zipped and in front of you, avoid phones out at the platform edge, and where possible choose a mid-morning departure outside the 7–9am commuter crush.",
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: 'If you are based in Naples, this is the easiest and cheapest way to see Pompeii in the entire network of day-trip options covered on this site — a half day genuinely suffices for the highlights, and a full day comfortably adds Herculaneum or the Vesuvius hike.',
    },
    faqs: [
      {
        question: "What's the difference between Pompeii and Herculaneum?",
        answer:
          'Pompeii is larger and more famous; Herculaneum is smaller but better-preserved in places (upper floors and wood survived at Herculaneum, which is rare) — many visitors prefer pairing both over spending a full day at just one.',
      },
      {
        question: 'How often does the Circumvesuviana run from Naples to Pompeii?',
        answer:
          'Roughly every 20–30 minutes during the day on the Naples–Sorrento line, which stops directly at Pompei Scavi–Villa dei Misteri, right at the archaeological park entrance.',
      },
      {
        question: 'Is the Circumvesuviana safe for tourists?',
        answer:
          'Generally yes for the ride itself, though the Napoli Garibaldi platform has a real pickpocketing reputation during crowded peak-hour departures — keep bags zipped and avoid the 7–9am commuter crush if you can.',
      },
    ],
    relatedSupportHref: '/support/how-much-time-you-need',
    relatedSupportLabel: 'How Much Time You Need',
  },
  {
    href: '/money/pompeii-from-sorrento-amalfi',
    navTitle: 'Pompeii from Sorrento/Amalfi',
    h1: 'Pompeii from Sorrento or the Amalfi Coast: Worth the Detour',
    keyword: 'pompeii from sorrento',
    metaTitle: 'Pompeii from Sorrento: An Easy Detour Most Itineraries Skip',
    metaDescription: 'Coast-based travelers get an easy Circumvesuviana run to Pompeii most itineraries skip for Capri — the real transit time and return-timing math.',
    heroImage: { src: 'https://images.unsplash.com/photo-1592036930791-4a8471d3105f', alt: 'Boats along the Sorrento coastline, the departure point for the short train ride inland to Pompeii' },
    intro: [
      'Coast-based travelers get an easy Circumvesuviana run to Pompeii that most itineraries skip entirely in favor of Capri — here\'s why it\'s worth the detour.',
      'Sorrento sits at the far end of the same Circumvesuviana line that runs through Pompeii, which means the ruins are a straightforward inland detour rather than a separate, awkward transfer — something that isn\'t true for a Capri day trip, which requires a ferry crossing instead.',
    ],
    atAGlance: [
      { label: 'Sorrento to Pompeii', value: '~30 minutes (Circumvesuviana)' },
      { label: 'Amalfi Coast to Sorrento', value: '~50 min bus/ferry, then train' },
      { label: 'Realistic day length', value: '6–7 hours door to door' },
      { label: 'Best for', value: 'Coast-based travelers skipping Capri that day' },
    ],
    sections: [
      {
        heading: 'Sorrento-to-Pompeii train time',
        body: [
          "From Sorrento, the Circumvesuviana runs directly to the Pompei Scavi–Villa dei Misteri stop in about 30 minutes, the same line used from the Naples end, just traveled in the opposite direction. No transfer is required — it's the single most direct route to Pompeii from anywhere on this stretch of coast.",
        ],
      },
      {
        heading: 'Coastal-base day-trip pairing options',
        body: [
          "Travelers based further along the coast in Positano, Amalfi, or Ravello first need to reach Sorrento — typically a 45–60 minute SITA bus or a seasonal ferry — before picking up the Circumvesuviana. That adds real time to the day, which is why this detour suits a Sorrento base far more comfortably than an Amalfi-town base.",
        ],
      },
      {
        heading: 'Returning in time for a Sorrento evening',
        body: [
          "A morning departure from Sorrento (Circumvesuviana trains run every 20–30 minutes) gets you to Pompeii by mid-morning; budgeting 3–3.5 hours on-site and the return trip, most visitors are back in Sorrento in time for a late-afternoon swim or an evening in town — a genuinely comfortable day rather than a rushed one.",
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: 'Worth doing from a Sorrento base specifically — the transit time is short enough that it doesn\'t eat the whole day. From an Amalfi-town base, the extra bus or ferry leg to reach Sorrento first makes it a longer commitment, though still realistic if Pompeii is a real priority over another beach day.',
    },
    faqs: [
      {
        question: 'Is Pompeii doable as a day trip from Sorrento?',
        answer:
          'Yes, comfortably — the direct Circumvesuviana connection takes about 30 minutes each way with no transfers, making it one of the easiest day trips on this whole coast.',
      },
      {
        question: 'Can I do Pompeii from Positano or Amalfi in a day?',
        answer:
          'Yes, but budget extra time for the SITA bus or seasonal ferry connection to Sorrento first (45–60 minutes) before picking up the Circumvesuviana — a longer day than starting from Sorrento itself.',
      },
      {
        question: 'Why do so many coastal itineraries skip Pompeii for Capri instead?',
        answer:
          "Capri gets more marketing as the flagship day trip from the coast, but it requires a ferry crossing and delivers scenery rather than a historical site — Pompeii is arguably the easier logistical add-on given the direct rail connection through Sorrento.",
      },
    ],
    relatedSupportHref: '/support/summer-heat-logistics',
    relatedSupportLabel: 'Summer Heat Logistics',
  },
  {
    href: '/money/pompeii-vesuvius-combo',
    navTitle: 'Pompeii + Vesuvius Combo',
    h1: 'Pompeii and Vesuvius in One Day: Timing, Fitness Level & Booking',
    keyword: 'pompeii and vesuvius tour',
    metaTitle: 'Pompeii and Vesuvius Tour: Timing, Fitness Level & Booking',
    metaDescription: "Combining Pompeii's ruins with a Vesuvius crater hike in one day — the realistic timing, difficulty, and what each ticket covers.",
    heroImage: { src: 'https://images.unsplash.com/photo-1506852889966-0ec40a8bf2b5', alt: "Aerial view of Mount Vesuvius's crater rim, the summit hike most Pompeii-combo tours end with" },
    intro: [
      "Combining the ruins with a Vesuvius crater hike is the single most-asked-about pairing — and the single easiest to get the timing wrong on. Here's how the math actually works.",
      "The two sites are entirely separate tickets, separate entrances, and require their own transport connection between them — Vesuvius has no direct rail stop, unlike Pompeii and Herculaneum, so the crater hike needs its own bus or shuttle leg from the Pompei Scavi area.",
    ],
    atAGlance: [
      { label: 'Crater hike duration', value: '~1.5–2 hours round trip' },
      { label: 'Fitness level required', value: 'Moderate — steep gravel path' },
      { label: 'Combined-day length', value: '9–10 hours door to door' },
      { label: 'Best season', value: 'Spring or autumn — summer summit heat is harsh' },
    ],
    sections: [
      {
        heading: 'Crater-hike duration and fitness level',
        body: [
          "The marked trail to Vesuvius's crater rim from the car park (bus/shuttle access only, no direct rail) is about 1.5–2km round trip on a steep, loose-gravel switchback path — no technical climbing, but genuinely strenuous, closer to a moderate hill walk than a casual stroll. Sturdy closed-toe shoes matter more here than on the flat streets of Pompeii itself.",
        ],
      },
      {
        heading: 'Combined-day timing windows',
        body: [
          "Most combo tours run Pompeii first (2.5–3 hours) then transfer by bus to the Vesuvius car park for the crater hike (1.5–2 hours including the walk up and back), plus a genuinely significant chunk of the day lost to the bus transfer itself, since there's no direct rail connection between the two sites. Budget a 9–10 hour day door to door from a Naples or Sorrento base.",
        ],
      },
      {
        heading: 'Which season makes the summit hike miserable',
        body: [
          "July and August combine full summer heat with almost no shade on the exposed crater path — a genuinely uncomfortable hike at midday. Spring (April–May) and early autumn (late September–October) give cooler hiking conditions and clearer summit visibility, without Pompeii's own shade problem being quite as severe either.",
        ],
      },
      {
        heading: "What each site's ticket actually covers",
        body: [
          'Pompeii and Vesuvius are managed separately and sold as separate tickets even on a combo tour itinerary — Vesuvius National Park charges its own summit-access fee, and a certain number of daily hiking slots are capped, so a combo tour is effectively pre-booking two entrance systems as one package rather than a single unified ticket.',
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: 'Worth it if you want the full volcanic-disaster picture in one visit, but go in spring or autumn if the schedule allows — a summer midday crater hike is the low point of an otherwise excellent combo day. Book the guided combo rather than self-organizing the bus transfer, since Vesuvius has no direct rail connection from Pompeii.',
    },
    faqs: [
      {
        question: 'Can you walk from Pompeii to the Vesuvius crater?',
        answer:
          "No — there is no direct walking route or rail connection; reaching the Vesuvius car park requires a separate bus or shuttle transfer, which is the main reason a combo day takes longer than either site alone would suggest.",
      },
      {
        question: 'Is the Vesuvius crater hike difficult?',
        answer:
          'Moderate — about 1.5–2km round trip on a steep, loose-gravel switchback path with no technical climbing required, but genuinely more strenuous than Pompeii\'s flat streets.',
      },
      {
        question: 'Do I need to book Vesuvius access separately from Pompeii?',
        answer:
          "On a self-organized trip, yes — the two sites sell separate tickets and Vesuvius caps daily hiking slots; a combo tour packages both bookings together but they remain two distinct entrance systems.",
      },
    ],
    relatedSupportHref: '/support/summer-heat-logistics',
    relatedSupportLabel: 'Summer Heat Logistics',
  },
  {
    href: '/money/pompeii-herculaneum',
    navTitle: 'Pompeii + Herculaneum',
    h1: 'Pompeii and Herculaneum in One Day: The Honest Comparison',
    keyword: 'pompeii and herculaneum',
    metaTitle: 'Pompeii and Herculaneum: Which to Prioritise, and Pairing Both',
    metaDescription: 'Herculaneum is smaller and better-preserved than Pompeii in places — the realistic same-day feasibility, and which to prioritise if short on time.',
    heroImage: { src: 'https://images.unsplash.com/photo-1658248709403-c2803126d770', alt: 'The compact excavated ruins of Herculaneum, with the modern town of Ercolano and Vesuvius above' },
    intro: [
      "Herculaneum is smaller, denser, and better-preserved in some respects — pairing both sites in one day rewards visitors who want depth over ground covered.",
      "The two sites were buried by the same 79 AD eruption but in different ways: Pompeii was smothered in ash and pumice, while Herculaneum was engulfed by a fast-moving pyroclastic flow that carbonized (rather than incinerated) organic material — which is why wood, furniture, and even food remnants survive there in a way they don't at Pompeii.",
    ],
    atAGlance: [
      { label: 'Herculaneum size', value: '~4.5 hectares excavated' },
      { label: 'Pompeii-Herculaneum transit', value: '~15–20 minutes (Circumvesuviana)' },
      { label: 'Same-day feasibility', value: 'Yes, from a Naples or Sorrento base' },
      { label: 'Time at Herculaneum alone', value: '2–2.5 hours is enough' },
    ],
    sections: [
      {
        heading: "Why Herculaneum's preservation differs",
        body: [
          "Herculaneum's burial mechanism — a fast pyroclastic surge rather than Pompeii's slower ashfall — sealed the town in a way that preserved upper floors, wooden beams, doors, and even carbonized food, none of which typically survive at Pompeii. The trade-off is scale: only around 4.5 hectares have been excavated at Herculaneum, a fraction of Pompeii's 44 excavated hectares, because the modern town of Ercolano sits directly above the rest of the ancient site.",
        ],
      },
      {
        heading: 'Realistic same-day feasibility',
        body: [
          "Both sites sit on the same Circumvesuviana line, roughly 15–20 minutes apart by train, which makes pairing them in one day genuinely realistic from a Naples or Sorrento base: Pompeii in the morning (allow 3 hours), a short train hop, then Herculaneum in the afternoon (2–2.5 hours is enough given its smaller footprint) — a full but comfortable day rather than a rushed one.",
        ],
      },
      {
        heading: 'Which to prioritize if you can only do one',
        body: [
          "Pompeii wins on scale and range — the Forum, the Amphitheatre, and dozens of houses across a genuinely large excavated area, better suited to a first-time visitor who wants the complete picture. Herculaneum wins on preservation depth and density — a smaller area you can properly absorb in 2 hours, with structural details (roofs, upper floors, carbonized wood) Pompeii simply doesn't have.",
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: "If you can only fit one, choose Pompeii for a first visit and the fuller picture. If you're pairing both, do Pompeii first while your energy is highest, then Herculaneum as the shorter, denser afternoon stop — the direct rail connection makes the order easy to reverse if that suits your day better.",
    },
    faqs: [
      {
        question: "What's the difference between Pompeii and Herculaneum?",
        answer:
          'Pompeii is larger and more famous; Herculaneum is smaller but better-preserved in places (upper floors and wood survived at Herculaneum, which is rare) — many visitors prefer pairing both over spending a full day at just one.',
      },
      {
        question: 'How far apart are Pompeii and Herculaneum?',
        answer:
          'About 15–20 minutes by Circumvesuviana train, on the same Naples–Sorrento line — no separate transfer or bus connection is needed between them.',
      },
      {
        question: 'Is Herculaneum less crowded than Pompeii?',
        answer:
          "Generally yes — its smaller size and lower profile among first-time visitors mean noticeably thinner crowds even in peak season, one more reason it rewards a slower, more deliberate visit.",
      },
    ],
    relatedSupportHref: '/support/best-preserved-houses-to-prioritise',
    relatedSupportLabel: 'Best-Preserved Houses to Prioritise',
  },
  {
    href: '/money/private-pompeii-guide',
    navTitle: 'Private Pompeii Guide',
    h1: 'Private Pompeii Guide: Is a Licensed Guide Worth It?',
    keyword: 'private pompeii tour',
    metaTitle: 'Private Pompeii Tour: Is a Licensed Guide Worth the Cost?',
    metaDescription: 'A licensed private guide changes what you see at Pompeii — skip-the-line entry and house-by-house access most group tours rush past.',
    heroImage: { src: 'https://images.unsplash.com/photo-1694274411117-fbfcd9435446', alt: "A row of Pompeii's original stone columns, part of a private guide's typical house-by-house routing" },
    intro: [
      'A licensed private guide changes what you actually see at Pompeii — skip-the-line entry and access to houses that get roped off for group tours on a busy day.',
      "As at the Vatican, Italian regulation requires anyone leading a paid tour through a state-run archaeological site to hold an official regional guide licence — worth confirming before booking a 'private guide' listing that doesn't name one.",
    ],
    atAGlance: [
      { label: 'Group tour price', value: '€36–65 / person' },
      { label: 'Private tour price', value: '€220+ (up to 6 people)' },
      { label: 'Licence required', value: 'Yes — regional guide patentino' },
      { label: 'Pace', value: 'Fully custom, house-by-house' },
    ],
    sections: [
      {
        heading: 'What actually changes with a private guide',
        body: [
          "Pompeii's excavated area is genuinely large — 44 hectares — and only a fraction of its houses are open to the public on any given day; some rotate in and out of public access for conservation reasons. A private guide can prioritize the specific houses that happen to be open and match your actual interests (daily life, art, engineering, the eruption's timeline) rather than following a fixed group-tour script built for the average visitor.",
        ],
      },
      {
        heading: 'Skip-line entry mechanics',
        body: [
          "Licensed private guides can book pre-arranged entry slots that bypass the same walk-up ticket queue every visitor otherwise faces at the main Porta Marina entrance — in peak season, that queue alone can run 30–45 minutes before you've seen a single ruin.",
        ],
      },
      {
        heading: 'Customizable house-by-house routing',
        body: [
          "Because Pompeii's site is so spread out, a private guide can route around whichever section is currently most crowded with tour-bus groups — a flexibility no fixed-departure group tour offers, since those follow the same published route regardless of that day's crowd pattern.",
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: 'Worth the premium for genuine depth of interest, a hot day where pacing and shade matter, or a group wanting real flexibility in which houses to prioritize. For a first, general-interest visit on a budget, a good self-paced audio-guide ticket covers the essential highlights for a fraction of the cost.',
    },
    faqs: [
      {
        question: 'Do I need a private guide to skip the line at Pompeii?',
        answer:
          "No — standard skip-the-line and guided group tours also bypass the general walk-up queue; a private guide buys pacing and depth, not faster entry on its own.",
      },
      {
        question: "How do I know a 'private guide' listing at Pompeii is actually licensed?",
        answer:
          "Ask for the guide's regional licence number before booking — Italian regulation requires anyone leading a paid tour through a state-run archaeological site to hold one.",
      },
      {
        question: 'Can a private guide get me into houses closed to the public?',
        answer:
          'No — access rotations at Pompeii are set by the site\'s own conservation authority for every visitor; a private guide changes routing and depth around whichever houses are open that day, not which houses are open.',
      },
    ],
    relatedSupportHref: '/support/best-preserved-houses-to-prioritise',
    relatedSupportLabel: 'Best-Preserved Houses to Prioritise',
  },
];

export const SUPPORT_PAGE_CONTENT: SupportPageContent[] = [
  {
    href: '/support/getting-there-train-vs-tour',
    navTitle: 'Getting There: Train vs. Tour',
    h1: 'Getting to Pompeii: Train vs. Guided Tour, in Detail',
    keyword: 'pompeii train vs tour',
    metaTitle: 'Getting to Pompeii: Train vs. Guided Tour, in Detail',
    metaDescription: 'Every real way to reach Pompeii from Rome, Naples, or Sorrento — Circumvesuviana timing, ticket types, and when a guided tour bus wins.',
    heroImage: { src: 'https://images.unsplash.com/photo-1639989800195-d3f77086c8b6', alt: 'A view along the Circumvesuviana rail corridor toward Mount Vesuvius in the distance' },
    sections: [
      {
        heading: 'The Circumvesuviana, explained',
        body: [
          "The Circumvesuviana is the regional commuter line connecting Naples to Sorrento, stopping directly at Pompei Scavi–Villa dei Misteri — a couple of minutes' walk from the archaeological park's main entrance. It runs every 20–30 minutes during the day, uses basic commuter rolling stock (no reserved seating, no air conditioning guarantee), and is genuinely crowded during Naples's morning and evening rush hours.",
        ],
      },
      {
        heading: 'From Rome specifically',
        body: [
          'A Frecciarossa or Italo high-speed train from Roma Termini to Napoli Centrale takes about 70 minutes; the Circumvesuviana platform is at Napoli Garibaldi, directly beneath the same station complex, adding a short walk and a separate ticket purchase before the 35–40 minute ride to Pompeii.',
        ],
      },
      {
        heading: 'From Naples and Sorrento specifically',
        body: [
          'Both cities sit directly on the Circumvesuviana line already — Naples about 30–35 minutes from Pompeii, Sorrento about 30 minutes in the opposite direction — with no transfer required at all, which is the main reason these two bases make Pompeii dramatically easier than a Rome day trip does.',
        ],
      },
      {
        heading: 'When a guided tour bus wins',
        body: [
          'A door-to-door bus removes every transfer and ticket-machine step above at the cost of a longer total travel time — worth it specifically if you\'d rather not manage a Circumvesuviana connection, want a fixed pickup and return time, or are traveling with people who\'d struggle with a crowded commuter platform.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is the Circumvesuviana reliable?',
        answer:
          "Broadly yes for the core Naples-Sorrento service, though as a commuter line it runs older rolling stock and can be crowded at peak hours — budget a little buffer time rather than cutting a connection close.",
      },
      {
        question: 'Can I buy one ticket for the whole trip from Rome to Pompeii?',
        answer:
          'No — the high-speed Rome-to-Naples leg and the Circumvesuviana Naples-to-Pompeii leg are sold as two separate tickets on two separate operators.',
      },
      {
        question: 'Is a taxi or private transfer a realistic option instead?',
        answer:
          'From Naples or Sorrento, yes, though at a significant cost premium over the train for a similar or slightly faster travel time; from Rome, the distance makes a private transfer considerably more expensive than either the train or a guided bus tour.',
      },
    ],
    relatedMoneyHref: '/money/pompeii-from-rome',
    relatedMoneyLabel: 'Compare Pompeii from Rome Tours',
  },
  {
    href: '/support/how-much-time-you-need',
    navTitle: 'How Much Time You Need',
    h1: 'How Much Time You Actually Need at Pompeii',
    keyword: 'how long to spend at pompeii',
    metaTitle: 'How Much Time You Actually Need at Pompeii',
    metaDescription: 'Three hours covers the highlights at Pompeii; a full day covers the site properly. The realistic time budget by visit type.',
    heroImage: { src: 'https://images.unsplash.com/photo-1531220238712-18cea1d53e59', alt: 'A brown stone archway inside Pompeii, one of the many stops that add up across a full visit' },
    sections: [
      {
        heading: 'The realistic 3-hour route',
        body: [
          "A tight 3-hour visit realistically covers the Forum, the Amphitheatre, the Stabian Baths, and two or three of the most complete houses (the House of the Faun and House of the Vettii are the usual picks) — enough to leave with a genuine sense of the site without covering more than a fraction of its 44 excavated hectares.",
        ],
      },
      {
        heading: 'What a full day adds',
        body: [
          "A 5–6 hour visit adds the Villa of the Mysteries at the site's far edge (its frescoes are among the best-preserved anywhere in Pompeii), the Garden of the Fugitives' plaster casts, and time to actually read the informational panels rather than walking past them.",
        ],
      },
      {
        heading: 'Why the site takes longer than it looks on a map',
        body: [
          "Pompeii's paved streets are original ancient stone — uneven, occasionally steep, and offering almost no shade across most of the site. A 44-hectare excavated area with minimal shelter means walking pace slows meaningfully by early afternoon, especially outside the cooler shoulder-season months.",
        ],
      },
    ],
    faqs: [
      {
        question: 'How long does Pompeii actually take to see properly?',
        answer:
          'Budget a minimum of 3 hours on-site to see the highlights properly, and closer to 5–6 hours if you want to see the full excavated area without rushing.',
      },
      {
        question: 'Is 2 hours enough at Pompeii?',
        answer:
          "It's tight but workable for the Forum and Amphitheatre alone if you're combining Pompeii with another stop the same day — expect to skip most of the individual houses at that pace.",
      },
      {
        question: 'Does a guided tour cover the site faster than visiting alone?',
        answer:
          "Often the opposite — a guide's commentary adds time at each stop but ensures you don't miss context a self-guided visitor might walk past; audio-guide self-paced visits tend to move faster but see less depth per stop.",
      },
    ],
    relatedMoneyHref: '/money/pompeii-from-naples',
    relatedMoneyLabel: 'Find the Right Half-Day or Full-Day Tour',
  },
  {
    href: '/support/best-preserved-houses-to-prioritise',
    navTitle: 'Best-Preserved Houses to Prioritise',
    h1: "Pompeii's Best-Preserved Houses: What to Actually Prioritise",
    keyword: 'best pompeii houses to see',
    metaTitle: "Pompeii's Best-Preserved Houses: What to Prioritise",
    metaDescription: "Which of Pompeii's excavated houses are actually worth prioritising on a time-limited visit, and what makes each one distinct.",
    heroImage: { src: 'https://images.unsplash.com/photo-1579285014910-be9df495fb26', alt: 'A restored Pompeii house facade with Vesuvius visible above the roofline' },
    sections: [
      {
        heading: 'The House of the Faun',
        body: [
          "Pompeii's largest private residence, named for its bronze dancing-faun statue (a replica stands on-site; the original is in the Naples Archaeological Museum). Its scale alone — an entire city block — makes it a fast, high-impact stop that needs no special access rotation to view.",
        ],
      },
      {
        heading: 'The House of the Vettii',
        body: [
          "Among the best-preserved fresco cycles anywhere on-site, restored and reopened to the public after a lengthy conservation project. Its mythological wall paintings are consistently cited as some of the most vivid color and detail surviving from the ancient town.",
        ],
      },
      {
        heading: 'The Villa of the Mysteries',
        body: [
          "Sits at the far edge of the excavated area — a genuine walk from the main entrance — but rewards the trip with a continuous fresco cycle depicting what's widely interpreted as a Dionysian initiation ritual, unmatched in scale by anything closer to the Forum.",
        ],
      },
      {
        heading: 'The Garden of the Fugitives',
        body: [
          "Not a house but the site most visitors associate with Pompeii's plaster casts — a row of preserved body impressions from a group who didn't escape the eruption in time, displayed roughly where they were found near the ancient city wall.",
        ],
      },
    ],
    faqs: [
      {
        question: 'Which Pompeii house should I prioritise if I only have time for one?',
        answer:
          'The House of the Vettii for the best-preserved frescoes, or the House of the Faun if scale and a quick, high-impact stop matter more than fresco detail.',
      },
      {
        question: 'Are all of Pompeii\'s houses open to the public?',
        answer:
          "No — access rotates for conservation reasons, and some houses close temporarily; check the official Parco Archeologico di Pompei site or ask your guide which are open on your visit date.",
      },
      {
        question: 'Is the Villa of the Mysteries worth the extra walk?',
        answer:
          "Yes, for most visitors — its fresco cycle is one of the most complete and striking anywhere on-site, though it does add real walking distance since it sits at the edge of the excavated area.",
      },
    ],
    relatedMoneyHref: '/money/private-pompeii-guide',
    relatedMoneyLabel: 'Compare Private Pompeii Guides',
  },
  {
    href: '/support/pompeii-with-kids',
    navTitle: 'Pompeii with Kids',
    h1: 'Pompeii with Kids: The Honest Family Guide',
    keyword: 'pompeii with kids',
    metaTitle: 'Pompeii with Kids: Age Limits, Strollers & Realistic Pacing',
    metaDescription: "Visiting Pompeii with kids: which ages actually enjoy it, why strollers struggle on the original stone streets, and realistic pacing.",
    heroImage: { src: 'https://images.unsplash.com/photo-1720303628885-6cc809f7c435', alt: 'A garden viewpoint overlooking the Bay of Naples, the kind of open-air break point that works well for families' },
    sections: [
      {
        heading: 'Age realities',
        body: [
          "Older kids (roughly 8 and up) generally engage well with Pompeii — the open-air layout, the plaster casts, and the scale of an actual buried city tend to land better with school-age children than a museum full of glass cases. Younger kids can still enjoy a shorter, well-paced visit, but the site's size and lack of shade wear them out faster.",
        ],
      },
      {
        heading: 'Strollers on the original stone streets',
        body: [
          "Pompeii's paved streets are the actual ancient roadway — deliberately built with raised stepping stones at intersections so pedestrians could cross without stepping in the drainage channel. That same feature makes strollers genuinely impractical across much of the site; a structured child carrier works far better for children too young to walk the whole visit.",
        ],
      },
      {
        heading: 'Shorter, family-paced options',
        body: [
          "A number of guided tours run family-specific itineraries — shorter routes, more frequent breaks, and framing built around storytelling rather than dense historical detail — a better fit than the standard 3-hour adult-paced route for kids under 10.",
        ],
      },
      {
        heading: 'A post-tour gelato-break routing',
        body: [
          "The modern town just outside the Porta Marina entrance has cafés and gelaterias within a short walk — a practical, well-earned break point for families right after a hot, shade-scarce few hours on-site.",
        ],
      },
    ],
    faqs: [
      {
        question: 'Is Pompeii suitable for kids?',
        answer:
          'Older kids (8+) generally do well with the open-air walking and ash-cast displays; strollers struggle on the uneven original stone streets, so a carrier is more practical for younger children.',
      },
      {
        question: 'Are the plaster casts too intense for children?',
        answer:
          "Reactions vary by age and temperament — most school-age kids find them fascinating rather than frightening, though parents of younger or more sensitive children may want to preview the Garden of the Fugitives display before deciding.",
      },
      {
        question: 'Is there shade or seating for tired kids at Pompeii?',
        answer:
          'Shade is limited across most of the open-air site; a handful of covered areas near the Forum and the site\'s cafés offer the main rest points, so plan breaks around those rather than expecting shade throughout.',
      },
    ],
    relatedMoneyHref: '/money/pompeii-from-naples',
    relatedMoneyLabel: 'Find Family-Paced Pompeii Tours from Naples',
  },
  {
    href: '/support/summer-heat-logistics',
    navTitle: 'Summer Heat Logistics',
    h1: 'Pompeii in Summer Heat: The Logistics That Actually Matter',
    keyword: 'pompeii in summer heat',
    metaTitle: 'Pompeii in Summer Heat: The Logistics That Actually Matter',
    metaDescription: "Pompeii's open-air layout has almost no shade — practical summer logistics: timing, water, and the hottest stretches to plan around.",
    heroImage: { src: 'https://images.unsplash.com/photo-1653590933006-e4abe965b031', alt: 'A shaded hillside path near Vesuvius, the kind of shade that is scarce across most of open-air Pompeii' },
    sections: [
      {
        heading: 'Why Pompeii is genuinely harder in July and August',
        body: [
          "Pompeii's 44 excavated hectares are almost entirely open air, with minimal tree cover across most of the site — a stark contrast to a shaded museum visit. Summer midday temperatures in the Campania region regularly reach the low-to-mid 30s°C, with reflected heat off the pale stone streets making it feel hotter still.",
        ],
      },
      {
        heading: 'The best timing window',
        body: [
          "Entering at opening time (typically 9am) and aiming to be through the bulk of the visit by early afternoon avoids the worst of the midday heat. The site's official last-entry and closing times shift seasonally — check the current hours before planning an early-morning visit specifically to beat the heat.",
        ],
      },
      {
        heading: 'Water, shade, and practical prep',
        body: [
          'Refillable water bottles are worth carrying — there are a small number of water points on-site, but not at every turn across such a large area. A hat and sun protection matter more here than at almost any other stop covered on this site, given how little natural shade the ruins provide.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the best time of day to visit Pompeii in summer?',
        answer:
          'Arriving at opening time and covering the bulk of the visit before early afternoon avoids the worst midday heat, since the site offers very little shade across most of its 44 excavated hectares.',
      },
      {
        question: 'Is there anywhere to buy water inside Pompeii?',
        answer:
          'A small number of water points and cafés exist on-site, but they are not evenly spread across such a large area — carrying a refillable bottle from the start is the more reliable option.',
      },
      {
        question: 'Is visiting Pompeii in summer worth avoiding altogether?',
        answer:
          "Not necessarily — summer still works well with an early start and realistic pacing; spring and autumn are simply more comfortable if your travel dates are flexible enough to choose.",
      },
    ],
    relatedMoneyHref: '/money/pompeii-vesuvius-combo',
    relatedMoneyLabel: 'Compare Pompeii + Vesuvius Combo Tours',
  },
  {
    href: '/support/skip-the-line-reality',
    navTitle: 'Skip-the-Line Reality',
    h1: 'Pompeii Skip-the-Line Tickets: What They Actually Skip',
    keyword: 'pompeii skip the line',
    metaTitle: 'Pompeii Skip-the-Line Tickets: What They Actually Skip',
    metaDescription: 'Not every Pompeii ticket type skips the same queue — what a skip-the-line ticket actually bypasses, and when walk-up entry is still fine.',
    heroImage: { src: 'https://images.unsplash.com/photo-1686252184251-80c0e71a6cde', alt: "Pompeii's Porta Marina entrance, with its columned gate and clock tower" },
    sections: [
      {
        heading: 'The real bottleneck: the main entrance ticket queue',
        body: [
          "Pompeii's main Porta Marina entrance sees a genuine walk-up ticket queue in peak season (roughly May–September), sometimes 30–45 minutes during midday arrivals. A skip-the-line or pre-booked timed-entry ticket bypasses exactly this queue — the single biggest time cost for an unprepared visitor.",
        ],
      },
      {
        heading: 'What pre-booking actually requires',
        body: [
          "Unlike some sites, Pompeii's official ticketing system lets visitors book a specific entry time slot online in advance at no premium over the standard admission price — the 'skip-the-line' value here comes largely from having booked ahead at all, not from paying extra for a separate ticket tier.",
        ],
      },
      {
        heading: 'When walk-up entry is still fine',
        body: [
          "Outside peak season (November–March, excluding holiday weeks) and during shoulder-season weekday mornings, walk-up queues are often short enough that pre-booking mainly buys peace of mind rather than a meaningful time saving.",
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I need to book skip-the-line tickets in advance?',
        answer:
          'In peak season (May–September) yes — walk-up entry queues can run over an hour, while pre-booked tickets or guided tours get a dedicated entrance.',
      },
      {
        question: 'Is a skip-the-line ticket more expensive than standard admission?',
        answer:
          "Not necessarily — Pompeii's official booking system lets you reserve a timed entry slot at the standard admission price; premium 'skip-the-line' products sold by resellers often bundle in an audio guide or map rather than charging purely for faster entry.",
      },
      {
        question: 'Does skip-the-line also mean skipping the security check?',
        answer:
          'No — every visitor passes through a bag check at the entrance regardless of ticket type; what a skip-the-line ticket avoids is the separate walk-up ticket-purchase queue, not the security screening itself.',
      },
    ],
    relatedMoneyHref: '/money/pompeii-from-rome',
    relatedMoneyLabel: 'Compare Pompeii Day Trips from Rome',
  },
];

export function getMoneyPageContent(href: string): MoneyPageContent | undefined {
  return MONEY_PAGE_CONTENT.find((p) => p.href === href);
}

export function getSupportPageContent(href: string): SupportPageContent | undefined {
  return SUPPORT_PAGE_CONTENT.find((p) => p.href === href);
}
