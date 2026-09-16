/**
 * Real content for every Rome Pizza Class page beyond the homepage — the 4
 * money pages and 4 support pages defined in the property's blueprint
 * (Master Network Blueprint §3.9.3 page tree). Each entry supplies exactly
 * what MoneyPageTemplate.tsx / SupportPageTemplate.tsx need to render a
 * complete, unique page: its own H1, meta title/description, hero image,
 * body sections, and FAQ block. Mirrors lib/cooking-in-rome-content.ts's
 * structure exactly.
 *
 * Every keyword, section heading, and FAQ answer below was checked against
 * lib/cooking-in-rome-content.ts's MONEY_PAGE_CONTENT/SUPPORT_PAGE_CONTENT
 * before writing, per the blueprint's overlap-critical note for this
 * property (§3.9.1): this site stays strictly pizza-technique-focused (dough,
 * oven, stretch-and-toss, pizza+gelato combo, family/private pizza classes)
 * and never reuses or rephrases a keyword Cooking in Rome already owns.
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
    href: '/money/rome-pizza-making-class',
    navTitle: 'Rome Pizza-Making Class',
    h1: 'Rome Pizza-Making Class: Dough Technique & Oven Comparison',
    keyword: 'pizza making class rome',
    metaTitle: 'Pizza Making Class Rome: Dough Technique & Oven Comparison',
    metaDescription:
      'What a proper hands-on Rome pizza-making class covers — dough timing, oven type, and take-home technique.',
    heroImage: { src: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f', alt: 'A pair of hands stretching fresh pizza dough into a round on a floured surface' },
    intro: [
      'The flagship single-dish class — real dough technique, a proper wood-fired oven, and enough time to actually get the stretch right instead of rushing to the next station.',
      "Most listings that call themselves a \"pizza class\" spend more time on toppings than on the dough itself. The genuinely good ones do the opposite: dough mixing, kneading, and a real proving window come first, and the stretch-and-toss step gets repeated until it actually works, rather than a single rushed attempt before the topping station.",
    ],
    atAGlance: [
      { label: 'Price band', value: '€55–68' },
      { label: 'Duration', value: '2–2.5 hours' },
      { label: 'Oven type', value: 'Wood-fired on most listings' },
      { label: 'Dough proving time', value: '30–90 min, built into class' },
    ],
    sections: [
      {
        heading: 'Dough-from-scratch timing, honestly broken down',
        body: [
          "A genuinely hands-on class walks through mixing flour, water, yeast, and salt into a dough at roughly 60% hydration, kneading it until it passes a windowpane test (thin enough to see light through without tearing), then letting it prove for at least 30-90 minutes before shaping. Some operators pre-prove a batch earlier in the day so the full multi-hour rise doesn't eat into class time — ask whether you're stretching dough you mixed yourself or a batch prepared in advance, since both are common and neither is dishonest as long as the listing says so.",
          "The stretch-and-toss step is where most first-timers actually learn something: pressing air to the rim by hand before ever tossing, working from the center outward, and recognizing when a round is thin enough to cook evenly without tearing under its own weight. A good instructor lets you try this 2-3 times, not once.",
        ],
      },
      {
        heading: 'Wood-fired vs electric oven, and why it matters',
        body: [
          "A genuine wood-fired oven runs 450-480°C (840-900°F) and cooks a pizza in 60-90 seconds — hot enough to char the crust in spots (leoparding) while keeping the center soft. An electric deck oven tops out lower, usually 300-350°C (570-660°F), and takes 4-6 minutes per pizza, giving a more even but less dramatically charred result. Neither is objectively better, but if a wood-fired result is specifically what you're after, confirm the oven type before booking rather than assuming from photos — some studio-based classes use electric ovens even when their marketing photos show flames.",
        ],
      },
      {
        heading: 'Take-home technique notes',
        body: [
          "Most listings send participants home with a written dough recipe and ratio (flour, water, yeast, salt by weight), which is genuinely more useful than a vague verbal explanation, since pizza dough hydration is unforgiving of guesswork. A minority of budget listings skip this — check the inclusions list if repeating the technique at home matters to you.",
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: "Worth booking specifically for the dough-first pacing and a confirmed wood-fired oven — those two details separate a class that actually teaches technique from one that's mostly a topping-and-eat session. Confirm oven type and whether you mix your own dough from scratch before paying a premium price.",
    },
    faqs: [
      {
        question: 'Do I need any prior cooking experience?',
        answer:
          'No — pizza-making classes are built for complete beginners, and the stretch-and-toss technique is taught step by step with hands-on correction from the instructor.',
      },
      {
        question: 'Will I actually stretch my own dough, or just watch?',
        answer:
          "On a genuinely hands-on listing, yes — every participant works their own dough ball through stretching and topping; check the listing description for that phrasing specifically, since a minority of cheaper listings are demonstration-heavy.",
      },
      {
        question: 'How long does the dough actually need to prove?',
        answer:
          "At least 30-90 minutes for a same-day proof, though some operators pre-prove a batch earlier in the day so the full rise doesn't consume your class time — ask which approach your specific listing uses.",
      },
    ],
    relatedSupportHref: '/what-you-make-and-eat',
    relatedSupportLabel: 'What You Make and Eat',
  },
  {
    href: '/money/pizza-gelato-combo',
    navTitle: 'Pizza + Gelato Combo',
    h1: 'Pizza + Gelato Combo Class in Rome: Timing & Honest Pricing',
    keyword: 'pizza and gelato class rome',
    metaTitle: 'Pizza and Gelato Class Rome: Combo Timing, Compared',
    metaDescription:
      'A two-dish pizza and gelato combo class in Rome — combined-session timing, which comes first and why, and price vs booking separately.',
    heroImage: { src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b', alt: 'A round of pizza dough being tossed and stretched in mid-air' },
    intro: [
      'A two-dish combo for anyone who wants the full afternoon — pizza first, gelato-making after, in one booking.',
      "The two techniques share a kitchen well because pizza dough needs real proving and baking time, and most operators use that dead time productively by starting the gelato base during the pizza's rest or bake stage rather than making guests wait around doing nothing.",
    ],
    atAGlance: [
      { label: 'Price band', value: '€62–75' },
      { label: 'Duration', value: '3.5–4 hours' },
      { label: 'Techniques covered', value: '2 (pizza dough, gelato base)' },
      { label: 'Timing order', value: 'Pizza dough first, gelato during rest/bake' },
    ],
    sections: [
      {
        heading: 'Combined-session timing',
        body: [
          "A typical session opens with pizza dough — mixing, kneading, and hand-stretching a round — while a portion of dough prepared earlier that day bakes off first as a demonstration piece. While each participant's own round proves or bakes, the group shifts to churning a simple gelato base (often fior di latte or a fruit variant), since fresh gelato needs no advance freezer time a class can't provide.",
        ],
      },
      {
        heading: 'Which comes first and why',
        body: [
          "Pizza always goes first because its total process (mix, knead, prove, stretch, top, bake) takes the longest single stretch of time; gelato is deliberately slotted into the dead time pizza's dough-proving and baking cycle creates. A listing that runs gelato first is unusual and worth a second look at the itinerary, since it usually means a shortened, less hands-on version of one of the two techniques.",
        ],
      },
      {
        heading: 'Price vs booking each separately',
        body: [
          "A standalone pizza class runs €55-68; a standalone gelato-focused class (outside this site's scope — see our sibling site Cooking in Rome for that format) typically runs a similar range. The combo, at €62-75, usually beats booking both separately once you account for a single venue, a single instructor block, and shared setup time — though you do trade some depth on each individual technique for the breadth of covering both.",
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: "The right pick for a longer, more varied afternoon than a single-technique class — the combo structure genuinely uses pizza's proving and bake time productively. Skip it if you want maximum depth on pizza dough specifically; a dedicated single-dish pizza class spends more total time on that one technique alone.",
    },
    faqs: [
      {
        question: 'Is the combo class too long for young kids?',
        answer:
          "At 3.5-4 hours it runs longer than the standalone family pizza class — check the kids-pizza-classes page for a shorter, more age-appropriate format if attention span is a concern.",
      },
      {
        question: 'Do I make the gelato from scratch or just eat a premade version?',
        answer:
          'On a genuine combo listing, you mix and churn the gelato base yourself — check the listing description for "hands-on gelato" specifically, since a small number of budget combo classes serve pre-made gelato instead.',
      },
      {
        question: 'What if I only want pizza, not gelato?',
        answer:
          'A standalone pizza class runs shorter and cheaper — see our Rome Pizza-Making Class page for a pizza-only format if the gelato segment doesn\'t interest you.',
      },
    ],
    relatedSupportHref: '/pizza-vs-pasta-class',
    relatedSupportLabel: 'Pizza vs Pasta Class',
  },
  {
    href: '/money/family-pizza-class',
    navTitle: 'Family Pizza Class',
    h1: 'Family Pizza Class in Rome: Built for Smaller Hands',
    keyword: 'family pizza class rome',
    metaTitle: 'Family Pizza Class Rome: Kid-Sized Dough, Honestly Reviewed',
    metaDescription:
      'A family pizza class in Rome built around age-appropriate technique — kid-sized dough portions, shorter sessions, and parent-and-child pairing.',
    heroImage: { src: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5', alt: "A child's small hands shaping a portion of pizza dough on a floured table" },
    intro: [
      "Kids-friendly pacing and portion-sized dough balls that make the stretch-and-toss step actually achievable for smaller hands.",
      "The core adjustment that separates a genuine family class from a standard class with kids tagging along: smaller dough portions that are actually manageable for a child's grip strength, and a shorter total session length that respects a shorter attention span.",
    ],
    atAGlance: [
      { label: 'Price band', value: '€55–165 (private option available)' },
      { label: 'Duration', value: '2 hours' },
      { label: 'Dough portion size', value: 'Kid-sized, roughly half a standard round' },
      { label: 'Format', value: 'Parent-and-child pairing' },
    ],
    sections: [
      {
        heading: 'Age-appropriate technique adjustments',
        body: [
          "A kid-sized dough ball (roughly half the standard adult portion) is genuinely easier to stretch without tearing, since a smaller round needs less hand-spread to reach full thinness. Instructors running family classes typically skip the toss-in-the-air step for younger kids in favor of a hand-press technique, which achieves a similar result with far less risk of a dropped or torn dough.",
        ],
      },
      {
        heading: 'Shorter total session length',
        body: [
          "A 2-hour family class runs meaningfully shorter than the 2.5-hour standard class or the 3.5-4 hour combo, which matters more for younger attention spans than the marketing photos suggest. This usually means fewer topping options and a simpler proving process (often a same-day short-rise dough rather than the longer prove used in the flagship class) — a reasonable trade for keeping kids engaged start to finish.",
        ],
      },
      {
        heading: 'Parent-and-child pairing format',
        body: [
          "Most family listings pair each child with a parent or guardian at a shared station rather than seating kids at their own separate tables — this keeps supervision close during the hot-oven stage specifically, which is the one part of the class where adult attention genuinely matters for safety.",
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: "Worth booking specifically for the kid-sized dough portions and shorter pacing — both are genuine, structural adjustments, not just a marketing label slapped on a standard class. A private family booking is worth the premium if your group has a wide age range or a child who needs closer one-on-one guidance than a shared class can offer.",
    },
    faqs: [
      {
        question: 'What is the minimum age for a family pizza class?',
        answer:
          "Most operators set a minimum around 4-5 years old, mainly because younger children struggle to safely handle dough near a hot oven area — check the specific listing's stated minimum before booking.",
      },
      {
        question: 'Is the oven area safe for kids to be near?',
        answer:
          "Reputable operators keep a supervised distance and handle the actual oven loading themselves rather than letting a child approach it directly — ask about this specifically if you have a particularly young or active child.",
      },
      {
        question: 'Can we book a private family class instead of a shared one?',
        answer:
          "Yes — a private family pizza class runs a flat rate (typically €165 for up to a small group) and lets the instructor pace entirely around your children's ages rather than an average across a shared class.",
      },
    ],
    relatedSupportHref: '/kids-pizza-classes',
    relatedSupportLabel: 'Kids Pizza Classes',
  },
  {
    href: '/money/private-pizza-class',
    navTitle: 'Private Pizza Class',
    h1: 'Private Pizza Class in Rome: Is the Price Premium Worth It?',
    keyword: 'private pizza class rome',
    metaTitle: 'Private Pizza Class Rome: Small-Group Pricing, Honestly',
    metaDescription:
      'A private pizza-making class in Rome — group-size cap, custom topping requests, and the honest price premium versus a shared class.',
    heroImage: { src: 'https://images.unsplash.com/photo-1548369937-47519962c11a', alt: 'Bright orange flames inside a wood-fired pizza oven' },
    intro: [
      "A private setting for groups who'd rather not share an oven queue with strangers.",
      "The core trade is straightforward: a private booking runs roughly double the per-person cost of a shared class, and in exchange you get a fully custom topping list, no waiting your turn for oven access behind other stations, and an instructor focused entirely on your group.",
    ],
    atAGlance: [
      { label: 'Price band', value: '€135–165 for up to 8' },
      { label: 'Group size cap', value: 'Up to 8 guests' },
      { label: 'Duration', value: '2–2.5 hours, extendable' },
      { label: 'Price vs shared', value: 'Roughly 2x per person' },
    ],
    sections: [
      {
        heading: 'Group size cap',
        body: [
          "Most private pizza class bookings cap at 8 guests — large enough for an extended family or a small group of friends, small enough that everyone gets genuine oven access without a long queue between stations, which is the single biggest pacing complaint about larger shared classes.",
        ],
      },
      {
        heading: 'Custom topping requests',
        body: [
          "Unlike a shared class's fixed topping list, a private booking can genuinely accommodate specific requests — a vegetarian or dairy-free version for part of the group, or simply more topping variety than a shared class's standard 3-4 options. Tell the operator your group's preferences when booking; most stock ingredients around that input rather than defaulting to a standard set.",
        ],
      },
      {
        heading: 'Price premium vs shared classes',
        body: [
          "A shared seat runs roughly €55-68 per person; a private class for up to 8 typically runs €135-165 total, which works out to €17-21 per person once a group fills the booking — actually cheaper per head than a shared class once a large group books together. The premium is steepest for a couple or solo traveler booking a private class alone, where there's no group to split the flat rate with.",
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: "Worth it for a family or group of 5+ with specific topping preferences or a wide age range — the per-person cost split across a fuller group is often close to, or cheaper than, a shared class, and the guaranteed oven access solves the exact pacing problem a busy shared class can't. Less compelling for a couple traveling alone, where a shared class delivers a similar experience for meaningfully less.",
    },
    faqs: [
      {
        question: 'Is a private class worth it for just two people?',
        answer:
          "Less so on price alone — the flat rate isn't split as many ways — but it's still worth considering if you want full topping customization or a wine-pairing add-on tailored just to your pair.",
      },
      {
        question: 'Can I request specific toppings not on the standard list?',
        answer:
          "Yes — tell the operator your priorities when booking, since most stock ingredients in advance based on that input rather than improvising on the day.",
      },
      {
        question: 'How many people fit in one private booking?',
        answer:
          'Most private bookings cap at 8 guests; larger groups may need to split into two private bookings, which most operators can arrange at a reduced per-group rate.',
      },
    ],
    relatedSupportHref: '/wine-pairing',
    relatedSupportLabel: 'Wine Pairing',
  },
];

export const SUPPORT_PAGE_CONTENT: SupportPageContent[] = [
  {
    href: '/support/what-you-make-and-eat',
    navTitle: 'What You Make and Eat',
    h1: 'What You Actually Make and Eat in a Rome Pizza Class',
    keyword: 'what do you make in a pizza class rome',
    metaTitle: 'What a Rome Pizza Class Includes: Dough, Toppings & the Meal',
    metaDescription:
      'The real inclusions across Rome pizza-making classes — dough, topping choices, the shared meal, and what usually costs extra.',
    heroImage: { src: 'https://images.unsplash.com/photo-1552539618-7eec9b4d1796', alt: 'A finished round pizza with pepperoni resting on a wooden board' },
    sections: [
      {
        heading: 'Standard inclusions across nearly every listing',
        body: [
          "Almost every Rome pizza class includes the dough ingredients (or a pre-mixed dough ball, depending on the operator's approach to timing), a topping station with 3-5 standard choices, use of a wood-fired or electric oven, the instructor's live guidance, and eating your own pizza fresh from the oven at the end. This baseline holds across GetYourGuide and Viator listings regardless of price tier.",
        ],
      },
      {
        heading: 'What varies: extra toppings, drinks, take-home dough',
        body: [
          "Beyond the baseline, inclusions get inconsistent: extra or premium toppings (buffalo mozzarella, specialty cured meats) beyond the standard list, a glass of wine or soft drink with the meal, a printed take-home dough recipe, and a small antipasto or salad side all vary by operator and price tier. Check the specific listing's inclusion list rather than assuming any of these are bundled in.",
        ],
      },
      {
        heading: 'Common add-ons that cost extra',
        body: [
          "The most common paid add-ons are a wine-pairing upgrade (see our wine-pairing page), an extended session with a second pizza per person, and private/small-group upgrades from a shared booking. None of these are hidden fees exactly, but they're rarely bundled into the base price shown in search results, so budget an extra €10-25 per person if any of them matter to you.",
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I get to choose my own toppings?',
        answer:
          'Yes on nearly every listing — a standard topping station with 3-5 choices is the norm, with premium extras sometimes available for a small additional cost.',
      },
      {
        question: 'Do I eat what I make, or does the operator keep it?',
        answer:
          'You eat what you make — every listing on this site ends with a shared meal of the pizzas the group just baked.',
      },
      {
        question: 'Is a drink included with the meal?',
        answer:
          'Often yes for the standard class (usually a soft drink or a single glass of wine), though a dedicated wine-pairing option goes further — check the wine-pairing page for specifics.',
      },
    ],
    relatedMoneyHref: '/rome-pizza-making-class',
    relatedMoneyLabel: 'See the Rome Pizza-Making Class',
  },
  {
    href: '/support/kids-pizza-classes',
    navTitle: 'Kids Pizza Classes',
    h1: 'Kids Pizza Classes in Rome: What to Check Before Booking',
    keyword: 'kids pizza class rome',
    metaTitle: 'Kids Pizza Classes in Rome: Age Limits & What to Expect',
    metaDescription:
      'What to check before booking a kids pizza class in Rome — age minimums, oven-area safety, and dough portion sizing for smaller hands.',
    heroImage: { src: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5', alt: "A child's small hands shaping a portion of pizza dough on a floured table" },
    sections: [
      {
        heading: 'Age minimums, honestly stated',
        body: [
          "Most operators set an informal minimum around 4-5 years old, driven mainly by the hot-oven stage rather than the dough work itself — a toddler can usually participate in pressing and shaping dough with help, but standing near an active wood-fired oven is where age genuinely matters for safety. Ask the specific operator rather than assuming a stated minimum is a hard cutoff; some flex it with a parent staying close throughout.",
        ],
      },
      {
        heading: 'Dough portion sizing for smaller hands',
        body: [
          "A genuine kids' class gives each child a smaller dough ball (roughly half a standard adult portion), since a full-sized round is harder for smaller hands to stretch evenly without tearing. This is the single clearest sign a class actually adjusted for kids rather than just allowing them to attend a standard-sized session.",
        ],
      },
      {
        heading: 'Oven-area safety practices',
        body: [
          "Reputable operators keep children a supervised distance from the oven door and handle the loading and retrieval themselves, rather than letting a child approach an open flame or hot deck directly. If a listing's photos show children unsupervised right at an open oven, treat that as a caution flag rather than an aspirational feature.",
        ],
      },
    ],
    faqs: [
      {
        question: 'Can a 3-year-old take part in a pizza class?',
        answer:
          'Some operators allow it with a parent staying directly involved throughout, but most set an informal minimum around 4-5 for the dough-handling and oven-proximity stages — ask the specific operator before booking.',
      },
      {
        question: 'Do kids get their own dough ball, or share with a parent?',
        answer:
          "On a genuine kids' or family class, each child gets their own smaller dough portion sized for their hands — check the listing description for this specifically if it matters to you.",
      },
      {
        question: 'Is there a separate class just for kids, without parents attending?',
        answer:
          "Rare — nearly every listing on this site is a parent-and-child pairing format rather than a drop-off class, mainly for supervision reasons around the oven stage.",
      },
    ],
    relatedMoneyHref: '/family-pizza-class',
    relatedMoneyLabel: 'See the Family Pizza Class',
  },
  {
    href: '/support/pizza-vs-pasta-class',
    navTitle: 'Pizza vs Pasta Class',
    h1: 'Pizza Class vs Pasta Class in Rome: Which Should You Book?',
    keyword: 'pizza vs pasta class rome',
    metaTitle: 'Pizza vs Pasta Class in Rome: The Honest Comparison',
    metaDescription:
      'Dough technique, timing, and what you actually learn — pizza-making class versus pasta-making class in Rome, compared honestly.',
    heroImage: { src: 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234', alt: 'A hand lifting a cheese-topped pizza slice from a whole pie' },
    sections: [
      {
        heading: 'Different dough, different technique entirely',
        body: [
          "Pizza dough is a yeasted, proved dough built around hydration and gluten development for stretch and chew; pasta dough (for fresh egg pasta specifically) is a denser, unleavened dough built around sheeting and cutting rather than proving and stretching. The two techniques share almost no hands-on overlap beyond both starting with flour — picking between them should come down to which end result you actually want to learn, not which sounds more \"authentic.\"",
        ],
      },
      {
        heading: 'Timing and pacing compared',
        body: [
          "A pizza class needs real dead time for proving (30-90 minutes, sometimes worked around with pre-proved dough) between mixing and shaping; a pasta class moves more continuously from mixing straight through kneading, resting, and shaping, with a shorter rest period. If you want a class with fewer built-in pauses, pasta tends to feel more continuously hands-on start to finish.",
        ],
      },
      {
        heading: 'Which to book if you can only pick one',
        body: [
          "Pick pizza if a wood-fired oven, the stretch-and-toss technique, and a shareable finished dish for a group matter most to you. Pick pasta if shaping technique (tagliatelle, ravioli, gnocchi) and a wider variety of dish types interest you more — see our sibling site Cooking in Rome for its dedicated pasta-making class page, since that technique falls outside this site's pizza-only scope.",
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I book a class that covers both pizza and pasta?',
        answer:
          "Not on this site by design — this property stays pizza-only; for a broader class covering multiple dishes including pasta, see our sibling site Cooking in Rome.",
      },
      {
        question: 'Which is more beginner-friendly, pizza or pasta?',
        answer:
          "Both are genuinely beginner-friendly with step-by-step instruction, though pizza's stretch-and-toss step usually takes a couple of tries to feel natural, while pasta's sheeting and shaping is more forgiving on a first attempt.",
      },
      {
        question: 'Is pizza dough harder to make than pasta dough?',
        answer:
          "Different, not necessarily harder — pizza dough demands patience with proving time and hydration ratios, while pasta dough demands more hands-on kneading and shaping precision in a shorter window.",
      },
    ],
    relatedMoneyHref: '/money/pizza-gelato-combo',
    relatedMoneyLabel: 'See the Pizza + Gelato Combo',
  },
  {
    href: '/support/wine-pairing',
    navTitle: 'Wine Pairing',
    h1: 'Wine Pairing with a Rome Pizza-Making Class',
    keyword: 'pizza class wine pairing rome',
    metaTitle: 'Rome Pizza Class Wine Pairing: What to Expect, Honestly',
    metaDescription:
      'Which Rome pizza classes offer a genuine wine-pairing option, how it changes the pacing, and what to check before adding it.',
    heroImage: { src: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d', alt: 'Two glasses of red wine beside a wood-fired pizza on a rustic table' },
    sections: [
      {
        heading: 'Which listings genuinely include wine pairing',
        body: [
          "A dedicated wine-pairing listing pours 2-3 wines matched to the pizza styles made in class (typically a lighter white with a Margherita-style pie and a fuller red with a meat-topped one), poured by the instructor at set points during the meal. A standard class's \"included glass of wine\" is a different, simpler thing — one pour, not a matched sequence — so check which format a specific listing actually offers before assuming a pairing is included.",
        ],
      },
      {
        heading: 'How pairing changes the class pacing',
        body: [
          "A wine-pairing session typically adds 30-45 minutes to the standard class length, since the shared meal at the end runs more like a proper sit-down course than a quick bite between activities. This is explicitly an adults-only add-on — nearly every operator restricts it to 18+ sessions, so it isn't available on the family or kids class formats.",
        ],
      },
      {
        heading: 'What to check before adding it',
        body: [
          "Confirm whether the pairing is a fixed flight (2-3 pre-selected wines) or a choose-your-own option, whether the price is bundled into the class ticket or charged as a separate add-on at checkout, and whether the wines are local Lazio producers or a more generic house selection — the better listings name the actual producer rather than just \"local red\" or \"local white.\"",
        ],
      },
    ],
    faqs: [
      {
        question: 'Is wine pairing available on the family pizza class?',
        answer:
          "No — wine pairing is an adults-only add-on restricted to 18+ sessions; it isn't offered alongside the family or kids-focused class formats.",
      },
      {
        question: 'Is the wine pairing included in the base price or an extra cost?',
        answer:
          'It varies by operator — some bundle a single pairing flight into the ticket price, others charge it as a separate add-on at checkout; check the specific listing before assuming either.',
      },
      {
        question: 'How many wines are typically included in a pairing?',
        answer:
          "Most pairing sessions pour 2-3 wines matched to the pizza styles made in class — a lighter white alongside a Margherita-style pie, a fuller red alongside a meat-topped one.",
      },
    ],
    relatedMoneyHref: '/private-pizza-class',
    relatedMoneyLabel: 'See the Private Pizza Class',
  },
];

export function getMoneyPageContent(href: string): MoneyPageContent | undefined {
  return MONEY_PAGE_CONTENT.find((p) => p.href === href);
}

export function getSupportPageContent(href: string): SupportPageContent | undefined {
  return SUPPORT_PAGE_CONTENT.find((p) => p.href === href);
}
