import { sanityFetch } from './client'
import {
  siteSettingsQuery,
  teamMembersQuery,
  certificatesQuery,
  testimonialsQuery,
  awardsQuery,
  clientLogosQuery,
  productBySlugQuery,
  techDocumentsQuery,
} from './queries'
import type {
  SiteSettings,
  TeamMember,
  Certificate,
  Testimonial,
  Award,
  ClientLogo,
  SanityProductDetail,
  TechDocument,
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

export async function getProductBySlug(
  slug: string,
  category: string,
): Promise<SanityProductDetail | null> {
  try {
    return await sanityFetch<SanityProductDetail>(productBySlugQuery, { slug, category })
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
