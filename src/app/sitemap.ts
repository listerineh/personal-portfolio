import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/data/blog';
import { projectsData } from '@/lib/data/projects';
import { defaultLocale } from '@/i18n/config';
import { listPublishedDecks } from '@/features/slides/store';

// Rendered per request (from the cached deck list) so a deck published after the deploy is listed right away.
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://listerineh.dev';

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/slides`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/skills`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/why`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const projectPages: MetadataRoute.Sitemap = projectsData[defaultLocale].map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project.endDate ? new Date(project.endDate) : (project.startDate ? new Date(project.startDate) : new Date()),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Published decks only (unlisted ones stay out); storage trouble leaves them out rather than failing the sitemap.
  const slidePages: MetadataRoute.Sitemap = (await listPublishedDecks().catch(() => [])).map((deck) => ({
    url: `${baseUrl}/slides/${deck.slug}`,
    lastModified: new Date(deck.updatedAt),
    changeFrequency: 'yearly',
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages, ...projectPages, ...slidePages];
}
