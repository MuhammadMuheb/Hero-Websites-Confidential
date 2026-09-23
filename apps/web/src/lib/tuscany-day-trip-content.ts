/**
 * Real content for every Tuscany Day Trip page beyond the homepage — the 4
 * money pages and 5 support pages defined in the property's build brief
 * (mapped 1:1 from MASTER-NETWORK-BLUEPRINT.md §3.5's page tree). Each entry
 * supplies exactly what MoneyPageTemplate.tsx / SupportPageTemplate.tsx need
 * to render a complete, unique page: its own H1, meta title/description,
 * hero image, body sections, and FAQ block. Mirrors
 * lib/tiramisu-class-content.ts's structure exactly.
 *
 * Every keyword, section heading, and FAQ answer below is specific to
 * Tuscany/Chianti/Siena/San Gimignano/Florence day-trip logistics and does
 * not reuse or rephrase any string from Pompeii Day Trip's content file
 * (the closest content-family analog per the project's own planning notes).
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
    href: '/money/tuscany-from-florence',
    navTitle: 'Tuscany from Florence',
    h1: 'Tuscany Day Trip from Florence: What Fits in a Single Day',
    keyword: 'tuscany day trip from florence',
    metaTitle: 'Tuscany Day Trip from Florence: What Actually Fits',
    metaDescription:
      'The flagship Tuscany day trip from Florence — realistic hill-town selection, itinerary pacing, and what gets cut when the day runs long.',
    heroImage: { src: 'https://images.unsplash.com/photo-1596142332133-327e2a0ff006', alt: 'Vineyard rows climbing a Tuscan hillside toward a distant hill town at golden hour' },
    intro: [
      'The flagship full-day trip from Florence — what’s realistic to see, and what gets cut when the day runs long.',
      "Most listings promise Siena, San Gimignano, and a Chianti wine stop in the same nine-hour day, and technically that itinerary exists — but the honest version of this page is about which of those three gets the short end when Florence traffic or a slow lunch eats into the schedule, and how to pick a version that doesn't leave you rushing the town you actually wanted to see.",
    ],
    atAGlance: [
      { label: 'Price band', value: '€132–195' },
      { label: 'Duration', value: '8–10 hours, round trip' },
      { label: 'Typical stops', value: '2–3 towns, sometimes plus a winery' },
      { label: 'Return time', value: 'Early-to-mid evening on most itineraries' },
    ],
    sections: [
      {
        heading: 'Full-day structure out of Florence',
        body: [
          "A typical departure leaves central Florence between 7:30 and 8:30am, since the drive into the Chianti/Siena countryside itself only takes 45–75 minutes but the day's real time cost is the stops, not the road. Expect the coach or van to make its first stop by mid-morning, a longer midday stop (often lunch or a winery) around 1pm, and a final town before the return leg starts by late afternoon.",
          "The honest constraint is that Florence-based full-day tours budget roughly 2–2.5 hours per major town, which is enough to see the highlights but not enough to wander without a plan — know your one or two must-see sights in each stop before you arrive, rather than deciding on the spot.",
        ],
      },
      {
        heading: 'Hill-town selection logic',
        body: [
          "Operators pick from a fairly small rotation — Siena, San Gimignano, Pisa, and Montepulciano/Montalcino are the four most common — because each sits within a reasonable drive of both Florence and each other. Siena and San Gimignano pair naturally (see our dedicated trio page); Pisa is usually offered as a standalone add-on rather than combined with Chianti, since it sits in the opposite direction from the wine region.",
          "If a listing's itinerary tries to fit four towns into one day, treat that as a warning sign rather than a bonus — it almost always means 60–90 minutes per stop, which is enough for a photo at the main square and not much else.",
        ],
      },
      {
        heading: 'Return-time realism',
        body: [
          "Most full-day tours land back in Florence between 6:30 and 8pm, depending on traffic re-entering the city and whether the day included a winery stop (which tends to run long, in a good way, since tastings rarely stick to schedule). Plan a light dinner rather than a reservation, and don't book anything time-sensitive for the evening of a Tuscany day trip.",
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: "Worth booking as your one Tuscany day if you pick an itinerary with two towns rather than three or four — the extra stop always comes out of time at the towns you actually wanted to see. If wine tasting is the real priority, book the dedicated wine day trip instead; if the classic Siena/San Gimignano pairing is what you want, that dedicated page gives it more focused time than a generic 'Tuscany highlights' listing.",
    },
    faqs: [
      {
        question: 'How early do these tours leave Florence?',
        answer:
          'Most depart between 7:30 and 8:30am — earlier departures generally mean more time at each stop before tour-bus crowds build up mid-morning.',
      },
      {
        question: 'Can I customize which towns are included?',
        answer:
          'On a shared group tour, no — the itinerary is fixed; a private driver-guide booking is the option that lets you swap towns or add extra time somewhere specific.',
      },
      {
        question: 'Is one day enough to see Tuscany properly?',
        answer:
          'One day is enough for a genuine first taste of two towns plus maybe a winery — it is not enough to see the whole region, so treat it as a sampler rather than a complete visit.',
      },
    ],
    relatedSupportHref: '/support/which-tuscany-trip-to-pick',
    relatedSupportLabel: 'Which Tuscany Trip to Pick',
  },
  {
    href: '/money/tuscany-wine-day-trip',
    navTitle: 'Tuscany Wine Day Trip',
    h1: 'Tuscany Wine Day Trip: Chianti Tasting Done Right',
    keyword: 'tuscany wine tour',
    metaTitle: 'Tuscany Wine Day Trip: Chianti Tasting Done Right',
    metaDescription:
      'A properly paced Chianti wine day trip — 2–3 wineries, lunch pairing, and the designated-driver question answered honestly.',
    heroImage: { src: 'https://images.unsplash.com/photo-1726741827090-0b5a52b45686', alt: 'A hand pressing dark grapes over a wine glass between rows of vines in a sunlit vineyard' },
    intro: [
      'A Chianti tasting day done properly means 2–3 wineries, not a rushed five-stop marathon that leaves you tasting nothing but bus exhaust.',
      "The number-one thing that separates a genuinely good Chianti wine day from a disappointing one is pacing: enough time at each winery for a real tasting and a short walk through the vines, versus a checklist of stops where the bus idles in the parking lot while you rush a pour standing up.",
    ],
    atAGlance: [
      { label: 'Price band', value: '€149–195' },
      { label: 'Duration', value: '6–8 hours' },
      { label: 'Wineries visited', value: '2–3, with proper tasting time' },
      { label: 'Lunch format', value: 'Usually a wine-paired lunch at one winery' },
    ],
    sections: [
      {
        heading: '2–3 winery pacing, done right',
        body: [
          "A well-run Chianti day budgets 60–90 minutes per winery — enough for a cellar or vineyard walk-through, a guided tasting of 3–5 wines, and a few unhurried questions for the host. Five-winery itineraries exist and are marketed as good value, but the math doesn't work: with travel time between estates included, that leaves barely 20–30 minutes per stop, which is a rushed pour, not a tasting.",
          "Two to three wineries, chosen for variety (a larger estate and a smaller family producer, for instance) rather than sheer count, consistently gets better feedback than a longer list of stops.",
        ],
      },
      {
        heading: 'Lunch-pairing options',
        body: [
          "Most full Chianti day trips build lunch around one of the wineries visited, pairing a multi-course meal with that estate's own wines — this is usually the single best-value part of the day, since the lunch and wine pairing together often cost less than booking each separately in a restaurant. Confirm whether lunch is included in the listed price or sold as an add-on, since this varies significantly by operator.",
        ],
      },
      {
        heading: 'Designated-driver / tour-vs-self-drive tradeoff',
        body: [
          "This is the honest crux of the whole decision: self-driving to Chianti gives total flexibility over which wineries you visit and how long you stay, but it means one person in the group tastes little or nothing all day. A guided tour with a driver removes that tradeoff entirely — everyone tastes, nobody drives — which is why most visitors who prioritize the wine itself book a tour rather than a rental car for this specific day.",
          "If you do self-drive, look at wineries that explicitly offer a non-alcoholic tasting flight or grape-juice alternative for the driver, since a genuinely good producer will have one rather than leaving the driver with water.",
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: "Worth booking as a guided tour rather than self-driving if wine tasting is the actual point of the day — the driver tradeoff alone justifies it for most groups. Pick a 2–3 winery itinerary over anything promising more stops; the pacing difference is the whole experience.",
    },
    faqs: [
      {
        question: 'How many wineries should I actually visit in one day?',
        answer:
          'Two to three, with real tasting time at each — more than that turns into rushed pours with no chance to appreciate what makes each producer different.',
      },
      {
        question: 'Is lunch included in a Chianti wine day trip?',
        answer:
          'Often, but not always — most listings pair lunch with one winery visited, though a minority sell it as a separate add-on, so check the specific listing before assuming.',
      },
      {
        question: 'What if someone in my group doesn’t drink?',
        answer:
          'A genuinely good winery will offer a non-alcoholic tasting flight or grape-juice alternative — ask before booking if this matters, since not every smaller producer offers it.',
      },
    ],
    relatedSupportHref: '/support/wine-tour-logistics',
    relatedSupportLabel: 'Wine Tour Logistics',
  },
  {
    href: '/money/siena-san-gimignano-chianti',
    navTitle: 'Siena + San Gimignano + Chianti',
    h1: 'Siena, San Gimignano & Chianti: The Routing That Actually Works',
    keyword: 'siena san gimignano chianti tour',
    metaTitle: 'Siena, San Gimignano & Chianti: Best Routing Order',
    metaDescription:
      'The classic Siena, San Gimignano, and Chianti day-trip trio — the town order that actually works, and where the wine stop fits best.',
    heroImage: { src: 'https://images.unsplash.com/photo-1653228239729-f7cc50704951', alt: "San Gimignano's medieval stone towers rising above a foreground vineyard, seen from a nearby hillside" },
    intro: [
      'The classic trio — but the order you visit them in changes the whole day’s energy. Here’s the routing that actually works.',
      "Siena, San Gimignano, and a Chianti wine stop are the single most common combination sold as a Tuscany day trip, and for good reason — they sit within a compact triangle south of Florence. The part most listings get wrong isn't which towns to include, it's the order and timing, which changes whether you experience Siena's grandeur or San Gimignano's towers at their best.",
    ],
    atAGlance: [
      { label: 'Price band', value: '€132–195' },
      { label: 'Duration', value: '8–9 hours' },
      { label: 'Best town order', value: 'San Gimignano first, Siena last' },
      { label: 'Wine stop placement', value: 'Between the two towns, at lunch' },
    ],
    sections: [
      {
        heading: 'Town-order logic: crowds and light',
        body: [
          "San Gimignano is smaller and its main draw (the towers and the main square) is best seen with fewer tour buses already parked — arriving first thing in the morning, before the mid-morning bus wave, makes a real difference to how the town feels. Siena, being larger and denser, absorbs crowds better and rewards being seen in the softer late-afternoon light, when the Piazza del Campo's brick color deepens and the day-tripper crowds start to thin.",
          "Doing Siena first and San Gimignano last inverts both of these advantages — you hit San Gimignano at its most crowded hour and see Siena in flat midday light. The order matters more than most itineraries let on.",
        ],
      },
      {
        heading: 'Time budget per town',
        body: [
          "San Gimignano genuinely only needs 90 minutes to 2 hours — it's a small, walkable town, and even climbing one of the towers (when open to visitors) doesn't take much longer than that. Siena deserves closer to 2.5–3 hours: the Duomo alone rewards unhurried time, and the Piazza del Campo is worth simply sitting in rather than photographing and moving on.",
        ],
      },
      {
        heading: 'Chianti wine stop placement',
        body: [
          "The cleanest itinerary places the wine stop at lunchtime, between San Gimignano and Siena — geographically it sits roughly on the route between the two, and a midday tasting-plus-lunch break gives the day a natural pause rather than bolting a fourth stop onto an already full afternoon.",
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: "This trio works better than almost any other single-day Tuscany combination, provided the operator actually routes it San Gimignano → Chianti lunch → Siena. If a listing does the reverse order, or crams in a fourth town, it's a sign the operator hasn't optimized the day around how these places actually feel at different times.",
    },
    faqs: [
      {
        question: 'Which town should I visit first?',
        answer:
          'San Gimignano — it’s smaller and best experienced before the mid-morning tour-bus crowds arrive, while Siena rewards being seen later in softer afternoon light.',
      },
      {
        question: 'Can I skip the wine stop and just do the two towns?',
        answer:
          'Yes, some listings offer a sightseeing-only version without the winery — check the specific listing’s inclusions, since not every operator makes this configurable.',
      },
      {
        question: 'Is this trio too rushed for one day?',
        answer:
          'It’s tight but workable if the operator times it well — San Gimignano briefly in the morning, a relaxed lunch/wine stop midday, and Siena with real time in the afternoon; a poorly paced version of the same trio can feel rushed.',
      },
    ],
    relatedSupportHref: '/support/best-season-for-tuscany',
    relatedSupportLabel: 'Best Season for Tuscany',
  },
  {
    href: '/money/florence-base-day-trips',
    navTitle: 'Florence-Base Day Trips',
    h1: 'Every Realistic Day Trip from a Florence Base',
    keyword: 'day trips from florence',
    metaTitle: 'Day Trips from Florence: Ranked by Transit Time',
    metaDescription:
      'A hub roundup of every realistic day trip from a Florence base, ranked by how much of the day gets eaten by transit — first-timer and return-visitor picks.',
    heroImage: { src: 'https://images.unsplash.com/photo-1578262634053-eead874052be', alt: "A rooftop view over Florence's terracotta roofs and a bell tower, with green hills visible in the distance" },
    intro: [
      'A hub roundup of every realistic day trip from a Florence base, ranked by how much of the day gets eaten by transit.',
      "Florence sits at the center of an unusually good day-trip radius — Chianti, Siena, San Gimignano, and Pisa are all within 90 minutes — but not every popular day trip is actually a good use of a single day once you account for how much of it disappears into the drive or train ride.",
    ],
    atAGlance: [
      { label: 'Price band', value: '€132–195' },
      { label: 'Best for first-timers', value: 'Siena + San Gimignano + Chianti' },
      { label: 'Best for return visitors', value: 'Dedicated Chianti wine day' },
      { label: 'Least transit-efficient', value: 'Any itinerary with 4+ stops' },
    ],
    sections: [
      {
        heading: 'Transit-time comparison',
        body: [
          "San Gimignano and the Chianti wine region both sit roughly 45–75 minutes from Florence by road, meaning a well-planned day loses under 2.5 hours total to driving. Siena adds only slightly more. Pisa, while popular, sits in the opposite direction from Chianti and Siena, so combining it with either means significantly more transit time than a Chianti/Siena-focused day.",
          "The transit-efficient rule of thumb: pick destinations that sit roughly in the same direction from Florence, and resist an itinerary that zigzags between Chianti and Pisa in the same day just because both are 'near Florence' — near Florence isn't the same as near each other.",
        ],
      },
      {
        heading: 'Best for first-timers',
        body: [
          "If this is your only Tuscany day trip, the Siena + San Gimignano + Chianti trio (see our dedicated page) gives the broadest first impression of the region in one well-routed day — hill towns, countryside, and a wine stop, without the transit inefficiency of trying to also fit in Pisa.",
        ],
      },
      {
        heading: 'Best for return visitors',
        body: [
          "If you've already seen the classic towns on an earlier trip, a dedicated wine day trip (see our Tuscany Wine Day Trip page) is the better use of a repeat visit — it trades sightseeing breadth for depth on the one thing a single first-timer day trip doesn't have room to slow down for.",
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: "Florence is a genuinely efficient day-trip base for Chianti, Siena, and San Gimignano specifically — treat Pisa as its own separate day rather than trying to combine it with the wine region, since the transit math doesn't favor combining them.",
    },
    faqs: [
      {
        question: "What's the single best day trip from Florence?",
        answer:
          'For a first visit, the Siena + San Gimignano + Chianti trio — it covers the region’s highlights in one well-routed day without excessive transit time.',
      },
      {
        question: 'Can I combine Pisa with a Chianti wine day?',
        answer:
          'Not efficiently — Pisa sits in the opposite direction from Chianti and Siena, so combining them means significantly more time on the road than a day focused on one direction.',
      },
      {
        question: 'How many day trips from Florence are realistically worth doing?',
        answer:
          'Most visitors get the most value from one well-routed hill-town-and-wine day plus, on a longer stay, a separate dedicated wine day or a Pisa day — trying to compress everything into a single trip usually costs more in transit than it gains in sightseeing.',
      },
    ],
    relatedSupportHref: '/support/with-or-without-a-car',
    relatedSupportLabel: 'With or Without a Car',
  },
];

export const SUPPORT_PAGE_CONTENT: SupportPageContent[] = [
  {
    href: '/support/which-tuscany-trip-to-pick',
    navTitle: 'Which Tuscany Trip to Pick',
    h1: 'Which Tuscany Day Trip Should You Actually Book?',
    keyword: 'which tuscany day trip to pick',
    metaTitle: 'Which Tuscany Day Trip to Pick: A Simple Decision Guide',
    metaDescription:
      'A quick decision guide to picking the right Tuscany day trip — sightseeing vs. wine-focused, first-timer vs. return-visitor picks.',
    heroImage: { src: 'https://images.unsplash.com/photo-1496886357681-bb985aa5e4c6', alt: "A high rooftop view over Siena, with the Torre del Mangia visible among the terracotta roofs" },
    sections: [
      {
        heading: 'Start with what you actually want from the day',
        body: [
          "The four money pages on this site each answer a different version of 'which Tuscany day trip' — and the fastest way to pick is to be honest about what matters most: hill towns and history (Tuscany from Florence, or the Siena/San Gimignano/Chianti trio), wine specifically (Tuscany Wine Day Trip), or maximum flexibility across everything Florence can reach in a day (Florence-Base Day Trips).",
        ],
      },
      {
        heading: 'First-timer vs. return-visitor picks',
        body: [
          "If this is your first and only Tuscany day, the Siena + San Gimignano + Chianti trio gives the broadest single-day impression of the region. If you've done that trip before, or wine is genuinely the priority over sightseeing, the dedicated wine day trip trades breadth for depth and is the better repeat-visit pick.",
        ],
      },
      {
        heading: 'When neither fits: build your own with a private guide',
        body: [
          "If your group wants a specific mix — say, San Gimignano and a single winery, skipping Siena entirely — a private driver-guide booking is the only format that reliably accommodates a custom itinerary; every shared group tour on this site runs a fixed route.",
        ],
      },
    ],
    faqs: [
      {
        question: 'I only have one day in Tuscany — which page should I read?',
        answer:
          'Start with Tuscany from Florence for the flagship overview, then the Siena/San Gimignano/Chianti trio page if hill towns and wine both matter to you.',
      },
      {
        question: 'Is the wine day trip worth it if I don’t drink much?',
        answer:
          'Probably not as your only day — the sightseeing-focused trips give more variety; save the dedicated wine day for a trip where tasting is genuinely the point.',
      },
      {
        question: 'What if I want a completely custom itinerary?',
        answer:
          'A private driver-guide booking is the only format built for that — shared group tours run a fixed route with no substitutions.',
      },
    ],
    relatedMoneyHref: '/money/tuscany-from-florence',
    relatedMoneyLabel: 'See Tuscany from Florence',
  },
  {
    href: '/support/wine-tour-logistics',
    navTitle: 'Wine Tour Logistics',
    h1: 'Tuscany Wine Tour Logistics, Honestly Explained',
    keyword: 'tuscany wine tour logistics',
    metaTitle: 'Tuscany Wine Tour Logistics: What to Actually Expect',
    metaDescription:
      'The real logistics of a Tuscany wine tour — winery pacing, lunch pairing, and the designated-driver question, explained plainly.',
    heroImage: { src: 'https://images.unsplash.com/photo-1783443799503-e1587f423bd0', alt: 'An arched brick wine cellar lined with large aging wooden barrels' },
    sections: [
      {
        heading: 'What a typical tasting stop actually looks like',
        body: [
          "A well-run winery stop starts with a short walk through part of the vineyard or cellar, followed by a seated or standing tasting of 3–5 wines guided by a host who explains what makes that estate's approach different. Expect 60–90 minutes at a proper stop — anything shorter is closer to a drive-by tasting than a real visit.",
        ],
      },
      {
        heading: 'Booking through a tour vs. contacting wineries directly',
        body: [
          "A packaged tour (GetYourGuide, Viator, Civitatis) bundles transport, a driver, and pre-arranged tasting slots at 2–3 wineries, which is the simplest option if you don't want to coordinate logistics yourself. Contacting wineries directly and self-driving gives more control over exactly which estates you visit, but requires a designated driver and more planning on your part.",
        ],
      },
      {
        heading: "What's typically included vs. what costs extra",
        body: [
          "Most listings include the tastings themselves and often a wine-paired lunch at one estate; what usually costs extra is bottle purchases to take home (rarely included in the tour price) and any premium 'reserve' tastings some estates offer above the standard flight. Ask about bottle shipping if you want to buy wine to take home rather than carry it — many estates offer this for a fee.",
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I need to know anything about wine beforehand?',
        answer:
          'No — a good host talks through each wine in plain terms; these tastings are built for genuine beginners as much as for wine enthusiasts.',
      },
      {
        question: 'Can I buy bottles to take home?',
        answer:
          'Usually, yes, though it typically costs extra beyond the tour price; ask about shipping if you don’t want to carry bottles for the rest of your trip.',
      },
      {
        question: 'Is a half-day wine tour enough, or should I book a full day?',
        answer:
          'A half-day usually fits one winery properly; a full day (6–8 hours) is what allows the 2–3 winery pacing that gives the best overall experience.',
      },
    ],
    relatedMoneyHref: '/money/tuscany-wine-day-trip',
    relatedMoneyLabel: 'See the Tuscany Wine Day Trip',
  },
  {
    href: '/support/with-or-without-a-car',
    navTitle: 'With or Without a Car',
    h1: 'Tuscany Day Trip: With or Without a Car?',
    keyword: 'tuscany day trip with or without a car',
    metaTitle: 'Tuscany Day Trip: Self-Drive vs. Guided Tour',
    metaDescription:
      'Self-driving vs. a guided tour for a Tuscany day trip — the honest tradeoffs on flexibility, wine tasting, and Tuscany’s winding rural roads.',
    heroImage: { src: 'https://images.unsplash.com/photo-1593270187915-d7a91b726610', alt: 'An open two-lane road running straight through Tuscan countryside farmland' },
    sections: [
      {
        heading: 'What self-driving actually gives you',
        body: [
          "A rental car gives total control over timing and route — linger an extra hour in San Gimignano, skip a stop that isn't working out, or detour to a small producer no tour visits. The tradeoff is real, though: Tuscany's rural roads are narrow, winding, and occasionally poorly signed, and if wine tasting is part of the day, one person in the group won't be drinking.",
        ],
      },
      {
        heading: 'What a guided tour removes',
        body: [
          "A guided tour with a driver eliminates the designated-driver problem entirely and removes the stress of navigating unfamiliar rural roads, tight town-center parking, and Italy's ZTL (limited-traffic zone) restrictions that catch out visitors driving into historic centers. The tradeoff is a fixed itinerary and a pace set by the group, not by you alone.",
        ],
      },
      {
        heading: 'When each option makes more sense',
        body: [
          "Self-driving makes the most sense for a sightseeing-focused day with no wine tasting, or for a group with a genuinely willing non-drinking driver. A guided tour makes more sense whenever wine tasting matters, for solo travelers who'd rather not navigate alone, and for anyone uncomfortable with narrow rural roads or Italian city-center driving rules.",
        ],
      },
    ],
    faqs: [
      {
        question: "Are Tuscany's rural roads hard to drive?",
        answer:
          'They’re narrow and winding by international standards, though well-maintained — the main challenge is unfamiliarity and occasional sparse signage, not road quality itself.',
      },
      {
        question: 'What is a ZTL and does it affect a day trip?',
        answer:
          'A ZTL (zona a traffico limitato) is a restricted-access zone in many Italian town centers; driving into one without authorization can result in a fine, so check parking outside the historic center rather than driving straight in.',
      },
      {
        question: 'Is it cheaper to self-drive than book a tour?',
        answer:
          'Often close to a wash once you add car rental, fuel, parking, and tolls for a small group — a guided tour tends to be better value for solo travelers or couples, while self-driving can pencil out for larger groups splitting the cost.',
      },
    ],
    relatedMoneyHref: '/money/florence-base-day-trips',
    relatedMoneyLabel: 'See Florence-Base Day Trips',
  },
  {
    href: '/support/best-season-for-tuscany',
    navTitle: 'Best Season for Tuscany',
    h1: 'The Best Season for a Tuscany Day Trip',
    keyword: 'best season for tuscany day trip',
    metaTitle: 'Best Season for a Tuscany Day Trip: Month by Month',
    metaDescription:
      'When to book a Tuscany day trip — late spring vs. early autumn vs. summer, and how harvest season changes a Chianti wine day.',
    heroImage: { src: 'https://images.unsplash.com/photo-1567072629554-20e689de2400', alt: 'Sunset light breaking over vineyard rows on a Tuscan hillside' },
    sections: [
      {
        heading: 'Late spring and early autumn: the sweet spot',
        body: [
          "May–June and September–October consistently give the best combination of mild temperatures, softer light for photos, and manageable crowds at the main hill towns. Vineyards are at their most photogenic in these windows too — vivid green in late spring, and turning gold-and-red during the September–October harvest.",
        ],
      },
      {
        heading: 'Summer: beautiful but hot and crowded',
        body: [
          "July and August bring the longest days and reliably clear skies, but also the region's harshest midday heat (regularly above 30°C/86°F) and its heaviest crowds at Siena and San Gimignano. A summer day trip works better with an early departure and a plan to be somewhere shaded or air-conditioned during the early-afternoon heat peak.",
        ],
      },
      {
        heading: 'Harvest season: worth timing for',
        body: [
          "September specifically adds grape-harvest activity at many wineries — some estates let visitors watch or even briefly participate in picking, which is a genuinely different experience from a standard tasting. If a wine day trip is the priority, aim for mid-to-late September for the best chance of catching harvest activity, though exact timing varies year to year with the growing season.",
        ],
      },
    ],
    faqs: [
      {
        question: 'Is winter a bad time for a Tuscany day trip?',
        answer:
          'Not bad, just different — fewer crowds and lower prices, but shorter daylight hours and some smaller wineries or attractions operating reduced hours, so confirm opening times in advance.',
      },
      {
        question: 'When does grape harvest actually happen?',
        answer:
          'Typically September, though the exact window shifts year to year depending on the growing season — mid-to-late September is the safest bet for the best chance of seeing harvest activity.',
      },
      {
        question: 'Is summer too hot for a hill-town walking day?',
        answer:
          'It’s manageable with planning — start early, expect midday heat above 30°C/86°F, and build in shaded or indoor time during the early afternoon rather than pushing through it.',
      },
    ],
    relatedMoneyHref: '/money/siena-san-gimignano-chianti',
    relatedMoneyLabel: 'See Siena + San Gimignano + Chianti',
  },
  {
    href: '/support/what-s-included',
    navTitle: "What's Included",
    h1: "What's Actually Included in a Tuscany Day Trip",
    keyword: 'what is included in a tuscany day trip',
    metaTitle: 'What’s Included in a Tuscany Day Trip: Real Inclusions',
    metaDescription:
      'The real inclusions across Tuscany day trips — transport, wine tasting, lunch, and what usually costs extra.',
    heroImage: { src: 'https://images.unsplash.com/photo-1744139056941-6200ae72e7cb', alt: 'Olive trees framing a stone Tuscan farmhouse and tower' },
    sections: [
      {
        heading: 'Standard inclusions across nearly every listing',
        body: [
          "Almost every Tuscany day trip includes round-trip transport from Florence, an English-speaking driver or guide, and entry to at least one town's historic center (which is generally free to walk regardless). This baseline holds across GetYourGuide, Viator, and Civitatis listings at every price tier.",
        ],
      },
      {
        heading: "What varies: wine tasting, lunch, and museum entries",
        body: [
          "Beyond the baseline, inclusions get inconsistent: whether a wine tasting is included at all (a sightseeing-only itinerary may skip it entirely), whether lunch is bundled into the price or sold separately, and whether specific paid sights (a museum, the Duomo's dome climb in Siena) are pre-booked or left for you to arrange and pay for on-site. Check the specific listing's inclusion list rather than assuming any of these are bundled in.",
        ],
      },
      {
        heading: 'Common add-ons that cost extra',
        body: [
          "The most common paid add-ons are bottled wine purchases to take home, a private upgrade from a shared group tour, and skip-the-line entry to specific paid sights like Siena's Duomo interior. None of these are hidden fees exactly, but they're rarely bundled into the base price shown in search results, so budget accordingly if any of them matter to you.",
        ],
      },
    ],
    faqs: [
      {
        question: 'Is wine tasting always included?',
        answer:
          'No — some itineraries are sightseeing-only with no winery stop; check the specific listing’s inclusions, or use our winetasting-included filter across the comparison tables on this site.',
      },
      {
        question: 'Is lunch included in the price?',
        answer:
          'It varies by listing — many wine-focused day trips bundle a wine-paired lunch, while some sightseeing-only itineraries leave lunch as free time to arrange and pay for yourself.',
      },
      {
        question: 'Do I need to pre-book museum or church entries separately?',
        answer:
          'Sometimes — a handful of paid sights (like Siena’s Duomo interior) aren’t always pre-booked as part of a group tour, so check in advance if a specific interior visit matters to you.',
      },
    ],
    relatedMoneyHref: '/money/tuscany-wine-day-trip',
    relatedMoneyLabel: 'See the Tuscany Wine Day Trip',
  },
];

export function getMoneyPageContent(href: string): MoneyPageContent | undefined {
  return MONEY_PAGE_CONTENT.find((p) => p.href === href);
}

export function getSupportPageContent(href: string): SupportPageContent | undefined {
  return SUPPORT_PAGE_CONTENT.find((p) => p.href === href);
}
