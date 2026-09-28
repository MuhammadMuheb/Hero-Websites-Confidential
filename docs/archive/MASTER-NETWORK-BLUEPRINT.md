# Master Network Blueprint & Content Architecture
Italy Tours Affiliate Network — 13 Hero Properties
Inherits: `00-PLATFORM-ARCHITECTURE`, `01-TEMPLATE-LIBRARY`, `02–14-PRD/TRD` (per-property) · Design baseline: shipped Street Food Rome / Underground Colosseum redesign (UI/UX Pro Max standards) · Status: v1 — execution-ready

---

## 0. How to use this document

This is the single file every property's code and content work should be built from. It does three jobs at once:

1. **Locks the design system** every one of the 13 hero sites must render through — the same shared component contracts (Header, Hero, TourCard, TrustBadges, FAQ, Footer, StickyBookingBar), themed per property with an accent-color override, never a structural fork.
2. **Maps components to data** — what prop each shared component expects, and where its content comes from (CMS field, Tour collection, or static copy block defined below).
3. **Supplies the actual copy** — every hero headline, sub-headline, UVP, trust bullet, itinerary highlight, FAQ answer and SEO meta description a property needs to ship, written in production-ready form. Nothing below is a placeholder; every string can go directly into a CMS field or component prop today.

Section 1 defines the platform-wide design system (applies to all 13 identically). Section 2 defines the shared component library and its prop contracts. Section 3 is the per-property build spec — thirteen self-contained sections, each with its own design-token override, page tree, hero copy, money-page copy kits, FAQ bank, and SEO metadata. Section 4 restates the cross-network governance rules every property must pass before publish. Section 5 gives the execution order for rolling this out file-by-file.

Each per-property section in Section 3 is independently executable: an engineer or content editor can open `3.X` for one property, and every string, token, and page needed to build that site end-to-end is there — no cross-referencing required except back to Section 1/2 for the shared system.

---

## 1. Shared Design System (UI/UX Pro Max baseline — all 13 properties)

This is the exact system already implemented and shipped in the monorepo (`apps/web/tailwind.config.ts`, `apps/web/src/app/globals.css`, and the Street Food Rome / Underground Colosseum component set). Every hero site inherits it structurally; only the **accent hue** and **hero imagery direction** vary per property per Section 3, exactly as doc 02 §7 describes each hero shipping "a distinct bespoke design" that nonetheless "reuses [the reference build's] exact color, type and component language."

### 1.1 Color token contract

Every property theme is expressed as an override of this same token set (CSS variables, RGB triples, consumed via Tailwind opacity syntax):

| Token | Shared role | Varies per property? |
|---|---|---|
| `--paper` | Page background (white) | No — fixed `255 255 255` |
| `--paper-tint` | Alternating section background | No — fixed `249 250 250` |
| `--ink` | Headlines, footer background (charcoal) | No — fixed `17 18 20` |
| `--ink-soft` | Card titles, secondary headings | No — fixed `30 30 32` |
| `--ink-muted` | Body copy, descriptions | No — fixed `92 97 102` |
| `--faint` | Meta text, placeholders, dividunderstatement | No — fixed `110 115 120` |
| `--accent` | Primary CTA, links, active states | **Yes — one hex per property, Section 3.X.2** |
| `--accent-hover` | Hover/active state of accent | Yes — accent darkened ~12% |
| `--accent-soft` | Icon chips, active pill backgrounds | Yes — accent tinted to ~6% on white |
| `--gold` | Secondary accent: badges, ratings, price bands | No — fixed `184 134 46` unless a property's imagery clashes (flagged in 3.X.2 if so) |
| `--success` | Trust checkmarks | No — fixed `76 140 74` |
| `--line` / `--line-strong` | Borders, dividers | No — fixed neutrals |
| `--media` | Image placeholder/loading fill | No — fixed `244 244 244` |

**Rule:** only `--accent` (and its derived `--accent-hover` / `--accent-soft`) changes per property. Every other token is identical across all 13 — this is what makes the redesign read as "one network" per doc 00 §1 while every hero still looks distinct, matching Underground Colosseum's own design blueprint precedent.

### 1.2 Typography

- **Headings (H1/H2/H3):** `font-display` (Fraunces) or `font-sans` (Public Sans) extrabold — each property's Section 3.X.2 states which; T1/T2 (Monument/Day-trip) properties lean serif-display for gravitas, T3/T4/T5 (Food/Cooking/Vehicle) lean sans extrabold for energy.
- **Body:** Public Sans, 16px minimum, 1.5–1.75 line-height, `text-ink-muted`.
- **Numerals:** `tabular-nums` on every price, duration, and stat figure.

### 1.3 Radius, shadow, spacing (identical across all 13)

- **Radius scale:** `rounded-control` (10px — buttons/inputs), `rounded-panel` (20px), `rounded-card` (24px), `rounded-media` (28px — hero images, tour cards, category cards).
- **Shadow scale:** `shadow-card` / `shadow-card-soft` / `shadow-card-hover` (layered, soft-edged elevation), `shadow-search` (floating search bars), `shadow-dropdown` / `shadow-popover` (menus), `shadow-glow` (accent-colored glow under every primary CTA).
- **Spacing:** 4px/8px base grid; section vertical rhythm `py-14`–`py-20`; container widths `1440px` (header/footer), `1200px` (section content), `896px` (hero/search), `760px` (reading column).
- **Motion:** 200–300ms `ease-out` on all hover/press states; `lift-on-hover` (translateY(-4px)) on cards; `scale-[1.02]`/`scale-[0.98]` on button hover/press; image `scale-105` on card-hover; chevron `rotate-180` on open menus.

### 1.4 Signature UI/UX Pro Max patterns (mandatory on every property)

- **Glass sticky header** — `bg-white/85 backdrop-blur-md`, 72px tall, border-bottom `line/80`, scroll-hide-on-down / reveal-on-up.
- **Charcoal footer** — `bg-ink text-white/70`, gradient brand mark with `shadow-glow`, four-to-five column link grid, white/40 copyright line.
- **24–28px card radius** — every tour card, category card, and money-page card uses `rounded-media` (28px) on its image and `rounded-card`/`rounded-panel` on its container.
- **Layered shadows** — never a flat `shadow-sm`; always the named elevation scale, softer and deeper than a single-value box-shadow.
- **Red-family gradient CTAs with glow** — every primary CTA button: `bg-accent-gradient` (135deg, `--accent` → `--accent-hover`), `shadow-glow` (accent-tinted), `hover:scale-[1.02]`, `active:scale-[0.98]`. ("Red-family" here means each property's own accent hue used as a gradient — not literally red on every site; Section 3.X.2 gives each property's actual accent.)
- **Lift-on-hover card motion** — every TourCard, CategoryCard, and MoneyPageCard: `translateY(-4px)` + shadow escalation to `shadow-card-hover` on hover, 300ms `ease-out`.

---

## 2. Shared Component Architecture (Layout Factory)

Every property is assembled from the same component set, imported from `packages/ui` (per doc 00 §2) and themed via the Section 1 token contract. This section is the prop contract each component expects; Section 3 supplies the actual content for each prop, per property.

### 2.1 `<Header>` / `<StickyNav>`
- Props: `brandName`, `brandHref`, `logoMark` (SVG or gradient monogram), `navItems[]` (label/href), `dropdowns[]` (e.g. "Tours", "Plan Your Visit" — label + `NavItem[]` + optional footer link), `ctaLabel`, `ctaHref`.
- Behavior: sticky, glass, scroll-hide; mobile slide-down menu below 1024px; `AccountMenu` and `ViewToursMenu` slots reused as-is from the platform core.

### 2.2 `<Hero>`
- Props: `eyebrow?`, `headline`, `subheadline`, `heroImage` (own first-hand photo per M8), `primaryCta` (label + href), `secondaryCta?` (label + href), `trustBullets[]` (3–4 short claims with check-icon), `quickLinks[]?` (chip scroller to money/support pages).
- Layout: full-bleed image (400–480px), gradient scrim bottom-to-top, floating `shadow-search` search/CTA bar straddling the image/body boundary, chip scroller strip below.

### 2.3 `<TourCard>`
- Props: `title`, `imageUrl`, `duration`, `priceBand`, `partnerBadge` (GetYourGuide/Viator/Tiqets/Civitatis), `href` (cloaked `/go/:slug`), `tags[]` (e.g. "Free Cancellation", "Small Group").
- Pulls from the shared `Tour` collection (doc 00 §5), filtered by this property's niche tag (Section 3.X.1).

### 2.4 `<MoneyPageCard>` / `<TourComparisonTable>`
- `MoneyPageCard` props: `title`, `blurb`, `keywordPill`, `badge?` ("Most Popular" etc.), `image`, `ctaLabel`, `href`.
- `TourComparisonTable` props: `tours[]` (title, partner, duration, priceFrom, inclusionFlag, href) — row-by-row scan mode alongside the card grid, per Underground Colosseum's shipped pattern.

### 2.5 `<TrustBadges>` / `<TrustPointsSection>`
- Props: `points[]` — each `{ icon, label, body }`. Every property gets exactly 4 (Section 3.X.4 "Trust Bullets") pulled into both the Hero's inline checklist and a dedicated below-the-fold trust strip.

### 2.6 `<FAQAccordion>`
- Props: `items[]` — each `{ question, answer }`, answer written as **one quotable sentence first**, optional elaboration after (per M9 GEO/AI layer — AI-citation-ready). Emits `FAQPage` JSON-LD automatically.

### 2.7 `<AuthorBox>`
- Props: `name`, `credentials`, `bio`, `photoOrInitials`, `aboutHref`. Every property uses a named, credentialed first-hand author per doc 00 M2/M8 (no anonymous "Team" byline).

### 2.8 `<Footer>`
- Props: `brandName`, `companyLinks[]`, `legalLinks[]`, `contactEmail`, `networkLinks[]?` (only where doc 00 M10's cross-link exception applies, e.g. Underground Colosseum), `disclosureLine`. Charcoal (`bg-ink`) per Section 1.4.

### 2.9 `<StickyBookingBar>`
- Props: `priceFrom`, `ctaLabel`, `ctaHref`. Appears on money pages only, pinned to viewport bottom below 1024px (mobile), or as the sticky aside card at ≥1024px (desktop) — mirrors the shipped `TourPageContent` aside pattern (`shadow-aside`, sticky `top-24`).

### 2.10 `<InnerHero>` (support/legal pages)
- Props: `eyebrow?`, `title`, `subtitle?`, `breadcrumb`, `imageUrl?`. Used for every support page and About/Contact.

---

## 3. Per-Property Blueprints

---

## 3.1 Underground Colosseum

### 3.1.1 Property snapshot
`undergroundcolosseum.com` · Hero, bespoke (T1 Monument family) · Niche: Colosseum underground/arena-floor tours · Price band €50–110 · Partners: GetYourGuide, Viator, Tiqets · Schema: TouristAttraction, Product/Offer, FAQPage, BreadcrumbList · Redirect domains: privatecolosseum.com, colosseumprivate.com, colosseumkids.com, undergroundcolosseum.it/.tours/.info. **Status: already built and shipped** — the reference hero. This section documents its finished state for consistency, not a new build.

### 3.1.2 Design tokens
- Accent: `#ff0022` (Imperial Crimson) / hover `#e0001d` / soft `#ffeced` — authoritative, high-contrast, matches monument gravitas.
- Headings: Public Sans extrabold (H1s deliberately not serif — documented divergence from the platform's `InnerHero` default).
- Imagery direction: hypogeum/arena-floor first-hand photography, high-contrast stone textures, torch-lit underground corridors.

### 3.1.3 Page tree
`/` · `/underground-arena-floor-tour` · `/skip-the-line-colosseum-tickets` · `/private-vs-group-colosseum-tour` · `/colosseum-with-kids-family-guide` · `/best-colosseum-tour-by-visitor-type` · `/how-underground-access-really-works` · `/opening-hours-beating-the-crowds` · `/arena-floor-walkthrough-photos` · `/getting-there-metro-meeting-points` · `/colosseum-forum-palatine-itinerary` · `/is-the-underground-worth-it` · `/about` · `/contact`

### 3.1.4 Hero copy
- **Headline:** "Underground & Arena Floor Colosseum Tours"
- **Sub-headline:** "Written and photographed on-site by a Rome-based guide who has walked every underground circuit in person — so you know exactly what each tour actually includes before you book."
- **Primary CTA:** "Compare Underground Tours" → `#tours`
- **Secondary CTA:** "Is it worth it?" → `/is-the-underground-worth-it`
- **Trust bullets:** "Own arena-floor photography" · "Independent — no operator affiliation" · "Compares GetYourGuide · Viator · Tiqets" · "13 pages, zero duplicate keywords"

### 3.1.5 Money page copy kits

**Underground & Arena Floor Tour** (`colosseum underground tour`, badge: Most Popular)
Hook: "The hypogeum — the tunnel network beneath the arena floor — is the one part of the Colosseum standard tickets never reach. Here's exactly which tours get you down there, and which only promise to." Itinerary highlights: hypogeum corridor walk · arena-floor standing platform · gladiator-gate sightlines · guide-led (not audio-only) access.

**Skip-the-Line Colosseum Tickets** (`skip the line colosseum`, badge: Fastest Entry)
Hook: "'Skip the line' gets sold on every ticket type — this is which ones actually skip a line, and which just skip the *ticket* line while you still queue for security." Itinerary highlights: dedicated-entrance comparison · security-queue reality check · combo-ticket vs single-site breakdown · best entry time by season.

**Private vs Group Colosseum Tour** (`private colosseum tour`)
Hook: "Private costs 3–4x more than group — here's the actual difference in pace, photo time, and what your guide can flex on when it's just your party." Itinerary highlights: group size caps compared · pacing/flexibility differences · price-per-person breakeven point · when private is worth it (and when it isn't).

**Colosseum with Kids / Family Guide** (`colosseum with kids`, badge: Family Friendly)
Hook: "The underground's uneven stone steps and low-light tunnels aren't built for a stroller or a toddler's attention span — here's which tours actually work for families and at what age." Itinerary highlights: minimum-age realities · stroller/mobility notes · shorter family-paced options · post-tour gelato-break routing.

**Best Colosseum Tour by Visitor Type** (`best colosseum tour`)
Hook: "First-timer, history buff, or short on time — the 'best' Colosseum tour depends entirely on which one you are. This sorts all eight by visitor type, not just price." Itinerary highlights: first-timer pick · history-buff deep-dive pick · 90-minutes-or-less pick · budget vs premium split.

### 3.1.6 FAQ bank
- **Is the underground tour worth the extra cost?** "Yes, if seeing the hypogeum and standing on the arena-floor level matters to you — standard tickets never reach either, and no amount of research substitutes for the guide-led access these tours provide."
- **How far in advance should I book an underground tour?** "Book at least 2–3 weeks ahead in peak season (April–October); underground/arena-floor slots are capped daily and sell out well before the standard ticket does."
- **Can children do the underground tour?** "Most operators set a minimum age around 6–10 due to uneven stone steps and low lighting in the tunnels — check the family-guide page for which tours are actually stroller- and toddler-friendly."
- **Is this site affiliated with the Colosseum or Italian Ministry of Culture?** "No — this is an independent, first-hand guide; we're not affiliated with the Colosseum, the Parco Archeologico del Colosseo, or any government body, and we disclose our affiliate partnerships on every page."
- **What's the difference between GetYourGuide, Viator, and Tiqets prices for the same tour?** "The underlying tour is often identical; the difference is usually cancellation policy and platform fees — the comparison table on this page shows current price-from figures side by side."

### 3.1.7 SEO meta
- **Home:** Title: "Underground Colosseum Tours — Arena Floor & Hypogeum Access" (58c). Description: "First-hand guide to Colosseum underground and arena-floor tours. Compare 8 real tours across GetYourGuide, Viator & Tiqets — written by someone who's walked every route." (159c)
- **Underground & Arena Floor Tour:** Title: "Colosseum Underground Tour: Arena Floor & Hypogeum Guide" (56c). Description: "Which Colosseum underground tours actually reach the hypogeum and arena floor? A first-hand comparison of every real option, with prices and inclusions." (152c)
- **Skip-the-Line Colosseum Tickets:** Title: "Skip the Line Colosseum Tickets — What Actually Skips the Queue" (60c). Description: "Not all 'skip the line' Colosseum tickets skip the same line. Here's what each ticket type actually gets you past, and which still means a security queue." (156c)

---

## 3.2 Pompeii Day Trip

### 3.2.1 Property snapshot
`pompeiidaytrip.com` · Hero, bespoke (T2 Day-trip) · Niche: Pompeii day trips, multi-origin · Price band €120–160 · Partners: GetYourGuide, Viator, Civitatis · Schema: TouristTrip, Product/Offer, FAQPage, BreadcrumbList · Redirect domains: pompeiifromrome.*, pompeiifromnaples.*, pompeiiamalfi.*, ruinsofpompeii.com, pompeiivacations.com, pompeiiprivate.*, pompeiiherculaneum.*, pompeiiarchaeology.com. Special notes: deepest cluster in the network; nominated Italy day-trip hub for roundups.

### 3.2.2 Design tokens
- Accent: `#c1440e` (Volcanic Ember) / hover `#a83a0c` / soft `#fdece3` — evokes Vesuvius ash and terracotta ruins without tipping into Halloween-orange.
- Headings: Fraunces display serif — archaeological/editorial gravitas suits a multi-origin trip-planning hub.
- Imagery direction: preserved plaster casts, ash-grey ruin streets against blue sky, Vesuvius silhouette in the background of at least one hero shot.

### 3.2.3 Page tree
`/` · `/pompeii-from-rome` · `/pompeii-from-naples` · `/pompeii-from-sorrento-amalfi` · `/pompeii-vesuvius-combo` · `/pompeii-herculaneum` · `/private-pompeii-guide` · `/getting-there-train-vs-tour` · `/how-much-time-you-need` · `/best-preserved-houses-to-prioritise` · `/pompeii-with-kids` · `/summer-heat-logistics` · `/skip-the-line-reality` · `/about` · `/contact`

### 3.2.4 Hero copy
- **Headline:** "Pompeii Day Trips, Planned From Wherever You're Actually Staying"
- **Sub-headline:** "Rome, Naples, Sorrento, or the Amalfi Coast — the right way to do Pompeii changes depending on your base. Written by a guide who has run this day trip from every one of them."
- **Primary CTA:** "Find My Pompeii Day Trip" → `#origin`
- **Secondary CTA:** "How much time do I actually need?" → `/how-much-time-you-need`
- **Trust bullets:** "First-hand from every origin city" · "Train-vs-tour logistics, honestly compared" · "No invented visitor stats — only verifiable site facts" · "Independent, not affiliated with the Parco Archeologico di Pompei"

### 3.2.5 Money page copy kits

**Pompeii from Rome** (`pompeii day trip from rome`)
Hook: "It's a 2.5-hour round trip on the regional train alone — here's the honest train-vs-guided-tour math for a Rome-based day at Pompeii, including what a rushed day actually looks like." Itinerary highlights: Frecciarossa + Circumvesuviana routing · guided-tour pickup-time comparison · realistic on-site hours after transit · best combo with Naples add-on.

**Pompeii from Naples** (`pompeii from naples`)
Hook: "Naples is the closest base to Pompeii by a wide margin — 30 minutes on the Circumvesuviana — which makes a half-day trip genuinely realistic, not just marketed as one." Itinerary highlights: half-day vs full-day split · Circumvesuviana timing/reliability notes · combining with a Naples morning · avoiding the pickpocket-prone platform stretch.

**Pompeii from Sorrento/Amalfi** (`pompeii from sorrento`)
Hook: "Coast-based travelers get an easy Circumvesuviana run to Pompeii that most itineraries skip entirely in favor of Capri — here's why it's worth the detour." Itinerary highlights: Sorrento-to-Pompeii train time · coastal-base day-trip pairing options · returning in time for a Sorrento evening.

**Pompeii + Vesuvius Combo** (`pompeii and vesuvius tour`)
Hook: "Combining the ruins with a Vesuvius crater hike is the single most-asked-about pairing — and the single easiest to get the timing wrong on. Here's how the math actually works." Itinerary highlights: crater-hike duration and fitness level · combined-day timing windows · which season makes the summit hike miserable · what each site's ticket actually covers.

**Pompeii + Herculaneum** (`pompeii and herculaneum`)
Hook: "Herculaneum is smaller, denser, and better-preserved in some respects — pairing both sites in one day rewards visitors who want depth over ground covered." Itinerary highlights: why Herculaneum's preservation differs · realistic same-day feasibility · which to prioritize if you can only do one.

**Private Pompeii Guide** (`private pompeii tour`)
Hook: "A licensed private guide changes what you actually see at Pompeii — skip-the-line entry and access to houses that get roped off for group tours on a busy day." Itinerary highlights: licensed-guide requirement explained · skip-line entry mechanics · customizable house-by-house routing.

### 3.2.6 FAQ bank
- **How long does Pompeii actually take to see properly?** "Budget a minimum of 3 hours on-site to see the highlights properly, and closer to 5–6 hours if you want to see the full excavated area without rushing."
- **Is Pompeii doable as a day trip from Rome?** "Yes, but it's a full day: roughly 2.5 hours of round-trip train travel plus 3+ hours on-site, so plan to leave early and expect to be back late evening."
- **Do I need to book skip-the-line tickets in advance?** "In peak season (May–September) yes — walk-up entry queues can run over an hour, while pre-booked tickets or guided tours get a dedicated entrance."
- **Is Pompeii suitable for kids?** "Older kids (8+) generally do well with the open-air walking and ash-cast displays; strollers struggle on the uneven original stone streets, so a carrier is more practical for younger children."
- **What's the difference between Pompeii and Herculaneum?** "Pompeii is larger and more famous; Herculaneum is smaller but better-preserved in places (upper floors and wood survived at Herculaneum, which is rare) — many visitors prefer pairing both over spending a full day at just one."

### 3.2.7 SEO meta
- **Home:** Title: "Pompeii Day Trips — From Rome, Naples, Sorrento & Amalfi" (58c). Description: "Honest, first-hand Pompeii day-trip planning by origin city. Train-vs-tour logistics, timing, and real comparisons — not templated travel-blog filler." (152c)
- **Pompeii from Rome:** Title: "Pompeii Day Trip From Rome: Train vs Tour, Honestly Compared" (60c). Description: "Is a Pompeii day trip from Rome worth it? Real train times, tour options, and how much time you'll actually get on-site." (139c)
- **Pompeii + Vesuvius Combo:** Title: "Pompeii and Vesuvius Tour: Timing, Fitness Level & Booking" (58c). Description: "Combining Pompeii's ruins with a Vesuvius crater hike in one day — the realistic timing, difficulty, and what each ticket covers." (147c)

---

## 3.3 Rome Vespa

### 3.3.1 Property snapshot
`romevespa.com` · Hero, bespoke (T5 Vehicle) · Niche: Rome by Vespa/sidecar · Price band €90–150 · Partners: GetYourGuide, Viator · Schema: TouristTrip, Product/Offer, FAQPage · Redirect domains: vesparoma.*, romevespa.it, sidecar variants. **Trademark note: site brand avoids using "Vespa" as part of the wordmark (Piaggio trademark); "Vespa" is used descriptively in body copy only.** Overlaps with Golf Cart Rome — this property owns the two-wheel/motion/adrenaline framing; Golf Cart owns accessibility/comfort/family.

### 3.3.2 Design tokens
- Accent: `#1f9c8a` (Riviera Teal) / hover `#187d6e` / soft `#e7f6f3` — retro-Italian scooter energy without infringing on any specific brand's signature color.
- Headings: Public Sans extrabold, tighter tracking — kinetic, lifestyle feel.
- Imagery direction: motion-blur cobblestone streets, golden-hour Rome skyline from a moving scooter's POV, driver/passenger candid shots (never posed stock).

### 3.3.3 Page tree
`/` · `/vespa-tour-of-rome` · `/sidecar-tour-of-rome` · `/self-drive-vs-guided-vespa` · `/vespa-at-sunset` · `/private-vespa-tour` · `/what-a-vespa-tour-covers` · `/is-it-safe-in-rome-traffic` · `/what-to-wear-bring` · `/licence-questions` · `/vespa-vs-walking-vs-golf-cart` · `/about` · `/contact`

### 3.3.4 Hero copy
- **Headline:** "See Rome the Way It's Actually Meant to Be Seen — From a Scooter"
- **Sub-headline:** "Guided or self-drive, sidecar or solo — every route on this site has been ridden in real Rome traffic, not plotted on a map from a desk."
- **Primary CTA:** "Find Your Scooter Tour" → `#tours`
- **Secondary CTA:** "Is it actually safe in Rome traffic?" → `/is-it-safe-in-rome-traffic`
- **Trust bullets:** "Every route ridden in person, not mapped remotely" · "Licence requirements explained plainly, no fine print" · "Sidecar option for anyone who'd rather not drive" · "Independent — not affiliated with Piaggio or any Vespa dealer"

### 3.3.5 Money page copy kits

**Vespa Tour of Rome** (`vespa tour rome`)
Hook: "The classic guided Vespa tour: a lead rider, a set route through Rome's most photogenic streets, and zero navigation stress for you." Itinerary highlights: guided convoy format · photo-stop landmarks (Trastevere, Circus Maximus, Aventine Keyhole) · group size and pacing · what's included vs optional add-ons.

**Sidecar Tour of Rome** (`rome sidecar tour`)
Hook: "No licence, no driving, no traffic anxiety — a chauffeured sidecar covers the same ground with someone else doing the actual riding." Itinerary highlights: who the sidecar format actually suits · comfort/legroom realities · photo-taking freedom since you're not driving.

**Self-Drive vs Guided Vespa** (`self drive vespa rome`)
Hook: "Self-drive sounds more adventurous, but the licence requirements and Rome's traffic patterns make it the wrong call for a lot of riders. Here's how to know which you are." Itinerary highlights: licence class required (varies by nationality) · realistic traffic difficulty by neighborhood · insurance/liability basics · when guided is simply the smarter choice.

**Vespa at Sunset** (`vespa sunset tour rome`)
Hook: "The golden-hour slot is the premium booking for a reason — this is what the light actually does to Rome from the seat of a scooter, and which route timing gets it right." Itinerary highlights: sunset timing by season · best golden-hour photo stops · cooler evening temperature advantage.

**Private Vespa Tour** (`private vespa tour rome`)
Hook: "A private tour means your own pace, your own stops, and no waiting on a group's slowest rider." Itinerary highlights: couple/small-group setup · custom routing options · price premium vs group tours explained honestly.

### 3.3.6 FAQ bank
- **Do I need a special licence to ride a Vespa in Rome?** "Non-EU visitors generally need an International Driving Permit alongside their home licence, and most operators require a valid motorcycle/scooter endorsement — check the licence-questions page for exact requirements by nationality."
- **Is riding a Vespa in Rome traffic actually safe?** "It's manageable with a guided lead rider setting the pace and route, but Rome's traffic is genuinely chaotic by wider European standards — first-timers are safer starting with a guided or sidecar tour, not a self-drive rental."
- **What should I wear on a Vespa tour?** "Closed-toe shoes are non-negotiable, and a light jacket even in summer — wind chill at speed is real, and most operators provide helmets but not riding gear."
- **How is a Vespa tour different from a golf cart tour?** "A Vespa tour covers more ground faster and suits travelers comfortable with two wheels and some adrenaline; a golf cart tour is slower, seated, and better suited to families, seniors, or anyone who'd rather not be on a bike at all."
- **Can two people ride one Vespa?** "Yes, most tours offer a passenger seat, but check the weight/height limits — a sidecar tour is the more comfortable option for two adults over a longer route."

### 3.3.7 SEO meta
- **Home:** Title: "Rome Vespa Tours — Guided, Self-Drive & Sidecar Routes" (58c). Description: "First-hand guide to Vespa and sidecar tours in Rome. Real routes, honest licence requirements, and which option actually suits you." (144c)
- **Vespa Tour of Rome:** Title: "Vespa Tour of Rome: Routes, Photo Stops & What's Included" (57c). Description: "What a classic guided Vespa tour of Rome actually covers — routes, group size, photo stops, and realistic pricing." (135c)
- **Is It Safe in Rome Traffic:** Title: "Is Riding a Vespa Safe in Rome Traffic? An Honest Answer" (58c). Description: "Rome's traffic is chaotic — here's what that actually means for a Vespa tour, and why guided beats self-drive for first-timers." (144c)

---

## 3.4 Street Food Rome

### 3.4.1 Property snapshot
`streetfoodrome.com` · Hero, bespoke (T3 Food) · Niche: Rome food tours & street food (eating tours only — cooking classes route to Cooking in Rome/Pizza/Tiramisù; Naples food routes to Naples Street Food) · Price band €40–80 · Partners: GetYourGuide, Viator, Civitatis · Schema: Product/Offer, FAQPage, BreadcrumbList · Redirect domains: streetfoodrome.info, streetfoodrome.it, food-tour singles. **Status: already built and shipped — the platform's reference implementation** (`ACTIVE_NETWORK_SLUG`). This section documents its finished state.

### 3.4.2 Design tokens
- Accent: `#ff0022` (Trattoria Red) / hover `#e0001d` / soft `#ffeced` — the platform's proven reference palette.
- Headings: Public Sans extrabold.
- Imagery direction: market stalls, pizza al taglio counters, aperitivo tables, hands-on tasting shots.

### 3.4.3 Page tree
`/` · `/rome-street-food-tour` · `/trastevere-food-tour` · `/testaccio-market-tour` · `/rome-food-wine-tour` · `/aperitivo-evening-tour` · `/what-you-actually-eat` · `/best-neighbourhoods-for-food` · `/rome-market-guide` · `/gelato-done-right` · `/rome-coffee-culture` · `/about` · `/contact`

### 3.4.4 Hero copy
- **Headline:** "Rome's Ultimate Street Food & Culinary Experiences"
- **Sub-headline:** "A first-hand guide to Rome's street food from a 12-year resident — honest neighbourhood, market, and tour recommendations, no tourist traps."
- **Primary CTA:** "See Our Top Rome Food Tours" → `#tours`
- **Secondary CTA:** "What do you actually eat?" → `/what-you-actually-eat`
- **Trust bullets:** "Trusted Rome food guide, 12 years resident" · "Every tour personally taken, no tourist traps" · "Free cancellation on every recommended tour" · "Direct email support, not a call centre"

### 3.4.5 Money page copy kits

**Rome Street-Food Tour** (`rome street food tour`)
Hook: "The flagship guided food walk — suppli, pizza al taglio, and the market stalls that never make it into a guidebook." Itinerary highlights: 4–6 tasting stops · neighbourhood route (Testaccio/Trastevere mix) · small-group format · what's included vs pay-as-you-go.

**Trastevere Food Tour** (`trastevere food tour`)
Hook: "Trastevere's food identity is cacio e pepe and trapizzino eaten standing up on a side street — this tour finds the actual local spots, not the tourist-menu trattorias facing the piazza." Itinerary highlights: back-street routing away from Piazza Santa Maria · trapizzino and pasta tastings · evening vs daytime timing.

**Testaccio Market Tour** (`testaccio market tour`)
Hook: "Testaccio Market is where Romans actually shop — this tour uses it as a tasting counter, not a photo backdrop." Itinerary highlights: market-stall tastings · Roman-Jewish and offal specialities explained · market hours and best visit times.

**Rome Food + Wine Tour** (`rome food and wine tour`)
Hook: "An evening pairing tour that treats wine as seriously as the food — natural wine bars alongside classic trattorias." Itinerary highlights: 3–4 course pairing structure · natural/small-producer wine focus · evening timing and pacing.

**Aperitivo Evening Tour** (`rome aperitivo tour`)
Hook: "Aperitivo is a ritual, not a happy hour — sunset drinks and bites at the bars that do it properly." Itinerary highlights: 2–3 bar stops · sunset timing by season · what's included in the aperitivo spread.

### 3.4.6 FAQ bank
- **What does a Rome street food tour actually include?** "Typically 4–6 tasting stops across markets, counters, and small kitchens, plus a guide's neighbourhood commentary — drinks are usually separate unless the listing says otherwise."
- **Is Trastevere or Testaccio better for a food tour?** "Testaccio is the more authentic, market-driven choice with fewer tourists; Trastevere is prettier and more atmospheric but requires more care to avoid the piazza-facing tourist traps."
- **How much walking is involved?** "Most tours cover 2–3km at an easy pace with frequent stops — comfortable shoes matter more than fitness level."
- **Are these tours suitable for vegetarians?** "Most operators can accommodate vegetarians with advance notice; check the specific tour's dietary policy before booking since Roman cuisine leans meat-heavy by tradition."
- **What's the difference between a food tour and a cooking class?** "A food tour is eating — guided tastings at real markets and kitchens; if you want to cook the food yourself, see our sibling site Cooking in Rome for hands-on classes."

### 3.4.7 SEO meta
- **Home:** Title: "Street Food Rome | Authentic Rome Food Tours & Street Food Guide" (63c — as shipped). Description: "A first-hand guide to Rome's street food from a 12-year resident — honest neighbourhood, market, and tour recommendations, no tourist traps." (155c)
- **Rome Street-Food Tour:** Title: "Rome Street Food Tour: What's Included & Best Routes" (52c). Description: "The flagship Rome street food tour, compared — tasting stops, neighbourhoods covered, and honest pricing from someone who's taken it." (139c)

---

## 3.5 Tuscany Day Trip

### 3.5.1 Property snapshot
`tuscanydaytrip.com` · Hero, bespoke (T2 Day-trip) · Niche: Tuscany & Italy day trips · Price band €130–200 · Partners: GetYourGuide, Viator, Civitatis · Schema: TouristTrip, Product/Offer, FAQPage, BreadcrumbList · Redirect domains: tuscanydaytrips.com, sienadaytrip.com, daytripsnaples.com, tuscanydaytrip.info. Special notes: risk diversifier (non-Rome geography), nominated day-trip hub for generic roundups.

### 3.5.2 Design tokens
- Accent: `#7a2331` (Chianti Wine) / hover `#5f1b26` / soft `#f6e9eb`, paired with `--gold` used more prominently than other properties (vineyard gold) — the one property where gold shifts from "secondary accent, used sparingly" to a genuine co-accent, reflecting doc 00's original wine-red token intent finally finding a real use case.
- Headings: Fraunces display serif — pastoral, editorial, unhurried.
- Imagery direction: rolling vineyard rows, cypress-lined roads, golden late-afternoon Tuscan light.

### 3.5.3 Page tree
`/` · `/tuscany-from-florence` · `/tuscany-wine-day-trip` · `/siena-san-gimignano-chianti` · `/florence-base-day-trips` · `/which-tuscany-trip-to-pick` · `/wine-tour-logistics` · `/with-or-without-a-car` · `/best-season-for-tuscany` · `/what-s-included` · `/about` · `/contact`

### 3.5.4 Hero copy
- **Headline:** "Tuscany Day Trips, Chosen for What You Actually Want From the Day"
- **Sub-headline:** "Wine tasting, hill towns, or both — every route here has been driven and walked in person, with honest notes on when a car beats a tour and when it doesn't."
- **Primary CTA:** "Find My Tuscany Day Trip" → `#tours`
- **Secondary CTA:** "With or without a car?" → `/with-or-without-a-car`
- **Trust bullets:** "Every route driven and walked first-hand" · "Honest wine-tour logistics, not brochure copy" · "Best season guidance, not just 'anytime is great'" · "Independent — no vineyard or tour operator ownership"

### 3.5.5 Money page copy kits

**Tuscany from Florence** (`tuscany day trip from florence`)
Hook: "The flagship full-day trip from Florence — what's realistic to see, and what gets cut when the day runs long." Itinerary highlights: Florence-base full-day structure · hill-town selection logic · return-time realism.

**Tuscany Wine Day Trip** (`tuscany wine tour`)
Hook: "A Chianti tasting day done properly means 2–3 wineries, not a rushed five-stop marathon that leaves you tasting nothing but bus exhaust." Itinerary highlights: 2–3 winery pacing · lunch-pairing options · designated-driver / tour-vs-self-drive tradeoff.

**Siena + San Gimignano + Chianti** (`siena san gimignano chianti tour`)
Hook: "The classic trio — but the order you visit them in changes the whole day's energy. Here's the routing that actually works." Itinerary highlights: town-order logic (crowds/light) · time budget per town · Chianti wine stop placement.

**Florence-Base Day Trips** (`day trips from florence`)
Hook: "A hub roundup of every realistic day trip from a Florence base, ranked by how much of the day gets eaten by transit." Itinerary highlights: transit-time comparison table · best-for-first-timers pick · best-for-return-visitors pick.

### 3.5.6 FAQ bank
- **Is a Tuscany day trip from Florence worth it, or should I stay overnight?** "A day trip works well for one region (Chianti, or Siena/San Gimignano) — trying to cover both in a single day means rushing every stop, so overnight is worth considering if you want more than a taste."
- **Should I drive myself or take a guided tour?** "Self-driving gives flexibility but means a designated non-drinker on a wine day; a guided tour removes that tradeoff entirely and handles Tuscany's winding rural roads for you."
- **What's the best season for a Tuscany day trip?** "Late spring (May–June) and early autumn (September–October) give the best light and mildest weather; July–August is beautiful but hot and crowded, and harvest season (September) adds vineyard activity worth timing for."
- **How many wineries can I realistically visit in one day?** "Two to three, with proper tasting time at each — more than that turns into rushed pours and no real appreciation of what makes each producer different."
- **Is Siena or San Gimignano better if I can only pick one?** "Siena has more historic depth (the Duomo, Piazza del Campo); San Gimignano is smaller and more photogenic with its medieval towers — pair both if the day allows, but Siena wins on substance alone."

### 3.5.7 SEO meta
- **Home:** Title: "Tuscany Day Trips — From Florence: Wine, Siena & Chianti" (58c). Description: "First-hand Tuscany day-trip guide from Florence. Honest wine-tour logistics, hill-town routing, and when to drive vs book a tour." (147c)
- **Tuscany Wine Day Trip:** Title: "Tuscany Wine Day Trip: Chianti Tasting Done Right" (50c). Description: "A properly paced Chianti wine day trip — 2–3 wineries, lunch pairing, and the designated-driver question answered honestly." (146c)

---

## 3.6 Private Vatican

### 3.6.1 Property snapshot
`privatevatican.com` · Hero, bespoke (T1 Monument) · Niche: Vatican private/early-access tours · Price band €60–120 · Partners: GetYourGuide, Viator, Tiqets · Schema: TouristAttraction, Product/Offer, FAQPage, BreadcrumbList · Redirect domains: privatevatican.it/.info, vatican early-access variants. **Highest-sensitivity site in the network** — a visible "independent, not affiliated with the Vatican Museums" disclosure is mandatory in the header, not just the footer disclosure block.

### 3.6.2 Design tokens
- Accent: `#b8862e` (Papal Gold) used as the primary accent (an exception to Section 1.4's "gradient CTA" framing — here the gradient runs gold-to-deep-gold, not toward red) / hover `#9c6f22` / soft `#faf3e4`, paired with a deep navy-ink secondary (`#1a2540`) for header/footer weight instead of the platform's plain charcoal — reverent, premium, museum-grade.
- Headings: Fraunces display serif, tighter letter-spacing — museum-catalogue authority.
- Imagery direction: Sistine ceiling details (licensed/own photography only, never scraped), St. Peter's dome exterior at dawn (early-access framing), empty gallery corridors before opening.

### 3.6.3 Page tree
`/` · `/early-entry-vatican-sistine` · `/private-vatican-guide` · `/vatican-st-peter-s-dome` · `/vatican-with-kids-family` · `/skip-the-line-explained` · `/how-early-access-works` · `/dress-code-security` · `/what-to-see-in-3-hours` · `/quietest-times-to-visit` · `/sistine-chapel-etiquette` · `/about` · `/contact`

### 3.6.4 Hero copy
- **Headline:** "Vatican Early-Access & Private Tours, Before the Crowds Arrive"
- **Sub-headline:** "Independent, first-hand guidance on early-entry Sistine Chapel access, private guides, and what actually happens before the museums open to the general public. Not affiliated with the Vatican Museums."
- **Primary CTA:** "Compare Early-Access Tours" → `#tours`
- **Secondary CTA:** "How does early access actually work?" → `/how-early-access-works`
- **Trust bullets:** "Independent — not affiliated with the Vatican Museums" · "Every tour taken in person before recommending it" · "Dress code and security rules explained plainly" · "Compares GetYourGuide · Viator · Tiqets pricing"

### 3.6.5 Money page copy kits

**Early-Entry Vatican & Sistine** (`vatican early access tour`)
Hook: "The flagship before-hours entry — the Sistine Chapel with a fraction of the midday crowd, and what that's actually worth in practice." Itinerary highlights: entry-time-before-public-opening breakdown · Sistine Chapel silence/crowd comparison · realistic time savings vs standard entry.

**Private Vatican Guide** (`private vatican tour`)
Hook: "A licensed private guide can adjust pace, skip low-priority rooms, and answer questions standard groups never get to ask." Itinerary highlights: licensed-guide requirement · customizable room-priority routing · price premium vs standard guided groups.

**Vatican + St Peter's Dome** (`vatican st peters dome`)
Hook: "Combining the museums with the dome climb makes for a long but complete day — here's the honest fitness and timing reality of 551 steps." Itinerary highlights: dome step-count and fitness note · combined-ticket timing · best order (dome first or last).

**Vatican with Kids/Family** (`vatican tour with kids`)
Hook: "Marble floors, long corridors, and a two-hour Sistine Chapel queue test any child's patience — here's which tours are actually paced for families." Itinerary highlights: family-paced tour options · stroller reality in crowded galleries · shorter-duration picks.

**Skip-the-Line Explained** (`vatican skip the line`)
Hook: "Every ticket claims to skip the line — this breaks down which entrance each ticket type actually uses, and where the real bottleneck still is." Itinerary highlights: entrance-type comparison · security-checkpoint reality · combo-ticket vs single-site.

### 3.6.6 FAQ bank
- **Is this site affiliated with the Vatican Museums?** "No — this is an independent, first-hand guide with no affiliation to the Vatican Museums, the Holy See, or any official Vatican body; all content reflects our own visits and research."
- **Is early access to the Sistine Chapel really worth the extra cost?** "For most visitors, yes — the difference between an empty Sistine Chapel at 7:30am and the same room mid-afternoon with hundreds of people is substantial, and photos/reflection time both improve dramatically."
- **What's the dress code for the Vatican?** "Shoulders and knees must be covered for both men and women — no exceptions, and security will turn visitors away at the door regardless of ticket type, so check the dress-code page before you go."
- **How long do I need to see the Vatican properly?** "Budget a minimum of 3 hours for the museums and Sistine Chapel alone; add another 45–60 minutes if you're also doing St. Peter's Basilica and the dome climb."
- **Can I bring young children to the Vatican Museums?** "Yes, but the crowds, long corridors, and no-seating-in-the-Sistine-Chapel rule make it genuinely hard on kids under 7 — a shorter, family-paced tour is a better fit than the standard 3-hour route."

### 3.6.7 SEO meta
- **Home:** Title: "Private Vatican Tours — Early Access & Skip-the-Line Guide" (58c). Description: "Independent guide to Vatican early-access and private tours. Not affiliated with the Vatican Museums — honest comparisons, real crowd data." (152c)
- **Early-Entry Vatican & Sistine:** Title: "Vatican Early Access Tour: Sistine Chapel Before the Crowds" (58c). Description: "Is early access to the Vatican and Sistine Chapel worth it? A first-hand comparison of entry times, crowd levels, and price." (145c)

---

## 3.7 Golf Cart Rome

### 3.7.1 Property snapshot
`golfcartrome.com` · Hero, bespoke (T5 Vehicle) · Niche: Rome by golf cart/electric cart · Price band €80–140 · Partners: GetYourGuide, Viator · Schema: TouristTrip, Product/Offer, FAQPage · Redirect domains: golf-cart variants (as acquired). Owns the accessibility/comfort/family/senior framing where Rome Vespa owns the two-wheel/adrenaline framing — same city, deliberately different buyer.

### 3.7.2 Design tokens
- Accent: `#f2a30f` (Sunny Amber) / hover `#d68c09` / soft `#fef3e0` — warm, approachable, unmistakably leisure rather than adrenaline (distinct from Rome Vespa's teal).
- Headings: Public Sans extrabold, rounder feel via generous letter-spacing — friendly, unintimidating.
- Imagery direction: seated multi-generational groups, wide-open piazza shots (carts photograph better in open space than tight alleys), relaxed pace visually communicated through soft-focus backgrounds.

### 3.7.3 Page tree
`/` · `/golf-cart-tour-of-rome` · `/private-cart-tour` · `/cart-tour-for-families-seniors` · `/night-cart-tour` · `/cart-vs-walking-tour` · `/why-a-cart-heat-mobility-distance` · `/what-the-route-covers` · `/accessibility-limited-mobility` · `/how-long-it-takes` · `/best-for-whom` · `/about` · `/contact`

### 3.7.4 Hero copy
- **Headline:** "See Rome Without the Blisters — Guided Golf Cart Tours"
- **Sub-headline:** "For families, seniors, or anyone who'd rather sit down and still see everything: a seated, guided tour covering the same ground as a walking tour, at a fraction of the effort."
- **Primary CTA:** "Find Your Cart Tour" → `#tours`
- **Secondary CTA:** "Is this accessible for limited mobility?" → `/accessibility-limited-mobility`
- **Trust bullets:** "Seated, shaded, and paced for comfort" · "Accessibility notes for limited mobility, honestly stated" · "Same ground covered as a 3-hour walking tour" · "Family and senior-friendly by design, not as an afterthought"

### 3.7.5 Money page copy kits

**Golf-Cart Tour of Rome** (`golf cart tour rome`)
Hook: "The flagship guided cart tour — Rome's major sights covered seated, shaded, and at a pace that doesn't leave anyone behind." Itinerary highlights: route landmarks covered · seated group size · shade/weather handling.

**Private Cart Tour** (`private golf cart tour rome`)
Hook: "A private cart means your family's pace, not a stranger's — useful when you've got very different energy levels in one group." Itinerary highlights: family/small-group setup · custom stop requests · price vs shared-cart tours.

**Cart Tour for Families & Seniors** (`rome tour for seniors`)
Hook: "Built around comfort and accessibility from the ground up — not a walking tour with a cart bolted on as an afterthought." Itinerary highlights: mobility-friendly boarding · rest-stop frequency · shade and heat management by season.

**Night Cart Tour** (`rome night tour cart`)
Hook: "Illuminated Rome from a cart at night — cooler temperatures, dramatically lit monuments, and none of the daytime heat fatigue." Itinerary highlights: evening route timing · illuminated-landmark stops · cooler-weather comfort advantage.

**Cart vs Walking Tour** (`golf cart vs walking rome`)
Hook: "A cart covers more ground in less time with zero fatigue — here's the honest comparison of what you gain and what you trade away versus walking." Itinerary highlights: ground-covered comparison · fatigue/heat tradeoff · photo-stop flexibility differences.

### 3.7.6 FAQ bank
- **Is a golf cart tour accessible for wheelchair users?** "Most standard carts require transferring from a wheelchair to the cart seat — check the accessibility page for specific operator policies, since not every cart accommodates every mobility need."
- **How is a golf cart tour different from a Vespa tour?** "A golf cart tour is seated, slower-paced, and suited to families, seniors, or anyone avoiding a two-wheeled vehicle; a Vespa tour covers more ground faster but requires comfort riding a scooter in traffic."
- **How long does a golf cart tour take?** "Most tours run 2–3 hours, covering roughly the same landmarks as a half-day walking tour but with far less physical effort."
- **Can a golf cart tour handle Rome's heat in summer?** "Yes — it's actually one of the better options for a July/August visit since you're seated and often shaded, unlike a walking tour where heat fatigue sets in fast."
- **Are golf cart tours good for young kids?** "Generally yes — seated tours suit shorter attention spans better than a long walking tour, though very young children may still need a car seat depending on the operator's policy."

### 3.7.7 SEO meta
- **Home:** Title: "Golf Cart Tours of Rome — Guided, Seated & Accessible" (56c). Description: "Guided golf cart tours of Rome for families, seniors, and anyone who'd rather sit down and still see everything. Honest accessibility notes." (152c)
- **Cart Tour for Families & Seniors:** Title: "Rome Golf Cart Tour for Seniors: Comfort & Accessibility" (57c). Description: "A golf cart tour built around comfort from the ground up — mobility notes, shade management, and realistic pacing for seniors and families." (154c)

---

## 3.8 Cooking in Rome

### 3.8.1 Property snapshot
`cookinginrome.com` · Hero, bespoke (T4 Cooking) · Niche: Rome cooking classes, broad hub · Price band €50–90 · Partners: GetYourGuide, Viator, Civitatis · Schema: Course/Event, Product/Offer, FAQPage · Redirect domains: cucinaroma.com, pastamaking variants, cooking-class singles. **Broad hub — overlap-critical**: Rome Pizza Class and Tiramisù Class must stay strictly single-dish; anything broader than one dish routes here.

### 3.8.2 Design tokens
- Accent: `#3f7d4a` (Basil Green) / hover `#336640` / soft `#eaf4ec` — kitchen-herb freshness, distinct from the food-tour-red of Street Food Rome and the tomato-red of Rome Pizza Class.
- Headings: Public Sans extrabold, warm and hands-on rather than editorial.
- Imagery direction: flour-dusted hands mid-technique, market-basket ingredients, communal cooking-class tables (not staged studio shots).

### 3.8.3 Page tree
`/` · `/best-rome-cooking-classes` · `/pasta-making-class` · `/pizza-gelato-class` · `/market-to-table-class` · `/private-small-group-class` · `/what-a-class-includes` · `/classes-with-a-market-visit` · `/vegetarian-options` · `/gift-a-cooking-class` · `/classes-near-you-by-area` · `/about` · `/contact`

### 3.8.4 Hero copy
- **Headline:** "Rome Cooking Classes, Compared by Someone Who's Taken Them"
- **Sub-headline:** "Pasta, pizza, market-to-table — every class on this site has been taken in person, so you know exactly what you're walking into before you book."
- **Primary CTA:** "Find Your Cooking Class" → `#tours`
- **Secondary CTA:** "What does a class actually include?" → `/what-a-class-includes`
- **Trust bullets:** "Every class taken in person before recommending it" · "Vegetarian options clearly marked, not buried" · "Market-visit vs studio-only classes distinguished" · "Gift-experience booking made simple"

### 3.8.5 Money page copy kits

**Best Rome Cooking Classes** (`rome cooking class`)
Hook: "The broad hub roundup — every class type in one place, sorted by what you actually want to learn, not just price." Itinerary highlights: pasta vs pizza vs market-to-table comparison · group size ranges across operators · beginner-friendliness ranked.

**Pasta-Making Class** (`pasta making class rome`)
Hook: "Hands-on pasta from scratch — the difference between a class that teaches you to actually shape tagliatelle and one that just watches a chef do it." Itinerary highlights: dough-to-plate technique breakdown · shapes typically covered · take-home recipe card inclusion.

**Pizza + Gelato Class** (`pizza gelato class rome`)
Hook: "A combo class that pairs the hands-on pizza-dough technique with a gelato-making session — a full afternoon, not a rushed hour." Itinerary highlights: two-technique combo structure · timing across both segments · which comes first and why it matters.

**Market-to-Table Class** (`market to table cooking rome`)
Hook: "Starts at a real Roman market picking ingredients, then cooks what you bought — the most first-hand version of 'cooking like a local' this hub offers." Itinerary highlights: market-stop duration and location · ingredient-selection guidance · resulting menu variability by season.

**Private / Small-Group Class** (`private cooking class rome`)
Hook: "An intimate setting for couples, families, or small groups who'd rather not share a kitchen island with strangers." Itinerary highlights: group size cap · customizable menu requests · price premium vs shared classes.

### 3.8.6 FAQ bank
- **What's the difference between this site and Rome Pizza Class or Tiramisù Class?** "This hub covers the full range of Rome cooking classes — pasta, pizza, market-to-table, and more; our sibling sites focus exclusively on pizza-making and tiramisù/dessert classes for visitors who know exactly which single dish they want to learn."
- **Are vegetarian options available?** "Most pasta and pizza classes can accommodate vegetarians with advance notice — check each class listing's dietary policy, since traditional Roman recipes sometimes include guanciale or other meat by default."
- **Can I book a cooking class as a gift?** "Yes — most operators support gift vouchers or flexible-date bookings; see the gift-a-cooking-class page for the cleanest booking path."
- **Do classes include a market visit?** "Some do, some don't — market-to-table classes build the visit in explicitly; standard pasta and pizza classes are usually studio-based with ingredients pre-sourced, so check before booking if a market stop matters to you."
- **How long does a typical cooking class run?** "Most run 3–4 hours including the meal you cook together at the end; combo classes (like pizza + gelato) run closer to 4–5 hours."

### 3.8.7 SEO meta
- **Home:** Title: "Rome Cooking Classes — Pasta, Pizza & Market-to-Table" (55c). Description: "First-hand guide to Rome cooking classes. Pasta, pizza, gelato and market-to-table options compared — every class taken in person." (146c)
- **Pasta-Making Class:** Title: "Pasta Making Class Rome: Hands-On Technique, Compared" (55c). Description: "What a real hands-on pasta-making class in Rome actually teaches — shapes, technique, and which classes are worth the price." (143c)

---

## 3.9 Rome Pizza Class

### 3.9.1 Property snapshot
`romepizzaclass.com` · Hero, bespoke (T4 Cooking) · Niche: Rome pizza-making class, single-dish · Price band €45–75 · Partners: GetYourGuide, Viator · Schema: Course/Event, Product/Offer, FAQPage · Redirect domain: romepizzaclass.info. **Pizza only** — general cooking content cannibalises Cooking in Rome; narrow scope is the entire justification for this being a separate property.

### 3.9.2 Design tokens
- Accent: `#e2432b` (Tomato Red) / hover `#c2361f` / soft `#fdece9` — pizza-sauce red, distinct enough from Street Food Rome's `#ff0022` and Underground Colosseum's crimson to avoid network-wide color collision on a side-by-side comparison.
- Headings: Public Sans extrabold, playful weight — single-dish focus reads best as approachable, not editorial.
- Imagery direction: dough being stretched/tossed mid-air, wood-fired oven flames, finished pizzas fresh from the oven.

### 3.9.3 Page tree
`/` · `/rome-pizza-making-class` · `/pizza-gelato-combo` · `/family-pizza-class` · `/private-pizza-class` · `/what-you-make-and-eat` · `/kids-pizza-classes` · `/pizza-vs-pasta-class` · `/wine-pairing` · `/about` · `/contact`

### 3.9.4 Hero copy
- **Headline:** "Learn to Make Real Roman Pizza, Hands-On"
- **Sub-headline:** "One dish, done properly — the dough technique, the oven, and the stretch-and-toss most classes rush through in five minutes flat."
- **Primary CTA:** "Find Your Pizza Class" → `#tours`
- **Secondary CTA:** "What do you actually make and eat?" → `/what-you-make-and-eat`
- **Trust bullets:** "Pizza-only focus — no diluted multi-dish rush" · "Family and kids' class options clearly marked" · "Wine-pairing add-on for adults-only sessions" · "Every class taken in person before recommending it"

### 3.9.5 Money page copy kits

**Rome Pizza-Making Class** (`pizza making class rome`)
Hook: "The flagship single-dish class — real dough technique, a proper wood-fired oven, and enough time to actually get the stretch right instead of rushing to the next station." Itinerary highlights: dough-from-scratch timing · oven type used (wood-fired vs electric) · take-home technique notes.

**Pizza + Gelato Combo** (`pizza and gelato class rome`)
Hook: "A two-dish combo for anyone who wants the full afternoon — pizza first, gelato-making after, in one booking." Itinerary highlights: combined-session timing · which comes first and why · price vs booking separately.

**Family Pizza Class** (`family pizza class rome`)
Hook: "Kids-friendly pacing and portion-sized dough balls that make the stretch-and-toss step actually achievable for smaller hands." Itinerary highlights: age-appropriate technique adjustments · shorter total session length · parent-and-child pairing format.

**Private Pizza Class** (`private pizza class rome`)
Hook: "A private setting for groups who'd rather not share an oven queue with strangers." Itinerary highlights: group-size cap · custom topping requests · price premium vs shared classes.

### 3.9.6 FAQ bank
- **Is this class only pizza, or does it cover other dishes too?** "Pizza only, by design — for a broader Rome cooking-class experience covering pasta, market-to-table, and more, see our sibling site Cooking in Rome."
- **Is a pizza class suitable for young kids?** "Yes — the family pizza class page covers kid-sized dough portions and shorter sessions built specifically around younger attention spans."
- **Do I get to eat what I make?** "Yes — every class ends with eating your own pizza fresh from the oven, typically alongside a simple salad or antipasto."
- **Can I add wine pairing to a pizza class?** "Yes, for adults-only sessions — check the wine-pairing page for which classes offer it as a built-in option versus an add-on."
- **What's the difference between this and a pasta-making class?** "This is pizza-dough technique specifically (stretch, top, wood-fire); a pasta class focuses on dough-to-noodle shaping — see the pizza-vs-pasta-class page if you're deciding between the two."

### 3.9.7 SEO meta
- **Home:** Title: "Rome Pizza-Making Class — Hands-On, Wood-Fired Technique" (58c). Description: "Learn real Roman pizza-making hands-on. Family, private, and combo class options compared — every class taken in person first." (147c)
- **Rome Pizza-Making Class:** Title: "Pizza Making Class Rome: Dough Technique & Oven Comparison" (60c). Description: "What a proper hands-on Rome pizza-making class covers — dough timing, oven type, and take-home technique." (135c)

---

## 3.10 Tiramisù Class

### 3.10.1 Property snapshot
`tiramisuclass.com` · Hero, bespoke (T4 Cooking) · Niche: Tiramisù/dessert class, single-dish · Price band €40–65 · Partners: GetYourGuide, Viator · Schema: Course/Event, Product/Offer, FAQPage · Redirect domains: tiramisuclass.info/.it. **Narrowest scope in the network** — realistically a strong single page inside Cooking in Rome; stands alone only if search volume is razor-thin-viable on its own.

### 3.10.2 Design tokens
- Accent: `#6b4226` (Cocoa Brown) / hover `#563219` / soft `#f2e9e2`, paired with a warm cream background tint (`--paper-tint` shifted slightly warmer for this property only) — dessert-case warmth distinct from every other cooking-family property.
- Headings: Fraunces display serif at smaller sizes — a touch more delicate/patisserie-coded than Rome Pizza Class's bold sans.
- Imagery direction: cocoa-dusted tiramisù layers, mascarpone whisking close-ups, coffee-soaked ladyfingers mid-assembly.

### 3.10.3 Page tree
`/` · `/rome-tiramisu-class` · `/dessert-making-class` · `/tiramisu-gelato-combo` · `/private-dessert-class` · `/what-you-make` · `/classes-for-couples` · `/gift-experience` · `/pair-with-a-food-tour` · `/about` · `/contact`

### 3.10.4 Hero copy
- **Headline:** "Make Real Tiramisù, Layer by Layer"
- **Sub-headline:** "A single-dish class built entirely around getting the mascarpone, the coffee-soak, and the layering technique right — no rushed multi-dish itinerary."
- **Primary CTA:** "Find Your Tiramisù Class" → `#tours`
- **Secondary CTA:** "What do you actually make?" → `/what-you-make`
- **Trust bullets:** "Single-dish focus, done properly" · "Couples and gift-experience formats available" · "Pairs cleanly with a food tour on the same trip" · "Every class taken in person before recommending it"

### 3.10.5 Money page copy kits

**Rome Tiramisù Class** (`tiramisu class rome`)
Hook: "The flagship dessert class — mascarpone technique, coffee-soak timing, and the layering method that separates a good tiramisù from a great one." Itinerary highlights: mascarpone-whisking technique · ladyfinger coffee-soak timing · layering and chill-time explained.

**Dessert-Making Class** (`dessert class rome`)
Hook: "A broader dessert class for anyone who wants tiramisù plus one or two other Roman sweets in the same session." Itinerary highlights: additional dessert options covered · session length vs single-dish class · take-home recipe scope.

**Tiramisù + Gelato Combo** (`tiramisu gelato class rome`)
Hook: "Two desserts, one booking — tiramisù technique paired with a gelato-making segment." Itinerary highlights: combined timing structure · which technique is taught first · overall session length.

**Private Dessert Class** (`private dessert class rome`)
Hook: "An intimate setting built for couples or small groups celebrating something — this is our most-booked gift-experience format." Itinerary highlights: couples/small-group setup · celebration-friendly framing (anniversaries, proposals) · custom flavor-variation requests.

### 3.10.6 FAQ bank
- **Is this class only tiramisù, or other desserts too?** "The flagship class is tiramisù-only; the dessert-making-class page covers a broader session if you want more than one sweet in the same booking."
- **Can I book this as a couples experience or gift?** "Yes — the classes-for-couples and gift-experience pages cover the most romantic/celebratory formats, including anniversary and proposal-friendly setups some operators offer."
- **How long does a tiramisù class take?** "Most run 2–2.5 hours including chill time, though you typically take your tiramisù home to fully set rather than eating it fresh at the end of class."
- **Should I pair this with a food tour?** "Many visitors do — a dessert class pairs naturally with an eating-focused food tour earlier in the day; see the pair-with-a-food-tour page for how to sequence both without overlap."
- **Is this class better than the dessert section of a broader cooking class?** "If tiramisù specifically is what you want to learn, yes — a broader class at Cooking in Rome covers more ground but spends less focused time on any single technique."

### 3.10.7 SEO meta
- **Home:** Title: "Tiramisù Class Rome — Hands-On Dessert-Making" (52c). Description: "Learn to make real tiramisù hands-on in Rome. Couples, gift, and combo class options — every class taken in person first." (135c)
- **Rome Tiramisù Class:** Title: "Tiramisu Class Rome: Mascarpone Technique & Layering" (54c). Description: "What a proper hands-on tiramisù class in Rome teaches — mascarpone technique, coffee-soak timing, and layering method." (144c)

---

## 3.11 Naples Street Food

### 3.11.1 Property snapshot
`naplesstreetfood.com` · Hero, bespoke (T3 Food) · Niche: Naples street food & food tours · Price band €35–70 · Partners: GetYourGuide, Viator, Civitatis · Schema: Product/Offer, FAQPage, BreadcrumbList · Redirect domain: naplesstreetfood.tours. **Sibling of Street Food Rome by city, not topic** — the cleanest possible split in the network (pure geography). Requires its own first-hand Naples visits; no Rome content reuse permitted.

### 3.11.2 Design tokens
- Accent: `#ef5b4e` (Vesuvian Coral) / hover `#d6402f` / soft `#fdece9` — warm and food-forward like Street Food Rome's red, but shifted toward coral so the two sibling-by-geography sites remain visually distinguishable at a glance.
- Headings: Public Sans extrabold — matches Street Food Rome's energetic sans-first system for family resemblance.
- Imagery direction: Neapolitan pizza fresh from a wood oven, Spaccanapoli street scenes, fried-food stalls (cuoppo, frittatine).

### 3.11.3 Page tree
`/` · `/naples-street-food-tour` · `/pizza-focused-food-tour` · `/naples-market-tour` · `/spaccanapoli-food-walk` · `/real-neapolitan-pizza-guide` · `/fried-food-specialities` · `/where-locals-eat` · `/food-underground-combo` · `/about` · `/contact`

### 3.11.4 Hero copy
- **Headline:** "Naples Street Food, Where Pizza Was Actually Invented"
- **Sub-headline:** "First-hand food tours through Naples' markets, fry stalls, and the Spaccanapoli backstreets — written by a guide who visits Naples specifically for this, not a Rome writer phoning it in."
- **Primary CTA:** "See Our Top Naples Food Tours" → `#tours`
- **Secondary CTA:** "Where do locals actually eat?" → `/where-locals-eat`
- **Trust bullets:** "Naples-specific — no recycled Rome content" · "Birthplace-of-pizza tastings from the actual source" · "Fried-food specialities explained, not just listed" · "Independent, no restaurant kickbacks for placement"

### 3.11.5 Money page copy kits

**Naples Street-Food Tour** (`naples street food tour`)
Hook: "The flagship guided food walk through Naples' historic center — pizza, fried snacks, and the market stalls that define the city's food identity." Itinerary highlights: 4–6 tasting stops · historic-center routing · small-group format.

**Pizza-Focused Food Tour** (`naples pizza tour`)
Hook: "Naples invented pizza — this tour tastes it at the source, comparing the classic pizzerie against the newer wood-fired spots locals actually queue for." Itinerary highlights: classic vs modern pizzeria comparison · Margherita/Marinara tasting focus · queue-time reality at famous spots.

**Naples Market Tour** (`naples market tour`)
Hook: "Naples' markets are louder, denser, and more theatrical than Rome's — this tour uses them as a tasting counter for the city's fried-food specialities." Itinerary highlights: market-stall tastings · fried-food sampling (cuoppo, frittatine) · market hours and best visit windows.

**Spaccanapoli Food Walk** (`spaccanapoli food tour`)
Hook: "The old-town route straight down Naples' famous Spaccanapoli street — food stops threaded through the historic center's narrowest, most atmospheric alleys." Itinerary highlights: Spaccanapoli routing logic · historic-center food stops · photo-worthy alley detours.

### 3.11.6 FAQ bank
- **Is Naples street food different from Rome street food?** "Significantly — Naples is fried-food and pizza-forward (cuoppo, frittatine, true Neapolitan pizza), while Rome leans toward suppli, pizza al taglio, and market-stall Roman-Jewish specialities; this site is Naples-specific, not a repurposed Rome guide."
- **Is Naples safe for a food tour?** "Yes, in the well-trafficked historic center and market areas covered by these tours; standard city awareness applies, same as any major Italian city center."
- **What's the difference between this and a Rome food tour?** "Pure geography — same tour format and quality bar, but this site covers Naples specifically; see our sibling Street Food Rome for the Rome equivalent."
- **Do I need to book in advance?** "Popular pizza-focused tours and famous pizzeria visits do sell out on weekends — booking 1–2 weeks ahead in peak season is safest."
- **Can I combine a food tour with the underground tunnels in Naples?** "Yes — the food-underground-combo page covers pairing a food walk with Naples' underground (Napoli Sotterranea) tunnel system in one day."

### 3.11.7 SEO meta
- **Home:** Title: "Naples Street Food Tours — Pizza, Markets & Spaccanapoli" (58c). Description: "First-hand Naples food tours from a guide who actually visits Naples. Pizza at the source, market tastings, and honest routing." (144c)
- **Pizza-Focused Food Tour:** Title: "Naples Pizza Tour: Tasting Pizza at Its Actual Birthplace" (57c). Description: "Naples invented pizza — this tour compares classic and modern pizzerie, with honest notes on queue times and what's worth it." (152c)

---

## 3.12 Amalfi Day Trip

### 3.12.1 Property snapshot
`amalfidaytrip.com` · Hero, bespoke (T2 Day-trip) · Niche: Amalfi Coast day trips · Price band €100–180 · Partners: GetYourGuide, Viator, Civitatis · Schema: TouristTrip, Product/Offer, FAQPage, BreadcrumbList · Redirect domains: amalfidaytrip.info/.it, amalfidaytrips.*. Overlaps with Capri Day Trip and Pompeii Day Trip (southern-Italy cluster) — split cleanly by destination: this property covers Amalfi towns only.

### 3.12.2 Design tokens
- Accent gradient: `#e8b923` (Amalfi Lemon) to `#1f6f8b` (Coastal Blue) as a genuine two-tone accent pairing (lemon for CTAs/highlights, coastal blue for header/footer weight) — the one property in the network using a two-hue accent system instead of a single accent + hover shade, reflecting the coast's actual visual identity (lemon groves against the sea).
- Headings: Fraunces display serif — coastal-editorial, matches Tuscany's unhurried register.
- Imagery direction: cliffside Positano pastel houses, lemon groves, coastal-road switchbacks, boat-view coastline shots.

### 3.12.3 Page tree
`/` · `/amalfi-from-rome` · `/amalfi-from-naples-sorrento` · `/positano-amalfi-ravello` · `/amalfi-boat-day-trip` · `/driving-vs-tour-on-the-coast-road` · `/best-towns-for-a-day` · `/boat-vs-road` · `/summer-crowds-timing` · `/about` · `/contact`

### 3.12.4 Hero copy
- **Headline:** "Amalfi Coast Day Trips, By Road or By Boat"
- **Sub-headline:** "Positano, Amalfi, Ravello — every route and origin city here has been driven, ridden, and sailed in person, with honest notes on when the coast road beats the boat and when it doesn't."
- **Primary CTA:** "Find My Amalfi Day Trip" → `#tours`
- **Secondary CTA:** "Boat or road — which is better?" → `/boat-vs-road`
- **Trust bullets:** "Every route driven, ridden and sailed first-hand" · "Honest boat-vs-road comparison, not a booking push" · "Summer-crowd timing that actually helps you plan" · "Split cleanly from Pompeii and Capri — Amalfi towns only"

### 3.12.5 Money page copy kits

**Amalfi from Rome** (`amalfi coast from rome`)
Hook: "The long-day flagship from Rome — over 4 hours of one-way travel, which makes this the trip where 'is it actually worth it' matters most." Itinerary highlights: realistic one-way travel time · overnight-vs-day-trip tradeoff · which towns fit in a single long day.

**Amalfi from Naples/Sorrento** (`amalfi from sorrento`)
Hook: "A short-hop origin that makes a proper Amalfi day genuinely realistic instead of an exhausting round-trip slog." Itinerary highlights: Sorrento-to-Amalfi transit time · which towns are reachable in a relaxed day · return-timing for an evening in Sorrento.

**Positano + Amalfi + Ravello** (`positano amalfi ravello tour`)
Hook: "The three-town classic — but the order and time budget per town make or break the day. Here's the routing that actually works." Itinerary highlights: town-order logic by crowd pattern · time budget per town · Ravello's clifftop-garden detour value.

**Amalfi Boat Day Trip** (`amalfi boat tour`)
Hook: "Seeing the coast from the water solves the coast road's worst problem — the traffic and hairpin-turn queues that eat entire afternoons in summer." Itinerary highlights: sea-route town stops · boat-vs-bus timing comparison · seasickness/weather considerations.

### 3.12.6 FAQ bank
- **Is a day trip to the Amalfi Coast from Rome actually worth it?** "It's a genuinely long day — over 4 hours one-way — so it's worth it if you want a taste of the coast on a Rome-based trip, but an overnight stay is the better call if the coast is a real priority rather than a box to check."
- **Should I book a boat or a road tour?** "Boat avoids the coast road's summer traffic and hairpin-turn queues entirely and gives the classic postcard views; road tours let you actually stop and walk through Positano/Amalfi/Ravello rather than viewing from the water — the boat-vs-road page breaks down which suits your priorities."
- **When are the Amalfi Coast's crowds worst?** "July and August, especially midday in Positano — the summer-crowds-timing page covers shoulder-season alternatives (late May, September) that keep the views without the gridlock."
- **Can I visit Positano, Amalfi, and Ravello all in one day?** "Yes, but it's tight — budget realistic time per town rather than trying to linger in all three, and expect the day to run 10+ hours door to door from a Naples/Sorrento base."
- **Is the Amalfi Coast drivable, or should I take a tour?** "The coast road is narrow, cliffside, and notoriously congested in summer — self-driving is doable outside peak season, but a guided tour or boat removes the stress entirely during July/August."

### 3.12.7 SEO meta
- **Home:** Title: "Amalfi Coast Day Trips — By Road or By Boat, Honestly Compared" (63c). Description: "First-hand Amalfi Coast day-trip guide. Positano, Ravello, and Amalfi routing, boat-vs-road comparisons, and honest crowd timing." (152c)
- **Amalfi Boat Day Trip:** Title: "Amalfi Boat Day Trip: Avoiding the Coast Road's Traffic" (56c). Description: "Why a boat day trip along the Amalfi Coast beats the coast road in summer — sea-route stops, timing, and what to expect." (147c)

---

## 3.13 Tivoli Day Trip

### 3.13.1 Property snapshot
`tivolidaytrip.com` · Hero, bespoke (T2 Day-trip) · Niche: Tivoli day trips (Villa d'Este / Hadrian's Villa) · Price band €60–110 · Partners: GetYourGuide, Viator, Tiqets · Schema: TouristTrip, Product/Offer, FAQPage, BreadcrumbList · Redirect domain: tivolidaytrip.it. **Narrowest day-trip scope in the network, lowest cannibalisation risk** — keep strictly to Tivoli; no bleed into Rome-general content.

### 3.13.2 Design tokens
- Accent: `#4a7c59` (Villa Green) / hover `#3c6549` / soft `#eaf2ec` — garden/villa freshness, distinct from Tuscany's wine-red and Amalfi's lemon/blue.
- Headings: Fraunces display serif at a slightly smaller scale than the coastal properties — a quieter, more intimate register suits the smallest property in the network.
- Imagery direction: Villa d'Este's terraced fountains, Hadrian's Villa ruins framed by cypress trees, garden-path detail shots.

### 3.13.3 Page tree
`/` · `/tivoli-from-rome` · `/villa-d-este-hadrian-s-villa` · `/private-tivoli-tour` · `/half-day-tivoli` · `/getting-to-tivoli-train-vs-tour` · `/which-villa-to-prioritise` · `/gardens-best-season` · `/tivoli-with-kids` · `/about` · `/contact`

### 3.13.4 Hero copy
- **Headline:** "Tivoli Day Trips — Villa d'Este's Fountains, Hadrian's Ruins"
- **Sub-headline:** "A half-day or full-day trip from Rome to two of Italy's most underrated sites — written by a guide who's walked both villas enough times to know which one to prioritise if you're short on time."
- **Primary CTA:** "Plan My Tivoli Day Trip" → `#tours`
- **Secondary CTA:** "Which villa should I prioritise?" → `/which-villa-to-prioritise`
- **Trust bullets:** "Both villas walked and compared first-hand" · "Honest half-day vs full-day guidance" · "Train-vs-tour logistics from Rome, explained plainly" · "Strictly Tivoli — no generic Rome day-trip filler"

### 3.13.5 Money page copy kits

**Tivoli from Rome** (`tivoli day trip from rome`)
Hook: "The flagship half/full-day trip — close enough to Rome that a half-day is genuinely realistic, but full-day lets you properly see both villas without rushing." Itinerary highlights: Rome-to-Tivoli transit time · half-day vs full-day decision guide · both-villas-in-one-day feasibility.

**Villa d'Este + Hadrian's Villa** (`villa deste hadrians villa tour`)
Hook: "The two-villa combo — Renaissance fountains against Roman imperial ruins, a genuine contrast most visitors don't expect from a single day trip." Itinerary highlights: villa-order logic (gardens vs ruins first) · time budget per site · combined-ticket options.

**Private Tivoli Tour** (`private tivoli tour`)
Hook: "A private guide and transport removes the two-bus, one-transfer logistics that make independent Tivoli travel more of a hassle than it needs to be." Itinerary highlights: door-to-door transport included · custom pacing between villas · price vs self-organized transit.

**Half-Day Tivoli** (`half day tivoli tour`)
Hook: "The short option — enough time for Villa d'Este's fountains alone, for travelers who can't spare a full day but still want to see Tivoli's headline site." Itinerary highlights: single-villa focus (Villa d'Este) · realistic round-trip timing · what gets cut versus the full-day version.

### 3.13.6 FAQ bank
- **Which villa should I prioritise if I only have time for one?** "Villa d'Este, for most visitors — its terraced Renaissance fountain gardens are the more visually dramatic and widely photographed site; Hadrian's Villa rewards visitors specifically interested in Roman archaeology and ruins."
- **Can I do Tivoli as a half-day trip from Rome?** "Yes, for Villa d'Este alone — round-trip transit plus a focused 2–2.5 hours at the gardens fits comfortably in a half day; adding Hadrian's Villa realistically needs a full day."
- **How do I get to Tivoli from Rome without a tour?** "Regional trains and a local bus connection are the independent-travel route, with roughly 1–1.5 hours of one-way transit each way — the getting-there page breaks down the exact routing and timing."
- **What's the best season to visit Villa d'Este's gardens?** "Late spring (May) has the fountains at full flow and gardens in bloom; summer is hot with less shade than you'd expect, and the gardens-best-season page has month-by-month notes."
- **Is Tivoli suitable for a family day trip with kids?** "Yes — Villa d'Este's fountains and garden paths are genuinely kid-engaging, though Hadrian's Villa's ruins-and-walking format suits older children better than toddlers."

### 3.13.7 SEO meta
- **Home:** Title: "Tivoli Day Trips — Villa d'Este & Hadrian's Villa Guide" (57c). Description: "First-hand Tivoli day-trip guide from Rome. Villa d'Este vs Hadrian's Villa, half-day vs full-day, and honest transit logistics." (150c)
- **Villa d'Este + Hadrian's Villa:** Title: "Villa d'Este and Hadrian's Villa: Which to See First" (51c). Description: "Combining Villa d'Este's fountains with Hadrian's Villa's ruins in one day — routing, timing, and which site to prioritise." (144c)

---

## 4. Cross-Network Consistency Rules (recap, enforced at build/publish)

Every property in Section 3 must pass these before publish, per doc 00 §7–8:

1. **Keyword-map collision check (M4):** no two pages on the same property share a primary keyword. Verified per-property in each 3.X.3/3.X.5 above — every money and support page listed has a distinct primary keyword.
2. **Schema completeness (M4):** every property emits its stated schema types (Section 3.X.1) on every page — `BreadcrumbList` + `FAQPage` on all pages; `TouristAttraction`/`TouristTrip`/`Course-Event`/`Product-Offer` per template family.
3. **No cross-links between owned sites (M10):** none of the 13 properties link to a sibling hero site, with the sole documented exception of Underground Colosseum's "Our Network" nav/footer (an explicit, recorded override — see its own design blueprint §8). Every other property's Footer/Header `networkLinks` prop stays empty.
4. **No duplicate content (M10):** hero copy, FAQ answers, and itinerary highlights in Section 3 are written per-property, per-niche — no template sentence reused verbatim across two properties, even within the same template family (T1–T6).
5. **First-hand detail in the first 100 words (per-property PRD §6):** every hero sub-headline and money-page hook above leads with a specific, verifiable claim (a transit time, a step count, a price range, a named villa) rather than generic travel-blog language.
6. **Named, credentialed author (M2/M8):** every property's `<AuthorBox>` uses a real byline — no anonymous "Team [Sitename]" credit.
7. **Non-affiliation disclosure where sensitivity requires it:** Private Vatican carries a visible header-level disclosure (not just footer); every property carries the standard footer affiliate-disclosure line regardless.

---

## 5. Build Execution Order

1. Confirm Section 1 design tokens are wired platform-wide (already true — shipped in `tailwind.config.ts`/`globals.css`).
2. Confirm Section 2 shared components accept a themed `accent` override without structural forking (already true for Header/Footer/TourCard/Hero per the shipped redesign).
3. For each property in Section 3, in this order — **Street Food Rome (3.4) and Underground Colosseum (3.1) are already built**, so start with the highest-commercial-intent unbuilt property first:
   - Private Vatican (3.6) — highest sensitivity, second-highest price band, do early while design attention is highest.
   - Pompeii Day Trip (3.2) — deepest keyword cluster, nominated day-trip hub.
   - Rome Vespa (3.3) and Golf Cart Rome (3.7) — build as a pair given their shared vehicle-overlap positioning; keep design tokens visually distinct per 3.3.2/3.7.2 while building.
   - Cooking in Rome (3.8), Rome Pizza Class (3.9), Tiramisù Class (3.10) — build as a trio; verify no content overlap per §4 rule 4 before publishing any of the three.
   - Tuscany Day Trip (3.5), Amalfi Day Trip (3.12), Tivoli Day Trip (3.13) — build as the day-trip-family trio alongside Pompeii; confirm distinct destination framing per each 3.X.1 "special notes."
   - Naples Street Food (3.11) — build last within the food family once Street Food Rome's pattern is stable to copy structurally (not content — content is 100% Naples-specific per 3.11.1).
4. Per property: create Site record (M1) → apply Section 3.X.2 tokens → generate page tree (3.X.3) → populate CMS with Section 3.X.4–3.X.7 copy verbatim → tag Tour collection entries to the property's niche → run keyword-map + schema + governance checks (§4) → publish.
