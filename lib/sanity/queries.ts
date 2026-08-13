const projectFields = `
  _id,
  "slug": slug.current,
  title,
  type,
  materialsUsed,
  year,
  location,
  "images": images[].asset->url,
  stats,
  description,
  client,
  scope
`

export const projectsQuery = `*[_type == "project"] | order(year desc) { ${projectFields} }`

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] { ${projectFields} }`

export const productsByCategoryQuery = `*[_type == "product" && category == $category] | order(_createdAt asc) {
  _id,
  "slug": slug.current,
  title,
  category,
  description,
  specs,
  "images": images[].asset->url,
  cadFileUrl
}`

export const faqsQuery = `*[_type == "faq"] | order(_createdAt asc) {
  _id,
  question,
  answer,
  category,
  popular
}`

// ── Batch 1 queries ────────────────────────────────────────────────────────

export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    heroTagline,
    heroSubtitle,
    heroCTAPrimary,
    heroCTASecondary,
    companyBio,
    foundedYear,
    stats,
    phone,
    email,
    whatsappNumber,
    address,
    workingHours
  }
`

export const teamMembersQuery = `
  *[_type == "teamMember"] | order(_createdAt asc) {
    _id,
    name,
    role,
    "photo": photo.asset->url,
    bio
  }
`

export const certificatesQuery = `
  *[_type == "certificate"] | order(year desc) {
    _id,
    name,
    issuedBy,
    year,
    "image": image.asset->url,
    description
  }
`

export const testimonialsQuery = `
  *[_type == "testimonial"] | order(order asc) {
    _id,
    quote,
    directorName,
    companyName,
    projectName
  }
`

export const awardsQuery = `
  *[_type == "award"] | order(year desc) {
    _id,
    name,
    issuedBy,
    year
  }
`

export const clientLogosQuery = `
  *[_type == "clientLogo"] | order(order asc) {
    _id,
    companyName,
    "logo": logo.asset->url
  }
`
