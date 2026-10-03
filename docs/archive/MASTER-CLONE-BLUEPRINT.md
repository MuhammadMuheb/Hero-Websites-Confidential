# MASTER CLONE BLUEPRINT: 12 network sites = exact copy of Street Food Rome

Branch: **Staging only** (never `main`, no force-push). Read this whole file before writing code.

## 0. The one rule

**Street Food Rome (`/`) is the MASTER.** Every one of the 12 other sites must have:

- the **same pages**,
- the **same sections on every page**, in the **same order**,
- the **same number of items in every section**,
- the **same components, CSS, spacing and behaviour**.

**Only two things change per site: the TEXT and the IMAGES.** The text and images must belong to *that* site's niche. Never show Street Food Rome text, photos or tours on another site.

Two common mistakes to avoid:

- ❌ Copying only the look and keeping the site's old, smaller content. This is wrong.
- ❌ Copying Street Food Rome's text and images onto the other sites. This is also wrong.
- ✅ Same structure plus that site's own text, images and tours. This is right.

## 1. Why the last attempt failed (fix these first)

1. `app/[slug]/page.tsx` passes `getAllTours()`, which is the **Street Food Rome Firestore tours**, to every site. Each site must use its own tours: `FEATURED_TOURS` from `src/lib/<slug>.ts`.
2. Master components still have **hard-coded Rome text**. Every string below must come from the site config:
   - `Hero.tsx`: eyebrow "ROME, ITALY", the H1 "Rome's Ultimate Street Food & Culinary Experiences", the search placeholder, and the `CHIPS` array.
   - `TourCarouselSection.tsx`: eyebrow "Our best selling tours at a glance" and the title "Top Food Tours in Rome".
   - `CategoryToursSection.tsx`: eyebrow "Things you must taste in Rome", the title "Top Food Items to Try in Rome", and the `CATEGORIES` array.
   - `TrustPointsSection.tsx`: the label "Taste the real Rome" and the names.
   - `HowWeChooseDark.tsx`: eyebrow, title, subtitle and the 4 items.
   - `ExploreLinksSection.tsx`: the section title, the 3 tab names and all `ATTRACTIONS` and destination lists.
   - All About components (`AboutHero`, `OurTravelMantraSection`, `ExperiencesBannerSection`, `WhoWritesThisSection`, `HowItStartedSection`, `HowWeChooseSection`).
   - The inner pages' `Hero`/`InnerHero` title, subtitle and eyebrow (tours, blog, FAQ, contact, guides, search, neighbourhoods, legal).
3. **Rule:** after this refactor, `grep -rn "Rome" src/components` must return **no visible text** except inside the Street Food Rome config file.

## 2. Data each site already has (use it, don't invent)

`src/lib/<slug>.ts` and `src/lib/<slug>-content.ts` contain real data for every site:

| Export | Use it for |
|---|---|
| `HERO_IMAGE` | Homepage hero photo |
| `FEATURED_TOURS` (title, partner, meta, priceFrom, badge, image, tags) | Slider cards, the 15 small category cards, the /tours grid |
| `MONEY_PAGES` | Chips, "Top Tours" tab, tour detail/compare pages |
| `SUPPORT_PAGES` | Blog / Guides list and articles, "Guides & Blog" nav |
| `FAQS` | FAQ page (same accordion as master) |
| `QUICK_FACTS`, `*_GALLERY` | About page sections, category images |
| `AUTHOR` | About page "Who writes this" |
| `PRIVACY_POLICY`, `TERMS_OF_SERVICE`, `COOKIE_POLICY`, `AFFILIATE_DISCLOSURE` | Legal pages (in the master legal layout) |
| `get*PageContent()` in `-content.ts` | Body text of the money and support pages |

If a site has fewer tours than a section needs (for example Naples has 4), **reuse that same site's real tours** across the category rows. Never create tours, prices, ratings or reviews.

## 3. Architecture

1. There is one `SiteConfig` type in `src/lib/sites/config.ts`, with one file per site in `src/lib/sites/<slug>.ts` (13 files).
2. Every master component takes its text and images **only** from props or the config. There is no Rome fallback text inside components.
3. `app/page.tsx` and `app/[slug]/page.tsx` both render `<HomePageBody config={config} tours={siteTours} ...>`.
4. Inner pages for the 12 sites (`app/[slug]/[...rest]`) must render the **master page components** (the same ones as `/about`, `/tours`, `/blog`, and so on) with that site's config and data. Stop using the old per-site templates (`XXHome.tsx`, `NetworkHomeTemplate`, `MoneyPageTemplate`, `SupportPageTemplate`, `XXContactPage`, `XXFAQPage`) for layout. Keep only their DATA.
5. `next.config`: add permanent redirects `/street-food-rome` → `/` and `/street-food-rome/:path*` → `/:path*`.

## 4. Page-by-page spec (master → every site)

"Site URL" means `/<slug>/...` for the 12 sites.

| # | Master page | Site URL | Sections (same order, same count) | Data source per site |
|---|---|---|---|---|
| 1 | `/` Home | `/<slug>` | See §5 (9 sections) | config + FEATURED_TOURS |
| 2 | `/about` | `/<slug>/about` | AboutHero → Our Travel Mantra → Experiences Banner → Who Writes This → How It Started → How We Choose (4 steps with images) → Places You Can Plan Your Next Trip (3 tabs) | config.about + AUTHOR + QUICK_FACTS + GALLERY |
| 3 | `/contact` | `/<slug>/contact` | Hero (title + subtitle) → "Contact Us" header → 3 blocks: Ways to Reach Us / Send a Message form / Quick Answers | config.contact (site e-mail) + first 3 FAQS |
| 4 | `/faq` | `/<slug>/faq` | Hero → "Common Questions" header + subtitle → FAQ accordion (**10 questions**, same as master) | FAQS (write more real Q&As if fewer than 10) |
| 5 | `/tours` | `/<slug>/tours` | Hero → "Filter by Category" (5 categories) → "Filter by Area" → grid of all tour cards | FEATURED_TOURS + config.categories + config.areas |
| 6 | `/tours/category/[c]` | `/<slug>/tours/category/[c]` | InnerHero (eyebrow + title + subtitle) → tour cards of that category. **5 category pages per site** (the same 5 as the homepage rows) | config.categories |
| 7 | `/tours/[slug]` | `/<slug>/tours/[tour]` or the money page URL | Master TourPageContent layout | MONEY_PAGES content + FEATURED_TOURS |
| 8 | `/blog` | `/<slug>/blog` | InnerHero (eyebrow "<Site> Blog" + title + subtitle) → post cards with image | SUPPORT_PAGES |
| 9 | `/blog/[slug]` | `/<slug>/blog/[post]` or the support page URL | Master article layout (image, H1, body, related) | `get*SupportPageContent()` |
| 10 | `/blog/category/[c]` | `/<slug>/blog/category/[c]` | InnerHero → "Explore by category" → post cards → "Our Network" | SUPPORT_PAGES grouped |
| 11 | `/neighborhoods` | `/<slug>/areas` (or neighborhoods) | InnerHero → list of area cards | config.areas (the site's real places, e.g. Vatican: Sistine Chapel, St. Peter's…) |
| 12 | `/neighborhoods/[n]` | `/<slug>/areas/[a]` | InnerHero (eyebrow "Area Guide") → text → "Tours here" tour cards | config.areas + FEATURED_TOURS |
| 13 | `/guides` | `/<slug>/guides` | Hero → "Journal / Latest Guides" → JournalCards | SUPPORT_PAGES |
| 14 | `/search` | shared | Same page, results grouped: Tours / Blog Posts / Pages / Network | global search |
| 15 | `/privacy` | `/<slug>/privacy` | Master legal layout | PRIVACY_POLICY |
| 16 | `/terms` | `/<slug>/terms` | Master legal layout | TERMS_OF_SERVICE |
| 17 | `/cookie-policy` | `/<slug>/cookie-policy` | InnerHero → 5 headings, same as master | COOKIE_POLICY |
| 18 | `/affiliate-disclosure` | `/<slug>/affiliate-disclosure` | InnerHero → 4 headings, same as master | AFFILIATE_DISCLOSURE |
| 19 | 404 | shared | Same 404 page; the text must not mention Rome on other sites | config.notFoundLine |

Navbar and footer stay the same components; they already switch per site from the URL.

## 5. Homepage: exact counts (validator enforces these)

| # | Section | Count per site |
|---|---|---|
| 1 | Hero: eyebrow, H1 with **1 gold word**, hero photo, search bar on the bottom edge | 1 |
| 2 | Chips row with ‹ › arrows | **20 chips**, each linking to a real page of that site (money pages, support pages, category pages, areas, or `/search?q=term`) |
| 3 | Names strip (2 rows) + label | **10 names** |
| 4 | Slider: eyebrow + title + 4 visible cards | **min 8 cards** (all real tours if the site has fewer) |
| 5 | Category rows: eyebrow + title + 5 rows (1 big card + 3 small cards) | **5 big + 15 small**. Each big card has a name, a description, an image, a count and a "From €" price |
| 6 | How We Choose (dark): eyebrow + title + subtitle + items | **4 items** (icon, title, text) |
| 7 | Places You Can Plan Your Next Trip | **3 tabs × 20 items** |
| 8 | Our Network | **13 cards** |
| 9 | Footer | same 4 columns |

## 6. Per-site homepage content sheet (use these; improve the wording if you like, but keep the meaning)

Format: **eyebrow | H1 (gold word in [ ]) | slider title | category section title | 5 categories | 10 names**

1. **underground-colosseum**: COLOSSEUM, ROME | Rome's Colosseum [Underground] & Arena Floor Tours | Top Colosseum Tours in Rome | Top Colosseum Areas to Explore | Underground (Hypogeum) · Arena Floor · Skip-the-Line Tickets · Private & Small Group · Colosseum + Forum & Palatine | Hypogeum, Arena Floor, Third Tier, Gladiator Gate, Roman Forum, Palatine Hill, Arch of Constantine, Ludus Magnus, Colosseum at Night, Domus Aurea
2. **pompeii-day-trip**: POMPEII, ITALY | [Pompeii] Day Trips from Rome & Naples | Top Pompeii Day Trips | Top Ways to See Pompeii | From Rome · From Naples · Pompeii + Vesuvius · Pompeii + Sorrento & Amalfi · Guided & Skip-the-Line | Forum of Pompeii, House of the Faun, Villa of the Mysteries, Amphitheatre, Lupanar, Stabian Baths, Garden of the Fugitives, Mount Vesuvius, Herculaneum, Naples Archaeological Museum
3. **rome-vespa**: ROME, ITALY | Rome by [Vespa]: Guided, Sidecar & Sunset Rides | Top Vespa Tours in Rome | Top Ways to Ride Rome | Guided Vespa Tours · Sidecar Tours · Sunset & Night Rides · Self-Drive Rental · Vespa + Food | Trastevere, Aventine Keyhole, Gianicolo Hill, Colosseum, Circus Maximus, Appian Way, Pyramid of Cestius, Monti, Villa Borghese, Testaccio
4. **tuscany-day-trip**: TUSCANY, ITALY | [Tuscany] Day Trips from Rome & Florence | Top Tuscany Day Trips | Top Tuscany Experiences | Wine Tasting · Hill Towns · Val d'Orcia · Siena & San Gimignano · Florence & Pisa | Chianti, Siena, San Gimignano, Montepulciano, Montalcino, Pienza, Val d'Orcia, Cortona, Florence, Pisa
5. **private-vatican**: VATICAN CITY, ROME | Private & Early-Entry [Vatican] Tours | Top Vatican Tours in Rome | Top Vatican Experiences | Early Entry · Private Guides · Skip-the-Line Tickets · Family Tours · Vatican + St. Peter's Combo | Sistine Chapel, St. Peter's Basilica, Raphael Rooms, Gallery of Maps, Pinacoteca, Pio-Clementino Museum, Vatican Gardens, St. Peter's Dome, Bramante Staircase, Castel Sant'Angelo
6. **golf-cart-rome**: ROME, ITALY | Rome [Golf Cart] Tours: See More, Walk Less | Top Golf Cart Tours in Rome | Top Golf Cart Experiences | City Highlights · Private Golf Cart · Evening & Night · Family & Accessible · Golf Cart + Food & Gelato | Trevi Fountain, Pantheon, Piazza Navona, Spanish Steps, Colosseum, Vittoriano, Circus Maximus, Aventine Keyhole, Trastevere, Piazza del Popolo
7. **cooking-in-rome**: ROME, ITALY | [Cooking] Classes in Rome with Local Chefs | Top Cooking Classes in Rome | Top Dishes to Cook in Rome | Pasta Making · Pizza Making · Tiramisu & Desserts · Market + Cooking · Wine & Dinner Classes | Fettuccine, Ravioli, Cacio e Pepe, Carbonara, Amatriciana, Gnocchi, Tiramisu, Supplì, Campo de' Fiori Market, Testaccio Market
8. **rome-pizza-class**: ROME, ITALY | [Pizza] Making Classes in Rome | Top Pizza Classes in Rome | Top Pizza Styles to Learn | Roman Pizza · Neapolitan-Style · Pizza + Gelato · Family & Kids · Pizza + Wine Evening | Pizza al Taglio, Pizza Tonda Romana, Pizza Bianca, Margherita, Marinara, Supplì, Wood-Fired Oven, Dough & Fermentation, Mozzarella di Bufala, Gelato
9. **tiramisu-class**: ROME, ITALY | [Tiramisu] Classes in Rome | Top Tiramisu Classes in Rome | Top Sweet Classes to Try | Tiramisu Classes · Tiramisu + Gelato · Tiramisu + Pasta · Family & Kids · Private Classes | Mascarpone, Savoiardi, Espresso, Cocoa, Marsala, Zabaglione, Gelato, Maritozzo, Panna Cotta, Cannoli
10. **naples-street-food**: NAPLES, ITALY | Naples [Street Food] Tours | Top Street Food Tours in Naples | Top Food Items to Try in Naples | Neapolitan Pizza · Fried Street Food · Pastries · Spanish Quarter Walks · Coffee & Markets | Pizza Margherita, Pizza Fritta, Cuoppo, Frittatina, Sfogliatella, Babà, Taralli, Neapolitan Espresso, Spaccanapoli, Quartieri Spagnoli
11. **amalfi-day-trip**: AMALFI COAST, ITALY | [Amalfi Coast] Day Trips from Rome, Naples & Sorrento | Top Amalfi Coast Day Trips | Top Amalfi Coast Experiences | From Rome · From Naples & Sorrento · Boat Tours · Positano & Amalfi · Ravello & Villas | Positano, Amalfi, Ravello, Sorrento, Capri, Praiano, Furore Fjord, Villa Rufolo, Villa Cimbrone, Path of the Gods
12. **tivoli-day-trip**: TIVOLI, ITALY | [Tivoli] Day Trips from Rome: Villa d'Este & Hadrian's Villa | Top Tivoli Day Trips | Top Tivoli Sights | Villa d'Este · Hadrian's Villa · Both Villas Full-Day · Private Guide · Self-Guided by Train | Villa d'Este, Hadrian's Villa, Fountain of Neptune, Hundred Fountains, Organ Fountain, Canopus, Maritime Theatre, Villa Gregoriana, Temple of Vesta, Tivoli Old Town

For each site, also write in its niche:

- **How We Choose:** 4 items. Keep the same structure as the master (Authentic / Local-Led / … adapted to the niche). **No numbers or years unless they are true.**
- **Places tabs:** "Top Attractions" (20 real places for the site's area), "Top Destinations" (20: the network sites plus nearby towns), "Top Tours" (20: the site's MONEY_PAGES and tours; repeat categories if needed).
- **Category images:** use the site's own images (FEATURED_TOURS images, GALLERY, or new Unsplash photos with correct alt text). Every image must be different from Street Food Rome's.
- **Meta:** a unique `<title>` (≤ 60 chars) and description (≤ 155 chars) per page, plus JSON-LD (WebSite, Organization, ItemList of the site's own tours).

## 7. Validator (build must fail if anything is missing)

Create `src/lib/sites/validateSiteConfig.ts` and run it for all 13 configs at build time (for example, import it in `app/[slug]/page.tsx` `generateStaticParams`). It must throw an error like `private-vatican: chips 7/20` when anything is missing.

It must check:

- the hero fields,
- chips = 20,
- names = 10,
- slider ≥ min(8, tours),
- categories = 5, each with name, description, image and ≥ 1 tour,
- howWeChoose = 4,
- 3 place tabs × 20 items,
- the about fields,
- FAQ ≥ 10,
- all legal docs present,
- no image URL shared with the Street Food Rome config (except network/shared assets),
- no text containing "Street Food Rome" outside its own config.

## 8. Done check (do it yourself before replying)

1. `pnpm install --frozen-lockfile && pnpm turbo run build --filter=@italy-tours/web` passes with 0 errors and the validator on.
2. Open **all 13 homepages** and, for 2 sites, all 19 page types, at 1440px and 375px. Confirm:
   - the section order matches the master,
   - no Rome street-food text or photos appear on other sites,
   - there are no 404s from the navbar, footer or chips,
   - there are no broken images.
3. Push to **Staging** only. Update PROGRESS.md.
4. Reply with **only** this table:

`site | home 9/9 | about | contact | faq | tours | categories 5/5 | blog | areas | legal 4/4 | tours used | issues`

Do not ask for confirmation. Commit + push after every 4 sites so nothing is lost.
