import { sanityFetch } from './client'
import {
  siteSettingsQuery,
  teamMembersQuery,
  certificatesQuery,
  testimonialsQuery,
  awardsQuery,
  clientLogosQuery,
  allProductsQuery,
  productsByMaterialQuery,
  productsByCategoryQuery,
  productBySlugQuery,
  techDocumentsQuery,
  jobPostingsQuery,
} from './queries'
import type {
  SiteSettings,
  TeamMember,
  Certificate,
  Testimonial,
  Award,
  ClientLogo,
  SanityProductTile,
  SanityProductFull,
  SanityProductDetail,
  TechDocument,
  JobPosting,
} from './types'

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await sanityFetch<SiteSettings>(siteSettingsQuery)
  } catch {
    return null
  }
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    return await sanityFetch<TeamMember[]>(teamMembersQuery)
  } catch {
    return []
  }
}

export async function getCertificates(): Promise<Certificate[]> {
  try {
    return await sanityFetch<Certificate[]>(certificatesQuery)
  } catch {
    return []
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    return await sanityFetch<Testimonial[]>(testimonialsQuery)
  } catch {
    return []
  }
}

export async function getAwards(): Promise<Award[]> {
  try {
    return await sanityFetch<Award[]>(awardsQuery)
  } catch {
    return []
  }
}

export async function getClientLogos(): Promise<ClientLogo[]> {
  try {
    return await sanityFetch<ClientLogo[]>(clientLogosQuery)
  } catch {
    return []
  }
}

// ── Batch 2 fetchers ───────────────────────────────────────────────────────

export async function getAllProducts(): Promise<SanityProductTile[]> {
  try {
    return await sanityFetch<SanityProductTile[]>(allProductsQuery)
  } catch {
    return []
  }
}

export async function getProductsByMaterial(material: 'upvc' | 'aluminum' | 'glass'): Promise<SanityProductTile[]> {
  try {
    return await sanityFetch<SanityProductTile[]>(productsByMaterialQuery, { material })
  } catch {
    return []
  }
}

export async function getProductsByCategory(material: 'upvc' | 'aluminum', category: string): Promise<SanityProductTile[]> {
  try {
    return await sanityFetch<SanityProductTile[]>(productsByCategoryQuery, { material, category })
  } catch {
    return []
  }
}

// getProductDetail replaces getProductBySlug — no category param needed since
// productBySlugQuery filters by slug only (casement-window exists in both materials
// and the display layer handles disambiguation via product.material field)
export async function getProductDetail(slug: string): Promise<SanityProductFull | null> {
  try {
    return await sanityFetch<SanityProductFull>(productBySlugQuery, { slug })
  } catch {
    return null
  }
}

// Kept for backward compatibility with code written before Batch 2
export async function getProductBySlug(
  slug: string,
  _category: string,
): Promise<SanityProductDetail | null> {
  try {
    return await sanityFetch<SanityProductDetail>(productBySlugQuery, { slug })
  } catch {
    return null
  }
}

export async function getTechDocuments(): Promise<TechDocument[]> {
  try {
    return await sanityFetch<TechDocument[]>(techDocumentsQuery)
  } catch {
    return []
  }
}

// ── Batch 3 fetchers ───────────────────────────────────────────────────────

export async function getJobPostings(): Promise<JobPosting[]> {
  try {
    return await sanityFetch<JobPosting[]>(jobPostingsQuery)
  } catch {
    return []
  }
}
