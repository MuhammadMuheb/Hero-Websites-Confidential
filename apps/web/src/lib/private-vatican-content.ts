/**
 * Real content for every Private Vatican page beyond the homepage — the 5
 * money pages and 5 support pages defined in the property's blueprint
 * (Master Network Blueprint §3.6.3 page tree). Each entry supplies exactly
 * what MoneyPageTemplate.tsx / SupportPageTemplate.tsx need to render a
 * complete, unique page: its own H1, meta title/description, hero image,
 * body sections, and FAQ block. Mirrors
 * lib/underground-colosseum-content.ts's structure exactly.
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
    href: '/early-entry-vatican-sistine',
    navTitle: 'Early-Entry Vatican & Sistine',
    h1: 'Early-Entry Vatican & Sistine Chapel Tours: The Full Comparison',
    keyword: 'vatican early access tour',
    metaTitle: 'Vatican Early Access Tour: Sistine Chapel Before the Crowds',
    metaDescription:
      'Is early access to the Vatican and Sistine Chapel worth it? A first-hand comparison of entry times, crowd levels, and price.',
    heroImage: { src: 'https://images.unsplash.com/photo-1576016770956-debb63d92058', alt: 'The Sistine Chapel ceiling frescoes, photographed in the quiet of an early-entry visit' },
    intro: [
      "The flagship before-hours entry — the Sistine Chapel with a fraction of the midday crowd, and what that's actually worth in practice.",
      'Every early-access operator (GetYourGuide, Viator, Tiqets) is booking the same restricted pre-opening allocation through the Vatican Museums; what differs is group size, the guide, and how the rest of the morning is routed once the doors open to everyone else.',
    ],
    atAGlance: [
      { label: 'Price band', value: '€89–120' },
      { label: 'Entry time', value: '7:30am (public opens 9:00am)' },
      { label: 'Group size', value: '20–28 (private: 6–10)' },
      { label: 'Book by', value: '3–4 weeks ahead in peak season' },
    ],
    sections: [
      {
        heading: 'What early access actually buys you',
        body: [
          'Early-access tickets enter roughly 90 minutes before the Vatican Museums open to the general public — around 7:30am against a standard 9:00am opening. That window is guided-only, moving through the Pinacoteca and Gallery of Maps toward the Sistine Chapel while the museum is still closed to everyone else.',
          'The practical difference is dramatic rather than marginal: an early-access group typically has the Sistine Chapel to itself, or close to it, for 20–30 minutes before the first standard-ticket visitors begin filtering in around 9:15–9:30am.',
        ],
      },
      {
        heading: 'How the timing actually plays out',
        body: [
          'Most early-access itineraries route straight to the Sistine Chapel first, then double back toward St. Peter\'s Basilica while it, too, is still relatively quiet — basilica crowds build more slowly than the museum\'s, but by mid-morning the queue outside forms regardless of which museum ticket you held.',
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: "Worth the premium if seeing the Sistine Chapel's ceiling without a wall of people between you and it matters — for a short, budget-conscious visit where any functioning entry ticket will do, a standard skip-the-line ticket covers the same rooms for less.",
    },
    faqs: [
      {
        question: 'Is early access to the Sistine Chapel really worth the extra cost?',
        answer:
          'For most visitors, yes — the difference between an empty Sistine Chapel at 7:30am and the same room mid-afternoon with hundreds of people is substantial, and photos/reflection time both improve dramatically.',
      },
      {
        question: 'How much earlier do early-access tours actually enter?',
        answer:
          'Roughly 90 minutes before the public — early-access groups typically enter around 7:30am against the museum\'s standard 9:00am opening.',
      },
      {
        question: "Do early-access tickets include St. Peter's Basilica?",
        answer:
          "Most do — operators route the group there directly after the Sistine Chapel, while the basilica is still comparatively quiet, rather than leaving it as a separate booking.",
      },
    ],
    relatedSupportHref: '/how-early-access-works',
    relatedSupportLabel: 'How Early Access Really Works',
  },
  {
    href: '/private-vatican-guide',
    navTitle: 'Private Vatican Guide',
    h1: 'Private Vatican Guide: Is a Licensed Guide Worth It?',
    keyword: 'private vatican tour',
    metaTitle: 'Private Vatican Tour: Is a Licensed Guide Worth It?',
    metaDescription:
      "A private Vatican guide costs more than a group tour — what actually changes is pace and room priority, plus the licence question most listings skip.",
    heroImage: { src: 'https://images.unsplash.com/photo-1642147039034-11d0e1f70fed', alt: 'An empty Vatican Museums gallery corridor lined with classical sculpture before the doors open to the public' },
    intro: [
      'A licensed private guide can adjust pace, skip low-priority rooms, and answer questions standard groups never get to ask.',
      'Under Italian law, anyone leading a private group through a state museum like the Vatican is required to hold an official regional guide licence — worth confirming before booking an independent "private guide" listing that may not actually name one.',
    ],
    atAGlance: [
      { label: 'Group tour price', value: '€62–99 / person' },
      { label: 'Private tour price', value: '€115–200+ (up to 6 people)' },
      { label: 'Licence required', value: 'Yes — regional guide patentino' },
      { label: 'Pace', value: 'Fully custom, room-by-room' },
    ],
    sections: [
      {
        heading: 'What actually changes with a private guide',
        body: [
          'The route itself is fixed by the Vatican Museums for every visitor — a private guide changes what you linger on within it, not which rooms are open. That means more time in, say, the Raphael Rooms or the Gallery of Maps and less time walking past the Ethnological Missionary collection, plus a guide who can actually stop and answer an off-script question instead of keeping a group of 25 moving.',
        ],
      },
      {
        heading: 'The licence question most bookings skip',
        body: [
          'Italian regulation requires a guide leading a paid tour through a state-owned museum to hold an official regional licence (a "patentino"). Some listings marketed as "private guide" are actually a driver or general fixer without one — ask for the licence number before booking, the same way you\'d confirm any other credential.',
        ],
      },
      {
        heading: 'When the price premium is worth it',
        body: [
          'Private tours run roughly double a group seat at the low end, more for a fully customized full morning. Worth it for genuine depth of interest in specific rooms or periods, mobility needs that a fixed-pace group can\'t accommodate, or simply wanting real one-on-one time with a guide on Vatican and Renaissance history rather than a script delivered to 25 people at once.',
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: 'Book private specifically for depth of interest or flexibility you have a real reason to need — for a first, general-interest visit, a good guided group tour covers the same rooms for meaningfully less.',
    },
    faqs: [
      {
        question: 'Do I need a private guide to skip the line?',
        answer:
          'No — standard guided and skip-the-line group tours also bypass the general-admission queue; a private guide buys pace and depth, not faster entry.',
      },
      {
        question: "How do I know a 'private guide' listing is actually licensed?",
        answer:
          "Ask for the guide's regional licence number before booking — a listing that can't provide one on request is worth treating with caution.",
      },
      {
        question: 'Can a private guide get me into rooms closed to groups?',
        answer:
          'No — every visitor follows the same fixed circulation route set by the Vatican Museums; a private guide changes pace and depth, not which rooms are open.',
      },
    ],
    relatedSupportHref: '/sistine-chapel-etiquette',
    relatedSupportLabel: 'Sistine Chapel Etiquette',
  },
  {
    href: '/vatican-st-peter-s-dome',
    navTitle: "Vatican + St Peter's Dome",
    h1: "Vatican + St Peter's Dome: The Honest Timing & Fitness Guide",
    keyword: 'vatican st peters dome',
    metaTitle: "Vatican + St Peter's Dome: Timing, Steps & Fitness Level",
    metaDescription:
      "Combining the Vatican Museums with the St. Peter's dome climb makes for a long day — the honest step count, fitness level, and best order to do both.",
    heroImage: { src: 'https://images.unsplash.com/photo-1639945751207-67094e65698d', alt: "St. Peter's Basilica dome seen from close beneath its cupola, the climb route visible along its curve" },
    intro: [
      'Combining the museums with the dome climb makes for a long but complete day — here\'s the honest fitness and timing reality of 551 steps.',
      'A lift covers roughly the first 231 of those steps on most tickets, but the remaining stretch is a genuinely narrow spiral staircase, single file, with nowhere to pass someone moving slower.',
    ],
    atAGlance: [
      { label: 'Total steps', value: '551 (≈320 with the lift)' },
      { label: 'Climb time', value: '30–45 minutes each way' },
      { label: 'Combined-day length', value: '5–6 hours' },
      { label: 'Best order', value: 'Museums first, dome last' },
    ],
    sections: [
      {
        heading: 'The step count, honestly',
        body: [
          '551 steps separate the ground floor from the cupola if you walk the entire way. Most dome tickets include a lift that covers the first stretch, leaving roughly 320 steps of narrow, single-file spiral staircase for the remainder — there\'s no passing a slower climber ahead of you on that section, so pace is set by the group, not by you.',
        ],
      },
      {
        heading: 'Fitness and claustrophobia notes',
        body: [
          "The dome climb has no wheelchair or stroller access at any point, and the final stretch is tight enough that anyone uncomfortable in confined spaces should skip it — the view from the roof terrace (reached before the climb even begins) already delivers most of the visual payoff without the stairwell.",
        ],
      },
      {
        heading: 'Combined-day timing',
        body: [
          'Budget roughly 3 hours for the Vatican Museums and Sistine Chapel, then another 2 hours for St. Peter\'s Basilica and the dome climb — closer to 5–6 hours total. Doing the dome last works better than first: the museum route is fixed and time-boxed by guided groups, while the dome queue (a separate line from museum entry) tends to shorten later in the day.',
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: "Worth it if you're reasonably fit and want the view — if the stairwell itself sounds like the wrong call, the basilica interior alone, without the climb, still delivers most of what makes the visit worthwhile.",
    },
    faqs: [
      {
        question: "Is there an elevator to the top of St. Peter's dome?",
        answer:
          'A partial one — the lift covers roughly the first 231 of the 551 total steps, leaving about 320 steps of narrow spiral staircase for the remainder with no lift access.',
      },
      {
        question: 'Is the dome climb suitable for kids?',
        answer:
          'Most operators set an informal minimum age around 8 given the narrow, single-file stairwell — check the specific ticket\'s policy before booking with younger children.',
      },
      {
        question: 'Can I do the dome climb without visiting the Vatican Museums?',
        answer:
          "Yes — the dome is accessed through St. Peter's Basilica directly, a separate entrance and ticket from the Vatican Museums.",
      },
    ],
    relatedSupportHref: '/what-to-see-in-3-hours',
    relatedSupportLabel: 'What to See in 3 Hours',
  },
  {
    href: '/vatican-with-kids-family',
    navTitle: 'Vatican with Kids / Family',
    h1: 'Vatican with Kids: The Family Guide',
    keyword: 'vatican tour with kids',
    metaTitle: 'Vatican with Kids: Age Limits, Pacing & Practical Tips',
    metaDescription:
      "Visiting the Vatican with kids: realistic pacing, the no-seating Sistine Chapel rule, and which tours are actually built for families.",
    heroImage: { src: 'https://images.unsplash.com/photo-1650809093233-7ad99ce2f0e1', alt: 'Families and small groups crossing the open expanse of St. Peter’s Square on a bright morning' },
    intro: [
      "Marble floors, long corridors, and a two-hour Sistine Chapel queue test any child's patience — here's which tours are actually paced for families.",
      "The Vatican Museums aren't inherently kid-hostile — the Gallery of Maps and the Egyptian collection tend to hold younger visitors' attention — but the standard 3-hour route with no seating anywhere near the Sistine Chapel is genuinely demanding on a short attention span.",
    ],
    atAGlance: [
      { label: 'Best age range', value: '7+' },
      { label: 'Strollers', value: 'Fine in galleries, not on the dome' },
      { label: 'Seating', value: 'None inside the Sistine Chapel' },
      { label: 'Best slot', value: 'Early-access or last entry of the day' },
    ],
    sections: [
      {
        heading: 'Age realities',
        body: [
          'Under roughly age 7, the combination of a long, no-seating wait near the Sistine Chapel and 2.5–3 hours of walking wears most kids out well before the highlight of the visit. Family-paced tours run a shorter route with more deliberate stops, trading some gallery depth for a visit that doesn\'t end in a meltdown two rooms from the ceiling everyone came to see.',
        ],
      },
      {
        heading: 'Strollers and mobility',
        body: [
          'Strollers are fine through most of the museum\'s gallery floors, which are largely flat with occasional ramps, but they\'re not usable on the St. Peter\'s dome stairs at all and become awkward in the narrow, crowded final corridor leading into the Sistine Chapel — plan to fold and carry for that last stretch.',
        ],
      },
      {
        heading: 'Practical logistics',
        body: [
          "Water and small snacks aren't allowed inside the galleries themselves but are fine in the museum's courtyards, and there's a terrace café partway through the route that works as a natural break point before tackling the final approach to the chapel.",
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: "For kids under 7, a shorter Basilica-and-square visit without the full museum route is the better call. For 8+, a family-paced early-access or private tour handles the crowd-and-patience problem directly rather than fighting it on a standard route.",
    },
    faqs: [
      {
        question: 'Can I bring young children to the Vatican Museums?',
        answer:
          'Yes, but the crowds, long corridors, and no-seating-in-the-Sistine-Chapel rule make it genuinely hard on kids under 7 — a shorter, family-paced tour is a better fit than the standard 3-hour route.',
      },
      {
        question: 'Are strollers allowed in the Vatican Museums?',
        answer:
          "Yes on standard gallery floors; they aren't usable on the St. Peter's dome stairs, and become impractical in the crowded final corridor before the Sistine Chapel.",
      },
      {
        question: 'Is there anywhere for kids to rest inside?',
        answer:
          "Seating is very limited overall and there is none at all inside the Sistine Chapel itself — plan breaks in the museum's courtyards or its terrace café instead.",
      },
    ],
    relatedSupportHref: '/quietest-times-to-visit',
    relatedSupportLabel: 'Quietest Times to Visit',
  },
  {
    href: '/skip-the-line-explained',
    navTitle: 'Skip-the-Line Explained',
    h1: 'Vatican Skip-the-Line Tickets, Explained',
    keyword: 'vatican skip the line',
    metaTitle: 'Vatican Skip-the-Line Explained: What Each Ticket Bypasses',
    metaDescription:
      "Not every Vatican skip-the-line ticket skips the same queue — what each ticket type actually bypasses, and where security screening still applies.",
    heroImage: { src: 'https://images.unsplash.com/photo-1741538701565-e7694651800a', alt: 'Visitors gathered near the Vatican Museums entrance queue on the Viale Vaticano' },
    intro: [
      'Every ticket claims to skip the line — this breaks down which entrance each ticket type actually uses, and where the real bottleneck still is.',
      "At the Vatican Museums specifically, 'skip the line' means bypassing the general-admission ticket queue on the Viale Vaticano — it doesn't mean skipping the security screening every visitor passes through regardless of ticket type.",
    ],
    atAGlance: [
      { label: 'Ticket types', value: 'Standard skip-the-line · Early-access · Guided' },
      { label: 'Queue skipped', value: 'General-admission line (60–120 min peak season)' },
      { label: 'Still applies', value: 'Security screening for every visitor' },
      { label: 'Book at the gate?', value: 'No — online only, in advance' },
    ],
    sections: [
      {
        heading: 'The three real ticket types',
        body: [
          'Standard skip-the-line tickets reserve a fixed entry time slot at the same Viale Vaticano entrance everyone uses, with no guide. Early-access tickets use a separate pre-opening entry roughly 90 minutes before the public, guided only. Guided skip-the-line tours run during standard public hours with a live guide and headset — worth it for context, not for a faster queue than the bare fast-track ticket already gets you.',
        ],
      },
      {
        heading: 'Where skip-the-line still means waiting',
        body: [
          "Every visitor, regardless of ticket type, passes through airport-style security screening at the entrance — metal detector, bag scan — and that line can still run 15–30 minutes in peak season even with a reserved entry slot. What a skip-the-line ticket actually avoids is the separate, much longer general-admission ticket queue, which can run 60–120 minutes in summer and around major Catholic holidays.",
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: 'A guided skip-the-line tour beats a bare fast-track ticket for most first-timers, for the same reason it does everywhere else in Rome — the price difference is small and a guide adds real context. Early access is the one ticket type that meaningfully changes crowd level, not just queue length.',
    },
    faqs: [
      {
        question: 'Does skip-the-line include security screening?',
        answer:
          'No — every visitor, regardless of ticket type, still passes through metal detectors and bag scanning at the entrance; this line can still run 15–30 minutes in peak season.',
      },
      {
        question: "What's the difference between skip-the-line and early access?",
        answer:
          'Skip-the-line reserves a time slot during standard public hours; early access means entering before the museum opens to the general public entirely — a meaningfully different crowd level, not just a shorter queue.',
      },
      {
        question: 'Can I buy skip-the-line tickets at the entrance?',
        answer:
          'No — skip-the-line and early-access slots must be booked online in advance; the on-site ticket office only sells same-day standard admission when available, which can mean hours of wait in peak season.',
      },
    ],
    relatedSupportHref: '/dress-code-security',
    relatedSupportLabel: 'Dress Code & Security',
  },
];

export const SUPPORT_PAGE_CONTENT: SupportPageContent[] = [
  {
    href: '/how-early-access-works',
    navTitle: 'How Early Access Really Works',
    h1: 'How Vatican Early Access Really Works',
    keyword: 'how vatican early access works',
    metaTitle: 'How Vatican Early Access Works: Booking, Entry & Rules',
    metaDescription:
      'How Vatican early-access tickets actually work: how slots are released, what entry looks like before public opening, and how far ahead to book.',
    heroImage: { src: 'https://images.unsplash.com/photo-1628521366384-51c954557f04', alt: 'An empty gallery inside the Vatican Museums, photographed before the museum opens to the public' },
    sections: [
      {
        heading: 'What early access actually is',
        body: [
          "Early access is a guided entry roughly 90 minutes before the Vatican Museums open to the general public — around 7:30am against a standard 9:00am opening. Groups are capped small (20–28 people, smaller still on private departures) and move through the Pinacoteca and Gallery of Maps directly toward the Sistine Chapel while the museum is still closed to everyone else.",
        ],
      },
      {
        heading: 'How you actually get in',
        body: [
          "Entry is through a dedicated early-access check-in point near the main Vatican Museums entrance on the Viale Vaticano — a separate queue from standard and skip-the-line ticket holders, who aren't admitted until the public opening time. Staff check photo ID against the booking name before the group is let in.",
        ],
      },
      {
        heading: 'Booking lead time',
        body: [
          'Official Vatican Museums early-access slots typically release around 60 days ahead and can sell out for popular dates — Easter week, Christmas week, and peak summer Saturdays especially. Authorized resellers (GetYourGuide, Viator, Tiqets) often hold separate allocations with more flexible cancellation policies, which is why they\'re usually the more reliable route if official slots are already gone for your date.',
        ],
      },
      {
        heading: 'What security requires',
        body: [
          'A photo ID matching the booking name is checked at group check-in, and standard airport-style screening (metal detector, bag scan) applies at the entrance the same as any other visitor. Large bags, tripods, and selfie sticks generally aren\'t permitted inside.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How far ahead should I book early access?',
        answer:
          'Book at least 3–4 weeks ahead in peak season (April–October); official early-access slots release about 60 days out and can sell out quickly for holiday weeks.',
      },
      {
        question: 'Can I do early access without a guide?',
        answer:
          "No — early-access slots are sold as guided experiences; there's no self-guided early-entry ticket, unlike standard-hours admission.",
      },
      {
        question: "What happens if I'm late for my early-access slot?",
        answer:
          "Groups move on a fixed schedule tied to the museum's public opening time — arriving late can mean losing the slot entirely and being redirected to the standard queue.",
      },
    ],
    relatedMoneyHref: '/early-entry-vatican-sistine',
    relatedMoneyLabel: 'Compare Early-Entry Vatican & Sistine Tours',
  },
  {
    href: '/dress-code-security',
    navTitle: 'Dress Code & Security',
    h1: "Vatican Dress Code & Security: What's Actually Enforced",
    keyword: 'vatican dress code',
    metaTitle: "Vatican Dress Code & Security: What's Actually Enforced",
    metaDescription:
      "The Vatican's dress code is enforced at the door, not just posted as a suggestion — what's actually required, and what security screening involves.",
    heroImage: { src: 'https://images.unsplash.com/photo-1594328253710-3f7067cedbe8', alt: "Visitors approaching the security screening area at St. Peter's Square" },
    sections: [
      {
        heading: 'The dress code, enforced not suggested',
        body: [
          "Shoulders and knees must be covered for every visitor, regardless of gender or ticket type — there are no exceptions made at the door, and being turned away happens regardless of how far you've traveled to get there. Scarves and wraps are sold by street vendors nearby, but they're an unreliable backup; dressing correctly from the start avoids the risk entirely.",
        ],
      },
      {
        heading: 'What security screening involves',
        body: [
          "Every visitor passes through airport-style screening at the entrance — a metal detector and bag scan — regardless of ticket type. Large backpacks or suitcases generally need to be checked or left behind, since formal oversized-luggage storage isn't guaranteed in every season. Tripods and selfie sticks generally aren't permitted inside either.",
        ],
      },
      {
        heading: 'Sistine Chapel-specific rules',
        body: [
          "The Sistine Chapel enforces its own rules on top of the museum's general policy: no photography or video of any kind, a stricter standard than the rest of the museum, where photography without flash is generally allowed. Guards actively enforce silence, calling for it over a loudspeaker when the room gets loud.",
        ],
      },
    ],
    faqs: [
      {
        question: "What's the dress code for the Vatican?",
        answer:
          'Shoulders and knees must be covered for both men and women — no exceptions, and security will turn visitors away at the door regardless of ticket type, so check this page before you go.',
      },
      {
        question: 'Can I cover up with a scarf if I\'m wearing shorts or a tank top?',
        answer:
          "A scarf covering shoulders works, but shorts or skirts above the knee are still refused regardless of what's on top — bring actual knee-length clothing rather than relying on a wrap alone.",
      },
      {
        question: 'Is photography allowed inside the Vatican Museums?',
        answer:
          'Yes, without flash, in most galleries — except the Sistine Chapel, where all photography and video are banned entirely.',
      },
    ],
    relatedMoneyHref: '/skip-the-line-explained',
    relatedMoneyLabel: 'See Skip-the-Line Ticket Options',
  },
  {
    href: '/what-to-see-in-3-hours',
    navTitle: 'What to See in 3 Hours',
    h1: 'The Vatican in 3 Hours: What to Actually Prioritize',
    keyword: 'vatican in 3 hours',
    metaTitle: 'The Vatican in 3 Hours: What to Actually Prioritize',
    metaDescription:
      "Three hours is enough for the Vatican Museums' highlights if you route it right — the realistic priority order, and what to skip.",
    heroImage: { src: 'https://images.unsplash.com/photo-1723233002021-203db272837a', alt: 'A grand Vatican Museums gallery with sculpture lining both walls, viewed down its full length' },
    sections: [
      {
        heading: 'The realistic 3-hour route',
        body: [
          "Skip the Pinacoteca (the standalone painting gallery) unless Renaissance painting specifically is why you're here, and head instead toward the Pio-Clementino Museum's classical sculpture (the Laocoön group is the single most-cited highlight), then the Gallery of Maps, the Raphael Rooms, and finally the Sistine Chapel — exiting either via the spiral Bramante staircase or the direct shortcut into St. Peter's Basilica where the ticket allows it.",
        ],
      },
      {
        heading: 'What gets cut when time is tight',
        body: [
          "The Egyptian and Etruscan collections, the Carriage Pavilion, and most of the modern religious art wing are the first things to cut in a 3-hour visit. They're genuinely worth a second trip, not essential on a first, time-boxed one.",
        ],
      },
      {
        heading: 'Timing checkpoints',
        body: [
          'At a brisk pace with only photo stops, reaching the Sistine Chapel from the entrance takes roughly 45 minutes on the direct route. The rest of a 3-hour visit splits between time actually in the chapel and the walk back out, since the museum\'s fixed exit route often loops back near the entrance rather than continuing forward.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How long do I need to see the Vatican properly?',
        answer:
          "Budget a minimum of 3 hours for the museums and Sistine Chapel alone; add another 45–60 minutes if you're also doing St. Peter's Basilica and the dome climb.",
      },
      {
        question: 'Can I really see the Vatican Museums in under 3 hours?',
        answer:
          "It's possible on a fast, guide-led route covering only the Pio-Clementino Museum, Gallery of Maps, Raphael Rooms, and Sistine Chapel — self-guided visitors usually need closer to 3.5–4 hours to find the same route unaided.",
      },
      {
        question: 'Should I see the Sistine Chapel first or last?',
        answer:
          'Most fixed museum routes place it near the end regardless of ticket type; early-access and private guides are the main way to reverse that order and reach it first.',
      },
    ],
    relatedMoneyHref: '/vatican-st-peter-s-dome',
    relatedMoneyLabel: 'Compare Vatican + Dome Tours',
  },
  {
    href: '/quietest-times-to-visit',
    navTitle: 'Quietest Times to Visit',
    h1: 'The Quietest Times to Visit the Vatican Museums',
    keyword: 'quietest time to visit vatican',
    metaTitle: 'The Quietest Times to Visit the Vatican Museums',
    metaDescription:
      "The real quietest days, months, and hours to visit the Vatican Museums — and the one weekday that's busier than most weekends.",
    heroImage: { src: 'https://images.unsplash.com/photo-1663345331953-9dac1221bd89', alt: 'A nearly empty St. Peter’s Square in the early morning light' },
    sections: [
      {
        heading: 'Best time of day',
        body: [
          "Early-access entry (around 7:30am) and the last two hours before closing (last entry 4:00pm, closing 6:00pm in standard season) are consistently the quietest windows. Late morning through early afternoon is when tour-bus groups peak — the single busiest stretch of any given day.",
        ],
      },
      {
        heading: 'Best day of the week',
        body: [
          "Wednesdays run busier than usual mid-morning because of the Pope's general audience at St. Peter's Square, which pulls extra visitor traffic into the wider area and can spill into museum queues. Tuesdays and Thursdays are comparatively calmer, all else equal.",
        ],
      },
      {
        heading: 'Best time of year',
        body: [
          "Late January through February and November (excluding the week around Christmas) see noticeably lower visitor volume than Easter week or peak summer. The last Sunday of the month offers free admission but is also the single most crowded day of the month — worth avoiding rather than seeking out if a quiet visit matters more than the ticket price.",
        ],
      },
    ],
    faqs: [
      {
        question: 'What time is least crowded at the Vatican Museums?',
        answer:
          'Early-access entry before 8am and the last two hours before closing are consistently the quietest — late morning to early afternoon is when the museum is busiest.',
      },
      {
        question: 'Is the Vatican busier on the free last Sunday of the month?',
        answer:
          "Yes, significantly — free admission draws the largest crowds of the month, making it the one day to actively avoid if a quiet visit matters more than saving the ticket price.",
      },
      {
        question: "Does the Pope's Wednesday audience affect Vatican Museums crowds?",
        answer:
          'Indirectly — it draws extra visitor traffic into the wider Vatican area mid-morning, which can spill over into museum queues; early-access or late-afternoon slots avoid the overlap.',
      },
    ],
    relatedMoneyHref: '/vatican-with-kids-family',
    relatedMoneyLabel: 'Find Family-Paced Vatican Tours',
  },
  {
    href: '/sistine-chapel-etiquette',
    navTitle: 'Sistine Chapel Etiquette',
    h1: "Sistine Chapel Etiquette: The Rules That Are Actually Enforced",
    keyword: 'sistine chapel etiquette',
    metaTitle: 'Sistine Chapel Etiquette: The Rules That Are Actually Enforced',
    metaDescription:
      'Sistine Chapel etiquette that\'s actually enforced by guards on-site: no photography, no talking above a whisper, and a strict dress-code checkpoint.',
    heroImage: { src: 'https://images.unsplash.com/photo-1707338509272-89f729ab1280', alt: 'The Sistine Chapel interior, showing the scale of the room beneath the painted ceiling' },
    sections: [
      {
        heading: 'No photography, strictly enforced',
        body: [
          "Guards actively stop anyone raising a phone or camera inside the Sistine Chapel, a rule enforced far more strictly here than in the rest of the museum, where photography without flash is generally allowed. The rule covers video as well as stills, and applies regardless of ticket type.",
        ],
      },
      {
        heading: 'Silence, not just quiet',
        body: [
          'Guards periodically call for "silenzio" over a loudspeaker when the room gets loud. The chapel is a functioning consecrated space — it\'s used for papal conclaves — as well as a museum room, and treating it that way is what avoids the most common friction with staff.',
        ],
      },
      {
        heading: 'The dress code applies here most strictly',
        body: [
          "Even visitors who passed the museum's main entrance screening in borderline clothing can still be stopped specifically at the Sistine Chapel's own checkpoint — shoulders and knees covered is enforced at this final point as strictly as anywhere else on the visit.",
        ],
      },
    ],
    faqs: [
      {
        question: 'Why is photography banned in the Sistine Chapel specifically?',
        answer:
          "The no-photography rule stems from the chapel's history as a functioning consecrated space and past restoration-sponsorship terms; it's enforced far more strictly here than in the rest of the museum, where photography without flash is generally allowed.",
      },
      {
        question: 'Can I talk normally inside the Sistine Chapel?',
        answer:
          'Keep it to a whisper — guards actively call for silence over a loudspeaker when noise builds, since the room is treated as a place of quiet reflection, not just another gallery stop.',
      },
      {
        question: 'Is there a specific dress-code check at the chapel itself?',
        answer:
          "Yes — even visitors who passed the main entrance screening can still be stopped at the chapel's own checkpoint if shoulders or knees aren't covered.",
      },
    ],
    relatedMoneyHref: '/private-vatican-guide',
    relatedMoneyLabel: 'Compare Private Vatican Guides',
  },
];

export function getMoneyPageContent(href: string): MoneyPageContent | undefined {
  return MONEY_PAGE_CONTENT.find((p) => p.href === href);
}

export function getSupportPageContent(href: string): SupportPageContent | undefined {
  return SUPPORT_PAGE_CONTENT.find((p) => p.href === href);
}
