export function PersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sebastian Alvarez',
    url: 'https://listerineh.dev',
    image: 'https://listerineh.dev/images/home-og.webp',
    description: 'Senior Fullstack & Platform Engineer with 6+ years building scalable cloud systems. React, Next.js, Python, AWS. GDG Quito organizer and open source contributor based in Ecuador.',
    jobTitle: 'Senior Fullstack & Platform Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'GDG Quito',
      url: 'https://gdg.community.dev/gdg-quito/',
    },
    sameAs: [
      'https://github.com/listerineh',
      'https://linkedin.com/in/listerineh',
      'https://twitter.com/listerineh',
    ],
    knowsAbout: [
      'React',
      'Next.js',
      'Python',
      'TypeScript',
      'JavaScript',
      'Web Development',
      'Full-Stack Development',
      'Cloud Technologies',
      'DevOps',
      'Kubernetes',
      'AWS',
      'AI Agents',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      suppressHydrationWarning
    />
  );
}

export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'listerineh.dev',
    alternateName: 'Sebastian Alvarez — Portfolio & Blog',
    url: 'https://listerineh.dev',
    description: 'Engineering portfolio and technical blog of Sebastian Alvarez — Senior Fullstack & Platform Engineer, GDG Quito organizer.',
    author: {
      '@type': 'Person',
      name: 'Sebastian Alvarez',
      url: 'https://listerineh.dev',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://listerineh.dev/blog?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      suppressHydrationWarning
    />
  );
}

export function BreadcrumbSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://listerineh.dev',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: 'https://listerineh.dev/about',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Blog',
        item: 'https://listerineh.dev/blog',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Why Listerineh?',
        item: 'https://listerineh.dev/why',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      suppressHydrationWarning
    />
  );
}
