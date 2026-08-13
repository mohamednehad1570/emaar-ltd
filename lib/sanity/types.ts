export interface LocalizedString {
  en: string
  ar: string
}

// Multi-line variant — same shape, distinct type for semantic clarity
export interface LocalizedText {
  en: string
  ar: string
}

export interface SanityImage {
  url: string
  alt?: string
}

export interface SiteSettings {
  heroTagline?: LocalizedString
  heroSubtitle?: LocalizedString
  heroCTAPrimary?: LocalizedString
  heroCTASecondary?: LocalizedString
  companyBio?: LocalizedText
  foundedYear?: number
  stats?: Array<{
    label: LocalizedString
    value: string
    icon: string
  }>
  phone?: string
  email?: string
  whatsappNumber?: string
  address?: LocalizedString
  workingHours?: LocalizedString
}

export interface TeamMember {
  _id: string
  name: LocalizedString
  role: LocalizedString
  photo?: string
  bio?: LocalizedText
}

export interface Certificate {
  _id: string
  name: LocalizedString
  issuedBy?: LocalizedString
  year: number
  image?: string
  description?: string
}

export interface Testimonial {
  _id: string
  quote: LocalizedText
  directorName: LocalizedString
  companyName: LocalizedString
  projectName?: LocalizedString
}

export interface Award {
  _id: string
  name: LocalizedString
  issuedBy: LocalizedString
  year: number
}

export interface ClientLogo {
  _id: string
  companyName: LocalizedString
  logo?: string
}

export interface SanityProject {
  _id: string
  slug: string
  title: LocalizedString
  type: string
  materialsUsed: string[]
  year: number
  location: LocalizedString
  images: string[]
  stats: Array<{ label: LocalizedString; value: string }>
  description?: LocalizedString
  client?: LocalizedString
  scope?: LocalizedString
}

export interface SanityProduct {
  _id: string
  slug: string
  title: LocalizedString
  category: 'upvc' | 'aluminum'
  description?: LocalizedString
  specs?: Array<{ label: LocalizedString; value: LocalizedString }>
  images: string[]
  cadFileUrl?: string
}

export interface SanityFaq {
  _id: string
  question: LocalizedString
  answer: LocalizedString
  category: string
  popular: boolean
}

// ── Batch 2 types ──────────────────────────────────────────────────────────

export interface SanityProductDetail {
  _id: string
  slug: string
  title: LocalizedString
  category: string
  description?: LocalizedText
  specs?: Array<{ label: LocalizedString; value: LocalizedString }>
  features?: Array<{
    icon: string
    label: LocalizedString
    value: LocalizedString
  }>
  images?: string[]
  gallery?: string[]
  cadFileUrl?: string
  thermalValue?: string
  acousticRating?: string
  warranty?: string
  dimensions?: string
  relatedProducts?: Array<{
    _id: string
    slug: string
    title: LocalizedString
    category: string
    images?: string[]
  }>
}

export interface TechDocument {
  _id: string
  name: LocalizedString
  category: string
  format?: string
  productType?: string
  fileUrl?: string
  previewImage?: string
  fileSize?: string
  featured?: boolean
}
