import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kristaps.kruze.lv';

  return [
    {
      changeFrequency: 'monthly',
      lastModified: new Date(),
      priority: 1.0,
      url: baseUrl,
    },
    {
      changeFrequency: 'yearly',
      lastModified: new Date('2025-01-15'),
      priority: 0.9,
      url: `${baseUrl}/projects/centus`,
    },
    {
      changeFrequency: 'yearly',
      lastModified: new Date('2018-12-31'),
      priority: 0.8,
      url: `${baseUrl}/projects/chip`,
    },
    {
      changeFrequency: 'yearly',
      lastModified: new Date('2021-12-31'),
      priority: 0.9,
      url: `${baseUrl}/projects/paynt`,
    },
  ];
}
