/**
 * Real content for every Rome Vespa page beyond the homepage — the 5 money
 * pages and 5 support pages defined in the property's blueprint (Master
 * Network Blueprint §3.3.3 page tree). Each entry supplies exactly what
 * MoneyPageTemplate.tsx / SupportPageTemplate.tsx need to render a complete,
 * unique page: its own H1, meta title/description, hero image, body
 * sections, and FAQ block. Mirrors lib/private-vatican-content.ts's
 * structure exactly.
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
    href: '/vespa-tour-of-rome',
    navTitle: 'Vespa Tour of Rome',
    h1: "Vespa Tour of Rome: Routes, Photo Stops & What's Included",
    keyword: 'vespa tour rome',
    metaTitle: "Vespa Tour of Rome: Routes, Photo Stops & What's Included",
    metaDescription:
      "What a classic guided Vespa tour of Rome actually covers — routes, group size, photo stops, and realistic pricing.",
    heroImage: { src: 'https://images.unsplash.com/photo-1739289928017-1eab9eb96ba8', alt: 'A rider on a scooter moving down a narrow Rome street lined with tall buildings' },
    intro: [
      'The classic guided Vespa tour: a lead rider, a set route through Rome’s most photogenic streets, and zero navigation stress for you.',
      'Every listing on GetYourGuide and Viator runs some version of the same format — a small convoy following one lead rider on a fixed route — but the stop count, group size, and how much time you actually get off the bike at each landmark vary more than the marketing photos suggest.',
    ],
    atAGlance: [
      { label: 'Price band', value: '€90–120' },
      { label: 'Group size', value: '6–10 scooters (12–20 riders)' },
      { label: 'Duration', value: '3 hours' },
      { label: 'Photo stops', value: '4–5, ~10–15 min each' },
    ],
    sections: [
      {
        heading: 'The route, stop by stop',
        body: [
          'Most guided convoys start near a wide, easy-to-marshal piazza (so 6–10 scooters can pull off safely together) and run a loop through Trastevere’s narrower lanes, past Circus Maximus for an open straightaway, and up to the Aventine Keyhole for the Vatican-dome sightline through the Priory of the Knights of Malta’s gate — one of the most photographed 90 seconds of any Rome scooter route.',
          'Between landmarks the pace is genuinely relaxed rather than a race between photo stops: a lead rider sets a speed slow enough for the group to stay together through traffic lights and turns, with a marshal or the guide themselves riding sweep at the back to catch anyone who falls behind.',
        ],
      },
      {
        heading: 'Group format and pacing',
        body: [
          'Convoys of 6–10 scooters are the norm — small enough that the lead rider can actually see the whole group in mirrors, large enough to keep per-person pricing reasonable. Riders wear a radio headset for live commentary from the guide, which matters more than it sounds: without it, a group riding single-file loses most of the historical context a walking tour would give you.',
          'A passenger seat is standard on most bookings, so solo travelers can ride as a pair with a partner or another guest paired up by the operator — check the specific listing if you specifically want to ride solo rather than with a passenger.',
        ],
      },
      {
        heading: "What's included vs optional add-ons",
        body: [
          'Standard inclusions across nearly every listing: helmet, third-party insurance, fuel, and the guide’s live commentary. What varies is everything around the edges — some operators include a bottled water and a printed route map as a souvenir, others charge extra for hotel pickup outside the historic center, a photo package (a chase-vehicle photographer following the convoy), or an extended aperitivo stop folded into a longer 4-hour version of the same route.',
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: 'The flagship guided tour is the right default for a first Vespa experience in Rome — it removes the two hardest parts (navigation and traffic judgment) while still putting you in the driver’s seat. Skip it only if you specifically want the sidecar’s zero-effort format or a fully custom private route.',
    },
    faqs: [
      {
        question: 'Do I ride solo or with a passenger on a guided tour?',
        answer:
          'Most bookings include a passenger seat and pair solo travelers up if requested, but you can typically book a solo-rider spot too — check the specific listing’s options before assuming either way.',
      },
      {
        question: "What if I've never ridden a scooter before?",
        answer:
          'Most guided operators require some prior riding experience and a valid licence — this isn’t a beginner lesson on the road. First-timers with zero scooter experience are better served by the sidecar tour, where someone else does the actual riding.',
      },
      {
        question: 'Is the guided route the same on every booking?',
        answer:
          'The core landmarks (Trastevere, Circus Maximus, the Aventine Keyhole) repeat across most listings since they’re what makes the route work logistically for a convoy, but the exact order and any extra stops vary by operator and time of day.',
      },
    ],
    relatedSupportHref: '/what-a-vespa-tour-covers',
    relatedSupportLabel: 'What a Vespa Tour Covers',
  },
  {
    href: '/sidecar-tour-of-rome',
    navTitle: 'Sidecar Tour of Rome',
    h1: 'Sidecar Tour of Rome: Who It Actually Suits',
    keyword: 'rome sidecar tour',
    metaTitle: 'Rome Sidecar Tour: No Licence Needed, Chauffeured Sightseeing',
    metaDescription:
      'A chauffeured Rome sidecar tour — who it actually suits, comfort and legroom realities, and why it beats self-driving for many visitors.',
    heroImage: { src: 'https://images.unsplash.com/photo-1655685784726-780dd8c609e8', alt: 'A driver and passenger riding together on a scooter down a Rome street' },
    intro: [
      'No licence, no driving, no traffic anxiety — a chauffeured sidecar covers the same ground with someone else doing the actual riding.',
      'The format is simple: a licensed local driver rides a vintage-style three-wheeled sidecar rig (or a modern equivalent) while you sit in the passenger car, hands free for photos the entire route — the single biggest practical difference from every other tour format on this site.',
    ],
    atAGlance: [
      { label: 'Price band', value: '€100–140 per rig' },
      { label: 'Seating', value: '1–2 passengers + driver' },
      { label: 'Licence required', value: 'None — you\'re not driving' },
      { label: 'Duration', value: '2–2.5 hours' },
    ],
    sections: [
      {
        heading: 'Who the sidecar format actually suits',
        body: [
          'Anyone without a motorcycle licence, anyone nervous about Rome traffic specifically, and couples or friends who’d rather experience the ride together in one vehicle rather than split across two scooters. It’s also the practical choice for visitors on a short layover who want the classic Rome-by-scooter photo without the time cost of a licence check or a safety briefing.',
        ],
      },
      {
        heading: 'Comfort and legroom realities',
        body: [
          'Sidecar rigs seat one or two passengers depending on the model — a solo rider gets genuinely comfortable legroom, while a two-passenger rig is noticeably snugger, closer to a small car’s back seat than a bench. Ask the operator which rig configuration your booking uses if legroom is a concern; some routes run older, narrower vintage-style cars that suit one adult passenger better than two.',
        ],
      },
      {
        heading: 'Photo-taking freedom since you’re not driving',
        body: [
          'This is the format’s real selling point: with both hands free the entire ride, passengers get far better photos and video than a rider ever manages mid-route. Drivers are used to pausing at photogenic stretches (the Aventine Keyhole, Piazza del Popolo’s open sightlines) specifically because passengers are shooting, not just passing through.',
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: 'Worth booking specifically for the licence-free, hands-free advantage — if you’re a confident rider who wants to be the one steering, the guided or private tour delivers more of an active-participation feel for a similar price.',
    },
    faqs: [
      {
        question: 'Do I need any experience to book a sidecar tour?',
        answer:
          'No — you’re a passenger the entire time, so there’s no licence, riding experience, or safety briefing beyond how to get in and out of the rig safely.',
      },
      {
        question: 'Can a sidecar tour fit a family with young kids?',
        answer:
          'Most operators set a minimum age (commonly around 3–5) and require a child seat or approved harness for younger passengers — check the specific listing’s child policy before booking.',
      },
      {
        question: 'Is a sidecar tour better than a guided Vespa tour for photos?',
        answer:
          'Generally yes — passengers keep both hands free the whole ride, which a rider on a standard guided tour doesn’t get, especially through Rome’s more congested stretches.',
      },
    ],
    relatedSupportHref: '/what-a-vespa-tour-covers',
    relatedSupportLabel: 'What a Vespa Tour Covers',
  },
  {
    href: '/self-drive-vs-guided-vespa',
    navTitle: 'Self-Drive vs Guided Vespa',
    h1: 'Self-Drive vs Guided Vespa in Rome: Which Fits You',
    keyword: 'self drive vespa rome',
    metaTitle: 'Self-Drive vs Guided Vespa in Rome: Which Fits You',
    metaDescription:
      'Licence class, traffic difficulty by neighborhood, and insurance basics — the honest guide to choosing self-drive or guided in Rome.',
    heroImage: { src: 'https://images.unsplash.com/photo-1618483474329-810b7a99f505', alt: 'A rider in a jacket piloting a yellow scooter down a Rome street in daylight' },
    intro: [
      'Self-drive sounds more adventurous, but the licence requirements and Rome’s traffic patterns make it the wrong call for a lot of riders. Here’s how to know which you are.',
      'The decision comes down to three honest factors: whether your licence actually qualifies you to rent, how comfortable you are riding in traffic you’ve never seen before, and whether the freedom of self-drive is worth the added liability if something goes wrong.',
    ],
    atAGlance: [
      { label: 'Self-drive licence', value: 'Full moto licence + IDP (non-EU)' },
      { label: 'Guided licence', value: 'None required for passengers' },
      { label: 'Self-drive insurance', value: 'Third-party often extra; damage waiver recommended' },
      { label: 'Best for first-timers', value: 'Guided or sidecar' },
    ],
    sections: [
      {
        heading: 'Licence class required, by nationality',
        body: [
          'EU/EEA licence holders with a category A1, A2, or full A entry (or an equivalent car licence that includes moped/AM rights for smaller-engine rentals) can generally self-drive rental scooters directly. Non-EU visitors — Americans, Canadians, Australians, and most others — need their home country’s motorcycle/scooter-endorsed licence plus an International Driving Permit (IDP) obtained before arrival; Italian rental agencies do check both documents, and a mismatch between IDP category and actual engine size is one of the most common reasons a rental gets refused at pickup.',
          'Engine size matters here too: a standard 50cc-equivalent scooter can be rented with a car licence in some cases, but the 125cc–150cc Vespas most tours actually use require a genuine motorcycle-class licence — check the rental’s specific engine size against your licence category before assuming a car licence covers it.',
        ],
      },
      {
        heading: 'Realistic traffic difficulty by neighborhood',
        body: [
          'The historic center (Trastevere, the area around the Pantheon, the Jewish Ghetto) means narrow one-way streets, pedestrian-heavy piazzas, and cobblestones that punish an unfamiliar rider’s balance at low speed — genuinely the hardest zone for a first-time self-driver. Wider boulevards (Via Veneto, the area around Termini, Viale Trastevere itself) are easier in principle but carry faster, denser traffic with less forgiving margins for a wobble. The outer ring road (the GRA) and residential neighborhoods away from the center are the most forgiving for a nervous rider, but they’re also not where the sights are.',
        ],
      },
      {
        heading: 'Insurance and liability basics',
        body: [
          'Rental agreements typically include basic third-party liability by law, but the damage waiver covering the scooter itself is usually a separate add-on — skip it and you’re personally liable for repair costs on a scratched or dented rental, which happens more often than riders expect on Rome’s narrow streets. Always photograph the scooter’s condition at pickup before riding off, the same way you would with a rental car.',
        ],
      },
      {
        heading: 'When guided is simply the smarter choice',
        body: [
          'If this is your first time riding a scooter in a foreign city, if your licence situation is borderline, or if you’d rather absorb Rome’s history through a guide’s commentary than concentrate entirely on traffic, guided wins outright — the price difference from a bare rental is small once you factor in the damage waiver and the very real risk of getting lost or ticketed on unfamiliar one-way streets.',
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: 'Self-drive suits confident riders with a genuine motorcycle-class licence and prior city-riding experience; everyone else — including most first-time visitors to Rome — gets a better, less stressful day from a guided or sidecar tour for a similar total cost once insurance is factored in.',
    },
    faqs: [
      {
        question: 'Can I rent a Vespa in Rome with just a car licence?',
        answer:
          'Only for the smallest engine sizes in some cases (check the rental’s specific cc rating against your licence category) — the 125cc–150cc scooters most tours use require a genuine motorcycle-class licence, not a plain car licence.',
      },
      {
        question: 'Do I need an International Driving Permit to self-drive in Rome?',
        answer:
          'Yes, if you’re a non-EU visitor — Italian rental agencies generally require an IDP alongside your home licence, and arriving without one is one of the most common reasons a rental gets refused at pickup.',
      },
      {
        question: 'Is Rome’s traffic really that different from other European cities?',
        answer:
          'It’s denser and less lane-disciplined than most Northern European cities, with scooters routinely filtering between cars — manageable once you’re used to it, but a genuine adjustment for a first-time visitor riding solo.',
      },
    ],
    relatedSupportHref: '/is-it-safe-in-rome-traffic',
    relatedSupportLabel: 'Is It Safe in Rome Traffic',
  },
  {
    href: '/vespa-at-sunset',
    navTitle: 'Vespa at Sunset',
    h1: "Vespa at Sunset: Rome's Golden-Hour Scooter Tour",
    keyword: 'vespa sunset tour rome',
    metaTitle: 'Vespa Sunset Tour of Rome: Timing, Routes & Best Season',
    metaDescription:
      'The golden-hour Vespa tour in Rome — sunset timing by season, best photo stops, and why the evening slot books out first.',
    heroImage: { src: 'https://images.unsplash.com/photo-1777761394358-440f43b10a6d', alt: 'Scooters and motorcycles lining a cobblestone Rome street at dusk, golden light on the buildings' },
    intro: [
      'The golden-hour slot is the premium booking for a reason — this is what the light actually does to Rome from the seat of a scooter, and which route timing gets it right.',
      'Because sunset time shifts by nearly three hours across the year (roughly 5:00pm in December against 8:30pm in June), operators adjust the departure time seasonally rather than running a fixed clock slot — worth confirming on the specific date you’re booking rather than assuming a generic "evening" time.',
    ],
    atAGlance: [
      { label: 'Price band', value: '€100–130' },
      { label: 'Departure time', value: 'Seasonal — 1.5–2h before sunset' },
      { label: 'Duration', value: '2.5–3 hours' },
      { label: 'Best months', value: 'April–June, September–October' },
    ],
    sections: [
      {
        heading: 'Sunset timing by season',
        body: [
          'Summer (June–August) sunset runs as late as 8:30–8:45pm, which pushes the tour into a late-evening departure and means the "golden hour" light itself is brief and intense; winter (November–February) sunset as early as 4:45–5:00pm means an earlier departure but a longer, softer light window since the sun sits lower for more of the ride. Spring and early autumn hit the sweet spot: mild temperatures, a sunset time that doesn’t force a very late or very early departure, and reliably clear skies more often than the shoulder-season rain risk of late autumn.',
        ],
      },
      {
        heading: 'Best golden-hour photo stops',
        body: [
          'The Aventine Keyhole and the Orange Garden (Giardino degli Aranci) next to it catch the low sun directly over the Vatican dome sightline — the single most-photographed moment on this route. Piazza del Popolo’s open plaza and the Pincio terrace above it both give an unobstructed western view as the sky turns, while a slow pass along the Tiber near Ponte Sant’Angelo catches the castle and dome reflected in the water once the light goes properly gold.',
        ],
      },
      {
        heading: 'Cooler evening temperature advantage',
        body: [
          'A summer sunset departure sidesteps the worst of Rome’s midday heat (routinely 35°C+/95°F+ in July–August) entirely — riding at 6:30pm instead of 1:00pm is a meaningfully more comfortable experience with a helmet on, and evening traffic in the historic center thins out noticeably once the day-trip tour buses clear out.',
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: 'Worth the modest premium over a daytime slot specifically for the light and the cooler ride — book at least 2–3 weeks ahead in peak season (May–September), since the sunset departure is consistently the first time slot to sell out on every operator’s calendar.',
    },
    faqs: [
      {
        question: 'What time does the sunset tour actually depart?',
        answer:
          'It shifts seasonally rather than running a fixed clock time — typically departing 1.5–2 hours before that day’s actual sunset, so a summer booking leaves much later than a winter one.',
      },
      {
        question: 'Is the sunset slot worth the extra cost over a daytime tour?',
        answer:
          'For the light and the cooler temperatures, yes for most visitors — the same route in flat midday light and summer heat is a noticeably different, less comfortable experience.',
      },
      {
        question: 'How far ahead should I book a sunset tour?',
        answer:
          'At least 2–3 weeks ahead in peak season (May–September) — it’s consistently the first departure time to sell out across every operator we’ve checked.',
      },
    ],
    relatedSupportHref: '/what-to-wear-bring',
    relatedSupportLabel: 'What to Wear & Bring',
  },
  {
    href: '/private-vespa-tour',
    navTitle: 'Private Vespa Tour',
    h1: 'Private Vespa Tour: Is the Price Premium Worth It?',
    keyword: 'private vespa tour rome',
    metaTitle: 'Private Vespa Tour Rome: Custom Pace, Honest Pricing',
    metaDescription:
      "A private Vespa tour means your own pace and stops — the honest price premium versus a group tour, and when it's worth paying it.",
    heroImage: { src: 'https://images.unsplash.com/photo-1596210567632-c1fc58fbff56', alt: 'A scooter parked beside greenery on a quiet Rome side street' },
    intro: [
      'A private tour means your own pace, your own stops, and no waiting on a group’s slowest rider.',
      'The core trade is simple: a private booking costs roughly 1.5–2x a shared group seat, and in exchange you get a fully custom stop list, no convoy pacing compromises, and a guide focused entirely on your group’s interests rather than managing 6–10 other riders.',
    ],
    atAGlance: [
      { label: 'Price band', value: '€160–220 for 2 riders' },
      { label: 'Group size', value: 'Just your party (1–4 riders)' },
      { label: 'Duration', value: '3 hours, extendable' },
      { label: 'Price vs group', value: 'Roughly 1.5–2x per person' },
    ],
    sections: [
      {
        heading: 'Couple and small-group setup',
        body: [
          'Most private bookings are built around a couple or small family riding as passenger-pairs on 1–2 scooters, though a fully private "your group only" version of the standard convoy format is also available for parties of 3–4 who want the group energy without sharing it with strangers.',
        ],
      },
      {
        heading: 'Custom routing options',
        body: [
          'Unlike the fixed convoy route, a private booking can genuinely swap stops — more time at a specific overlook, skipping a landmark you’ve already seen, or adding a detour to a neighborhood outside the standard route (Monti, Pigneto) that a larger group tour wouldn’t detour for. Tell the operator your priorities when booking rather than after the tour starts; most build the custom route the day before based on that input.',
        ],
      },
      {
        heading: 'Price premium vs group tours, explained honestly',
        body: [
          'A shared group seat runs roughly €90–120 per person; a private booking for two typically runs €160–220 total, which works out to €80–110 per person — genuinely close to group pricing once split between two riders, and the premium mostly reflects the guide’s full attention rather than a large per-person markup. For a solo traveler, the private premium is steeper since there’s no one to split it with — worth it mainly if a fully custom route matters more than the cost difference.',
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: 'Worth it for a couple or small group who want a genuinely custom route — the per-person cost split two ways is close enough to a shared tour that the flexibility is close to free. Less compelling for a solo traveler on a budget, where a shared group tour delivers most of the same experience for meaningfully less.',
    },
    faqs: [
      {
        question: 'Is a private Vespa tour worth it for a solo traveler?',
        answer:
          'Less so — the per-person premium is steepest when there’s no one to split the private booking with; a shared group tour delivers a similar route for meaningfully less.',
      },
      {
        question: 'Can I choose the exact stops on a private tour?',
        answer:
          'Yes — tell the operator your priorities when booking, since most build the day’s custom route in advance based on that input rather than improvising on the ride itself.',
      },
      {
        question: 'How much more does a private tour cost than a group tour?',
        answer:
          'Roughly 1.5–2x the total price of a shared group seat, which for two riders splits down to a per-person cost close to standard group pricing.',
      },
    ],
    relatedSupportHref: '/vespa-vs-walking-vs-golf-cart',
    relatedSupportLabel: 'Vespa vs Walking vs Golf Cart',
  },
];

export const SUPPORT_PAGE_CONTENT: SupportPageContent[] = [
  {
    href: '/what-a-vespa-tour-covers',
    navTitle: 'What a Vespa Tour Covers',
    h1: 'What a Vespa Tour of Rome Actually Covers',
    keyword: 'what a vespa tour includes',
    metaTitle: 'What a Vespa Tour of Rome Actually Includes',
    metaDescription:
      "Helmets, insurance, fuel, guide commentary — what's standard on a Rome Vespa tour, and what's usually an optional add-on.",
    heroImage: { src: 'https://images.unsplash.com/photo-1613241811774-f75736a131bd', alt: 'A red scooter parked on a Rome brick pavement' },
    sections: [
      {
        heading: 'What every listing includes',
        body: [
          'Across nearly every operator on GetYourGuide and Viator, a Vespa tour booking includes a DOT- or ECE-rated helmet, third-party liability insurance for the ride, fuel, and a lead guide riding with live commentary over a shared radio headset. These four are close to universal — a listing missing any of them is worth a second look before booking.',
        ],
      },
      {
        heading: 'What usually costs extra',
        body: [
          'Hotel pickup outside the immediate historic center, a professional photo package (a chase vehicle photographing the group mid-route), an extended aperitivo or gelato stop folded into a longer version of the tour, and gratuity for the guide are the most common add-ons that aren’t bundled into the base price. None of these are hidden exactly, but they’re easy to miss skimming a listing quickly.',
        ],
      },
      {
        heading: 'How to check a listing\'s fine print',
        body: [
          'Look specifically for the words "insurance," "helmet provided," and "fuel included" in the listing description — if any of the three is absent, message the operator before booking rather than assuming. Cancellation policy is worth checking too: most reputable listings offer free cancellation up to 24 hours ahead, which matters given how weather-dependent an open-air scooter tour is.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Are helmets provided on a Vespa tour?',
        answer:
          'Yes — a DOT- or ECE-rated helmet is standard across nearly every listing; riding gear beyond that (jackets, gloves) is generally your own responsibility.',
      },
      {
        question: 'Is insurance included in the tour price?',
        answer:
          'Third-party liability insurance is standard on guided and sidecar tours; for a self-drive rental, the damage waiver covering the scooter itself is usually a separate add-on worth checking before you decline it.',
      },
      {
        question: 'Does the price include fuel?',
        answer:
          'Yes, on virtually every guided, sidecar, and private listing — fuel is bundled into the tour price, not billed separately.',
      },
    ],
    relatedMoneyHref: '/vespa-tour-of-rome',
    relatedMoneyLabel: 'Compare Guided Vespa Tours',
  },
  {
    href: '/is-it-safe-in-rome-traffic',
    navTitle: 'Is It Safe in Rome Traffic',
    h1: 'Is Riding a Vespa Safe in Rome Traffic? An Honest Answer',
    keyword: 'is riding a vespa safe in rome traffic',
    metaTitle: 'Is Riding a Vespa Safe in Rome Traffic? An Honest Answer',
    metaDescription:
      "Rome's traffic is chaotic — here's what that actually means for a Vespa tour, and why guided beats self-drive for first-timers.",
    heroImage: { src: 'https://images.unsplash.com/photo-1665511089451-2ea8f9116fe4', alt: 'A busy Rome city street with mixed car, scooter, and pedestrian traffic' },
    sections: [
      {
        heading: 'What "chaotic" actually means in practice',
        body: [
          'Rome traffic doesn’t follow the lane discipline a lot of visitors are used to — scooters routinely filter between stopped cars, right-of-way at unmarked intersections is more assertive than formal, and cobblestone surfaces in the historic center reduce grip and stability at low speed in a way asphalt doesn’t. None of this makes riding here reckless, but it is a genuine adjustment from calmer, more rule-following traffic environments.',
        ],
      },
      {
        heading: 'Guided vs self-drive safety differences',
        body: [
          'A guided or sidecar tour removes the single biggest risk factor for a first-time visitor: navigating unfamiliar streets while also managing traffic. A lead rider who rides these streets daily sets a pace, calls turns in advance over the radio, and positions the group defensively at intersections — none of which a self-driving first-timer has the local knowledge to replicate on their own.',
        ],
      },
      {
        heading: 'Difficulty by neighborhood',
        body: [
          'The historic center (Trastevere, around the Pantheon, the Jewish Ghetto) is the hardest zone — narrow one-ways, pedestrian crowds, and cobblestones all at once. Wider roads outside the center carry faster, denser traffic but more predictable lane behavior. Residential neighborhoods away from the core are the calmest, if least scenic, place to build initial confidence before attempting the center.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is Rome more dangerous for scooters than other European cities?',
        answer:
          'It’s more assertive and less lane-disciplined than most Northern European capitals, though not uniquely dangerous — the adjustment is real but manageable, especially with a guide setting the pace.',
      },
      {
        question: 'Are cobblestones a real hazard for scooters?',
        answer:
          'Yes, particularly at low speed or in wet weather — the historic center’s sampietrini cobblestones reduce grip noticeably compared to asphalt, which is one reason guided routes take those stretches slowly.',
      },
      {
        question: 'Is a sidecar tour safer than riding a Vespa myself?',
        answer:
          'For a first-time visitor, generally yes — a licensed local driver handles all the traffic judgment, removing the single biggest risk factor of unfamiliar streets and unfamiliar traffic norms.',
      },
    ],
    relatedMoneyHref: '/self-drive-vs-guided-vespa',
    relatedMoneyLabel: 'Compare Self-Drive vs Guided',
  },
  {
    href: '/what-to-wear-bring',
    navTitle: 'What to Wear & Bring',
    h1: 'What to Wear on a Rome Vespa Tour',
    keyword: 'what to wear vespa tour rome',
    metaTitle: 'What to Wear on a Rome Vespa Tour: A Packing Guide',
    metaDescription:
      "Closed-toe shoes, a light jacket even in summer, and what operators actually provide — the honest packing list for a Rome scooter tour.",
    heroImage: { src: 'https://images.unsplash.com/photo-1590232107998-96aec6b81ae6', alt: 'A rider wearing a helmet, seated on a scooter and geared up before a ride' },
    sections: [
      {
        heading: 'Footwear and clothing rules',
        body: [
          'Closed-toe shoes are non-negotiable — sandals and flip-flops get riders turned away at check-in on nearly every operator we’ve checked, for good reason given exposed feet near a hot engine and exhaust. Long trousers are strongly preferred over shorts for the same reason, and anything loose or flowing (long skirts, scarves) is worth avoiding near a spinning wheel.',
        ],
      },
      {
        heading: 'What operators provide vs what to bring yourself',
        body: [
          'A helmet is standard everywhere; a light riding jacket sometimes is, sometimes isn’t — check the specific listing. Bring your own sunglasses (most operators don’t supply eye protection beyond the helmet visor), a phone strap or secure pocket rather than a loose bag, and a light layer even in summer for the wind-chill at speed, which is real even at 25°C/77°F ambient temperature.',
        ],
      },
      {
        heading: 'Weather and seasonal notes',
        body: [
          'Summer heat (routinely 35°C+/95°F+ in July–August) makes a breathable layer more comfortable than it sounds under a helmet; winter riding (November–February) genuinely benefits from gloves and a proper jacket, since wind chill on a moving scooter drops the effective temperature noticeably below the day’s actual reading. Rome does get occasional rain outside summer — most operators reschedule rather than ride in a downpour, so check the cancellation policy for weather.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I wear sandals on a Vespa tour?',
        answer:
          'No — closed-toe shoes are required by nearly every operator, and showing up in sandals or flip-flops typically means being turned away at check-in.',
      },
      {
        question: 'Do operators provide a jacket or riding gear?',
        answer:
          'Helmets are standard everywhere; a jacket sometimes is and sometimes isn’t included — check the specific listing and bring a light layer of your own just in case.',
      },
      {
        question: 'What happens if it rains on the day of my tour?',
        answer:
          'Most operators reschedule or offer a full refund for genuine rain rather than riding a group through a downpour — check the specific listing’s weather policy before booking.',
      },
    ],
    relatedMoneyHref: '/vespa-at-sunset',
    relatedMoneyLabel: 'See Sunset Tour Timing',
  },
  {
    href: '/licence-questions',
    navTitle: 'Licence Questions',
    h1: 'Vespa Licence Requirements in Rome, By Nationality',
    keyword: 'vespa licence requirements rome',
    metaTitle: 'Vespa Licence Requirements in Rome, By Nationality',
    metaDescription:
      'EU vs non-EU licence rules for riding a Vespa in Rome — International Driving Permits, engine-size limits, and what operators actually check.',
    heroImage: { src: 'https://images.unsplash.com/photo-1546422904-728988680a63', alt: 'Close-up of a scooter\'s rear license plate' },
    sections: [
      {
        heading: 'EU and EEA licence holders',
        body: [
          'A full car licence (category B) obtained before 2013 in most EU countries carries automatic AM (moped) rights, letting you ride up to 50cc without a separate test — but the 125cc–150cc Vespas most tours actually rent require an A1 motorcycle category at minimum. Post-2013 licences generally don’t carry that automatic AM inclusion, so check your specific licence categories rather than assuming a car licence covers it.',
        ],
      },
      {
        heading: 'Non-EU visitors: what you actually need',
        body: [
          'A valid motorcycle-endorsed licence from your home country plus an International Driving Permit (IDP) obtained before you travel — Italy doesn’t issue IDPs to visitors on arrival, so this has to be sorted at home, typically through your home country’s automobile association. An IDP without an underlying motorcycle endorsement on your actual licence doesn’t qualify you to rent a 125cc+ scooter, a distinction rental staff do check.',
        ],
      },
      {
        heading: 'What operators check at pickup',
        body: [
          'Expect a rental agency or private operator to check your physical licence (not a photo of it), its expiry date, its category/class markings, and — for non-EU visitors — the IDP alongside it. A mismatch between the scooter’s engine size and your licence category is the single most common reason a rental gets refused on the spot, so confirm the exact cc rating of your booked scooter against your licence before you arrive.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I need an International Driving Permit to ride a Vespa in Rome?',
        answer:
          'Yes, if you\'re a non-EU visitor planning to self-drive — bring it alongside your home licence, since Italy doesn\'t issue IDPs to visitors on arrival and rental staff do check for it.',
      },
      {
        question: 'Does a car licence let me ride a Vespa in Rome?',
        answer:
          'Only for the smallest engine sizes in some cases, and generally only for licences issued before 2013 in EU countries with automatic moped rights — the 125cc–150cc scooters most tours use require a genuine motorcycle-class endorsement.',
      },
      {
        question: 'Do passengers on a guided or sidecar tour need any licence at all?',
        answer:
          'No — licence requirements apply only to whoever is actually riding; passengers on a guided tandem seat or a sidecar tour need no licence or riding experience at all.',
      },
    ],
    relatedMoneyHref: '/self-drive-vs-guided-vespa',
    relatedMoneyLabel: 'Compare Self-Drive vs Guided',
  },
  {
    href: '/vespa-vs-walking-vs-golf-cart',
    navTitle: 'Vespa vs Walking vs Golf Cart',
    h1: 'Vespa vs Walking vs Golf Cart: Which Suits You?',
    keyword: 'vespa vs golf cart vs walking rome',
    metaTitle: 'Vespa vs Walking vs Golf Cart Tour in Rome, Compared',
    metaDescription:
      'Ground covered, effort required, and who each format actually suits — Vespa, walking, and golf cart Rome tours, compared honestly.',
    heroImage: { src: 'https://images.unsplash.com/photo-1739289928019-2fb10d383eb5', alt: 'A scooter parked alone on a Rome cobblestone street' },
    sections: [
      {
        heading: 'Ground covered and pace',
        body: [
          'A Vespa tour covers roughly 15–20km in 3 hours, ranging across neighborhoods a walking tour couldn’t realistically string together in one outing. A golf cart tour covers meaningfully less ground at a slower, seated pace, prioritizing comfort over range. A walking tour covers the least ground of the three but goes places neither vehicle can — narrow pedestrian-only lanes, market stalls, and stairs.',
        ],
      },
      {
        heading: 'Effort and fitness required',
        body: [
          'Walking demands the most physical effort — 2–3 hours on foot, often on uneven cobblestones, genuinely tires travelers with limited mobility or stamina. A golf cart requires essentially none, seated the entire time. A Vespa tour sits in between: no walking involved, but it does require the core stability and alertness of active riding (or, on a sidecar, none at all as a passenger).',
        ],
      },
      {
        heading: 'Who each format actually suits',
        body: [
          'Comfortable riders wanting an adrenaline-tinged, two-wheeled experience are the clear Vespa audience. Families, seniors, or anyone who’d rather sit and watch Rome go by without any riding involved fits our sibling site Golf Cart Rome’s format better — seated, slower-paced, and built around accessibility from the ground up. Walking suits travelers prioritizing the narrowest streets and market stops a vehicle can’t reach, at the cost of more physical effort.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is a Vespa tour more physically demanding than a golf cart tour?',
        answer:
          'Yes — riding (even as a tandem passenger) requires more alertness and core stability than a seated golf cart tour, though a sidecar tour closes most of that gap since you\'re a passenger the entire time.',
      },
      {
        question: 'Which format covers the most of Rome in one outing?',
        answer:
          'A Vespa tour, by a wide margin — roughly 15–20km in 3 hours versus a golf cart’s slower seated range or a walking tour’s 2–3km on foot.',
      },
      {
        question: 'Is a golf cart tour better for families with young kids or seniors?',
        answer:
          'Generally yes — seated, slower-paced, and built around comfort and accessibility from the ground up; see our sibling site Golf Cart Rome for that format specifically.',
      },
    ],
    relatedMoneyHref: '/private-vespa-tour',
    relatedMoneyLabel: 'Compare Private Vespa Tours',
  },
];

export function getMoneyPageContent(href: string): MoneyPageContent | undefined {
  return MONEY_PAGE_CONTENT.find((p) => p.href === href);
}

export function getSupportPageContent(href: string): SupportPageContent | undefined {
  return SUPPORT_PAGE_CONTENT.find((p) => p.href === href);
}
