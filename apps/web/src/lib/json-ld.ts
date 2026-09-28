export function buildOrganizationSchema(name: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo: `${url}/logo.svg`,
    sameAs: [
      'https://www.facebook.com/isekaidigital',
      'https://www.instagram.com/isekaidigital',
      'https://twitter.com/isekaidigital',
    ],
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildTourSchema(tour: {
  title: string;
  description: string;
  imageUrl?: string;
  priceBand?: string;
  partner: string;
  duration?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TourAction',
    name: tour.title,
    description: tour.description,
    image: tour.imageUrl,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: tour.priceBand || 'Contact',
      seller: {
        '@type': 'Organization',
        name: tour.partner,
      },
    },
    duration: tour.duration || 'PT3H',
  };
}

export function buildArticleSchema(article: {
  headline: string;
  description: string;
  imageUrl?: string;
  publishedAt: string;
  author: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.headline,
    description: article.description,
    image: article.imageUrl,
    datePublished: article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author,
    },
  };
}
