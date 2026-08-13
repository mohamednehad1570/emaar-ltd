import { sanityFetch } from './client'
import {
  siteSettingsQuery,
  teamMembersQuery,
  certificatesQuery,
  testimonialsQuery,
  awardsQuery,
  clientLogosQuery,
} from './queries'
import type {
  SiteSettings,
  TeamMember,
  Certificate,
  Testimonial,
  Award,
  ClientLogo,
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
