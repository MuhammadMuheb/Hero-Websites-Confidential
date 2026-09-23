/**
 * SEO title/description for every property's standard sub-pages, keyed by
 * property slug then page type. Money/support pages carry their own
 * metaTitle/metaDescription in each property's *-content.ts file instead.
 */
export type NetworkPageType = 'about' | 'contact' | 'faq' | 'privacy' | 'terms' | 'cookie-policy' | 'affiliate-disclosure' | 'tours' | 'blog' | 'neighborhoods';

export interface PageMeta {
  title: string;
  description: string;
}

export const NETWORK_PAGE_META: Record<string, { brand: string; pages: Partial<Record<NetworkPageType, PageMeta>> }> = {
  "underground-colosseum": {
    "brand": "Underground Colosseum",
    "pages": {
      "about": {
        "title": "About Underground Colosseum — Independent Research",
        "description": "Every Colosseum underground tour comparison here is written by someone who walked the routes in person — zero sponsored placements."
      },
      "contact": {
        "title": "Contact | Underground Colosseum",
        "description": "Get in touch with Underground Colosseum, plus our full affiliate disclosure."
      },
      "faq": {
        "title": "FAQ | Underground Colosseum",
        "description": "Frequently asked questions about Colosseum underground access, booking, and tour planning."
      },
      "privacy": {
        "title": "Privacy Policy | Underground Colosseum",
        "description": "How Underground Colosseum handles your data and privacy."
      },
      "terms": {
        "title": "Terms of Service | Underground Colosseum",
        "description": "Terms of service and conditions for using Underground Colosseum."
      },
      "cookie-policy": {
        "title": "Cookie Policy | Underground Colosseum",
        "description": "How Underground Colosseum uses cookies and similar technologies."
      },
      "affiliate-disclosure": {
        "title": "Affiliate Disclosure | Underground Colosseum",
        "description": "Full transparency about how Underground Colosseum works and earns money."
      },
      "tours": {
        "title": "Featured Underground & Arena Tours | Underground Colosseum",
        "description": "Colosseum underground and arena-floor access options compared"
      },
      "blog": {
        "title": "Guides & Planning Tips | Underground Colosseum",
        "description": "Travel tips, history, and planning guides for the Colosseum."
      },
      "neighborhoods": {
        "title": "Explore the Colosseum by Area | Underground Colosseum",
        "description": "Guide to different zones and sections within the Colosseum"
      }
    }
  },
  "private-vatican": {
    "brand": "Private Vatican",
    "pages": {
      "about": {
        "title": "About Private Vatican — Independent Research",
        "description": "Every Vatican early-access and private tour comparison here is written by a licensed Rome guide who took the tours in person — not affiliated with the Vatican Museums."
      },
      "contact": {
        "title": "Contact | Private Vatican",
        "description": "Get in touch with Private Vatican, plus our full affiliate disclosure and non-affiliation statement."
      },
      "faq": {
        "title": "FAQ | Private Vatican",
        "description": "Frequently asked questions about Vatican tours, early access, and private guides."
      },
      "privacy": {
        "title": "Privacy Policy | Private Vatican",
        "description": "How Private Vatican handles your data and privacy."
      },
      "terms": {
        "title": "Terms of Service | Private Vatican",
        "description": "Terms of service and conditions for using Private Vatican."
      },
      "cookie-policy": {
        "title": "Cookie Policy | Private Vatican",
        "description": "Cookie policy and how Private Vatican uses cookies."
      },
      "affiliate-disclosure": {
        "title": "Affiliate Disclosure | Private Vatican",
        "description": "How we earn money and our affiliate partnerships with tour booking platforms."
      },
      "tours": {
        "title": "Featured Vatican Tours | Private Vatican",
        "description": "Curated Vatican early-access, private, and skip-the-line tours compared."
      },
      "blog": {
        "title": "Guides & Planning Tips | Private Vatican",
        "description": "Travel tips, Vatican guides, and planning advice."
      }
    }
  },
  "pompeii-day-trip": {
    "brand": "Pompeii Day Trip",
    "pages": {
      "about": {
        "title": "About Pompeii Day Trip — Independent Research",
        "description": "Every Pompeii day-trip comparison here is written by a Bay of Naples regional guide who has run the trip from Rome, Naples, and Sorrento in person — zero sponsored placements."
      },
      "contact": {
        "title": "Contact | Pompeii Day Trip",
        "description": "Get in touch with Pompeii Day Trip, plus our full affiliate disclosure."
      },
      "faq": {
        "title": "FAQ | Pompeii Day Trip",
        "description": "Frequently asked questions about Pompeii day trips — planning, timing, and logistics."
      },
      "privacy": {
        "title": "Privacy Policy | Pompeii Day Trip",
        "description": "How Pompeii Day Trip handles your data and privacy."
      },
      "terms": {
        "title": "Terms of Service | Pompeii Day Trip",
        "description": "Terms of service and conditions for using Pompeii Day Trip."
      },
      "cookie-policy": {
        "title": "Cookie Policy | Pompeii Day Trip",
        "description": "How Pompeii Day Trip uses cookies and similar technologies."
      },
      "affiliate-disclosure": {
        "title": "Affiliate Disclosure | Pompeii Day Trip",
        "description": "Full transparency about how Pompeii Day Trip works and earns money."
      },
      "tours": {
        "title": "Featured Pompeii Tours | Pompeii Day Trip",
        "description": "Curated Pompeii day trips from Rome, Naples, Sorrento, and the Amalfi Coast"
      },
      "blog": {
        "title": "Guides & Planning Tips | Pompeii Day Trip",
        "description": "Travel tips, history, and planning guides for Pompeii."
      },
      "neighborhoods": {
        "title": "Explore Pompeii by Area | Pompeii Day Trip",
        "description": "Guide to different zones and landmarks within the Pompeii archaeological site"
      }
    }
  },
  "rome-vespa": {
    "brand": "Rome Scooter Tours",
    "pages": {
      "about": {
        "title": "About Rome Scooter Tours — Independent Research",
        "description": "Every Rome Vespa and sidecar tour comparison here is written by a licensed motorcycle instructor who rode the routes in person — zero sponsored placements."
      },
      "contact": {
        "title": "Contact | Rome Scooter Tours",
        "description": "Get in touch with Rome Scooter Tours, plus our full affiliate disclosure."
      },
      "faq": {
        "title": "FAQ | Rome Scooter Tours",
        "description": "Frequently asked questions about Vespa tours, licences, and safety in Rome traffic."
      },
      "privacy": {
        "title": "Privacy Policy | Rome Scooter Tours",
        "description": "How Rome Scooter Tours handles your data and privacy."
      },
      "terms": {
        "title": "Terms of Service | Rome Scooter Tours",
        "description": "Terms of service and conditions for using Rome Scooter Tours."
      },
      "cookie-policy": {
        "title": "Cookie Policy | Rome Scooter Tours",
        "description": "How Rome Scooter Tours uses cookies and similar technologies."
      },
      "affiliate-disclosure": {
        "title": "Affiliate Disclosure | Rome Scooter Tours",
        "description": "Full transparency about how Rome Scooter Tours works and earns money."
      },
      "tours": {
        "title": "Featured Vespa Tours in Rome | Rome Scooter Tours",
        "description": "Guided, self-drive, sidecar, and private Vespa tour options in Rome"
      },
      "blog": {
        "title": "Guides & Planning Tips | Rome Scooter Tours",
        "description": "Travel tips, riding guides, and Vespa tour planning articles."
      },
      "neighborhoods": {
        "title": "Ride Rome by Neighborhood | Rome Scooter Tours",
        "description": "Guide to different neighborhoods where Vespa tours thrive"
      }
    }
  },
  "golf-cart-rome": {
    "brand": "Golf Cart Rome",
    "pages": {
      "about": {
        "title": "About Golf Cart Rome — Independent Research",
        "description": "Every Golf Cart Rome tour comparison here is written by a certified accessible-travel consultant who checked boarding, mobility, and comfort in person — zero sponsored placements."
      },
      "contact": {
        "title": "Contact | Golf Cart Rome",
        "description": "Get in touch with Golf Cart Rome, plus our full affiliate disclosure."
      },
      "faq": {
        "title": "FAQ | Golf Cart Rome",
        "description": "Answers on golf cart tour accessibility, mobility needs, booking and what each route covers in Rome."
      },
      "privacy": {
        "title": "Privacy Policy | Golf Cart Rome",
        "description": "How Golf Cart Rome handles your data and privacy."
      },
      "terms": {
        "title": "Terms of Service | Golf Cart Rome",
        "description": "Terms of service and conditions for using Golf Cart Rome."
      },
      "cookie-policy": {
        "title": "Cookie Policy | Golf Cart Rome",
        "description": "How Golf Cart Rome uses cookies and similar technologies."
      },
      "affiliate-disclosure": {
        "title": "Affiliate Disclosure | Golf Cart Rome",
        "description": "How Golf Cart Rome earns money from booking partners, and why it never affects our rankings."
      },
      "tours": {
        "title": "Golf Cart Tours of Rome Compared | Golf Cart Rome",
        "description": "Guided, seated golf cart tours of Rome compared — private, family, night and accessible options with honest prices."
      },
      "blog": {
        "title": "Guides & Planning Tips | Golf Cart Rome",
        "description": "Planning guides and honest tour comparisons from Golf Cart Rome."
      }
    }
  },
  "cooking-in-rome": {
    "brand": "Cooking in Rome",
    "pages": {
      "about": {
        "title": "About Cooking in Rome — Independent Research",
        "description": "Every Rome cooking class comparison here is written by a Rome-based culinary instructor who has taken the classes in person — zero sponsored placements."
      },
      "contact": {
        "title": "Contact | Cooking in Rome",
        "description": "Get in touch with Cooking in Rome, plus our full affiliate disclosure."
      },
      "faq": {
        "title": "FAQ | Cooking in Rome",
        "description": "Frequently asked questions about cooking classes, bookings, and what this site covers."
      },
      "privacy": {
        "title": "Privacy Policy | Cooking in Rome",
        "description": "How Cooking in Rome handles your information and cookies."
      },
      "terms": {
        "title": "Terms of Service | Cooking in Rome",
        "description": "Terms and conditions for using Cooking in Rome."
      },
      "cookie-policy": {
        "title": "Cookie Policy | Cooking in Rome",
        "description": "How Cooking in Rome uses cookies."
      },
      "affiliate-disclosure": {
        "title": "Affiliate Disclosure | Cooking in Rome",
        "description": "How Cooking in Rome earns money and how it affects our recommendations."
      },
      "tours": {
        "title": "Cooking Classes in Rome | Cooking in Rome",
        "description": "Featured cooking classes in Rome — pasta-making, pizza, gelato, and market-to-table experiences."
      },
      "blog": {
        "title": "Guides & Planning Tips | Cooking in Rome",
        "description": "Articles about cooking techniques, Roman ingredients, and local food culture."
      }
    }
  },
  "rome-pizza-class": {
    "brand": "Rome Pizza Class",
    "pages": {
      "about": {
        "title": "About Rome Pizza Class — Independent Research",
        "description": "Every Rome pizza-making class comparison here is written by a Rome-based pizzaiolo who has taken the classes in person — zero sponsored placements."
      },
      "contact": {
        "title": "Contact | Rome Pizza Class",
        "description": "Get in touch with Rome Pizza Class, plus our full affiliate disclosure."
      },
      "faq": {
        "title": "Pizza Class FAQ | Rome Pizza Class",
        "description": "Common questions about Rome pizza-making classes, wood-fired ovens, and class bookings."
      },
      "privacy": {
        "title": "Privacy Policy | Rome Pizza Class",
        "description": "Privacy Policy for Rome Pizza Class."
      },
      "terms": {
        "title": "Terms of Service | Rome Pizza Class",
        "description": "Terms of Service for Rome Pizza Class."
      },
      "cookie-policy": {
        "title": "Cookie Policy | Rome Pizza Class",
        "description": "Cookie Policy for Rome Pizza Class."
      },
      "affiliate-disclosure": {
        "title": "Affiliate Disclosure | Rome Pizza Class",
        "description": "How Rome Pizza Class works and how we make money — full transparency."
      },
      "tours": {
        "title": "Featured Pizza-Making Classes | Rome Pizza Class",
        "description": "Featured Rome pizza-making classes — hands-on, wood-fired oven, family-friendly and private options."
      },
      "blog": {
        "title": "Guides & Planning Tips | Rome Pizza Class",
        "description": "Pizza technique guides, dough hydration notes, and Rome cooking class planning."
      }
    }
  },
  "tiramisu-class": {
    "brand": "Tiramisù Class",
    "pages": {
      "about": {
        "title": "About Tiramisù Class — Independent Research",
        "description": "Every Rome tiramisù class comparison here is written by a Rome-based pastry chef who has taken the classes in person — zero sponsored placements."
      },
      "contact": {
        "title": "Contact | Tiramisù Class",
        "description": "Get in touch with Tiramisù Class, plus our full affiliate disclosure."
      },
      "faq": {
        "title": "FAQ | Tiramisù Class",
        "description": "Common questions about Rome tiramisù classes: what you make, dietary needs, booking and cancellations."
      },
      "privacy": {
        "title": "Privacy Policy | Tiramisù Class",
        "description": "How Tiramisù Class handles your data and privacy."
      },
      "terms": {
        "title": "Terms of Service | Tiramisù Class",
        "description": "Terms of service and conditions for using Tiramisù Class."
      },
      "cookie-policy": {
        "title": "Cookie Policy | Tiramisù Class",
        "description": "How Tiramisù Class uses cookies and similar technologies."
      },
      "affiliate-disclosure": {
        "title": "Affiliate Disclosure | Tiramisù Class",
        "description": "How Tiramisù Class earns money from booking partners, and why it never affects our rankings."
      },
      "tours": {
        "title": "Tiramisù & Dessert Classes in Rome | Tiramisù Class",
        "description": "Hands-on tiramisù and Italian dessert classes in Rome compared — group, private, gelato combo and gift options."
      },
      "blog": {
        "title": "Guides & Planning Tips | Tiramisù Class",
        "description": "Planning guides and honest tour comparisons from Tiramisù Class."
      }
    }
  },
  "tuscany-day-trip": {
    "brand": "Tuscany Day Trip",
    "pages": {
      "about": {
        "title": "About Tuscany Day Trip — Independent Research",
        "description": "Every Tuscany day-trip comparison here is written by a Florence-based licensed regional guide who has driven and walked the routes in person — zero sponsored placements."
      },
      "contact": {
        "title": "Contact | Tuscany Day Trip",
        "description": "Get in touch with Tuscany Day Trip, plus our full affiliate disclosure."
      },
      "faq": {
        "title": "FAQ | Tuscany Day Trip",
        "description": "Frequently asked questions about Tuscany day trips, wine tours, and planning."
      },
      "privacy": {
        "title": "Privacy Policy | Tuscany Day Trip",
        "description": "Our privacy policy and how we handle your data."
      },
      "terms": {
        "title": "Terms of Service | Tuscany Day Trip",
        "description": "Terms and conditions for using Tuscany Day Trip."
      },
      "cookie-policy": {
        "title": "Cookie Policy | Tuscany Day Trip",
        "description": "How Tuscany Day Trip uses cookies and tracking technologies."
      },
      "affiliate-disclosure": {
        "title": "Affiliate Disclosure | Tuscany Day Trip",
        "description": "Full transparency about how this site works and how we make money."
      },
      "tours": {
        "title": "Featured Tuscany Tours | Tuscany Day Trip",
        "description": "Curated Tuscany day trips from Florence — wine tours, hill towns, and countryside routes."
      },
      "blog": {
        "title": "Guides & Planning Tips | Tuscany Day Trip",
        "description": "Travel tips, wine guides, and planning advice for Tuscany."
      }
    }
  },
  "amalfi-day-trip": {
    "brand": "Amalfi Day Trip",
    "pages": {
      "about": {
        "title": "About Amalfi Day Trip — Independent Research",
        "description": "Every Amalfi Coast day trip comparison here is written by someone who drove, sailed, and walked the routes in person — zero sponsored placements."
      },
      "contact": {
        "title": "Contact | Amalfi Day Trip",
        "description": "Get in touch with Amalfi Day Trip, plus our full affiliate disclosure."
      },
      "faq": {
        "title": "FAQ | Amalfi Day Trip",
        "description": "Answers on Amalfi Coast day trips: road vs boat, best towns, summer crowds, timing and booking."
      },
      "privacy": {
        "title": "Privacy Policy | Amalfi Day Trip",
        "description": "How Amalfi Day Trip handles your data and privacy."
      },
      "terms": {
        "title": "Terms of Service | Amalfi Day Trip",
        "description": "Terms of service and conditions for using Amalfi Day Trip."
      },
      "cookie-policy": {
        "title": "Cookie Policy | Amalfi Day Trip",
        "description": "How Amalfi Day Trip uses cookies and similar technologies."
      },
      "affiliate-disclosure": {
        "title": "Affiliate Disclosure | Amalfi Day Trip",
        "description": "How Amalfi Day Trip earns money from booking partners, and why it never affects our rankings."
      },
      "tours": {
        "title": "Amalfi Coast Day Trips Compared | Amalfi Day Trip",
        "description": "Amalfi Coast day trips from Rome, Naples and Sorrento compared — by road or by boat, with honest timing and prices."
      },
      "blog": {
        "title": "Guides & Planning Tips | Amalfi Day Trip",
        "description": "Planning guides and honest tour comparisons from Amalfi Day Trip."
      }
    }
  },
  "tivoli-day-trip": {
    "brand": "Tivoli Day Trip",
    "pages": {
      "about": {
        "title": "About Tivoli Day Trip — Independent Research",
        "description": "Every Tivoli day trip comparison here is written by someone who walked both villas in person — zero sponsored placements."
      },
      "contact": {
        "title": "Contact | Tivoli Day Trip",
        "description": "Get in touch with Tivoli Day Trip, plus our full affiliate disclosure."
      },
      "faq": {
        "title": "FAQ | Tivoli Day Trip",
        "description": "Answers on Tivoli day trips: getting there from Rome, which villa to prioritise, timing and tickets."
      },
      "privacy": {
        "title": "Privacy Policy | Tivoli Day Trip",
        "description": "How Tivoli Day Trip handles your data and privacy."
      },
      "terms": {
        "title": "Terms of Service | Tivoli Day Trip",
        "description": "Terms of service and conditions for using Tivoli Day Trip."
      },
      "cookie-policy": {
        "title": "Cookie Policy | Tivoli Day Trip",
        "description": "How Tivoli Day Trip uses cookies and similar technologies."
      },
      "affiliate-disclosure": {
        "title": "Affiliate Disclosure | Tivoli Day Trip",
        "description": "How Tivoli Day Trip earns money from booking partners, and why it never affects our rankings."
      },
      "tours": {
        "title": "Tivoli Day Trips from Rome Compared | Tivoli Day Trip",
        "description": "Villa d'Este and Hadrian's Villa day trips from Rome compared — full-day, half-day, private and self-guided."
      },
      "blog": {
        "title": "Guides & Planning Tips | Tivoli Day Trip",
        "description": "Planning guides and honest tour comparisons from Tivoli Day Trip."
      }
    }
  },
  "naples-street-food": {
    "brand": "Naples Street Food",
    "pages": {
      "about": {
        "title": "About Naples Street Food — Independent Research",
        "description": "Every Naples food tour comparison here is written by a guide who actually visits Naples — honest recommendations, no sponsored placements."
      },
      "contact": {
        "title": "Contact | Naples Street Food",
        "description": "Get in touch with Naples Street Food, plus our full affiliate disclosure."
      },
      "faq": {
        "title": "FAQ | Naples Street Food",
        "description": "Answers on Naples food tours: what you eat, dietary needs, meeting points, timing and booking."
      },
      "privacy": {
        "title": "Privacy Policy | Naples Street Food",
        "description": "How Naples Street Food handles your data and privacy."
      },
      "terms": {
        "title": "Terms of Service | Naples Street Food",
        "description": "Terms of service and conditions for using Naples Street Food."
      },
      "cookie-policy": {
        "title": "Cookie Policy | Naples Street Food",
        "description": "How Naples Street Food uses cookies and similar technologies."
      },
      "affiliate-disclosure": {
        "title": "Affiliate Disclosure | Naples Street Food",
        "description": "How Naples Street Food earns money from booking partners, and why it never affects our rankings."
      },
      "tours": {
        "title": "Naples Street Food Tours Compared | Naples Street Food",
        "description": "Naples street food, pizza and market tours compared — routes through Spaccanapoli, what you taste and honest prices."
      },
      "blog": {
        "title": "Guides & Planning Tips | Naples Street Food",
        "description": "Planning guides and honest tour comparisons from Naples Street Food."
      }
    }
  }
};
