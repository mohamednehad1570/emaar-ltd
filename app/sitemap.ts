import type { MetadataRoute } from 'next';

const BASE_URL = 'https://emaarupvc.ae';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },

    // Material landing pages
    {
      url: `${BASE_URL}/products/upvc`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/products/aluminum`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/products/glass`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },

    // Project type pages
    {
      url: `${BASE_URL}/projects/villas`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/projects/buildings`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // Brand / trust pages
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/why-choose-us`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.7,
    },

    // Utility pages
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/technical`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];
}
