/**
 * Real content for every Tiramisù Class page beyond the homepage — the 4
 * money pages and 4 support pages defined in the property's blueprint
 * (Master Network Blueprint §3.10.3 page tree). Each entry supplies exactly
 * what MoneyPageTemplate.tsx / SupportPageTemplate.tsx need to render a
 * complete, unique page: its own H1, meta title/description, hero image,
 * body sections, and FAQ block. Mirrors lib/rome-pizza-class-content.ts's
 * structure exactly.
 *
 * Every keyword, section heading, and FAQ answer below was checked against
 * lib/cooking-in-rome-content.ts's AND lib/rome-pizza-class-content.ts's
 * MONEY_PAGE_CONTENT/SUPPORT_PAGE_CONTENT keyword lists before writing, per
 * the blueprint's overlap-critical note for this property (§3.10.1): this
 * site stays strictly tiramisù/dessert-focused and never reuses or
 * rephrases a keyword either sibling already owns.
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
    href: '/rome-tiramisu-class',
    navTitle: 'Rome Tiramisù Class',
    h1: 'Tiramisù Class Rome: Mascarpone Technique & Layering',
    keyword: 'tiramisu class rome',
    metaTitle: 'Tiramisu Class Rome: Mascarpone Technique & Layering',
    metaDescription:
      'What a proper hands-on tiramisù class in Rome teaches — mascarpone technique, coffee-soak timing, and layering method.',
    heroImage: { src: 'https://images.unsplash.com/photo-1639744211487-b27e3551b07c', alt: 'A hand holding a wedge-shaped slice of layered tiramisù with visible cream and cocoa-crumb layers, topped with cocoa dusting and whipped cream' },
    intro: [
      'The flagship dessert class — mascarpone technique, coffee-soak timing, and the layering method that separates a good tiramisù from a great one.',
      "Most listings that call themselves a \"tiramisù class\" spend more time on plating for photos than on the two techniques that actually determine whether the dessert holds together: whipping mascarpone to the right stiffness without curdling it, and timing the espresso soak so the ladyfingers absorb enough coffee to taste it without turning to mush.",
    ],
    atAGlance: [
      { label: 'Price band', value: '€45–58' },
      { label: 'Duration', value: '2–2.5 hours' },
      { label: 'Tasting format', value: 'Chilled sample in class, on most listings' },
      { label: 'Layers per serving', value: '3–4, ladyfinger and mascarpone alternating' },
    ],
    sections: [
      {
        heading: 'Mascarpone-whisking technique, honestly broken down',
        body: [
          "Mascarpone separates from a whipped egg-and-sugar base (zabaglione-style, sometimes made with raw yolks and sometimes with a cooked, pasteurized version for food-safety reasons) if it's overworked or mixed while too cold straight from the fridge. A genuinely hands-on class walks through folding technique specifically — working the mascarpone into the egg base in stages rather than dumping it in all at once — since that's the single most common point where a home attempt actually goes wrong.",
          "A good instructor also explains the raw-egg-vs-cooked-base choice plainly: a classic zabaglione base uses raw egg yolks whipped with sugar over gentle heat, while a food-safety-conscious version cooks the yolks to a safe temperature first. Ask which method your specific listing uses if raw egg is a concern for you or anyone in your group.",
        ],
      },
      {
        heading: 'Coffee-soak timing for ladyfingers',
        body: [
          "Savoiardi (ladyfingers) need a quick dip — roughly 1-2 seconds per side in cooled espresso — not a soak. Left in coffee too long, they turn waterlogged and collapse instead of holding a distinct layer; dipped too briefly, the center stays dry and chalky. A genuinely hands-on class has each participant dip and place their own ladyfingers rather than watching the instructor do it once, since the timing only clicks with a few tries.",
        ],
      },
      {
        heading: 'Layering and chill-time explained',
        body: [
          "The standard build is ladyfingers, mascarpone cream, a dusting of cocoa, then repeat for 3-4 total layers, finished with a final cocoa dusting just before serving (cocoa dusted too early goes damp and loses its texture). After assembly, tiramisù needs real chill time — at least 4 hours, ideally overnight — for the layers to set and the flavors to meld, which is why most classes send participants home with a tiramisù that isn't fully ready to eat yet rather than serving it fresh at the end.",
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: "Worth booking specifically for the mascarpone-folding technique and the dip-timing practice — both are genuinely fiddly to get right on a first attempt, and hands-on correction from an instructor solves that faster than any written recipe. Confirm whether the listing gives you a chilled sample to taste in class, since a meaningful minority only send you home with an unset tiramisù.",
    },
    faqs: [
      {
        question: 'Do I need any prior baking experience?',
        answer:
          'No — tiramisù is a no-bake dessert built entirely around folding and dipping technique, both taught step by step with hands-on correction from the instructor.',
      },
      {
        question: 'Will I actually make my own tiramisù, or just watch?',
        answer:
          "On a genuinely hands-on listing, yes — every participant folds their own mascarpone cream and dips and layers their own ladyfingers; check the listing description for that phrasing specifically, since a minority of cheaper listings are demonstration-heavy.",
      },
      {
        question: 'Do I get to eat tiramisù in class, or only at home?',
        answer:
          "It varies by listing — some use a rapid-chill method so you taste a properly set sample before you leave, while others send you home with a tiramisù that still needs several hours (or overnight) in the fridge; check the specific listing's inclusions if eating in class matters to you.",
      },
    ],
    relatedSupportHref: '/what-you-make',
    relatedSupportLabel: 'What You Make',
  },
  {
    href: '/dessert-making-class',
    navTitle: 'Dessert-Making Class',
    h1: 'Dessert-Making Class in Rome: Tiramisù Plus More',
    keyword: 'dessert class rome',
    metaTitle: 'Dessert Class Rome: Tiramisu Plus Other Roman Sweets',
    metaDescription:
      'A broader Rome dessert-making class covering tiramisù and one or two other Roman sweets — what gets added, and how the timing compares.',
    heroImage: { src: 'https://images.unsplash.com/photo-1712262582533-dcf8deba14a3', alt: 'A macro close-up of a loaf-style tiramisù with cocoa-dusted ladyfinger tops and a cracked cream surface' },
    intro: [
      'A broader dessert class for anyone who wants tiramisù plus one or two other Roman sweets in the same session.',
      "The trade is straightforward: you get variety instead of depth. Tiramisù still anchors the session on nearly every listing, but the extra time goes toward a second and sometimes third dessert rather than more practice reps on the mascarpone-folding and dip-timing techniques the flagship class spends its whole session on.",
    ],
    atAGlance: [
      { label: 'Price band', value: '€52–58' },
      { label: 'Duration', value: '2.5–3 hours' },
      { label: 'Desserts typically covered', value: '2–3 (tiramisù plus panna cotta or maritozzi)' },
      { label: 'Take-home recipe scope', value: 'Usually covers every dessert made' },
    ],
    sections: [
      {
        heading: 'Additional dessert options covered',
        body: [
          "Panna cotta (a set cream dessert, no eggs and no layering) and maritozzi (Rome's own cream-filled sweet brioche buns) are the two most common additions alongside tiramisù, since both use different core techniques — panna cotta teaches gelatin-setting ratios, and maritozzi teaches an enriched yeasted dough — which genuinely rounds out the session rather than repeating tiramisù's folding technique a second time under a different name.",
        ],
      },
      {
        heading: 'Session length vs single-dish class',
        body: [
          "Expect 30-60 extra minutes compared with the flagship tiramisù-only class, mostly consumed by the second dessert's own prep and (for panna cotta specifically) a partial-set demonstration, since a full gelatin set takes hours no class can wait out. The extra time is real cooking and technique time, not padding — but it does mean less total focus on tiramisù's own layering technique than the single-dish class gives it.",
        ],
      },
      {
        heading: 'Take-home recipe scope',
        body: [
          "Most listings send participants home with a written recipe card covering every dessert made in the session, not just tiramisù — genuinely more useful if you want to repeat more than one recipe at home. A minority of budget listings only provide the tiramisù recipe; check the inclusions list if a full take-home set matters to you.",
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: "Worth booking if variety matters more to you than maximum depth on tiramisù specifically — panna cotta and maritozzi are genuinely different techniques, not filler. Skip it if tiramisù's own technique is the whole reason you're booking; the single-dish Rome Tiramisù Class spends its entire session on that one dessert instead of splitting time three ways.",
    },
    faqs: [
      {
        question: 'Is tiramisù still the main focus, or just one of several desserts?',
        answer:
          "Tiramisù still anchors nearly every listing and gets the most class time, with the second and third desserts added on rather than replacing it.",
      },
      {
        question: 'What other desserts might be included?',
        answer:
          'Panna cotta and maritozzi (Rome\'s cream-filled sweet buns) are the two most common additions — check the specific listing, since the exact pairing varies by operator.',
      },
      {
        question: 'Is this a better first booking than the tiramisù-only class?',
        answer:
          "Only if variety is what you want — if mascarpone technique and layering depth specifically are your priority, the single-dish Rome Tiramisù Class gives that more focused time.",
      },
    ],
    relatedSupportHref: '/pair-with-a-food-tour',
    relatedSupportLabel: 'Pair With a Food Tour',
  },
  {
    href: '/tiramisu-gelato-combo',
    navTitle: 'Tiramisù + Gelato Combo',
    h1: 'Tiramisù + Gelato Combo Class in Rome: Timing & Honest Pricing',
    keyword: 'tiramisu gelato class rome',
    metaTitle: 'Tiramisu Gelato Class Rome: Combo Timing, Compared',
    metaDescription:
      'A two-dessert tiramisù and gelato combo class in Rome — combined-session timing, which technique goes first, and overall session length.',
    heroImage: { src: 'https://images.unsplash.com/photo-1710106519622-8c49d0bcff2f', alt: 'Several individual servings of tiramisù in glass cups with cocoa-dusted tops, plated together with spoons' },
    intro: [
      'Two desserts, one booking — tiramisù technique paired with a gelato-making segment.',
      "The two techniques pair well in a single session because tiramisù's own chill time is genuine dead time no class can shorten — most operators use that wait productively by starting the gelato base while the assembled tiramisù chills, rather than making guests sit idle.",
    ],
    atAGlance: [
      { label: 'Price band', value: '€58–62' },
      { label: 'Duration', value: '3 hours' },
      { label: 'Techniques covered', value: '2 (mascarpone layering, gelato base)' },
      { label: 'Timing order', value: 'Tiramisù assembly first, gelato during chill time' },
    ],
    sections: [
      {
        heading: 'Combined-session timing',
        body: [
          "A typical session opens with tiramisù — folding the mascarpone base, dipping ladyfingers, and layering the dessert into individual glasses or a shared dish — which then goes into a fridge or blast chiller for a partial set. While that chill time runs, the group shifts to churning a simple gelato base (commonly fior di latte or a coffee variant, which pairs naturally with tiramisù's own espresso flavor).",
        ],
      },
      {
        heading: 'Which technique is taught first and why',
        body: [
          "Tiramisù always goes first because its chill time is the longest dead period in either technique's process; gelato is deliberately slotted into that wait rather than run as a separate standalone block before or after. A listing that runs gelato first is unusual and worth a second look at the itinerary, since it usually means the tiramisù only gets a token chill time before serving.",
        ],
      },
      {
        heading: 'Overall session length',
        body: [
          "At roughly 3 hours total, the combo runs about an hour longer than the standalone flagship tiramisù class but shorter than Cooking in Rome's own pizza + gelato combo, since tiramisù's active hands-on time is genuinely shorter than pizza's dough-to-oven process. Most participants find the pacing comfortable, with a proper sit-down tasting of both desserts at the end.",
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: "The right pick if you want two techniques in one afternoon and don't mind a slightly longer session — the combo genuinely uses tiramisù's chill time productively rather than padding the itinerary. Skip it if tiramisù's own technique is all you're after; the single-dish Rome Tiramisù Class spends more total time on that one dessert.",
    },
    faqs: [
      {
        question: 'Do I get to eat both desserts fresh, or take one home?',
        answer:
          "Gelato is eaten fresh at the end of class on nearly every listing; the tiramisù usually gets a partial chill during class but may still need more time at home to fully set — check the specific listing's chilling method.",
      },
      {
        question: 'Is the gelato made from scratch or a premade base?',
        answer:
          'On a genuine combo listing, you churn the gelato base yourself — check the listing description for "hands-on gelato" specifically, since a small number of budget combo classes serve a pre-made version instead.',
      },
      {
        question: "What if I only want tiramisù, not gelato?",
        answer:
          "A standalone tiramisù class runs shorter and cheaper — see our Rome Tiramisù Class page for a single-dish format if the gelato segment doesn't interest you.",
      },
    ],
    relatedSupportHref: '/gift-experience',
    relatedSupportLabel: 'Gift Experience',
  },
  {
    href: '/private-dessert-class',
    navTitle: 'Private Dessert Class',
    h1: 'Private Dessert Class in Rome: Is the Price Premium Worth It?',
    keyword: 'private dessert class rome',
    metaTitle: 'Private Dessert Class Rome: Couples & Celebration Pricing',
    metaDescription:
      'A private tiramisù or dessert class in Rome — couples and small-group setup, celebration framing, and the honest price premium versus a shared class.',
    heroImage: { src: 'https://images.unsplash.com/photo-1691688334265-7936fb8c49ba', alt: 'A cocoa-dusted square of tiramisù plated at a candlelit restaurant table' },
    intro: [
      "An intimate setting built for couples or small groups celebrating something — this is our most-booked gift-experience format.",
      "The core trade is straightforward: a private booking runs roughly double the per-person cost of a shared class, and in exchange you get an instructor focused entirely on your group, a pace built around your occasion rather than a stranger's schedule, and the flexibility to request specific flavor variations.",
    ],
    atAGlance: [
      { label: 'Price band', value: '€145–165 for up to 6' },
      { label: 'Group size cap', value: 'Up to 6 guests' },
      { label: 'Duration', value: '2–2.5 hours, extendable' },
      { label: 'Price vs shared', value: 'Roughly 2x per person' },
    ],
    sections: [
      {
        heading: 'Couples/small-group setup',
        body: [
          "Most private dessert bookings cap at 6 guests — intimate enough for a couple, a small family group, or a handful of friends celebrating together, while still small enough that the instructor gives hands-on correction to every station rather than circulating thinly the way a larger shared class does.",
        ],
      },
      {
        heading: 'Celebration-friendly framing',
        body: [
          "A meaningful share of private bookings are anniversary, proposal, or birthday-adjacent occasions, and several operators explicitly support this — a decorated presentation plate, a candle, or a short toast moment built into the session's end. Mention the occasion when booking; most operators will happily build a small moment around it without charging extra.",
        ],
      },
      {
        heading: 'Custom flavor-variation requests',
        body: [
          "Unlike a shared class's fixed recipe, a private booking can genuinely accommodate requests — a fruit-forward variation, a non-alcoholic coffee-soak substitute, or a lighter mascarpone ratio for a specific dietary preference. Tell the operator your preferences when booking; most build the day's recipe around that input rather than defaulting to the standard version.",
        ],
      },
    ],
    verdict: {
      heading: 'Our take',
      body: "Worth it for a couple marking an occasion or a small group who'd rather not share a station with strangers — the celebration framing and flavor customization solve a problem a shared class simply can't. Less compelling if price is the only factor, since a shared class delivers a similar core technique for meaningfully less.",
    },
    faqs: [
      {
        question: 'Is a private class worth it for just two people?',
        answer:
          "Less so on price alone — the flat rate isn't split as many ways — but it's genuinely worth it for an anniversary, proposal, or similar occasion where the celebration framing and full instructor attention matter more than cost.",
      },
      {
        question: 'Can I request a specific flavor variation, like a fruit-based version?',
        answer:
          "Yes — tell the operator your preferences when booking, since most build the day's recipe around that input rather than improvising on the day.",
      },
      {
        question: 'Do operators help mark a special occasion, like an anniversary?',
        answer:
          'Many do — a decorated presentation plate or a short toast moment is common when you mention the occasion at booking, usually at no extra charge.',
      },
    ],
    relatedSupportHref: '/classes-for-couples',
    relatedSupportLabel: 'Classes for Couples',
  },
];

export const SUPPORT_PAGE_CONTENT: SupportPageContent[] = [
  {
    href: '/what-you-make',
    navTitle: 'What You Make',
    h1: 'What You Actually Make in a Rome Tiramisù Class',
    keyword: 'what do you make in a tiramisu class rome',
    metaTitle: 'What a Rome Tiramisu Class Includes: Layers, Chill Time & Tasting',
    metaDescription:
      'The real inclusions across Rome tiramisù classes — mascarpone technique, chill time, and what usually costs extra.',
    heroImage: { src: 'https://images.unsplash.com/photo-1702744998351-090b3ee4e976', alt: 'A round tiramisù ringed with ladyfingers, a slice removed, with a cup of coffee being stirred in the background' },
    sections: [
      {
        heading: 'Standard inclusions across nearly every listing',
        body: [
          "Almost every Rome tiramisù class includes the mascarpone and egg base, ladyfingers, espresso for dipping, cocoa for dusting, the instructor's live guidance through folding and layering technique, and a take-home container for your assembled dessert. This baseline holds across GetYourGuide and Viator listings regardless of price tier.",
        ],
      },
      {
        heading: 'What varies: chilled tasting, recipe cards, flavor variations',
        body: [
          "Beyond the baseline, inclusions get inconsistent: whether a rapid-chill method lets you taste a properly set sample before leaving, a printed take-home recipe card, and a flavor-variation option (fruit-based, non-alcoholic coffee substitute) all vary by operator and price tier. Check the specific listing's inclusion list rather than assuming any of these are bundled in.",
        ],
      },
      {
        heading: 'Common add-ons that cost extra',
        body: [
          "The most common paid add-ons are a second dessert added to a single-dish class, a private/small-group upgrade from a shared booking, and a celebration add-on (a decorated presentation plate or candle) for anniversaries and similar occasions. None of these are hidden fees exactly, but they're rarely bundled into the base price shown in search results, so budget an extra €10-25 per person if any of them matter to you.",
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I get to eat tiramisù at the end of class?',
        answer:
          'It depends on the listing — some use a rapid-chill method so you taste a properly set sample before you leave, while others send you home with a container that still needs several hours in the fridge.',
      },
      {
        question: 'Is the take-home container included?',
        answer:
          'Yes on nearly every listing — you assemble your own tiramisù in a take-home container as part of the class, rather than in a shared communal dish.',
      },
      {
        question: 'Can I request a non-alcoholic or non-coffee version?',
        answer:
          'Standard classes use plain espresso with no alcohol by default; a decaf or flavor-adjusted version is usually only available on a private booking with advance notice.',
      },
    ],
    relatedMoneyHref: '/rome-tiramisu-class',
    relatedMoneyLabel: 'See the Rome Tiramisù Class',
  },
  {
    href: '/classes-for-couples',
    navTitle: 'Classes for Couples',
    h1: 'Tiramisù Classes for Couples in Rome',
    keyword: 'tiramisu class for couples rome',
    metaTitle: 'Tiramisu Class for Couples in Rome: What to Expect',
    metaDescription:
      'What a couples-focused tiramisù class in Rome actually looks like — pacing, celebration framing, and shared vs private formats.',
    heroImage: { src: 'https://images.unsplash.com/photo-1576097449798-7c7f90e1248a', alt: 'A couple leaning together to pull a tray of pastries from an oven in a home-style kitchen' },
    sections: [
      {
        heading: 'Why couples book this format',
        body: [
          "A tiramisù class runs shorter than most cooking classes (2-2.5 hours versus 3-4 for a pasta or pizza session) and produces a genuinely shareable result — a dessert two people can plate and eat together — which makes it a popular pick for a date-night activity that isn't just another dinner reservation.",
        ],
      },
      {
        heading: 'Celebration framing: anniversaries and proposals',
        body: [
          "Several operators explicitly cater to anniversary and proposal bookings, offering a decorated presentation plate, a candle, or a brief private moment built into the class's end — mention the occasion when booking, since most of this needs advance notice rather than being available on request the same day.",
        ],
      },
      {
        heading: 'Shared class vs private booking for two',
        body: [
          "A shared class seats a couple alongside other participants at a communal table — more affordable, but less intimate and with a fixed pace set by the group. A private booking for two costs more per person but gives full instructor attention and a pace built entirely around the couple; see the private-dessert-class page for the honest price comparison.",
        ],
      },
    ],
    faqs: [
      {
        question: 'Is a shared class awkward for a couple, or is it better to book private?',
        answer:
          "Most couples find a shared class comfortable — you work at your own station together regardless of who else is in the room — but a private booking is worth it specifically for an anniversary or proposal where the celebration framing matters more than cost.",
      },
      {
        question: 'Can operators help plan a proposal during the class?',
        answer:
          'Some do, with advance notice — mention it when booking rather than hoping to arrange it on arrival, since a private booking gives the operator room to build a moment in without other guests present.',
      },
      {
        question: 'Is this a good date-night activity, not just for special occasions?',
        answer:
          "Yes — plenty of couples book a shared tiramisù class as a low-pressure date activity with no anniversary or proposal involved; the shorter, no-bake format suits a casual evening as well as a celebration.",
      },
    ],
    relatedMoneyHref: '/private-dessert-class',
    relatedMoneyLabel: 'See the Private Dessert Class',
  },
  {
    href: '/gift-experience',
    navTitle: 'Gift Experience',
    h1: 'How to Gift a Rome Tiramisù Class',
    keyword: 'gift a tiramisu class rome',
    metaTitle: 'How to Gift a Tiramisu Class in Rome: Vouchers & Dates',
    metaDescription:
      'The cleanest way to book a Rome tiramisù class as a gift — voucher options, flexible-date bookings, and what to check before you buy.',
    heroImage: { src: 'https://images.unsplash.com/photo-1774428755024-88024a28223c', alt: 'A cocoa-dusted square of tiramisù wrapped in wax paper on a plate, set on a wood table' },
    sections: [
      {
        heading: 'Gift voucher support across both partners',
        body: [
          "GetYourGuide and Viator both support some form of gift booking, though the mechanism differs: some issue a redeemable voucher with an open validity window, while others let you book a specific date and simply gift the confirmed booking itself. Check the specific listing's gift or voucher option before assuming every listing works the same way.",
        ],
      },
      {
        heading: "Flexible-date bookings, when a fixed date isn't possible",
        body: [
          "If the recipient's travel dates aren't confirmed yet, a flexible-date voucher (where the recipient picks their own date after receiving the gift) is the safer purchase than booking a fixed date and hoping it works — most operators offer at least a 12-month validity window for exactly this reason.",
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
          'Both options usually exist — a specific-class voucher locks in the exact experience (the flagship, combo, or private format), while a general amount gives the recipient flexibility to choose.',
      },
      {
        question: "What if the class price increases before the recipient redeems the voucher?",
        answer:
          "Policy varies by operator — some honor the original price, others require a top-up for the difference; check this specifically before buying if the recipient's travel date is far off.",
      },
      {
        question: 'Is a gifted class a good idea for a couple celebrating an anniversary?',
        answer:
          'Yes — pair a gift voucher with the private-dessert-class format if the recipient would appreciate the celebration framing; most operators can arrange the celebration touches even on a gifted booking with advance notice.',
      },
    ],
    relatedMoneyHref: '/tiramisu-gelato-combo',
    relatedMoneyLabel: 'See the Tiramisù + Gelato Combo',
  },
  {
    href: '/pair-with-a-food-tour',
    navTitle: 'Pair With a Food Tour',
    h1: 'Pairing a Tiramisù Class With a Rome Food Tour',
    keyword: 'pair tiramisu class with food tour rome',
    metaTitle: 'Pair a Tiramisu Class With a Rome Food Tour: Sequencing Guide',
    metaDescription:
      'How to sequence a tiramisù class with a Rome food tour on the same trip — timing, why it works, and avoiding overlap between the two.',
    heroImage: { src: 'https://images.unsplash.com/photo-1565182252045-3cfae92017e0', alt: 'Two empty espresso cups with spoons resting on saucers at a wooden café table' },
    sections: [
      {
        heading: 'Why the pairing works',
        body: [
          "A food tour is built around savory tastings — market stalls, pizza al taglio, suppli — and rarely spends meaningful time on dessert beyond a single gelato stop; a dedicated tiramisù class fills that gap with hands-on technique instead of a passive tasting. The two genuinely complement each other rather than overlapping in content.",
        ],
      },
      {
        heading: 'Best sequencing: food tour earlier, dessert class later',
        body: [
          "Most visitors do the food tour first (often midday or early evening, when tours typically run) and the tiramisù class afterward, since arriving at a dessert class already full from a savory tour works better than the reverse — nobody wants to eat a savory food-tour lunch on top of a fresh tiramisù. A late-afternoon or evening class slot also lines up naturally with a midday food tour.",
        ],
      },
      {
        heading: 'Timing logistics for one day',
        body: [
          "A typical food tour runs 3-4 hours; a tiramisù class runs 2-2.5 hours — comfortably fitting both in one day if the food tour starts by late morning. Leave at least a 1-2 hour gap between the two so you're not arriving at the dessert class still mid-digestion from the tour's last tasting stop.",
        ],
      },
    ],
    faqs: [
      {
        question: 'Should I book the food tour or the dessert class first?',
        answer:
          "The food tour first, for most visitors — it's built around savory tastings, and arriving at a dessert class already full works better than eating a savory tour on top of a fresh tiramisù.",
      },
      {
        question: 'Is there enough time to do both in one day?',
        answer:
          "Yes — a food tour runs 3-4 hours and a tiramisù class runs 2-2.5 hours, so both fit comfortably in one day if the food tour starts by late morning, with a gap of at least 1-2 hours between them.",
      },
      {
        question: 'Which food tour pairs best with a tiramisù class?',
        answer:
          "Any savory-focused Rome food tour works, since none currently spend meaningful time on dessert technique — see our sibling site Street Food Rome for savory tour options that pair naturally with this class.",
      },
    ],
    relatedMoneyHref: '/dessert-making-class',
    relatedMoneyLabel: 'See the Dessert-Making Class',
  },
];

export function getMoneyPageContent(href: string): MoneyPageContent | undefined {
  return MONEY_PAGE_CONTENT.find((p) => p.href === href);
}

export function getSupportPageContent(href: string): SupportPageContent | undefined {
  return SUPPORT_PAGE_CONTENT.find((p) => p.href === href);
}
