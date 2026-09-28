import * as PV from '@/lib/private-vatican';

export interface AboutContent {
  hero: {
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
  };
  mantra: {
    title: string;
    items: Array<{ icon: string; title: string; description: string }>;
  };
  experiences: {
    title: string;
    description: string;
    imageUrl: string;
  };
  whoWrites: {
    name: string;
    role: string;
    bio: string;
    imageUrl: string;
  };
  howItStarted: {
    title: string;
    paragraphs: string[];
    imageUrl: string;
  };
  howWeChoose: Array<{
    title: string;
    description: string;
  }>;
  exploreLinks: {
    title: string;
    attractions: Array<{ label: string; href: string }>;
    topTours: Array<{ label: string; href: string }>;
  };
}

export function getAboutContent(slug: string): AboutContent {
  if (slug === 'private-vatican') {
    return {
      hero: {
        title: 'Private & Early-Entry Vatican, Walked and Understood by Local Guides',
        description: 'Honest comparisons of Vatican Museums, Sistine Chapel, and St. Peter\'s — skip-the-line options, private guides, and what each choice actually includes.',
        imageUrl: 'https://images.unsplash.com/photo-1576016770956-debb63d92058?w=1600&q=80',
        imageAlt: 'The Sistine Chapel ceiling frescoes during a quiet early-entry visit',
      },
      mantra: {
        title: 'Our Travel Mantra',
        items: [
          { icon: '✓', title: 'Authentic', description: 'Every tour and experience has been personally visited and verified.' },
          { icon: '✓', title: 'Honest', description: 'No commissions or sponsorships — just independent recommendations.' },
          { icon: '✓', title: 'Practical', description: 'Crowd levels, wait times, and real pricing matter as much as beauty.' },
        ],
      },
      experiences: {
        title: 'Vatican, Understood',
        description: 'Each tour option has a different crowd level, timing, and access level. This guide compares them on what actually matters.',
        imageUrl: 'https://images.unsplash.com/photo-1642147039034-11d0e1f70fed?w=1600&q=80',
      },
      whoWrites: {
        name: PV.AUTHOR?.name || 'Local Guide',
        role: PV.AUTHOR?.title || 'Vatican Expert',
        bio: 'Someone who has actually been to every early-entry tour, private guide option, and ticket type — and can tell you what each one is really like.',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      },
      howItStarted: {
        title: 'How This Started',
        paragraphs: [
          'Vatican Museums can feel overwhelming. There are dozens of ticket types, early-entry times, private guide options, and audio guide add-ons. Which one is worth the money?',
          'This guide exists because I kept getting the same questions from friends visiting Rome. "Is early entry really worth it?" "What\'s the difference between these two private guide options?" "Can you actually skip the line?"',
          'Rather than send the same email each time, I documented what I\'ve learned by taking each tour, comparing wait times, and asking guides about their differences. Everything here has been personally experienced.',
        ],
        imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80',
      },
      howWeChoose: [
        { title: 'Authenticity', description: 'Every option has been experienced firsthand, not researched from reviews.' },
        { title: 'Honest Pricing', description: 'We show the real cost and what you actually get — no upsells hidden in fine print.' },
        { title: 'Crowd Reality', description: 'We compare by what matters: wait times, group sizes, and peak hours, not just stars.' },
        { title: 'Local Perspective', description: 'Guides who know Vatican\'s rhythms advise on timing, routes, and which extras are worth it.' },
      ],
      exploreLinks: {
        title: 'Places You Can Plan Your Next Trip',
        attractions: [
          { label: 'Sistine Chapel', href: '/blog' },
          { label: 'St. Peter\'s Basilica', href: '/blog' },
          { label: 'Raphael Rooms', href: '/blog' },
          { label: 'Gallery of Maps', href: '/blog' },
          { label: 'Pinacoteca', href: '/blog' },
          { label: 'Pio-Clementino Museum', href: '/blog' },
          { label: 'Vatican Gardens', href: '/blog' },
          { label: 'St. Peter\'s Dome', href: '/blog' },
          { label: 'Bramante Staircase', href: '/blog' },
          { label: 'Castel Sant\'Angelo', href: '/blog' },
          { label: 'Ponte Sant\'Angelo', href: '/blog' },
          { label: 'Tiber Island', href: '/blog' },
          { label: 'Trastevere', href: '/blog' },
          { label: 'Jewish Ghetto', href: '/blog' },
          { label: 'Capitoline Museums', href: '/blog' },
          { label: 'Roman Forum', href: '/blog' },
          { label: 'Colosseum', href: '/blog' },
          { label: 'Pantheon', href: '/blog' },
          { label: 'Trevi Fountain', href: '/blog' },
          { label: 'Spanish Steps', href: '/blog' },
        ],
        topTours: PV.MONEY_PAGES.slice(0, 20).map((page) => ({ label: page.title, href: page.href })) || [],
      },
    };
  }

  // Default Street Food Rome
  return {
    hero: {
      title: 'Rome Street Food, Walked and Written by One Person',
      description: 'Honest neighbourhood, market, and tour recommendations — no crowd-sourced rankings, no sponsored placements deciding what gets featured.',
      imageUrl: 'https://images.unsplash.com/photo-1759843541277-14651600026c?w=1600&q=80',
      imageAlt: 'A fruit and vegetable stall at a Roman street market — the everyday food shopping behind the recommendations on this site',
    },
    mantra: {
      title: 'Our Travel Mantra',
      items: [
        { icon: '✓', title: 'Authentic', description: 'Every tour and restaurant has been personally visited and verified.' },
        { icon: '✓', title: 'Honest', description: 'No commissions or sponsorships — just independent recommendations.' },
        { icon: '✓', title: 'Practical', description: 'Neighborhood culture and real local life matter as much as Instagram moments.' },
      ],
    },
    experiences: {
      title: 'Rome, Understood',
      description: 'Each neighbourhood has a rhythm, a specialty, and people who have lived there for decades. This guide shows you how to find them.',
      imageUrl: 'https://images.unsplash.com/photo-1604070890541-c2fb022fb0c4?w=1600&q=80',
    },
    whoWrites: {
      name: 'Food Writer',
      role: 'Rome Food Guide',
      bio: 'Someone who actually spends time in Roman neighbourhoods, talks to vendors, and eats the food that gets recommended — not someone who read about it online.',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    },
    howItStarted: {
      title: 'How This Started',
      paragraphs: [
        'Rome has 2,500 restaurants. Which ones are actually good? Travel blogs will tell you to go to the Colosseum and eat carbonara at a tourist trap. That\'s not useful.',
        'This guide started because I kept getting asked the same questions from friends visiting Rome. "Where should I actually eat?" "Is this neighbourhood worth visiting?" "How do I know if a restaurant is touristy?"',
        'Rather than recommend the same 10 places everyone else does, I documented what I\'ve learned by walking neighbourhoods, talking to locals, and eating at places that are good because locals eat there too.',
      ],
      imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80',
    },
    howWeChoose: [
      { title: 'Authenticity', description: 'Only places where locals actually eat — no crowd-sourced "top 100" lists.' },
      { title: 'Honest Pricing', description: 'Real prices for real portions. No hidden tourist markups or €3 cappuccinos.' },
      { title: 'Neighbourhood Focus', description: 'Each area has its own story and specialty — we explore what makes each one unique.' },
      { title: 'Local Perspective', description: 'Recommendations come from people who live in Rome, not travel bloggers.' },
    ],
    exploreLinks: {
      title: 'Places You Can Plan Your Next Trip',
      attractions: [
        { label: 'Testaccio Market', href: '/blog' },
        { label: 'Campo de\' Fiori', href: '/blog' },
        { label: 'Trastevere', href: '/blog' },
        { label: 'Jewish Ghetto', href: '/blog' },
        { label: 'Monti', href: '/blog' },
        { label: 'Prati', href: '/blog' },
        { label: 'San Lorenzo', href: '/blog' },
        { label: 'Pigneto', href: '/blog' },
        { label: 'Trionfale Market', href: '/blog' },
        { label: 'Garbatella', href: '/blog' },
        { label: 'Colosseum', href: '/blog' },
        { label: 'Roman Forum', href: '/blog' },
        { label: 'Pantheon', href: '/blog' },
        { label: 'Trevi Fountain', href: '/blog' },
        { label: 'Vatican', href: '/blog' },
        { label: 'Spanish Steps', href: '/blog' },
        { label: 'Piazza Navona', href: '/blog' },
        { label: 'Circus Maximus', href: '/blog' },
        { label: 'Villa Borghese', href: '/blog' },
        { label: 'Aventine Hill', href: '/blog' },
      ],
      topTours: [],
    },
  };
}
