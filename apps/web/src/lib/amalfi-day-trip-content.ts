/**
 * Content copy for Amalfi Day Trip — hero section, money-page hooks,
 * FAQ answers, and SEO metadata. All strings are production-ready from
 * the master network blueprint (MASTER-NETWORK-BLUEPRINT.md §3.12).
 */

export const HERO = {
  eyebrow: undefined,
  headline: 'Amalfi Coast Day Trips, By Road or By Boat',
  subheadline:
    "Positano, Amalfi, Ravello — every route and origin city here has been driven, ridden, and sailed in person, with honest notes on when the coast road beats the boat and when it doesn't.",
  primaryCta: { label: 'Find My Amalfi Day Trip', href: '#tours' },
  secondaryCta: { label: 'Boat or road — which is better?', href: '/boat-vs-road' },
  trustBullets: [
    'Every route driven, ridden and sailed first-hand',
    'Honest boat-vs-road comparison, not a booking push',
    'Summer-crowd timing that actually helps you plan',
    'Split cleanly from Pompeii and Capri — Amalfi towns only',
  ],
};

export const MONEY_PAGE_COPY = {
  amalfiFromRome: {
    hook: 'The long-day flagship from Rome — over 4 hours of one-way travel, which makes this the trip where "is it actually worth it" matters most.',
    highlights: [
      'Realistic one-way travel time',
      'Overnight-vs-day-trip tradeoff',
      'Which towns fit in a single long day',
    ],
  },
  amalfiFromNaplesSorrento: {
    hook: 'A short-hop origin that makes a proper Amalfi day genuinely realistic instead of an exhausting round-trip slog.',
    highlights: [
      'Sorrento-to-Amalfi transit time',
      'Which towns are reachable in a relaxed day',
      'Return-timing for an evening in Sorrento',
    ],
  },
  positanoAmalfiRavello: {
    hook: "The three-town classic — but the order and time budget per town make or break the day. Here's the routing that actually works.",
    highlights: [
      "Town-order logic by crowd pattern",
      "Time budget per town",
      "Ravello's clifftop-garden detour value",
    ],
  },
  amalfiBoatDayTrip: {
    hook: "Seeing the coast from the water solves the coast road's worst problem — the traffic and hairpin-turn queues that eat entire afternoons in summer.",
    highlights: [
      'Sea-route town stops',
      'Boat-vs-bus timing comparison',
      'Seasickness/weather considerations',
    ],
  },
};

export const FAQ_ITEMS = [
  {
    question: 'Is a day trip to the Amalfi Coast from Rome actually worth it?',
    answer:
      "It's a genuinely long day — over 4 hours one-way — so it's worth it if you want a taste of the coast on a Rome-based trip, but an overnight stay is the better call if the coast is a real priority rather than a box to check.",
  },
  {
    question: 'Should I book a boat or a road tour?',
    answer:
      "Boat avoids the coast road's summer traffic and hairpin-turn queues entirely and gives the classic postcard views; road tours let you actually stop and walk through Positano/Amalfi/Ravello rather than viewing from the water — the boat-vs-road page breaks down which suits your priorities.",
  },
  {
    question: "When are the Amalfi Coast's crowds worst?",
    answer:
      'July and August, especially midday in Positano — the summer-crowds-timing page covers shoulder-season alternatives (late May, September) that keep the views without the gridlock.',
  },
  {
    question: "Can I visit Positano, Amalfi, and Ravello all in one day?",
    answer:
      "Yes, but it's tight — budget realistic time per town rather than trying to linger in all three, and expect the day to run 10+ hours door to door from a Naples/Sorrento base.",
  },
  {
    question: 'Is the Amalfi Coast drivable, or should I take a tour?',
    answer:
      "The coast road is narrow, cliffside, and notoriously congested in summer — self-driving is doable outside peak season, but a guided tour or boat removes the stress entirely during July/August.",
  },
];

export const SEO_META = {
  home: {
    title: 'Amalfi Coast Day Trips — By Road or By Boat, Honestly Compared',
    description:
      'First-hand Amalfi Coast day-trip guide. Positano, Ravello, and Amalfi routing, boat-vs-road comparisons, and honest crowd timing.',
  },
  amalfiBoatDayTrip: {
    title: 'Amalfi Boat Day Trip: Avoiding the Coast Road\'s Traffic',
    description:
      "Why a boat day trip along the Amalfi Coast beats the coast road in summer — sea-route stops, timing, and what to expect.",
  },
};

export const AUTHOR = {
  name: 'Marco Rossi',
  initials: 'MR',
  title: 'Amalfi Coast guide, 8 years',
  domain: 'amalficoastguide.com',
  bio: 'A guide who has driven every switchback and sailed every cove along the Amalfi Coast — writes from real experience, not travel blogs.',
};

export const FAQS = FAQ_ITEMS;

export const QUICK_FACTS = [
  { label: 'Distance from Rome', value: 'Positano: ~260 km', detail: 'Long-day trip from Rome base' },
  { label: 'Distance from Naples', value: 'Positano: ~60 km', detail: 'Realistic day trip from Naples base' },
  { label: 'Driving time (Naples base)', value: '1.5–2 hours to Positano', detail: 'Coast road travel time one-way' },
  { label: 'Coast road condition', value: 'Narrow, cliffside, winding', detail: 'Requires careful driving in summer traffic' },
  { label: 'Best months', value: 'May–June, Sept–Oct', detail: 'Shoulder season for crowds and weather' },
  { label: 'Peak crowds', value: 'July–August', detail: 'Summer vacation brings largest crowds' },
];

export interface QuickLink {
  label: string;
  href: string;
}

export const QUICK_LINKS: QuickLink[] = [
  { label: 'From Rome', href: '/amalfi-from-rome' },
  { label: 'From Naples/Sorrento', href: '/amalfi-from-naples-sorrento' },
  { label: 'Boat Tours', href: '/amalfi-boat-day-trip' },
  { label: 'Boat vs Road', href: '/boat-vs-road' },
  { label: 'Best Season', href: '/summer-crowds-timing' },
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
  positano: { src: 'https://images.unsplash.com/photo-1561956021-947f09ae0101', alt: 'Colourful houses stacked on the steep cliffside of Positano above the sea' },
  positanoNight: { src: 'https://images.unsplash.com/photo-1583844056361-4418a8f2a985', alt: 'Positano lit up at night on the Amalfi Coast' },
  positanoBoats: { src: 'https://images.unsplash.com/photo-1596736743518-eef8c49026b7', alt: 'Boats moored off the beach below Positano' },
  amalfiTown: { src: 'https://images.unsplash.com/photo-1612698093158-e07ac200d44e', alt: 'Colourful buildings of Amalfi town on the rocky cliffs above turquoise water' },
  amalfiHill: { src: 'https://images.unsplash.com/photo-1569314516237-411aa03c2a44', alt: 'Buildings climbing the hillside above the sea on the Amalfi Coast' },
  ravello: { src: 'https://images.unsplash.com/photo-1612277262334-257287134cc4', alt: 'A villa in Ravello high above the sea on the Amalfi Coast' },
  ravelloView: { src: 'https://images.unsplash.com/photo-1638431123093-4fb8d880542f', alt: 'View from Ravello over the mountains and the sea' },
  sailing: { src: 'https://images.unsplash.com/photo-1724003750929-5eb8dee320ab', alt: 'A small group on a sailboat off the Amalfi Coast' },
};

const MONEY_PAGE_CONTENT: MoneyPageContent[] = [
  {
    href: '/amalfi-from-rome',
    h1: 'Amalfi Coast Day Trip From Rome',
    keyword: 'amalfi coast from rome',
    metaTitle: 'Amalfi Coast Day Trip From Rome: Is It Worth the Travel Time?',
    metaDescription:
      "Over 4 hours of one-way travel from Rome to the Amalfi Coast — here's whether a day trip makes sense, and which towns fit in one day.",
    heroImage: IMG.positano,
    intro: [
      'Positano is roughly 270 km from Rome. Whether you go by coach or by train plus a transfer, you spend most of the day travelling and only a few hours on the coast itself.',
      'That does not make the trip a bad idea. It means the right question is not "can I do it?" but "what do I actually want to see in the four or five hours I get there?" This page answers that honestly.',
    ],
    atAGlance: [
      { label: 'Distance', value: '~270 km to Positano' },
      { label: 'Travel each way', value: 'About 3.5–4.5 hours' },
      { label: 'Time on the coast', value: 'Usually 4–5 hours' },
      { label: 'Day length', value: '13–15 hours door to door' },
      { label: 'Best for', value: 'A first taste, not a deep visit' },
    ],
    sections: [
      {
        title: 'How the day really works',
        body: 'Most Rome departures leave between 6:30 and 7:30am. Coach tours drive south on the motorway, then join the narrow coast road near Sorrento or Salerno. Train-based tours take the fast train to Naples (about 1 hour 10 minutes) and switch to a minibus or boat. Either way, expect to reach the first town late morning and to start heading back by mid-afternoon, arriving in Rome between 8 and 10pm.',
      },
      {
        title: 'Which towns fit in one day',
        body: 'Positano plus one other stop is realistic. Most tours pair Positano with Amalfi town, and a few add Ravello instead. Trying to walk properly through all three from a Rome base usually means around an hour in each, which is mostly time spent getting in and out of vehicles.',
      },
      {
        title: 'Coach, train or private driver',
        body: 'A coach tour is the cheapest option and needs no planning, but it is the slowest and follows a fixed timetable. A train-plus-transfer tour saves a little time on the Rome–Naples stretch. A private driver costs far more, but you choose the start time, the towns and how long you stay in each, which matters a lot on a day this long.',
      },
      {
        title: 'When an overnight stay is the better call',
        body: 'If the Amalfi Coast is a real priority rather than a box to tick, one night in Sorrento, Positano or Amalfi changes everything: you arrive in the evening, see the towns before the day-trip crowds arrive, and have time for a boat ride. Many travellers who try the day trip from Rome say afterwards they wish they had stayed a night.',
      },
    ],
    verdict: {
      heading: 'Worth it only if Rome is your only base',
      body: 'Book a day trip from Rome if you have no other way to fit the coast into your trip and you are happy with a long, scenic day. If you can spare one night, stay on the coast or in Sorrento instead and use a shorter day trip from there.',
    },
    faqs: [
      {
        question: 'How long is the drive from Rome to the Amalfi Coast?',
        answer: 'Usually 3.5 to 4.5 hours each way, depending on traffic on the coast road. Summer weekends are the slowest.',
      },
      {
        question: 'Can I do the trip by public transport in one day?',
        answer: 'It is possible (fast train to Naples, then train and bus or ferry), but the connections leave very little time on the coast. A tour or private driver is more practical for a single day.',
      },
      {
        question: 'What time do Rome day trips get back?',
        answer: 'Most return to Rome between 8pm and 10pm. Traffic on the coast road can make it later in summer.',
      },
    ],
    relatedSupportHref: '/boat-vs-road',
    relatedSupportLabel: 'Boat vs Road',
  },
  {
    href: '/amalfi-from-naples-sorrento',
    h1: 'Amalfi Coast Day Trip From Sorrento or Naples',
    keyword: 'amalfi from sorrento',
    metaTitle: 'Amalfi Coast Day Trip From Sorrento: Timing and Town Selection',
    metaDescription:
      'From Sorrento or Naples, a proper Amalfi day is genuinely realistic — here\'s the routing, timing, and which towns to prioritize.',
    heroImage: IMG.ravelloView,
    intro: [
      'Sorrento sits at the start of the coast road, so from here the Amalfi Coast is a real day out rather than a long commute. Positano is about an hour away by road in normal traffic, and seasonal ferries make the trip by sea.',
      'Naples is a little further but still works well: the Circumvesuviana train to Sorrento takes around an hour, and many tours pick up in central Naples directly.',
    ],
    atAGlance: [
      { label: 'Sorrento to Positano', value: '~1 hour by road' },
      { label: 'Naples to Sorrento', value: '~1 hour by train' },
      { label: 'Time on the coast', value: '6–8 hours' },
      { label: 'Towns in a day', value: '2–3 at a relaxed pace' },
      { label: 'Ferries', value: 'Seasonal, roughly spring to autumn' },
    ],
    sections: [
      {
        title: 'A relaxed day from Sorrento',
        body: 'Leave around 8:30am and reach Positano before the busiest hours. Spend the late morning there, move on to Amalfi town for lunch and the cathedral, and either go up to Ravello in the afternoon or take a ferry back along the water. You are back in Sorrento in time for dinner.',
      },
      {
        title: 'Getting around: bus, ferry or tour',
        body: 'The public SITA bus runs the whole coast road and is the cheapest option, but in summer it fills up quickly and you may have to stand or wait for the next one. Ferries between Sorrento, Positano and Amalfi avoid the road entirely and run in the warmer months when the sea allows. A small-group or private tour removes the planning and the queues.',
      },
      {
        title: 'Starting from Naples',
        body: 'From Naples, allow an extra hour or so each way. Take an early Circumvesuviana train to Sorrento, or choose a tour with pick-up in Naples. In summer, some ferries also run from Naples towards Sorrento and the coast, which can make a nice one-way leg.',
      },
    ],
    verdict: {
      heading: 'The best base for a single Amalfi day',
      body: 'If you are staying in Sorrento or Naples, a day trip is well worth it. Go early, pick two or three towns, and use the ferry for at least one leg if it is running.',
    },
    faqs: [
      {
        question: 'Is Sorrento on the Amalfi Coast?',
        answer: 'Not technically. Sorrento is on the Sorrento Peninsula, just before the Amalfi Coast begins, which is why it makes such a convenient base.',
      },
      {
        question: 'Do ferries run all year?',
        answer: 'No. Ferries along the coast run mainly from spring to autumn and can be cancelled in rough weather. Outside that season, the bus or a car is the way to go.',
      },
      {
        question: 'How early should I leave?',
        answer: 'Leaving by 8:30am gives you Positano before the busiest late-morning hours and keeps the rest of the day relaxed.',
      },
    ],
    relatedSupportHref: '/best-towns-for-a-day',
    relatedSupportLabel: 'Best Towns',
  },
  {
    href: '/positano-amalfi-ravello',
    h1: 'Positano, Amalfi, and Ravello: Routing That Actually Works',
    keyword: 'positano amalfi ravello tour',
    metaTitle: 'Positano, Amalfi, and Ravello: Routing That Actually Works',
    metaDescription:
      'The three-town classic — but the order and time budget per town make or break the day. Here\'s the routing that works in one day.',
    heroImage: IMG.amalfiTown,
    intro: [
      'Positano, Amalfi and Ravello are the three towns almost every first visitor wants to see. They are only a few kilometres apart, but the coast road is slow, so the order you visit them in makes a big difference.',
      'The simple rule: see Positano early, have lunch in Amalfi, and save Ravello for the afternoon when it is cooler and quieter up on the hill.',
    ],
    atAGlance: [
      { label: 'Positano', value: '2–2.5 hours' },
      { label: 'Amalfi town', value: '1.5–2 hours' },
      { label: 'Ravello', value: '1.5–2 hours' },
      { label: 'Best order', value: 'Positano → Amalfi → Ravello' },
      { label: 'Day length', value: '9–10 hours from Sorrento' },
    ],
    sections: [
      {
        title: 'Positano first',
        body: 'Positano is the most crowded of the three from late morning onwards, so arrive early. The town is built on a steep slope with lots of steps down to the main beach, Spiaggia Grande. Walk down, have a coffee by the water, and allow time for the climb back up.',
      },
      {
        title: 'Amalfi town for lunch',
        body: 'Amalfi is flatter and easier to walk. The main sight is the cathedral of Sant\'Andrea at the top of its wide staircase. The main square and the lanes behind it are good for lunch and for lemon products. Ferries and buses to the other towns both leave from the seafront here, which makes it the natural middle stop.',
      },
      {
        title: 'Ravello in the afternoon',
        body: 'Ravello sits about 350 metres above the sea, around 25 minutes by bus or car from Amalfi. The gardens of Villa Rufolo and Villa Cimbrone have some of the best views on the whole coast. In the afternoon the day-trip crowds thin out and the light over the sea is at its best.',
      },
    ],
    verdict: {
      heading: 'Go early, and keep the order',
      body: 'Positano, then Amalfi, then Ravello is the order that works for most people. If you only have time for two, skip Ravello rather than rushing all three.',
    },
    faqs: [
      {
        question: 'Can I see all three towns without a tour?',
        answer: 'Yes. Buses and seasonal ferries connect them, but allow extra time in summer when buses fill up.',
      },
      {
        question: 'Which town is best if I only have time for one?',
        answer: 'Positano for the classic postcard view, Amalfi for an easier walk and history, Ravello for gardens and quiet.',
      },
      {
        question: 'Is Positano hard to walk around?',
        answer: 'It has a lot of steps and steep lanes. Comfortable shoes help, and people with limited mobility may prefer Amalfi town.',
      },
    ],
    relatedSupportHref: '/summer-crowds-timing',
    relatedSupportLabel: 'Summer Crowds',
  },
  {
    href: '/amalfi-boat-day-trip',
    h1: 'Amalfi Coast Boat Day Trip',
    keyword: 'amalfi boat tour',
    metaTitle: "Amalfi Boat Day Trip: Avoiding the Coast Road's Traffic",
    metaDescription:
      'Why a boat day trip along the Amalfi Coast beats the coast road in summer — sea-route stops, timing, and what to expect.',
    heroImage: IMG.sailing,
    intro: [
      'In summer the coast road can move very slowly. Seeing the coast from the water skips the traffic completely and gives you the famous view of the towns stacked on the cliffs.',
      'Boat days come in two types: shared or private boat tours that stop for swimming and a town visit, and simple ferry hops between towns that you plan yourself.',
    ],
    atAGlance: [
      { label: 'Season', value: 'Roughly spring to autumn' },
      { label: 'Typical tour length', value: '6–8 hours' },
      { label: 'Departures', value: 'Sorrento, Positano, Amalfi, Salerno' },
      { label: 'Swim stops', value: 'Common on boat tours' },
      { label: 'Weather risk', value: 'Trips can be cancelled in rough sea' },
    ],
    sections: [
      {
        title: 'What a boat tour usually includes',
        body: 'Most boat tours cruise along the coast with a stop in Positano or Amalfi for an hour or two on land, plus one or two swim stops in quiet coves. Many pass the Li Galli islands and the fjord at Furore, and some stop near the Emerald Grotto. Drinks and snacks are often included; lunch usually is not.',
      },
      {
        title: 'Boat tour or ferry',
        body: 'A boat tour is the relaxed option: someone else plans the route, you get swim stops, and the group is small. Ferries are cheaper and good for moving between towns, but they only go from port to port, with no swimming or detours.',
      },
      {
        title: 'Seasickness and weather',
        body: 'The sea is usually calm in summer mornings, but it can get choppy in the afternoon and in spring and autumn. If you get seasick, sit near the back of the boat, look at the horizon and choose a larger boat. Operators cancel trips when the sea is too rough, so keep a flexible day in your plans.',
      },
    ],
    verdict: {
      heading: 'The best way to see the coast in summer',
      body: 'From June to September, a boat day is usually more enjoyable than a road tour. Book a small-group or private boat if you want swim stops, or use ferries if you mainly want to hop between towns.',
    },
    faqs: [
      {
        question: 'Do I need to know how to swim?',
        answer: 'No. Swim stops are optional and most boats carry life jackets.',
      },
      {
        question: 'What should I bring?',
        answer: 'Swimwear, a towel, sun cream, a hat and a light layer. Bring cash or a card for lunch in town.',
      },
      {
        question: 'What happens if the sea is rough?',
        answer: 'Operators usually reschedule or refund when they cancel for weather. Check the policy before you book.',
      },
    ],
    relatedSupportHref: '/boat-vs-road',
    relatedSupportLabel: 'Boat vs Road',
  },
];

const SUPPORT_PAGE_CONTENT: SupportPageContent[] = [
  {
    href: '/boat-vs-road',
    h1: 'Boat vs Road: Which Is Better for an Amalfi Coast Day Trip?',
    metaTitle: 'Boat vs Road: Which is Better for an Amalfi Coast Day Trip?',
    metaDescription:
      'Honest comparison of boat and road options for the Amalfi Coast — traffic reality, views, pacing, and when each option wins.',
    heroImage: IMG.positanoBoats,
    sections: [
      {
        heading: 'The short answer',
        body: [
          'Take the boat in summer if you want views and a relaxed day. Take the road if you want more time walking around the towns, if you are travelling outside the ferry season, or if you get seasick easily.',
        ],
      },
      {
        heading: 'Why the road is slow in summer',
        body: [
          'The coast road (SS163) is narrow, winding and built into the cliffs. Buses and cars often have to stop to pass each other on bends. On summer days this creates long queues, especially around Positano.',
          'In recent summers the authorities have also limited non-resident cars on the coast road on some days, based on number plates. If you plan to drive yourself, check the current rules before you go.',
        ],
      },
      {
        heading: 'What the boat does better',
        body: [
          'From the water you get the classic view of the towns climbing the cliffs, you skip the traffic, and boat tours add swim stops you cannot get from the road.',
        ],
      },
      {
        heading: 'What the road does better',
        body: [
          'By road you can reach Ravello, which is high on the hill and has no port. You also get more flexible time in each town, and the road works all year round, while ferries mostly run from spring to autumn.',
        ],
      },
      {
        heading: 'The best of both',
        body: [
          'Many visitors mix the two: road in the morning to Positano, a ferry from Positano to Amalfi, and a bus up to Ravello in the afternoon. This way you get the views from the sea and still see the hill town.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is the coast road scary?',
        answer: 'It is narrow and twisty with steep drops, but buses and drivers use it every day. If you get car-sick, sit near the front on the right-hand side heading towards Amalfi, which also has the sea view.',
      },
      {
        question: 'Can I get to Ravello by boat?',
        answer: 'Not directly. Take a ferry to Amalfi, then a short bus or taxi ride up the hill.',
      },
    ],
    relatedMoneyHref: '/amalfi-boat-day-trip',
    relatedMoneyLabel: 'Amalfi Boat Day Trip',
  },
  {
    href: '/best-towns-for-a-day',
    h1: 'Best Towns for an Amalfi Coast Day Trip',
    metaTitle: 'Best Towns for an Amalfi Coast Day Trip: Positano, Ravello, or Amalfi?',
    metaDescription:
      'A day limits you to 2–3 towns max. Here\'s which combination gives you the coast at its best without the exhaustion.',
    heroImage: IMG.ravello,
    sections: [
      {
        heading: 'Positano: the postcard',
        body: [
          'Pastel houses stacked down the cliff to a pebble beach. It is the most photographed town on the coast and the most crowded. Lots of steps, many small shops and plenty of places for a drink with a view.',
        ],
      },
      {
        heading: 'Amalfi: the practical middle',
        body: [
          'Once a powerful sea republic, Amalfi has the cathedral of Sant\'Andrea, a lively main square and flatter streets. It is the hub for buses and ferries, so it fits easily into any route.',
        ],
      },
      {
        heading: 'Ravello: the quiet one',
        body: [
          'High above the sea, Ravello is known for its villa gardens, Villa Rufolo and Villa Cimbrone, and for its summer music festival. It feels calmer than the seaside towns, especially in the afternoon.',
        ],
      },
      {
        heading: 'Smaller towns worth a look',
        body: [
          'Praiano and Atrani are quieter alternatives. Atrani is a tiny village just a short walk from Amalfi, and Praiano sits between Positano and Amalfi with good sunset views. Both are good choices if you want to avoid the busiest spots.',
        ],
      },
      {
        heading: 'Our suggested combinations',
        body: [
          'First visit: Positano and Amalfi. Views and gardens: Amalfi and Ravello. Quieter day: Amalfi, Atrani and Ravello. Only two hours? Pick just one town and enjoy it instead of rushing.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Which town is best for a beach?',
        answer: 'Positano has the best-known beach. Amalfi and smaller towns also have small beaches, often with paid sun loungers in summer.',
      },
      {
        question: 'Which town is easiest for walking?',
        answer: 'Amalfi town, because its centre is fairly flat. Positano and Ravello both involve steps and slopes.',
      },
    ],
    relatedMoneyHref: '/positano-amalfi-ravello',
    relatedMoneyLabel: 'Positano, Amalfi & Ravello',
  },
  {
    href: '/summer-crowds-timing',
    h1: 'Amalfi Coast Crowds: When to Go and How to Avoid the Peak',
    metaTitle: 'Amalfi Coast Summer Crowds: When to Go and How to Avoid the Peak',
    metaDescription:
      'July–August are stunning but packed. Here\'s the real timing breakdown by town and shoulder-season alternatives that keep the light.',
    heroImage: IMG.positanoNight,
    sections: [
      {
        heading: 'The busiest months',
        body: [
          'July and August are the busiest, hottest and most expensive months. Roads and buses are crowded, beaches are full, and Positano is packed from late morning to late afternoon.',
        ],
      },
      {
        heading: 'The best months',
        body: [
          'Late May, June and September give you warm weather, a warm sea and fewer people. Early October is often still pleasant. These months are the sweet spot for most visitors.',
        ],
      },
      {
        heading: 'Winter and early spring',
        body: [
          'From November to March the coast is very quiet. Many hotels, restaurants and shops close, and ferries do not run regularly. It can be lovely for walking, but it is not the classic summer experience.',
        ],
      },
      {
        heading: 'Best time of day',
        body: [
          'Arrive early (before 10am) or stay late (after 5pm). Most day-trip groups arrive late morning and leave mid-afternoon, so the early and late hours are much calmer, and the light is better for photos.',
        ],
      },
      {
        heading: 'Tips if you must go in August',
        body: [
          'Book tours and boats well ahead, take the boat to skip road traffic, visit Positano first thing in the morning, and plan a long lunch in a quieter town like Ravello or Atrani during the hottest hours.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is the Amalfi Coast worth visiting in winter?',
        answer: 'Yes, if you want quiet and walking. Many businesses close and ferries are limited, so expect a slower, more local experience.',
      },
      {
        question: 'When is the sea warm enough to swim?',
        answer: 'Usually from June to early October, when the water is warmest.',
      },
    ],
    relatedMoneyHref: '/amalfi-boat-day-trip',
    relatedMoneyLabel: 'Amalfi Boat Day Trip',
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
    title: "Amalfi Coast Day Trips — By Road or By Boat, Honestly Compared",
    description:
      "First-hand Amalfi Coast day-trip guide. Positano, Ravello, and Amalfi routing, boat-vs-road comparisons, and honest crowd timing.",
  },
  amalfiFromRome: {
    title: "Amalfi Coast Day Trip From Rome: Is It Worth the Travel Time?",
    description:
      "Over 4 hours of one-way travel from Rome to the Amalfi Coast — here's whether a day trip makes sense, and which towns fit in one day.",
  },
  amalfiFromNaplesSorrento: {
    title: "Amalfi Coast Day Trip From Sorrento: Timing and Town Selection",
    description:
      "From Sorrento or Naples, a proper Amalfi day is genuinely realistic — here's the routing, timing, and which towns to prioritize.",
  },
  positanoAmalfiRavello: {
    title: "Positano, Amalfi, and Ravello: Routing That Actually Works",
    description:
      "The three-town classic — but the order and time budget per town make or break the day. Here's the routing that works in one day.",
  },
  amalfiBoatDayTrip: {
    title: "Amalfi Boat Day Trip: Avoiding the Coast Road's Traffic",
    description:
      "Why a boat day trip along the Amalfi Coast beats the coast road in summer — sea-route stops, timing, and what to expect.",
  },
  boatVsRoad: {
    title: "Boat vs Road: Which is Better for an Amalfi Coast Day Trip?",
    description:
      "Honest comparison of boat and road options for the Amalfi Coast — traffic reality, views, pacing, and when each option wins.",
  },
  bestTownsForADay: {
    title: "Best Towns for an Amalfi Coast Day Trip: Positano, Ravello, or Amalfi?",
    description:
      "A day limits you to 2–3 towns max. Here's which combination gives you the coast at its best without the exhaustion.",
  },
  summerCrowdsTiming: {
    title: "Amalfi Coast Summer Crowds: When to Go and How to Avoid the Peak",
    description:
      "July–August are stunning but packed. Here's the real timing breakdown by town and shoulder-season alternatives that keep the light.",
  },
};
