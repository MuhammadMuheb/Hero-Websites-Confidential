/**
 * Real content for every Golf Cart Rome page beyond the homepage — the 5
 * money pages and 5 support pages defined in the property's blueprint
 * (Master Network Blueprint §3.7.3 page tree). Each entry supplies exactly
 * what MoneyPageTemplate.tsx / SupportPageTemplate.tsx need to render a
 * complete, unique page: its own H1, meta title/description, hero image,
 * body sections, and FAQ block. Mirrors lib/rome-vespa-content.ts's
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
    href: '/money/golf-cart-tour-of-rome',
    navTitle: 'Golf-Cart Tour of Rome',
    h1: 'Golf-Cart Tour of Rome: Route, Group Size & What It Covers',
    keyword: 'golf cart tour rome',
    metaTitle: 'Golf-Cart Tour of Rome: Route, Stops & Honest Pricing',
    metaDescription:
      'What a guided golf-cart tour of Rome actually covers — route, seated group size, shade handling, and realistic pricing.',
    heroImage: { src: 'https://images.unsplash.com/photo-1670792373724-39fd52df804e', alt: 'An open Roman piazza with a central statue, framed by historic buildings in warm afternoon light' },
    intro: [
      "The flagship guided cart tour: Rome's major sights covered seated, shaded, and at a pace that doesn't leave anyone behind.",
      "Every listing on GetYourGuide and Viator runs a version of the same format — a small fleet of 4-6 seat electric carts following one guide's vehicle on a fixed loop — but stop count, how much shade the route actually finds, and how long you get off the cart at each landmark vary more than the photos suggest.",
    ],
    atAGlance: [
      { label: 'Price band', value: '€85–120' },
      { label: 'Group size', value: '2–3 carts (8–18 riders)' },
      { label: 'Duration', value: '2.5–3 hours' },
      { label: 'Photo stops', value: '5–6, ~10 min each' },
    ],
    sections: [
      {
        heading: 'The route, stop by stop',
        body: [
          "Most guided cart routes start from a wide pickup point near Circus Maximus or Piazza Venezia — wide enough for 2–3 carts to load passengers without blocking traffic — then loop past the Roman Forum's exterior walls, along the Tiber embankment, through the open sightlines of Piazza Navona and the Pantheon's Piazza della Rotonda, before a final stop at a scenic overlook.",
          "Between stops, carts stay on wider streets and piazzas rather than threading the narrowest medieval lanes — a deliberate routing choice, since a 4-6 seat cart genuinely can't fit down some of Trastevere's tightest alleys the way a person on foot can.",
        ],
      },
      {
        heading: 'Group format and seated comfort',
        body: [
          "A convoy of 2–3 carts, each seating 4-6 passengers, keeps the group small enough that the lead guide's live commentary (piped through a shared speaker or headset, depending on the operator) reaches everyone without shouting. Bench seating faces forward or sideways depending on the cart model — ask which configuration your specific listing uses if forward-facing seating matters to you.",
          "Boarding is a genuine step up from a curb or low platform, not a climb — the biggest practical difference from a Vespa tour, where riding position and balance matter far more.",
        ],
      },
      {
        heading: "What's included vs optional add-ons",
        body: [
          "Standard inclusions across nearly every listing: the guide's live commentary, all stops on the fixed route, and basic third-party liability insurance for the ride. What varies: bottled water, a printed route map, hotel pickup outside the historic center, and an extended version of the tour that adds a gelato or coffee stop — check the specific listing before assuming any of these are bundled in.",
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: "The flagship guided cart tour is the right default for anyone who wants Rome's major sights covered without the walking — it trades a few of the narrowest medieval alleys for a seated, shaded, no-effort pace. Skip it only if you specifically want a fully custom private route or you're comfortable enough on two wheels to prefer a Vespa's speed.",
    },
    faqs: [
      {
        question: 'Do I need to book two carts for a family of 5?',
        answer:
          "Most cart models seat 4-6, so a family of 5 usually fits on one cart — check the specific listing's seating capacity before booking, since some models are 4-seat only.",
      },
      {
        question: 'Are the carts open-air or covered?',
        answer:
          "Nearly every operator's cart has a canopy roof for shade and light rain, but the sides stay open — dress for the actual weather, not just the sun.",
      },
      {
        question: 'Does the guided tour reach the Colosseum?',
        answer:
          "Most routes pass the Colosseum's exterior for a photo stop rather than including entry — this is a sightseeing tour, not a skip-the-line ticket, so book Colosseum entry separately if you want to go inside.",
      },
    ],
    relatedSupportHref: '/what-the-route-covers',
    relatedSupportLabel: 'What the Route Covers',
  },
  {
    href: '/money/private-cart-tour',
    navTitle: 'Private Cart Tour',
    h1: 'Private Golf Cart Tour of Rome: Is the Price Premium Worth It?',
    keyword: 'private golf cart tour rome',
    metaTitle: 'Private Golf Cart Tour Rome: Custom Pace, Honest Pricing',
    metaDescription:
      "A private golf cart tour means your family's pace, not a stranger's — the honest price premium versus a shared tour, and when it's worth paying it.",
    heroImage: { src: 'https://images.unsplash.com/photo-1603321849799-6ca7611014a0', alt: 'Two passengers seated together in an open-air electric cart, ready to depart' },
    intro: [
      "A private cart means your family's pace, not a stranger's — genuinely useful when you've got very different energy levels or interests in one group.",
      'The core trade is simple: a private booking runs roughly 1.5–2x the per-person cost of a shared cart, and in exchange you get a fully custom stop list, no convoy pacing compromises, and a guide focused entirely on your group.',
    ],
    atAGlance: [
      { label: 'Price band', value: '€170–220 for up to 4' },
      { label: 'Group size', value: 'Just your party (1–6 riders)' },
      { label: 'Duration', value: '2.5 hours, extendable' },
      { label: 'Price vs shared', value: 'Roughly 1.5–2x per person' },
    ],
    sections: [
      {
        heading: 'Family and small-group setup',
        body: [
          "Most private bookings are built around a single cart seating a family of 4-6 — grandparents, parents, and kids together on one vehicle rather than split across a shared convoy. This matters more than it sounds: a shared tour paces itself to the group's slowest interest, while a private booking lets a grandparent who wants a longer rest stop and a kid who wants to skip ahead both get what they want.",
        ],
      },
      {
        heading: 'Custom routing and pacing',
        body: [
          "Unlike the fixed loop of a shared tour, a private booking can genuinely swap stops — more time at a specific overlook, skipping a landmark the family has already seen, or adding a slower pace through a neighborhood a larger tour wouldn't linger in. Tell the operator your group's specific mobility needs and interests when booking; most build the day's route around that input rather than improvising mid-tour.",
        ],
      },
      {
        heading: 'Price premium, explained honestly',
        body: [
          "A shared seat runs roughly €85–120 per person; a private cart for up to 4 typically runs €170–220 total, which works out to €42–55 per person — actually cheaper per head than a shared booking once a family fills the cart, since the operator isn't pricing per empty seat. The premium is steepest for a couple or solo traveler riding a full private cart alone, where there's no group to split the flat rate with.",
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: "Worth it for a family or multi-generational group with different energy levels — the per-person cost split across 3-4 riders is often close to, or cheaper than, a shared tour, and the custom pacing solves the exact problem that makes shared group tours frustrating for mixed-mobility groups. Less compelling for a couple traveling alone, where a shared tour delivers a similar route for meaningfully less.",
    },
    faqs: [
      {
        question: 'Is a private cart tour worth it for just two people?',
        answer:
          "Less so on price alone — the flat rate isn't split as many ways — but it's still worth considering if either rider has a mobility need that a fixed-pace shared tour wouldn't accommodate well.",
      },
      {
        question: 'Can I request specific stops on a private tour?',
        answer:
          "Yes — tell the operator your priorities when booking, since most build the day's custom route in advance based on that input.",
      },
      {
        question: 'How many people fit on one private cart?',
        answer:
          'Most private cart models seat up to 6; larger families or groups may need two carts booked together, which most operators can arrange at a small additional cost.',
      },
    ],
    relatedSupportHref: '/best-for-whom',
    relatedSupportLabel: 'Who a Cart Tour Is Best For',
  },
  {
    href: '/money/cart-tour-for-families-seniors',
    navTitle: 'Cart Tour for Families & Seniors',
    h1: 'Golf Cart Tour for Families & Seniors: Comfort & Accessibility',
    keyword: 'rome tour for seniors',
    metaTitle: 'Rome Golf Cart Tour for Seniors: Comfort & Accessibility',
    metaDescription:
      'A golf cart tour built around comfort from the ground up — mobility notes, shade management, and realistic pacing for seniors and families.',
    heroImage: { src: 'https://images.unsplash.com/photo-1727179468857-93f7a9ca36f4', alt: 'An older couple walking hand in hand along a quiet Rome street' },
    intro: [
      "Built around comfort and accessibility from the ground up — not a walking tour with a cart bolted on as an afterthought.",
      "This format exists specifically for the visitor a standard walking tour underserves: someone who wants to see Rome's major sights without 2-3 hours of standing, uneven cobblestones, and no seating along the way.",
    ],
    atAGlance: [
      { label: 'Price band', value: '€90–130' },
      { label: 'Boarding', value: 'Step-up entry, no climbing' },
      { label: 'Rest stops', value: 'Every 20–30 minutes' },
      { label: 'Shade coverage', value: 'Canopy roof, most of route' },
    ],
    sections: [
      {
        heading: 'Mobility-friendly boarding, specifically',
        body: [
          "Boarding a standard cart means one step up from curb height onto a bench seat — no climbing, no ladder, and grab handles at the door on most models. This is a meaningfully lower barrier than a coach bus's steps or a scooter's balance requirement, though it is still a transfer: a rider who cannot manage a single step up, or who needs to remain in a wheelchair throughout, should book the specific wheelchair-accessible listing (see our accessibility page) rather than assume any standard cart works.",
        ],
      },
      {
        heading: 'Rest-stop frequency and pacing',
        body: [
          'Because the whole tour is seated, "rest stops" here mean photo stops rather than recovery breaks — but operators built for this audience space their stops every 20-30 minutes rather than pushing a longer stretch between landmarks, and build in slightly longer dwell time at each stop for anyone who wants to walk a short distance to a better vantage point at their own pace.',
        ],
      },
      {
        heading: 'Shade and heat management by season',
        body: [
          "Every standard cart has a canopy roof, which covers riders for most of a typical route — a real advantage over a walking tour in July/August heat (routinely 35°C+/95°F+), since seated plus shaded is a genuinely different physical experience than 2-3 hours on foot in direct sun. In winter, the open sides mean the canopy doesn't block wind chill the way an enclosed vehicle would — a light layer is still worth bringing even though you're seated the whole time.",
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: "The right default for a family with a wide age range, or any senior who wants to see Rome's major sights without the physical toll of a walking tour — the seated pace and rest-stop spacing are built around comfort rather than an afterthought. Anyone needing to stay in a wheelchair the whole tour should book the dedicated wheelchair-accessible listing instead of a standard cart.",
    },
    faqs: [
      {
        question: 'Do I need to be able to walk at all to take this tour?',
        answer:
          'You need to manage one step up to board the cart and, at most stops, a short walk of a few meters to the best photo vantage point — if you need to remain seated in a wheelchair the entire time, book the wheelchair-accessible listing instead.',
      },
      {
        question: 'Is there a minimum age for the families & seniors tour?',
        answer:
          "Most operators set no strict minimum since riders are seated the whole time, though very young children may need to sit on a parent's lap or use a booster depending on the cart's seatbelt setup — check the specific listing.",
      },
      {
        question: 'How is this different from the standard guided cart tour?',
        answer:
          "The route and vehicle are largely the same — the difference is pacing (slightly longer stops) and the guide's explicit accommodation for riders who want more time or a slower transition between stops.",
      },
    ],
    relatedSupportHref: '/accessibility-limited-mobility',
    relatedSupportLabel: 'Accessibility & Limited Mobility',
  },
  {
    href: '/money/night-cart-tour',
    navTitle: 'Night Cart Tour',
    h1: "Night Cart Tour: Rome's Illuminated Monuments After Dark",
    keyword: 'rome night tour cart',
    metaTitle: 'Rome Night Golf Cart Tour: Illuminated Monuments, Timing',
    metaDescription:
      'The evening golf cart tour in Rome — illuminated-landmark stops, departure timing, and the cooler-weather comfort advantage.',
    heroImage: { src: 'https://images.unsplash.com/photo-1678970388666-e50b8006ab51', alt: "The Roman Forum's ancient ruins illuminated against the night sky" },
    intro: [
      'Illuminated Rome from a cart at night — cooler temperatures, dramatically lit monuments, and none of the daytime heat fatigue.',
      'Departure time shifts with the season the same way a sunset tour does, timed to start once the evening floodlighting on major monuments is fully on rather than at a fixed clock hour.',
    ],
    atAGlance: [
      { label: 'Price band', value: '€95–120' },
      { label: 'Departure time', value: 'Seasonal — after dusk' },
      { label: 'Duration', value: '2 hours' },
      { label: 'Best months', value: 'Year-round — cooler than daytime in summer' },
    ],
    sections: [
      {
        heading: 'Evening route timing',
        body: [
          'Operators depart once floodlighting is fully on rather than at a fixed hour — that\'s as early as 6:30-7pm in December and as late as 9-9:30pm in June, so confirm the actual departure time for your booking date rather than assuming a generic "evening" slot. Most routes run about 2 hours, shorter than the daytime version, since fewer stops are worth a long dwell time once it\'s dark.',
        ],
      },
      {
        heading: 'Illuminated-landmark stops',
        body: [
          "The Roman Forum's ruins and the Colosseum's exterior floodlighting are the headline stops — both are lit dramatically after dark in a way that reads very differently from their daytime appearance. The Trevi Fountain and the Pantheon's Piazza della Rotonda round out most routes, both considerably calmer after the daytime tour-bus crowds thin out.",
        ],
      },
      {
        heading: 'Cooler evening comfort advantage',
        body: [
          "A summer evening departure sidesteps the day's worst heat entirely — riding at 8pm instead of 2pm is a meaningfully more comfortable seated experience, and Rome's evening traffic in the historic center thins out noticeably once day-trippers clear out. This is the same logic that makes a sunset tour a best-selling slot on scooter-format sites, applied here to a seated, no-effort format instead.",
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: "Worth booking specifically for the cooler temperatures and the illuminated monuments — book at least a week ahead in peak season (May-September), since the evening slot is the first departure time to sell out on most operators' calendars.",
    },
    faqs: [
      {
        question: 'What time does the night tour actually depart?',
        answer:
          'It shifts seasonally to start once evening floodlighting is on — as early as 6:30pm in winter, as late as 9pm in summer — so confirm the exact time for your booking date.',
      },
      {
        question: 'Is the night tour safe for kids?',
        answer:
          "Yes — the format and vehicle are identical to the daytime tour, just timed later; it suits families whose kids handle a later bedtime better than a hot midday tour.",
      },
      {
        question: 'Does the night tour cover different stops than the daytime tour?',
        answer:
          "Mostly the same major landmarks, but timed around which monuments are actually floodlit after dark — check the specific listing's stop list before booking if a particular illuminated sight matters to you.",
      },
    ],
    relatedSupportHref: '/how-long-it-takes',
    relatedSupportLabel: 'How Long a Cart Tour Takes',
  },
  {
    href: '/money/cart-vs-walking-tour',
    navTitle: 'Cart vs Walking Tour',
    h1: 'Golf Cart vs Walking Tour of Rome: The Honest Comparison',
    keyword: 'golf cart vs walking rome',
    metaTitle: 'Golf Cart vs Walking Tour of Rome, Compared Honestly',
    metaDescription:
      'Ground covered, fatigue, and photo-stop flexibility — a golf cart tour versus a walking tour of Rome, compared without the marketing spin.',
    heroImage: { src: 'https://images.unsplash.com/photo-1614354961148-007d060d710e', alt: 'A wide-open piazza in front of the Pantheon in Rome' },
    intro: [
      "A cart covers more ground in less time with zero fatigue — here's the honest comparison of what you gain and what you trade away versus walking.",
      "Neither format is objectively better — the right choice depends on how much ground you want to cover, how much walking you can comfortably do, and whether you'd rather duck down a narrow alley on foot or stay on wider, cart-accessible streets.",
    ],
    atAGlance: [
      { label: 'Cart: ground covered', value: '~8–10km in 2.5–3h' },
      { label: 'Walking: ground covered', value: '~3–4km in 2.5–3h' },
      { label: 'Cart: physical effort', value: 'Seated, minimal' },
      { label: 'Walking: physical effort', value: 'Continuous, on uneven surfaces' },
    ],
    sections: [
      {
        heading: 'Ground covered, side by side',
        body: [
          "A cart tour covers roughly 8-10km across a 2.5-3 hour route, stringing together landmarks a walking tour couldn't realistically connect in the same window. A walking tour covers closer to 3-4km in the same time, since pace slows for narrow streets, crowds, and stopping to listen to the guide on foot rather than from a moving seat.",
        ],
      },
      {
        heading: 'Fatigue and heat, honestly compared',
        body: [
          "Walking 2-3 hours on Rome's uneven cobblestones genuinely tires travelers with limited stamina or mobility issues — heat compounds this fast in summer (35°C+/95°F+ is routine in July-August). A cart tour removes nearly all of that: seated the entire time, usually shaded, with the wind of movement doing a lot of the cooling work a walking tour doesn't get.",
        ],
      },
      {
        heading: 'What you trade away on a cart',
        body: [
          "Cart routes stay on wider streets and piazzas — Trastevere's narrowest lanes, market stalls tucked into alleys too tight for a vehicle, and any stop requiring stairs are genuinely off-limits. A walking tour reaches all of that. If those narrow-street details matter more to you than ground covered or physical effort, walking wins outright.",
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: "Choose a cart if covering more landmarks with less physical effort matters more than reaching every narrow alley — genuinely the better format for families with young kids, seniors, or anyone visiting in summer heat. Choose walking if the narrowest streets and market stops are specifically what you're after, and you're comfortable on your feet for 2-3 hours.",
    },
    faqs: [
      {
        question: 'Can a cart tour reach the same landmarks as a walking tour?',
        answer:
          "Mostly yes for major sights, but a cart can't fit down the narrowest alleys a walking tour reaches — check the specific route if a particular narrow-street stop matters to you.",
      },
      {
        question: 'Which is better for a hot summer visit?',
        answer:
          'A cart tour, by a wide margin — seated and mostly shaded beats 2-3 hours of walking in 35°C+ heat for most visitors.',
      },
      {
        question: 'Is walking cheaper than a cart tour?',
        answer:
          'Often yes — a self-guided walk costs nothing, and even a paid walking tour usually runs slightly less than a shared cart tour, though it demands considerably more physical effort.',
      },
    ],
    relatedSupportHref: '/why-a-cart-heat-mobility-distance',
    relatedSupportLabel: 'Why Take a Cart at All',
  },
];

export const SUPPORT_PAGE_CONTENT: SupportPageContent[] = [
  {
    href: '/support/why-a-cart-heat-mobility-distance',
    navTitle: 'Why a Cart at All',
    h1: 'Why Take a Golf Cart Tour of Rome: Heat, Mobility & Distance',
    keyword: 'why take a golf cart tour rome',
    metaTitle: 'Why Take a Golf Cart Tour of Rome: The Honest Case',
    metaDescription:
      "Heat, mobility limits, and the sheer distance between Rome's landmarks — the three practical reasons a cart tour beats walking for many visitors.",
    heroImage: { src: 'https://images.unsplash.com/photo-1668171321834-658179e37f5e', alt: "An elevated view over Rome's dense historic center, showing how close together its major landmarks sit" },
    sections: [
      {
        heading: "The distance problem walking tours don't solve",
        body: [
          "Rome's major sights sit further apart than most first-time visitors expect — the walk from the Colosseum to the Pantheon alone is roughly 2.5km, and stringing together 5-6 landmarks on foot in one outing means 8-10km of walking before lunch. A cart covers that same ground in a fraction of the time, seated, which is the practical case for a cart tour independent of any mobility concern.",
        ],
      },
      {
        heading: 'Heat management, by the numbers',
        body: [
          "Rome routinely hits 35°C+/95°F+ in July and August, and a walking tour offers no relief from it beyond shade breaks the guide chooses. A cart's canopy roof and the wind of continuous movement both help meaningfully — riders report a noticeably more comfortable experience than the same route on foot, even accounting for the open sides.",
        ],
      },
      {
        heading: "Mobility limits a walking tour doesn't accommodate",
        body: [
          "Rome's historic center is built on uneven cobblestones (sampietrini) that punish unstable footing, with limited public benches for a rest along a typical walking route. A cart removes both problems entirely for anyone with joint pain, limited stamina, or a mobility aid that doesn't handle cobblestones well — though a standard cart still requires stepping up to board; see our accessibility page for wheelchair-specific options.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is a cart tour just for people who can't walk?",
        answer:
          "No — plenty of riders choose a cart purely to cover more ground in less time, independent of any mobility concern; it suits anyone who'd rather see more of Rome than spend the day on foot.",
      },
      {
        question: 'How much walking is actually eliminated?',
        answer:
          'Nearly all of it — most stops involve stepping off the cart for a few meters to a photo vantage point, not a sustained walk between landmarks.',
      },
      {
        question: 'Does a cart tour work for someone recovering from an injury?',
        answer:
          'Often yes, given the minimal walking required, but confirm the specific boarding step height and seat configuration with the operator if a recent injury affects your mobility.',
      },
    ],
    relatedMoneyHref: '/money/golf-cart-tour-of-rome',
    relatedMoneyLabel: 'See the Flagship Golf-Cart Tour',
  },
  {
    href: '/support/what-the-route-covers',
    navTitle: 'What the Route Covers',
    h1: "What a Golf Cart Tour of Rome's Route Actually Covers",
    keyword: 'golf cart tour rome route',
    metaTitle: "What a Rome Golf Cart Tour's Route Covers, Stop by Stop",
    metaDescription:
      'The actual landmarks, stop order, and dwell time on a typical Rome golf cart tour route — not marketing copy.',
    heroImage: { src: 'https://images.unsplash.com/photo-1662398885856-cf2ab6e981b2', alt: 'Historic buildings lining a quiet street near Piazza Navona' },
    sections: [
      {
        heading: 'The typical stop sequence',
        body: [
          "Most routes start near Circus Maximus or Piazza Venezia, pass the Roman Forum's exterior walls and the Colosseum for a photo stop, cross toward the Tiber embankment, then finish through the open piazzas around the Pantheon and Piazza Navona — five to six stops in total, each getting roughly 10 minutes of dwell time.",
        ],
      },
      {
        heading: "What a cart route can and can't reach",
        body: [
          "Wide piazzas, embankment roads, and the boulevards connecting major landmarks are all cart-accessible; the narrowest lanes of Trastevere, Monti, and the Jewish Ghetto generally aren't, since a 4-6 seat cart doesn't fit the tightest medieval alleys the way a pedestrian does. Interior visits (the Colosseum, the Vatican Museums) aren't included on a sightseeing cart tour — it's an outside/exterior format, not a skip-the-line ticket.",
        ],
      },
      {
        heading: 'How stop order and timing vary by operator',
        body: [
          "The core landmarks repeat across nearly every listing since they're what makes a cart route work logistically, but the exact order, dwell time per stop, and whether an extra stop (a gelato break, a scenic overlook) is included varies by operator — check the specific listing's stop list rather than assuming the flagship route.",
        ],
      },
    ],
    faqs: [
      {
        question: 'Does the route go inside the Colosseum?',
        answer:
          'No — cart tours stop for an exterior photo opportunity, not entry; book Colosseum tickets separately if you want to go inside.',
      },
      {
        question: "Can the cart go through Trastevere's narrow streets?",
        answer:
          "Generally not the narrowest alleys — carts stick to wider streets and piazzas, so Trastevere's tightest lanes are usually skipped in favor of its wider approaches.",
      },
      {
        question: 'How many total stops does a typical route include?',
        answer:
          'Five to six stops is typical for the 2.5-3 hour flagship route, each getting roughly 10 minutes before moving on.',
      },
    ],
    relatedMoneyHref: '/money/golf-cart-tour-of-rome',
    relatedMoneyLabel: 'See the Flagship Golf-Cart Tour',
  },
  {
    href: '/support/accessibility-limited-mobility',
    navTitle: 'Accessibility & Limited Mobility',
    h1: 'Golf Cart Tour Accessibility in Rome: What to Know Before Booking',
    keyword: 'wheelchair accessible tour rome',
    metaTitle: 'Wheelchair-Accessible Golf Cart Tours in Rome',
    metaDescription:
      'Honest accessibility notes for Rome golf cart tours — boarding transfers, wheelchair-specific listings, and what to ask before booking.',
    heroImage: { src: 'https://images.unsplash.com/photo-1640307112649-01bfc4c77a77', alt: 'A narrow Trastevere street with its original, uneven cobblestone paving' },
    sections: [
      {
        heading: 'The honest boarding reality',
        body: [
          "Most standard carts require transferring from a wheelchair to a fixed bench seat — there's a single step up and the seat itself doesn't accommodate a wheelchair alongside it. This is a real limitation, not a minor detail: a rider who cannot transfer independently, or who needs to remain in their wheelchair for the full tour, should not assume a standard listing works without checking first.",
        ],
      },
      {
        heading: 'Wheelchair-specific listings, and what to check',
        body: [
          'A small number of operators run wheelchair-accessible carts with a ramp or lift and floor space for a wheelchair to stay in place — these are separate listings, not a feature of every standard tour, and availability is more limited than the standard fleet. Confirm the specific cart model, ramp weight limit, and wheelchair dimensions the operator can accommodate before booking, since "wheelchair accessible" can mean different things between operators.',
        ],
      },
      {
        heading: 'Questions worth asking before you book',
        body: [
          "Ask directly: does the cart require a transfer, or can a wheelchair stay in place; what's the step height if a transfer is required; and is there a companion seat directly beside the wheelchair space. None of these are unreasonable questions, and a reputable operator will answer plainly rather than deflect — treat a vague answer as a reason to look elsewhere.",
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I stay in my wheelchair for the whole tour?',
        answer:
          'Only on a specific wheelchair-accessible listing with a ramp or lift — a standard cart requires transferring to a fixed seat, so check the listing type carefully before booking.',
      },
      {
        question: "What if I can transfer but can't stand for long?",
        answer:
          "A standard cart likely works well for you — boarding is a single step up rather than a climb, and you're seated for the entire tour once aboard.",
      },
      {
        question: 'Are service animals allowed on a cart tour?',
        answer:
          'Most operators allow trained service animals — confirm directly with the specific operator before booking, since policy can vary.',
      },
    ],
    relatedMoneyHref: '/cart-tour-for-families-seniors',
    relatedMoneyLabel: 'See Families & Seniors Tours',
  },
  {
    href: '/support/how-long-it-takes',
    navTitle: 'How Long It Takes',
    h1: 'How Long a Golf Cart Tour of Rome Actually Takes',
    keyword: 'how long is a golf cart tour rome',
    metaTitle: 'How Long Does a Rome Golf Cart Tour Take?',
    metaDescription:
      'Realistic duration for every golf cart tour format in Rome — shared, private, night, and how stop count changes the total time.',
    heroImage: { src: 'https://images.unsplash.com/photo-1573070917719-cb3768c42634', alt: 'Visitors gathered around a fountain in an open Rome piazza' },
    sections: [
      {
        heading: 'Duration by tour format',
        body: [
          "The flagship shared tour runs 2.5-3 hours; a private tour is typically the same 2.5 hours but extendable on request; the night tour runs shorter at about 2 hours, since fewer stops earn a long dwell time after dark. None of these include hotel pickup time, which can add 15-30 minutes depending on how far outside the historic center you're staying.",
        ],
      },
      {
        heading: 'What changes the total time',
        body: [
          "Stop count is the biggest variable — a 5-stop route runs shorter than a 6-7 stop version of the same tour, and some operators offer an extended edition with an added gelato or coffee break folded in. Traffic and pickup location also matter more than they do for a fixed-route walking tour, since a cart still has to navigate real Rome streets between stops.",
        ],
      },
      {
        heading: 'Planning your day around it',
        body: [
          'Because a cart tour runs 2-3 hours rather than a half or full day, most visitors pair it with a separate activity the same day — a museum visit, a food tour, or simply resting before an evening out. Morning departures (starting around 9-9:30am) tend to beat the day\'s heat and the busiest stretch of tour traffic around midday.',
        ],
      },
    ],
    faqs: [
      {
        question: "Is 2.5 hours enough to see Rome's major sights?",
        answer:
          "It's enough to see the exteriors and major piazzas of 5-6 landmarks — not enough for museum visits or the Colosseum's interior, which need to be booked separately.",
      },
      {
        question: 'Does the private tour take longer than the shared tour?',
        answer:
          'Not by default — most run the same 2.5 hours, but a private booking can be extended for an additional cost if your group wants more time.',
      },
      {
        question: 'How much extra time should I budget for hotel pickup?',
        answer:
          "Roughly 15-30 minutes depending on your hotel's distance from the historic center — confirm your pickup window with the operator the day before.",
      },
    ],
    relatedMoneyHref: '/night-cart-tour',
    relatedMoneyLabel: 'See the Night Cart Tour',
  },
  {
    href: '/support/best-for-whom',
    navTitle: 'Best For Whom',
    h1: 'Who a Golf Cart Tour of Rome Is Actually Best For',
    keyword: 'who is a golf cart tour rome for',
    metaTitle: 'Is a Golf Cart Tour Right for You? An Honest Breakdown',
    metaDescription:
      "Families, seniors, hot-weather visitors, and short layovers — who genuinely benefits from a Rome golf cart tour, and who's better served elsewhere.",
    heroImage: { src: 'https://images.unsplash.com/photo-1561251224-e393160cd769', alt: 'A row of electric carts lined up on a paved road, ready to depart' },
    sections: [
      {
        heading: 'Who this format genuinely suits',
        body: [
          "Families with a wide age range (grandparents through young kids), seniors, anyone with joint pain or limited stamina, and visitors touring Rome in peak summer heat all get a meaningfully better experience from a seated cart than a walking tour covering the same ground. It's also the practical choice for a short layover or a single free afternoon, since it covers more landmarks per hour than walking allows.",
        ],
      },
      {
        heading: "Who's better served by a different format",
        body: [
          "Confident walkers who want to duck into the narrowest medieval alleys, browse market stalls tucked into tight lanes, or linger at length inside a museum should book a dedicated walking tour instead — a cart's wider-street routing simply can't reach what a pedestrian can. Riders comfortable on two wheels who want more speed and a sense of active participation are better served by our sibling site Rome Vespa's guided or sidecar format.",
        ],
      },
      {
        heading: "Matching the tour to your group's actual mix",
        body: [
          "A mixed group — say, grandparents and grandkids together — is the single strongest case for a cart tour, since it's the one format that doesn't ask anyone in the group to sit out or push through discomfort. A single confident adult traveler, by contrast, often gets more out of a walking tour's flexibility and lower cost, reserving the cart format for when comfort or ground-covered genuinely matters more.",
        ],
      },
    ],
    faqs: [
      {
        question: 'Is a golf cart tour worth it for a solo, able-bodied traveler?',
        answer:
          'It can be, mainly for covering more ground in less time, but a solo confident walker often gets similar value from a cheaper walking tour with more flexibility to wander.',
      },
      {
        question: 'What about a group with both young kids and grandparents?',
        answer:
          "This is the clearest case for a cart tour — it's the one format that doesn't force either end of the age range to compromise on pace or comfort.",
      },
      {
        question: 'Should I choose a cart tour or a Vespa tour?',
        answer:
          "A cart if you want seated comfort and family/senior-friendly pacing; a Vespa if you're comfortable riding and want more speed and an active, adrenaline-tinged experience — see our sibling site Rome Vespa for that format.",
      },
    ],
    relatedMoneyHref: '/cart-vs-walking-tour',
    relatedMoneyLabel: 'Compare Cart vs Walking',
  },
];

export function getMoneyPageContent(href: string): MoneyPageContent | undefined {
  return MONEY_PAGE_CONTENT.find((p) => p.href === href);
}

export function getSupportPageContent(href: string): SupportPageContent | undefined {
  return SUPPORT_PAGE_CONTENT.find((p) => p.href === href);
}
