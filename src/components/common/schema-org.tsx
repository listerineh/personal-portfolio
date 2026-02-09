export function PersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sebastian Alvarez',
    url: 'https://listerineh.dev',
    image: 'https://listerineh.dev/images/website_screenshot.webp',
    description: 'Full-stack software engineer specializing in React, Next.js, Python, and cloud technologies',
    jobTitle: 'Full-Stack Software Engineer',
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
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Sebastian Alvarez - Full-Stack Developer',
    url: 'https://listerineh.dev',
    description: 'Portfolio of a full-stack software engineer',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://listerineh.dev/blog?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
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
        name: 'Blog',
        item: 'https://listerineh.dev/blog',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
