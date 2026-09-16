/**
 * Real content for every Cooking in Rome page beyond the homepage — the 5
 * money pages and 5 support pages defined in the property's blueprint
 * (Master Network Blueprint §3.8.3 page tree). Each entry supplies exactly
 * what MoneyPageTemplate.tsx / SupportPageTemplate.tsx need to render a
 * complete, unique page: its own H1, meta title/description, hero image,
 * body sections, and FAQ block. Mirrors lib/golf-cart-rome-content.ts's
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
    href: '/money/best-rome-cooking-classes',
    navTitle: 'Best Rome Cooking Classes',
    h1: 'The Best Rome Cooking Classes, Compared by Type',
    keyword: 'rome cooking class',
    metaTitle: 'Best Rome Cooking Classes: Pasta, Pizza & Market-to-Table',
    metaDescription:
      'Every type of Rome cooking class compared honestly — pasta, pizza + gelato, market-to-table, and private options, sorted by what you actually want to learn.',
    heroImage: { src: 'https://images.unsplash.com/photo-1683624328172-88fb24625ec1', alt: 'A small group gathered around a kitchen counter together preparing food' },
    intro: [
      'The broad hub roundup — every class type in one place, sorted by what you actually want to learn, not just price.',
      "Rome cooking classes split into four real categories once you look past the marketing photos: hands-on pasta technique, a pizza-and-gelato combo, a market-to-table format that starts with grocery shopping, and private bookings for groups who'd rather not share a kitchen island with strangers. Which one is right for you depends more on what you want to walk away knowing than on price alone.",
    ],
    atAGlance: [
      { label: 'Price band', value: '€65–180' },
      { label: 'Class types', value: '4 (pasta, pizza+gelato, market, private)' },
      { label: 'Typical duration', value: '3–5 hours' },
      { label: 'Group size', value: '2–14, or private on request' },
    ],
    sections: [
      {
        heading: 'Pasta vs pizza vs market-to-table, at a glance',
        body: [
          "A pasta-making class is the most widely available format and the best entry point if you've never made fresh dough by hand before — most run 3 hours and teach 2-3 shapes from scratch. A pizza + gelato combo runs longer (4.5 hours) and pairs two distinct techniques in one afternoon, which suits visitors who want variety over depth in any single skill. A market-to-table class adds a real grocery-shopping stop before cooking, which is the most first-hand version of \"cooking like a local\" on this list, but it also means a more variable menu depending on what's actually in season that day.",
        ],
      },
      {
        heading: 'Group size ranges across operators',
        body: [
          "Shared classes typically run 6-14 participants split across a few cooking stations, with GetYourGuide and Viator listings both common in this range. Civitatis tends to run smaller shared groups (often 6-10), and every operator offers a private or small-group upgrade — usually capped at 8 guests — for anyone who'd rather have the instructor's full attention.",
        ],
      },
      {
        heading: 'Beginner-friendliness, ranked honestly',
        body: [
          "Pasta-making classes are the most beginner-friendly format on this list — the technique (mixing, kneading, sheeting, shaping) is taught step by step and forgiving of a first attempt. Pizza + gelato combo classes ask a bit more of a first-timer, since dough stretching by hand takes a few tries to get comfortable with. Market-to-table classes are beginner-friendly in the kitchen itself but require more flexibility, since the exact menu depends on the day's market finds rather than a fixed recipe card.",
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: "Start here if you're not sure which class type you want — a pasta-making class is the safest first booking for most visitors, a pizza + gelato combo is the best pick for a longer, more varied afternoon, and a market-to-table class is worth the schedule flexibility if 'cooking like a local' matters more to you than a guaranteed menu.",
    },
    faqs: [
      {
        question: 'Which cooking class type is best for a first-time visitor?',
        answer:
          'A pasta-making class — it teaches a forgiving, step-by-step technique in a fixed 3-hour window, with no market-timing variability to plan around.',
      },
      {
        question: 'Can I combine a market visit with a pasta class?',
        answer:
          'Some operators fold a short market stop into a pasta class, but the dedicated market-to-table format goes further, building the full grocery-shopping stop into the class structure itself.',
      },
      {
        question: 'Do I need to book weeks in advance?',
        answer:
          "Peak season (May–September) shared classes often sell out 1-2 weeks ahead; private bookings have more flexibility but still benefit from booking at least a few days out.",
      },
    ],
    relatedSupportHref: '/support/what-a-class-includes',
    relatedSupportLabel: 'What a Class Includes',
  },
  {
    href: '/money/pasta-making-class',
    navTitle: 'Pasta-Making Class',
    h1: 'Pasta-Making Class in Rome: Technique, Shapes & What You Take Home',
    keyword: 'pasta making class rome',
    metaTitle: 'Pasta Making Class Rome: Hands-On Technique, Compared',
    metaDescription:
      'What a real hands-on pasta-making class in Rome actually teaches — shapes, technique, and which classes are worth the price.',
    heroImage: { src: 'https://images.unsplash.com/photo-1447279506476-3faec8071eee', alt: 'A person sheeting fresh pasta dough by hand on a floured surface' },
    intro: [
      "Hands-on pasta from scratch — the difference between a class that teaches you to actually shape tagliatelle and one that just watches a chef do it.",
      "The single biggest quality gap between listings isn't price, it's whether every participant works their own piece of dough start to finish or whether the class is mostly a demonstration with a shared bowl passed around. Check a listing's description for phrases like \"hands-on\" or \"each guest makes their own\" before booking, not just the photos.",
    ],
    atAGlance: [
      { label: 'Price band', value: '€60–75' },
      { label: 'Duration', value: '3 hours' },
      { label: 'Shapes typically covered', value: '2–3 (tagliatelle, ravioli, gnocchi)' },
      { label: 'Take-home recipe card', value: 'Included on most listings' },
    ],
    sections: [
      {
        heading: 'Dough-to-plate technique breakdown',
        body: [
          "A well-run class walks through the full arc: mixing flour and egg into a dough, kneading it to the right elasticity, resting it, then rolling and shaping it by hand or through a hand-crank pasta machine. The best classes let this take real time rather than rushing to the eating part — expect at least 90 minutes of actual dough work before anything hits a pot of boiling water.",
          "Sauce technique gets less attention than the pasta itself on most listings, but a genuinely good class still teaches at least one classic Roman sauce (cacio e pepe or a simple tomato) from scratch rather than serving a jarred version alongside your hand-made pasta.",
        ],
      },
      {
        heading: 'Shapes typically covered',
        body: [
          "Most 3-hour classes teach 2-3 shapes: tagliatelle or fettuccine (the most forgiving cut shape), a filled pasta like ravioli or tortellini (which takes more time per piece but teaches sealing technique), and often gnocchi, which uses potato rather than an egg-flour dough and gives a useful contrast in texture and method.",
        ],
      },
      {
        heading: 'Take-home recipe card inclusion',
        body: [
          "Most listings include a printed or digital recipe card with the exact ratios and technique steps used in class — genuinely useful for repeating the shapes at home, since pasta dough ratios vary more than most home cooks expect. A minority of budget listings skip this; check the inclusions list before booking if a take-home reference matters to you.",
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: 'Worth booking for the "hands-on, not demonstration" version specifically — confirm each guest works their own dough before paying a premium price, and prioritize a listing that includes a take-home recipe card if you actually plan to repeat the shapes at home.',
    },
    faqs: [
      {
        question: 'Do I need any prior cooking experience?',
        answer:
          'No — pasta-making classes are built for complete beginners, and the shaping technique is taught step by step with hands-on correction from the instructor.',
      },
      {
        question: 'Will I actually make my own pasta, or just watch?',
        answer:
          "On a genuinely hands-on listing, yes — every participant works their own piece of dough through mixing, kneading, and shaping; check the listing description for that phrasing specifically, since a minority of cheaper listings are demonstration-heavy.",
      },
      {
        question: 'Can I request a gluten-free version?',
        answer:
          "Some operators offer a gluten-free dough substitute with advance notice, but traditional pasta-making technique relies on gluten development, so the class experience differs meaningfully — ask before booking if this matters to you.",
      },
    ],
    relatedSupportHref: '/support/vegetarian-options',
    relatedSupportLabel: 'Vegetarian Options',
  },
  {
    href: '/money/pizza-gelato-class',
    navTitle: 'Pizza + Gelato Class',
    h1: 'Pizza + Gelato Class in Rome: Two Techniques, One Afternoon',
    keyword: 'pizza gelato class rome',
    metaTitle: 'Pizza + Gelato Class Rome: Combo Timing & Honest Pricing',
    metaDescription:
      'How a pizza and gelato combo class in Rome actually splits its time — dough technique, gelato-making, and which comes first and why it matters.',
    heroImage: { src: 'https://images.unsplash.com/photo-1716237388087-4e47595a6615', alt: 'A person kneading pizza dough by hand on a wooden table' },
    intro: [
      "A combo class that pairs the hands-on pizza-dough technique with a gelato-making session — a full afternoon, not a rushed hour.",
      "The two techniques genuinely complement each other in a single booking: pizza dough needs rest time between stretching and baking, and most operators use that dead time productively by starting the gelato base during the pizza's proving stage rather than making guests wait around.",
    ],
    atAGlance: [
      { label: 'Price band', value: '€75–90' },
      { label: 'Duration', value: '4.5–5 hours' },
      { label: 'Techniques covered', value: '2 (pizza dough, gelato base)' },
      { label: 'Timing order', value: 'Pizza dough first, gelato during rest/bake' },
    ],
    sections: [
      {
        heading: 'Two-technique combo structure',
        body: [
          "A typical session opens with pizza dough — mixing, kneading, and hand-stretching a round, which takes real practice to avoid tearing the base. While the shaped dough rests or bakes in the class's wood-fired or deck oven, attention shifts to churning a gelato base, usually a simple flavor like fior di latte or a fruit variant that doesn't need advance freezing time most classes can't provide.",
        ],
      },
      {
        heading: 'Timing across both segments',
        body: [
          "Expect roughly 2 hours on pizza (dough prep, resting, topping, baking) and 1.5-2 hours on gelato (base mixing, churning, and a tasting break while other pizzas finish baking), plus a shared meal at the end where everyone eats their own pizza and gelato together. The total 4.5-5 hour window is genuinely longer than a standalone pasta class — plan your day around it rather than squeezing it between two other activities.",
        ],
      },
      {
        heading: 'Which comes first and why it matters',
        body: [
          "Pizza dough almost always goes first because it needs the longest total process time (mixing through baking); gelato is deliberately slotted into the dead time a pizza's rest and bake cycle creates, rather than run as a separate standalone block. A listing that runs gelato first is unusual and worth a second look at the itinerary before booking, since it usually means a shorter, less hands-on version of one of the two techniques.",
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: "The right pick for a longer, more varied afternoon than a single-technique class — the combo structure genuinely uses pizza's dead time productively rather than padding the itinerary. Skip it if you only want deep pizza-dough practice, since a dedicated single-dish pizza class (see our sibling site Rome Pizza Class) spends more total time on the one technique.",
    },
    faqs: [
      {
        question: 'Is 4.5-5 hours too long for a combo class?',
        answer:
          "Most guests find the pacing comfortable since it includes a full meal at the end — but it is a genuine afternoon commitment, not a quick hour-long activity, so plan the rest of your day around it.",
      },
      {
        question: 'Do I make the gelato from scratch or just eat a premade version?',
        answer:
          'On a genuine combo listing, you mix and churn the gelato base yourself — check the listing description for "hands-on gelato" specifically if this matters, since a small number of budget combo classes serve pre-made gelato instead.',
      },
      {
        question: "What if I only want to learn pizza, not gelato?",
        answer:
          "A standalone pizza class runs shorter and cheaper — see our sibling site Rome Pizza Class for a pizza-only format if the gelato segment doesn't interest you.",
      },
    ],
    relatedSupportHref: '/support/what-a-class-includes',
    relatedSupportLabel: 'What a Class Includes',
  },
  {
    href: '/money/market-to-table-class',
    navTitle: 'Market-to-Table Class',
    h1: 'Market-to-Table Cooking Class in Rome: Shop, Then Cook',
    keyword: 'market to table cooking rome',
    metaTitle: 'Market-to-Table Cooking Class Rome: Honest Guide',
    metaDescription:
      'What a market-to-table cooking class in Rome actually involves — market-stop duration, ingredient-selection guidance, and how the menu changes by season.',
    heroImage: { src: 'https://images.unsplash.com/photo-1690224722952-e10e578e5c3b', alt: 'A market table topped with woven baskets full of fresh vegetables' },
    intro: [
      "Starts at a real produce market picking ingredients, then cooks what you bought — the most first-hand version of \"cooking like a local\" this hub offers.",
      "The trade-off is honest: you get an experience closer to how a Roman home cook actually shops and cooks, but the exact menu depends on what's genuinely fresh and in season that morning rather than a fixed, guaranteed recipe card.",
    ],
    atAGlance: [
      { label: 'Price band', value: '€75–80' },
      { label: 'Duration', value: '4 hours' },
      { label: 'Market-stop length', value: '45–60 minutes' },
      { label: 'Menu', value: 'Varies by season and market finds' },
    ],
    sections: [
      {
        heading: 'Market-stop duration and location',
        body: [
          "The market segment typically runs 45-60 minutes at a real neighborhood market — Campo de' Fiori and the Testaccio market are the two most commonly used by operators running this format, since both run reliable morning hours and a wide enough produce selection for a class-sized group to shop through without overwhelming a single stall.",
        ],
      },
      {
        heading: 'Ingredient-selection guidance',
        body: [
          "The instructor typically guides selection rather than leaving guests to guess — pointing out ripeness cues, what's genuinely in season versus imported filler, and which vendor stalls are worth the short wait. This is where the class earns its \"cooking like a local\" framing: you're learning to shop, not just being handed pre-selected ingredients.",
        ],
      },
      {
        heading: 'Resulting menu variability by season',
        body: [
          "Because the exact vegetables, herbs, and sometimes the protein depend on what the market actually has that day, the final menu shifts by season — expect more tomato- and zucchini-forward dishes in summer, and heartier greens and root vegetables in winter. If you have a strong preference for a specific dish, a fixed-menu pasta or pizza class is the more predictable booking; a market-to-table class trades that predictability for authenticity.",
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: "Worth the schedule flexibility and menu unpredictability if \"cooking like a local\" is genuinely what you're after — it's the most first-hand format on this hub. Skip it if you want a guaranteed specific dish or a tighter, more predictable time window, since the market stop adds real variability to both.",
    },
    faqs: [
      {
        question: 'What happens if it rains during the market visit?',
        answer:
          "Most Roman produce markets are at least partially covered, and operators run the market segment in light rain — a class is rarely cancelled for weather alone, though check the specific listing's policy.",
      },
      {
        question: 'Do I get to choose what we cook, or is it decided for me?',
        answer:
          "Usually a mix — the instructor guides toward what's genuinely fresh that day, but most classes build in some guest input on final dish choices within what the market offers.",
      },
      {
        question: 'Is the market stop suitable for someone with mobility limitations?',
        answer:
          'Markets involve walking on uneven cobblestones and standing between stalls — flag any mobility concerns with the operator before booking, since the market segment is less accommodating than a fixed studio kitchen.',
      },
    ],
    relatedSupportHref: '/support/classes-with-a-market-visit',
    relatedSupportLabel: 'Classes with a Market Visit',
  },
  {
    href: '/money/private-small-group-class',
    navTitle: 'Private / Small-Group Class',
    h1: 'Private Cooking Class in Rome: Is the Price Premium Worth It?',
    keyword: 'private cooking class rome',
    metaTitle: 'Private Cooking Class Rome: Small-Group Pricing, Honestly',
    metaDescription:
      'A private or small-group cooking class in Rome — group size cap, customizable menu requests, and the honest price premium versus a shared class.',
    heroImage: { src: 'https://images.unsplash.com/photo-1683106063169-741e57034d19', alt: 'A man and a woman preparing food together at a kitchen counter' },
    intro: [
      "An intimate setting for couples, families, or small groups who'd rather not share a kitchen island with strangers.",
      "The core trade is simple: a private booking runs roughly double the per-person cost of a shared class, and in exchange you get a fully customizable menu, no pacing compromises with strangers, and an instructor focused entirely on your group.",
    ],
    atAGlance: [
      { label: 'Price band', value: '€145–180 for up to 8' },
      { label: 'Group size cap', value: 'Up to 8 guests' },
      { label: 'Duration', value: '3.5–4 hours, extendable' },
      { label: 'Price vs shared', value: 'Roughly 2x per person' },
    ],
    sections: [
      {
        heading: 'Group size cap',
        body: [
          "Most private cooking class bookings cap at 8 guests — large enough for an extended family or a small group of friends, small enough that the instructor can still give hands-on correction to every station rather than circulating thinly across 14 people the way a shared class does.",
        ],
      },
      {
        heading: 'Customizable menu requests',
        body: [
          "Unlike a shared class's fixed itinerary, a private booking can genuinely swap dishes — more time on a specific pasta shape, skipping a technique the group already knows, or building the whole class around a dietary restriction shared by everyone in the party. Tell the operator your group's preferences when booking; most build the day's menu around that input rather than defaulting to a standard curriculum.",
        ],
      },
      {
        heading: 'Price premium vs shared classes',
        body: [
          "A shared seat runs roughly €65-80 per person; a private class for up to 8 typically runs €145-180 total, which works out to €18-23 per person once a group fills the booking — actually cheaper per head than a shared class once a large group books together. The premium is steepest for a couple or solo traveler booking a private class alone, where there's no group to split the flat rate with.",
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: "Worth it for a family or group of 5+ with specific dietary needs or menu preferences — the per-person cost split across a fuller group is often close to, or cheaper than, a shared class, and the customization solves the exact problem a fixed-curriculum shared class can't. Less compelling for a couple traveling alone, where a shared class delivers a similar experience for meaningfully less.",
    },
    faqs: [
      {
        question: 'Is a private class worth it for just two people?',
        answer:
          "Less so on price alone — the flat rate isn't split as many ways — but it's still worth considering if you want full menu customization or have a dietary need a shared class wouldn't easily accommodate.",
      },
      {
        question: 'Can I request a specific dish not on the standard curriculum?',
        answer:
          "Yes — tell the operator your priorities when booking, since most build the day's custom menu in advance based on that input.",
      },
      {
        question: 'How many people fit in one private booking?',
        answer:
          'Most private bookings cap at 8 guests; larger groups may need to split into two private bookings, which most operators can arrange at a reduced per-group rate.',
      },
    ],
    relatedSupportHref: '/support/gift-a-cooking-class',
    relatedSupportLabel: 'Gift a Cooking Class',
  },
];

export const SUPPORT_PAGE_CONTENT: SupportPageContent[] = [
  {
    href: '/support/what-a-class-includes',
    navTitle: 'What a Class Includes',
    h1: 'What a Rome Cooking Class Actually Includes',
    keyword: 'what does a rome cooking class include',
    metaTitle: 'What a Rome Cooking Class Includes, Honestly Broken Down',
    metaDescription:
      'The real inclusions and common add-ons across Rome cooking classes — ingredients, the shared meal, recipe cards, and what usually costs extra.',
    heroImage: { src: 'https://images.unsplash.com/photo-1549590143-d5855148a9d5', alt: 'Flour poured on a table beside eggs and a whisk, ready for pasta dough' },
    sections: [
      {
        heading: 'Standard inclusions across nearly every listing',
        body: [
          "Almost every Rome cooking class includes the ingredients for the dishes taught, use of a full kitchen station (or shared station for larger groups), the instructor's live guidance throughout, and the meal you cook together at the end — usually paired with a glass of wine or a soft drink. This baseline holds across GetYourGuide, Viator, and Civitatis listings regardless of price tier.",
        ],
      },
      {
        heading: 'What varies: recipe cards, wine, hotel pickup',
        body: [
          "Beyond the baseline, inclusions get inconsistent: a printed or digital take-home recipe card, an apron to keep, an extra wine pairing beyond the first glass, and hotel pickup outside the historic center all vary by operator and price tier. Check the specific listing's inclusion list rather than assuming any of these are bundled in — a cheaper listing that looks identical in photos may skip the recipe card or apron entirely.",
        ],
      },
      {
        heading: 'Common add-ons that cost extra',
        body: [
          "The most common paid add-ons are an extended wine tasting (beyond the one glass most classes include), a market-visit upgrade added to a standard studio class, and private/small-group upgrades from a shared booking. None of these are hidden fees exactly, but they're rarely bundled into the base price shown in search results, so budget an extra €10-30 per person if any of them matter to you.",
        ],
      },
    ],
    faqs: [
      {
        question: 'Does the price include the ingredients?',
        answer:
          'Yes — ingredient cost is included in the base price across essentially every listing on this hub; it would be unusual to find one that charges separately for what you cook.',
      },
      {
        question: 'Do I get to eat what I make?',
        answer:
          "Yes — every class format ends with a shared meal of what the group cooked, typically with a glass of wine or soft drink included.",
      },
      {
        question: 'Is an apron provided, and do I keep it?',
        answer:
          'Most operators provide an apron for use during class; whether you keep it afterward varies, so check the specific listing if a keepsake apron matters to you.',
      },
    ],
    relatedMoneyHref: '/money/best-rome-cooking-classes',
    relatedMoneyLabel: 'See the Best Rome Cooking Classes',
  },
  {
    href: '/support/classes-with-a-market-visit',
    navTitle: 'Classes with a Market Visit',
    h1: 'Rome Cooking Classes That Include a Market Visit',
    keyword: 'cooking class with market visit rome',
    metaTitle: 'Rome Cooking Classes with a Market Visit, Compared',
    metaDescription:
      'Which Rome cooking classes genuinely build in a market visit, which markets they use, and how a market stop changes the class experience.',
    heroImage: { src: 'https://images.unsplash.com/photo-1616362406547-1c556ceb4d80', alt: 'A shopper standing in front of a market stall stocked with green vegetables' },
    sections: [
      {
        heading: 'Which classes genuinely include a market stop',
        body: [
          "Only the dedicated market-to-table format builds a market visit into its core structure by default — standard pasta, pizza, and combo classes are studio-based with ingredients already sourced before you arrive, unless the specific listing explicitly advertises an add-on market visit. Don't assume a market stop is included just because a listing's photos show a market; check the itinerary section of the listing itself.",
        ],
      },
      {
        heading: 'Which markets operators typically use',
        body: [
          "Campo de' Fiori and the Testaccio market are the two most commonly used by operators running a market-to-table format, both chosen for reliable morning hours and a produce selection wide enough for a class-sized group. A handful of listings use smaller neighborhood markets in Trastevere or Prati instead — check the listing's meeting-point details if a specific market matters to you.",
        ],
      },
      {
        heading: 'How a market stop changes the class',
        body: [
          "A market stop adds roughly 45-60 minutes to total class length, introduces menu variability tied to what's actually fresh that day, and shifts part of the experience from pure kitchen technique to ingredient selection and local shopping culture. It's a genuinely different experience from a fixed-menu studio class, not just an add-on scene for photos.",
        ],
      },
    ],
    faqs: [
      {
        question: "How do I know if a listing's market visit is real or just marketing?",
        answer:
          "Check the itinerary section for a specific stated duration and named market — a vague \"market-fresh ingredients\" claim without a stated visit duration usually means ingredients were pre-sourced, not shopped during class.",
      },
      {
        question: 'Can I add a market visit to a standard pasta class?',
        answer:
          'Some operators offer this as a paid add-on — ask directly when booking, since it isn’t always listed as a standard option even when technically available.',
      },
      {
        question: 'Does the market visit happen before or after cooking?',
        answer:
          'Always before — the entire structure depends on shopping first, then cooking with what was bought, so a market-to-table class is scheduled with the market stop as its opening segment.',
      },
    ],
    relatedMoneyHref: '/money/market-to-table-class',
    relatedMoneyLabel: 'See Market-to-Table Classes',
  },
  {
    href: '/support/vegetarian-options',
    navTitle: 'Vegetarian Options',
    h1: 'Vegetarian-Friendly Cooking Classes in Rome',
    keyword: 'vegetarian cooking class rome',
    metaTitle: 'Vegetarian Cooking Classes in Rome: What to Check First',
    metaDescription:
      'Which Rome cooking classes genuinely accommodate vegetarians, and what to check before booking a class built around traditional Roman recipes.',
    heroImage: { src: 'https://images.unsplash.com/photo-1678705649594-35939644af9c', alt: 'A plate of pasta with vegetables' },
    sections: [
      {
        heading: 'The honest starting point: traditional recipes include meat by default',
        body: [
          "Several of Rome's signature dishes — carbonara and amatriciana especially — traditionally include guanciale (cured pork cheek) by default, not as an optional add-in. A class advertised as teaching \"Roman classics\" without a vegetarian note is very likely building its curriculum around these meat-based dishes as the default, so check before assuming a vegetarian substitute is automatic.",
        ],
      },
      {
        heading: 'What most operators can substitute with notice',
        body: [
          "Cacio e pepe and gricia's vegetable-based counterparts are naturally vegetarian, and most operators can substitute a vegetable-based sauce (a simple tomato, or a seasonal vegetable ragù) for guanciale-based dishes when told in advance — usually at least 24-48 hours ahead, sometimes more for larger shared classes where a special substitution affects meal planning for the whole group.",
        ],
      },
      {
        heading: 'Dedicated vegetarian listings vs standard classes with substitution',
        body: [
          "A small number of listings are built as vegetarian from the start — these are the safest booking if a plant-based menu matters more than flexibility on which dishes get taught, since the curriculum is designed around vegetables rather than retrofitted at the last minute. A standard class with an advance-notice substitution works well too, but expect a slightly improvised version of the standard curriculum rather than a dish purpose-built for the request.",
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I need to mention I\'m vegetarian before booking, or can I say so on arrival?',
        answer:
          "Tell the operator when booking, ideally 24-48 hours ahead — arriving and mentioning it on the day risks the kitchen not having a substitute ingredient on hand, especially for larger shared classes.",
      },
      {
        question: 'Are vegan requests accommodated too, not just vegetarian?',
        answer:
          "Some operators can accommodate vegan requests (no dairy, no eggs) but it's less universal than vegetarian substitution — ask specifically, since egg-based pasta dough is central to most classes and a vegan version needs a genuinely different recipe.",
      },
      {
        question: 'Will a vegetarian substitution cost extra?',
        answer:
          'Rarely — most operators swap the protein or sauce at no extra charge with advance notice, though a specialty ingredient substitution occasionally carries a small supplement.',
      },
    ],
    relatedMoneyHref: '/money/pasta-making-class',
    relatedMoneyLabel: 'See Pasta-Making Classes',
  },
  {
    href: '/support/gift-a-cooking-class',
    navTitle: 'Gift a Cooking Class',
    h1: 'How to Gift a Rome Cooking Class',
    keyword: 'gift a cooking class rome',
    metaTitle: 'How to Gift a Rome Cooking Class: Vouchers & Flexible Dates',
    metaDescription:
      'The cleanest way to book a Rome cooking class as a gift — voucher options, flexible-date bookings, and what to check before you buy.',
    heroImage: { src: 'https://images.unsplash.com/photo-1620475676913-9497df261cc3', alt: 'A plate of pasta beside a glass and bottle of wine, set for a celebratory meal' },
    sections: [
      {
        heading: 'Gift voucher support across the three main partners',
        body: [
          "GetYourGuide, Viator, and Civitatis all support some form of gift booking, though the mechanism differs: some issue a redeemable voucher with an open validity window, while others let you book a specific date and simply gift the confirmed booking itself. Check the specific listing's gift or voucher option before assuming every listing works the same way.",
        ],
      },
      {
        heading: 'Flexible-date bookings, when a fixed date isn\'t possible',
        body: [
          "If the recipient's travel dates aren't confirmed yet, a flexible-date voucher (where the recipient picks their own date after receiving the gift) is the safer purchase than booking a fixed date and hoping it works — most operators offer at least a 12-month validity window on gift vouchers for exactly this reason.",
        ],
      },
      {
        heading: 'What to check before buying a gift booking',
        body: [
          "Confirm the voucher's validity window, whether it covers the full class price or requires a top-up if prices rise before redemption, and whether the recipient needs to contact the operator directly to book their date or can do it themselves online. A voucher that requires manual coordination with the operator is more prone to friction than one with simple self-service booking.",
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I gift a specific class, or just a general voucher amount?',
        answer:
          "Both options usually exist — a specific-class voucher locks in the exact experience, while a general amount gives the recipient flexibility to choose which class fits their trip.",
      },
      {
        question: 'What if the class price increases before the recipient redeems the voucher?',
        answer:
          "Policy varies by operator — some honor the original price, others require a top-up for the difference; check this specifically before buying if the recipient's travel date is far off.",
      },
      {
        question: 'Is a gifted cooking class a good idea for someone with dietary restrictions?',
        answer:
          "Yes, as long as you flag it during purchase or tell the recipient to mention it when booking their date — most operators handle dietary substitutions the same way for gifted and self-booked classes.",
      },
    ],
    relatedMoneyHref: '/money/private-small-group-class',
    relatedMoneyLabel: 'See Private / Small-Group Classes',
  },
  {
    href: '/support/classes-near-you-by-area',
    navTitle: 'Classes Near You by Area',
    h1: 'Rome Cooking Classes by Neighborhood',
    keyword: 'rome cooking classes by neighborhood',
    metaTitle: 'Rome Cooking Classes by Neighborhood: Where to Book',
    metaDescription:
      'Where Rome cooking classes actually run by neighborhood — Trastevere, Testaccio, and the historic center — and how location should factor into your booking.',
    heroImage: { src: 'https://images.unsplash.com/photo-1616363306182-778dcf76a476', alt: 'A shopper standing near a market table on a Rome side street' },
    sections: [
      {
        heading: 'Trastevere: the most common cooking-class neighborhood',
        body: [
          "Trastevere hosts the largest concentration of cooking class studios and market-to-table operators, thanks to its walkable, tourist-friendly layout and proximity to several smaller neighborhood markets. If you're staying in or near the historic center, a Trastevere-based class usually means the shortest travel time.",
        ],
      },
      {
        heading: "Testaccio: the market-to-table hub",
        body: [
          "Testaccio's produce market is one of the two most commonly used by market-to-table operators (alongside Campo de' Fiori), and a handful of cooking schools are based directly in or near the neighborhood specifically to shorten the walk from market stall to kitchen.",
        ],
      },
      {
        heading: 'Choosing a neighborhood based on your hotel',
        body: [
          "If your hotel sits outside the historic center, factor in a 20-30 minute transit time to reach most class locations — a small number of operators offer hotel pickup for an extra fee, but most expect guests to make their own way to the studio. Booking a class in the same neighborhood as your accommodation, when possible, meaningfully cuts the day's total logistics.",
        ],
      },
    ],
    faqs: [
      {
        question: 'Which neighborhood has the most cooking class options?',
        answer:
          'Trastevere, by a clear margin — it has the highest concentration of both studio-based classes and market-to-table operators.',
      },
      {
        question: 'Do I need to travel far if my hotel is outside the historic center?',
        answer:
          "Budget 20-30 minutes of transit time if you're staying outside the historic center — most class locations sit within Trastevere, Testaccio, or the immediate historic core.",
      },
      {
        question: 'Is hotel pickup common for cooking classes?',
        answer:
          "It's the exception rather than the rule — a minority of operators offer it, usually for an extra fee, so plan to make your own way to most studio locations.",
      },
    ],
    relatedMoneyHref: '/money/best-rome-cooking-classes',
    relatedMoneyLabel: 'See the Best Rome Cooking Classes',
  },
];

export function getMoneyPageContent(href: string): MoneyPageContent | undefined {
  return MONEY_PAGE_CONTENT.find((p) => p.href === href);
}

export function getSupportPageContent(href: string): SupportPageContent | undefined {
  return SUPPORT_PAGE_CONTENT.find((p) => p.href === href);
}
