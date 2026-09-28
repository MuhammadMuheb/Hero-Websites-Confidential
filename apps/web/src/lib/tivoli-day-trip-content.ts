/**
 * Content copy for Tivoli Day Trip — hero section, money-page hooks,
 * FAQ answers, and SEO metadata. All strings are production-ready from
 * the master network blueprint (MASTER-NETWORK-BLUEPRINT.md §3.13).
 */

export const HERO = {
  eyebrow: 'ESCAPE ROME FOR A DAY',
  headline: 'Renaissance Fountains & Imperial Ruins: The Ultimate Tivoli Guide',
  subheadline:
    "Discover Villa d'Este's breathtaking water features and Hadrian's Villa's ancient grandeur. Complete guide with expert comparisons, logistics, and insider tips for the perfect day trip.",
  primaryCta: { label: 'Explore Tivoli Tours', href: '#tours' },
  secondaryCta: { label: 'Start Planning Your Visit', href: '#plan-your-trip' },
  trustBullets: [
    'Expert recommendations from Italy-based guides',
    'Real photos and detailed site comparisons',
    'Easy-to-follow Rome transportation guide',
    'Best times to visit and skip the crowds',
  ],
};

export const MONEY_PAGE_COPY = {
  tivoliFromRome: {
    hook: 'The flagship half/full-day trip — close enough to Rome that a half-day is genuinely realistic, but full-day lets you properly see both villas without rushing.',
    highlights: [
      'Rome-to-Tivoli transit time',
      'Half-day vs full-day decision guide',
      'Both-villas-in-one-day feasibility',
    ],
  },
  villaDesteHadrians: {
    hook: 'The two-villa combo — Renaissance fountains against Roman imperial ruins, a genuine contrast most visitors don\'t expect from a single day trip.',
    highlights: [
      'Villa-order logic (gardens vs ruins first)',
      'Time budget per site',
      'Combined-ticket options',
    ],
  },
  privateTivoli: {
    hook: 'A private guide and transport removes the two-bus, one-transfer logistics that make independent Tivoli travel more of a hassle than it needs to be.',
    highlights: [
      'Door-to-door transport included',
      'Custom pacing between villas',
      'Price vs self-organized transit',
    ],
  },
  halfDayTivoli: {
    hook: 'The short option — enough time for Villa d\'Este\'s fountains alone, for travelers who can\'t spare a full day but still want to see Tivoli\'s headline site.',
    highlights: [
      'Single-villa focus (Villa d\'Este)',
      'Realistic round-trip timing',
      'What gets cut versus the full-day version',
    ],
  },
};

export const FAQ_ITEMS = [
  {
    question: 'Which villa should I prioritise if I only have time for one?',
    answer:
      "Villa d'Este, for most visitors — its terraced Renaissance fountain gardens are the more visually dramatic and widely photographed site; Hadrian's Villa rewards visitors specifically interested in Roman archaeology and ruins.",
  },
  {
    question: 'Can I do Tivoli as a half-day trip from Rome?',
    answer:
      "Yes, for Villa d'Este alone — round-trip transit plus a focused 2–2.5 hours at the gardens fits comfortably in a half day; adding Hadrian's Villa realistically needs a full day.",
  },
  {
    question: 'How do I get to Tivoli from Rome without a tour?',
    answer:
      'Regional trains and a local bus connection are the independent-travel route, with roughly 1–1.5 hours of one-way transit each way — the getting-there page breaks down the exact routing and timing.',
  },
  {
    question: "What's the best season to visit Villa d'Este's gardens?",
    answer:
      "Late spring (May) has the fountains at full flow and gardens in bloom; summer is hot with less shade than you'd expect, and the gardens-best-season page has month-by-month notes.",
  },
  {
    question: 'Is Tivoli suitable for a family day trip with kids?',
    answer:
      "Yes — Villa d'Este's fountains and garden paths are genuinely kid-engaging, though Hadrian's Villa's ruins-and-walking format suits older children better than toddlers.",
  },
];

export const SEO_META = {
  home: {
    title: "Tivoli Day Trips — Villa d'Este & Hadrian's Villa Guide",
    description:
      "First-hand Tivoli day-trip guide from Rome. Villa d'Este vs Hadrian's Villa, half-day vs full-day, and honest transit logistics.",
  },
  villaDesteHadrians: {
    title: "Villa d'Este and Hadrian's Villa: Which to See First",
    description:
      "Combining Villa d'Este's fountains with Hadrian's Villa's ruins in one day — routing, timing, and which site to prioritise.",
  },
};

export const AUTHOR = {
  name: 'Marco Rossi',
  initials: 'MR',
  title: 'Tivoli & Roman Villas guide, 10 years',
  domain: 'tivolivillas.com',
  bio: 'A guide who has explored every fountain at Villa d\'Este and walked every ruin at Hadrian\'s Villa — writes from deep first-hand knowledge, not guidebooks.',
};

export const FAQS = FAQ_ITEMS;

export const QUICK_FACTS = [
  { label: 'Distance Northeast', value: '28 km from Rome', detail: 'Easy day trip by train and local bus' },
  { label: 'Travel Time', value: '1 hour round-trip', detail: 'Fast regional rail connection to Tivoli station' },
  { label: 'Fountain Gardens', value: '2 hours to explore', detail: 'Villa d\'Este\'s Renaissance masterpiece' },
  { label: 'Ancient Ruins', value: '3 hours to discover', detail: 'Hadrian\'s Villa imperial archaeological site' },
  { label: 'Golden Season', value: 'May through October', detail: 'Perfect weather and manageable crowds' },
  { label: 'Peak Crowds', value: 'July & August', detail: 'Summer heat and tourist congestion' },
];

export interface QuickLink {
  label: string;
  href: string;
}

export const QUICK_LINKS: QuickLink[] = [
  { label: 'From Rome', href: '/money/tivoli-from-rome' },
  { label: 'Both Villas', href: '/villa-d-este-hadrian-s-villa' },
  { label: 'Getting There', href: '/support/getting-to-tivoli-train-vs-tour' },
  { label: 'Which Villa', href: '/which-villa-to-prioritise' },
  { label: 'Best Season', href: '/gardens-best-season' },
];

export interface PageMetadata {
  title: string;
  description: string;
  ogImage?: string;
}

export interface MoneyPageContent {
  href: string;
  navTitle?: string;
  h1?: string;
  keyword?: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: { src: string; alt: string };
  intro: string[];
  atAGlance: Array<{ label: string; value: string }>;
  sections: Array<{ title: string; body: string }>;
  verdict?: { heading: string; body: string };
  faqs: Array<{ question: string; answer: string }>;
  relatedSupportHref: string;
  relatedSupportLabel: string;
}

export interface SupportPageContent {
  href: string;
  navTitle?: string;
  metaTitle: string;
  metaDescription: string;
  h1?: string;
  keyword?: string;
  heroImage?: { src: string; alt: string };
  sections?: Array<{ heading?: string; title?: string; body: string[] }>;
  faqs?: Array<{ question: string; answer: string }>;
  relatedMoneyHref?: string;
  relatedMoneyLabel?: string;
}

const IMG = {
  esteFacade: { src: 'https://images.unsplash.com/photo-1654612533611-d4f18261d444', alt: "The villa building of Villa d'Este in Tivoli with a fountain in front" },
  esteFountains: { src: 'https://images.unsplash.com/photo-1664461890788-5c7d689cda56', alt: "A row of water fountains in the gardens of Villa d'Este, Tivoli" },
  esteCourtyard: { src: 'https://images.unsplash.com/photo-1664461892055-a073051e3c2c', alt: "A courtyard with a fountain and statues at Villa d'Este, Tivoli" },
  esteGarden: { src: 'https://images.unsplash.com/photo-1664461891582-bc909249a508', alt: "A fountain among the trees in the gardens of Villa d'Este" },
  esteVisitors: { src: 'https://images.unsplash.com/photo-1664461890405-fe44f7c879f7', alt: "Visitors walking around a water fountain at Villa d'Este" },
  esteStatue: { src: 'https://images.unsplash.com/photo-1654533596848-5c1bd2393cae', alt: "A fountain with a statue in the gardens of Villa d'Este" },
  hadrian: { src: 'https://images.unsplash.com/photo-1613002999620-f586001ee027', alt: "An ancient statue beside the water at Hadrian's Villa near Tivoli" },
  tivoliTrees: { src: 'https://images.unsplash.com/photo-1550683402-b269d8d0304f', alt: 'Tall trees in the gardens of Tivoli near Rome' },
};

const MONEY_PAGE_CONTENT: MoneyPageContent[] = [
  {
    href: '/money/tivoli-from-rome',
    heroImage: IMG.esteFacade,
    h1: 'Tivoli Day Trip from Rome: Half-Day vs Full-Day',
    keyword: 'tivoli day trip from rome',
    metaTitle: 'Tivoli Day Trip from Rome: Half-Day vs Full-Day Guide',
    metaDescription:
      'Close enough for a half-day trip, full-day lets you see both villas properly — timing, routing, and honest transit logistics from Rome.',
    intro: [
      "Tivoli is a hill town about 30 km east of Rome. It is home to two UNESCO World Heritage Sites: Villa d'Este, a Renaissance villa famous for its fountains, and Hadrian's Villa, the huge country estate of a Roman emperor.",
      'Because it is so close, you can choose between a half-day trip to one villa or a full day that covers both. Here is how to decide.',
    ],
    atAGlance: [
      { label: 'Distance from Rome', value: '~30 km' },
      { label: 'Travel each way', value: '45–60 minutes' },
      { label: 'Half day', value: "Villa d'Este only, ~5 hours" },
      { label: 'Full day', value: 'Both villas, 7–8 hours' },
      { label: 'Best for', value: 'A calm break from central Rome' },
    ],
    sections: [
      {
        title: 'Half day: one villa',
        body: "A half day works best with Villa d'Este alone. It sits in the centre of Tivoli, so there is no extra transfer, and 1.5 to 2 hours is enough to walk the terraces and see the main fountains. Leave Rome in the morning and you can be back by mid-afternoon.",
      },
      {
        title: 'Full day: both villas',
        body: "Hadrian's Villa is in the plain below the town, about 5 km from Villa d'Este. Seeing both means a transfer in between and a lot of walking, since Hadrian's Villa alone takes 2 to 3 hours. A full day, or a tour that includes transport between the two, is the comfortable way to do it.",
      },
      {
        title: 'Getting there',
        body: "Regional trains run from Roma Tiburtina to Tivoli in about an hour, and Cotral buses leave from Ponte Mammolo metro station (line B). The station in Tivoli is a walk up to Villa d'Este, and reaching Hadrian's Villa needs a local bus or taxi. A tour or private driver removes all of these connections.",
      },
    ],
    verdict: {
      heading: 'Full day if you can, half day if you must',
      body: "If you have a whole day, see both villas: the contrast between the Renaissance gardens and the Roman ruins is the point of the trip. If you only have a morning, go to Villa d'Este.",
    },
    faqs: [
      {
        question: 'Is Tivoli worth a day trip from Rome?',
        answer: 'Yes. It is close, less crowded than central Rome, and the two villas are very different from anything in the city.',
      },
      {
        question: 'Can I visit Tivoli without a tour?',
        answer: "Yes. Trains and buses go there from Rome. You will need a bus or taxi between the two villas if you want to see both.",
      },
      {
        question: 'How long do I need in Tivoli?',
        answer: "About 5 hours for Villa d'Este alone, including travel. Allow 7 to 8 hours for both villas.",
      },
    ],
    relatedSupportHref: '/support/getting-to-tivoli-train-vs-tour',
    relatedSupportLabel: 'Getting to Tivoli',
  },
  {
    href: '/villa-d-este-hadrian-s-villa',
    heroImage: IMG.hadrian,
    h1: "Villa d'Este and Hadrian's Villa: Which to See First",
    keyword: "villa d'este hadrian's villa tour",
    metaTitle: "Villa d'Este and Hadrian's Villa: Which to See First",
    metaDescription:
      "Combining Villa d'Este's fountains with Hadrian's Villa's ruins in one day — routing, timing, and which site to prioritise.",
    intro: [
      "Seeing both villas in one day is the classic Tivoli trip. The order matters: Hadrian's Villa is open, sunny and spread out, while Villa d'Este is shady and full of water.",
      "For most of the year the best plan is Hadrian's Villa in the morning, lunch in Tivoli, and Villa d'Este in the afternoon.",
    ],
    atAGlance: [
      { label: "Hadrian's Villa", value: '2–3 hours' },
      { label: "Villa d'Este", value: '1.5–2 hours' },
      { label: 'Between the two', value: '~5 km, 10–15 min by car' },
      { label: 'Best order', value: "Hadrian's Villa first" },
      { label: 'Shoes', value: 'Comfortable, lots of walking' },
    ],
    sections: [
      {
        title: "Why Hadrian's Villa goes first",
        body: "Hadrian's Villa was built in the 2nd century AD and covers a very large area with little shade. Visiting in the cooler morning makes the walk much easier. Highlights include the Canopus, a long pool lined with statues, and the Maritime Theatre, a small island villa inside a circular moat.",
      },
      {
        title: "Villa d'Este in the afternoon",
        body: "Villa d'Este was built in the 16th century for Cardinal Ippolito II d'Este. Its terraced gardens are full of fountains, including the Avenue of the Hundred Fountains and the Fountain of the Organ, which plays music with water at set times during the day. The shade and the sound of water make it a perfect afternoon visit.",
      },
      {
        title: 'Lunch in between',
        body: "Tivoli's old town, around Villa d'Este, has plenty of simple trattorias. Having lunch here between the two villas gives you a rest and puts you right next to the second site.",
      },
    ],
    verdict: {
      heading: "Ruins in the morning, fountains in the afternoon",
      body: "Start at Hadrian's Villa while it is cool, then move up to Villa d'Este for lunch and the gardens. A tour with transport between the two saves the most time.",
    },
    faqs: [
      {
        question: 'Can I walk between the two villas?',
        answer: 'It is about 5 km with a steep climb up to the town, so most people take a local bus, taxi or tour transfer.',
      },
      {
        question: "Which villa is more impressive?",
        answer: "It depends on your interests. Villa d'Este is about gardens and fountains, Hadrian's Villa is about Roman history and ruins.",
      },
      {
        question: 'Do I need tickets in advance?',
        answer: 'Booking ahead is a good idea in spring and summer, especially at weekends. Check the official opening days before you go.',
      },
    ],
    relatedSupportHref: '/which-villa-to-prioritise',
    relatedSupportLabel: 'Which Villa',
  },
  {
    href: '/private-tivoli-tour',
    heroImage: IMG.esteCourtyard,
    h1: 'Private Tivoli Tour: Door-to-Door Transport & Pacing',
    keyword: 'private tivoli tour',
    metaTitle: 'Private Tivoli Tour: Door-to-Door Transport & Pacing',
    metaDescription:
      'Skip the bus transfers — private tour removes the logistics hassle and lets you customize your day between the two villas.',
    intro: [
      'The hardest part of a Tivoli trip is not the sights but the connections: train or bus from Rome, then a walk or bus up to Villa d\'Este, then another ride down to Hadrian\'s Villa.',
      'A private tour replaces all of that with one car or minivan from your hotel, and lets you set the pace.',
    ],
    atAGlance: [
      { label: 'Pick-up', value: 'Your hotel in Rome' },
      { label: 'Group', value: 'Just your party' },
      { label: 'Typical length', value: '6–8 hours' },
      { label: 'Flexibility', value: 'Your start time and route' },
      { label: 'Best for', value: 'Families, small groups, limited mobility' },
    ],
    sections: [
      {
        title: 'What you get',
        body: 'Door-to-door transport, a driver who waits at each site, and often a guide who explains both villas. You can start early to beat the heat, spend longer where you like, and skip anything that does not interest you.',
      },
      {
        title: 'When it is worth the extra cost',
        body: 'A private tour costs more than a group tour or public transport, but the price is often shared across the whole car. For families and groups of four or more, the difference per person can be smaller than it looks.',
      },
      {
        title: 'Questions to ask before you book',
        body: 'Check whether entry tickets are included, whether the guide goes inside both villas or only the driver comes, how long the tour lasts, and what happens if you want to add a stop such as Villa Gregoriana.',
      },
    ],
    verdict: {
      heading: 'The easiest way to see both villas',
      body: 'If you want both villas without any transfers, and especially if you are travelling with children or older relatives, a private tour is the most comfortable choice.',
    },
    faqs: [
      {
        question: 'Are entry tickets included in private tours?',
        answer: 'Sometimes. Always check the tour description, because many private tours list tickets as an extra.',
      },
      {
        question: 'Can I add other stops?',
        answer: 'Usually yes. Common extras are Villa Gregoriana, the old town of Tivoli, or a longer lunch.',
      },
    ],
    relatedSupportHref: '/support/getting-to-tivoli-train-vs-tour',
    relatedSupportLabel: 'Getting to Tivoli',
  },
  {
    href: '/half-day-tivoli',
    heroImage: IMG.esteFountains,
    h1: "Half-Day Tivoli: Villa d'Este Fountains Only",
    keyword: 'half day tivoli tour',
    metaTitle: "Half-Day Tivoli: Villa d'Este Fountains Only",
    metaDescription:
      "Enough time for Villa d'Este's fountain gardens without the full-day commitment — realistic round-trip timing from Rome.",
    intro: [
      "If you only have a morning or an afternoon, Villa d'Este is the one to choose. It is in the centre of Tivoli, so there is no second transfer, and the fountain gardens can be seen well in under two hours.",
    ],
    atAGlance: [
      { label: 'Total time', value: 'About 4.5–5 hours' },
      { label: 'Time in the gardens', value: '1.5–2 hours' },
      { label: 'Best start', value: 'Morning, before the heat' },
      { label: 'Walking', value: 'Many steps and slopes' },
    ],
    sections: [
      {
        title: 'A realistic half-day plan',
        body: "Leave Rome around 8:30am, arrive in Tivoli by about 9:30am, and spend the morning in the gardens. Have a coffee in the old town and be back in Rome by early afternoon.",
      },
      {
        title: 'What to see in the gardens',
        body: "Walk down from the villa through the terraces to the Avenue of the Hundred Fountains, the Fountain of the Organ and the Fountain of Neptune. Try to be at the Fountain of the Organ when it plays its water music. The climb back up is steep, so leave time for it.",
      },
      {
        title: "Why not Hadrian's Villa in a half day?",
        body: "Hadrian's Villa is outside the town and needs 2 to 3 hours on its own. It can be done in a half day, but then you would miss the fountains, which is what most visitors come to Tivoli for.",
      },
    ],
    verdict: {
      heading: "Short on time? Choose Villa d'Este",
      body: "A half day gives you the best of Tivoli without a rushed schedule. Add Hadrian's Villa only if you have a full day.",
    },
    faqs: [
      {
        question: "Is Villa d'Este suitable for people with limited mobility?",
        answer: 'The gardens are built on steep terraces with many stairs, so it can be hard. Ask about accessible routes at the entrance.',
      },
      {
        question: 'When does the Fountain of the Organ play?',
        answer: 'It plays at set times during the day. Check the timetable at the ticket office when you arrive.',
      },
    ],
    relatedSupportHref: '/gardens-best-season',
    relatedSupportLabel: 'Best Season',
  },
];

const SUPPORT_PAGE_CONTENT: SupportPageContent[] = [
  {
    href: '/support/getting-to-tivoli-train-vs-tour',
    h1: 'Getting to Tivoli from Rome: Train, Bus or Tour',
    metaTitle: 'Getting to Tivoli from Rome: Train, Bus & Tour Options',
    metaDescription:
      "Independent train-and-bus routing with exact timing, or tour convenience — here's what actually works for a Tivoli day trip.",
    heroImage: IMG.tivoliTrees,
    sections: [
      {
        heading: 'By train',
        body: [
          "Regional trains run from Roma Tiburtina (and some from Roma Termini) to Tivoli station in about an hour. From the station it is roughly a 15 to 20 minute walk, mostly uphill, to Villa d'Este in the town centre.",
        ],
      },
      {
        heading: 'By bus',
        body: [
          "Cotral buses leave from Ponte Mammolo, a stop on metro line B. Some go to the centre of Tivoli, and some stop on the main road near Hadrian's Villa, which is the easiest public transport option for the Roman site. Buy tickets before boarding.",
        ],
      },
      {
        heading: 'Between the two villas',
        body: [
          "Hadrian's Villa is about 5 km below the town. Local buses link the two, but they are not very frequent, so many visitors take a taxi for this short leg.",
        ],
      },
      {
        heading: 'By tour',
        body: [
          'A group tour includes transport from central Rome and usually covers both villas. A private tour picks you up at your hotel and waits at each site. Both remove the need to plan connections.',
        ],
      },
      {
        heading: 'Which to choose',
        body: [
          "Public transport is cheap and works well for Villa d'Este alone. For both villas in one day, a tour saves time and stress.",
        ],
      },
    ],
    faqs: [
      {
        question: 'How long does it take to get to Tivoli from Rome?',
        answer: 'About 45 minutes to an hour by train, bus or car, depending on traffic.',
      },
      {
        question: 'Is it easy to drive to Tivoli?',
        answer: 'Yes, but parking in the old town is limited. Hadrian\'s Villa has its own parking area.',
      },
    ],
    relatedMoneyHref: '/money/tivoli-from-rome',
    relatedMoneyLabel: 'Tivoli Day Trip from Rome',
  },
  {
    href: '/which-villa-to-prioritise',
    h1: "Villa d'Este or Hadrian's Villa: Which Should You Visit?",
    metaTitle: "Villa d'Este or Hadrian's Villa: Which Should You Visit?",
    metaDescription:
      'Renaissance fountains vs Roman imperial ruins — which villa suits your interests, and which should you pick if time is tight.',
    heroImage: IMG.esteGarden,
    sections: [
      {
        heading: "Villa d'Este: gardens and fountains",
        body: [
          'A 16th-century villa with terraced Italian gardens and dozens of fountains. It is compact, shady and in the town centre. Choose it if you love gardens, photography or a cooler visit on a hot day.',
        ],
      },
      {
        heading: "Hadrian's Villa: Roman history",
        body: [
          "The country estate of Emperor Hadrian, built in the 2nd century AD. It is a huge archaeological site with pools, baths, theatres and statues, spread over open countryside. Choose it if you love ancient history and do not mind a lot of walking in the sun.",
        ],
      },
      {
        heading: 'If you can only pick one',
        body: [
          "Most first-time visitors pick Villa d'Este, because it is easier to reach and quicker to see. History fans who have already seen the Forum and Palatine in Rome often enjoy Hadrian's Villa more.",
        ],
      },
      {
        heading: 'Do both if you can',
        body: [
          'The two villas are very different, and seeing both in one day shows two sides of Italian history: imperial Rome and the Renaissance. See the ruins in the morning and the gardens in the afternoon.',
        ],
      },
    ],
    faqs: [
      {
        question: "Which villa is better with children?",
        answer: "Villa d'Este's fountains are usually a big hit with children. Hadrian's Villa has lots of space to run around, but little shade.",
      },
      {
        question: 'Which villa is better on a hot day?',
        answer: "Villa d'Este, because the gardens are shady and full of water.",
      },
    ],
    relatedMoneyHref: '/villa-d-este-hadrian-s-villa',
    relatedMoneyLabel: 'Both Villas in One Day',
  },
  {
    href: '/gardens-best-season',
    h1: "Villa d'Este's Gardens: Best Season to Visit",
    metaTitle: "Villa d'Este's Gardens: Best Season & Month-by-Month Timing",
    metaDescription:
      "May has the fountains at full flow and blooming gardens; summer is hot and crowded — here's the real breakdown by month.",
    heroImage: IMG.esteStatue,
    sections: [
      {
        heading: 'Spring (April to June)',
        body: [
          'The best time to visit. The gardens are green and in flower, the weather is mild and the fountains look their best. Weekends and school holidays can be busy, so go on a weekday if you can.',
        ],
      },
      {
        heading: 'Summer (July and August)',
        body: [
          "It gets hot, but Villa d'Este is shady and cooler than central Rome. Go early in the morning, and save Hadrian's Villa for the cooler part of the day or skip it on the hottest days.",
        ],
      },
      {
        heading: 'Autumn (September and October)',
        body: [
          'A very good choice. The weather is pleasant, crowds are smaller than in spring and the gardens start to change colour.',
        ],
      },
      {
        heading: 'Winter (November to March)',
        body: [
          'The quietest time. Gardens are less colourful and days are short, but the fountains still run and you may have the terraces almost to yourself. Check opening hours, which are shorter in winter.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the best month to visit Tivoli?',
        answer: 'May and September are usually the best balance of weather, gardens and crowds.',
      },
      {
        question: 'Are the fountains turned off in winter?',
        answer: 'The fountains usually keep running all year, but some may be closed for maintenance at times.',
      },
    ],
    relatedMoneyHref: '/half-day-tivoli',
    relatedMoneyLabel: 'Half-Day Tivoli',
  },
  {
    href: '/tivoli-with-kids',
    h1: 'Tivoli with Kids: A Family-Friendly Day Trip',
    metaTitle: 'Tivoli with Kids: Family-Friendly Gardens & Ruins',
    metaDescription:
      "Villa d'Este's fountains are genuinely kid-engaging — here's how to plan a Tivoli day trip that works for all ages.",
    heroImage: IMG.esteVisitors,
    sections: [
      {
        heading: 'Why Tivoli works for families',
        body: [
          'It is close to Rome, less crowded than the city, and full of things children enjoy: splashing fountains, big open spaces and ruins to explore.',
        ],
      },
      {
        heading: "Villa d'Este with children",
        body: [
          'Kids usually love the fountains, especially the Avenue of the Hundred Fountains. There are many stairs, so a baby carrier is easier than a stroller. Keep an eye on small children near the water.',
        ],
      },
      {
        heading: "Hadrian's Villa with children",
        body: [
          'Lots of space to walk and explore, and the long pool of the Canopus with its statues is a good stop. There is little shade, so bring hats, sun cream and plenty of water, and plan shorter loops rather than seeing everything.',
        ],
      },
      {
        heading: 'A simple family plan',
        body: [
          "Morning at Villa d'Este, a relaxed lunch in Tivoli, and one short hour at Hadrian's Villa if energy allows. A private tour makes the day much easier with young children.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I bring a stroller to Villa d'Este?",
        answer: 'It is difficult because of the many stairs. A baby carrier is a better choice.',
      },
      {
        question: 'Is there food available at the villas?',
        answer: 'Options inside are limited, so bring snacks and water, or eat in Tivoli old town.',
      },
    ],
    relatedMoneyHref: '/private-tivoli-tour',
    relatedMoneyLabel: 'Private Tivoli Tour',
  },
];

export function getMoneyPageContent(href: string): MoneyPageContent | undefined {
  return MONEY_PAGE_CONTENT.find((p) => p.href === href);
}

export function getSupportPageContent(href: string): SupportPageContent | undefined {
  return SUPPORT_PAGE_CONTENT.find((p) => p.href === href);
}

export const PAGE_META: Record<string, PageMetadata> = {
  home: {
    title: "Tivoli Day Trips — Villa d'Este & Hadrian's Villa Guide",
    description:
      "First-hand Tivoli day-trip guide from Rome. Villa d'Este vs Hadrian's Villa, half-day vs full-day, and honest transit logistics.",
  },
};
