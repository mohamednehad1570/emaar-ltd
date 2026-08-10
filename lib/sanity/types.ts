export interface LocalizedString {
  en: string
  ar: string
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
