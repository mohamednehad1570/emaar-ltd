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
    workingHours,
    mapEmbedUrl,
    officeLocations[] {
      name,
      address,
      phone,
      workingHours
    }
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

// ── Batch 2 queries ────────────────────────────────────────────────────────

// Single product by slug + category — used on detail pages
export const productBySlugQuery = `
  *[_type == "product" && slug.current == $slug && category == $category][0] {
    _id,
    "slug": slug.current,
    title,
    category,
    description,
    specs,
    features,
    "images": images[].asset->url,
    "gallery": gallery[].asset->url,
    cadFileUrl,
    thermalValue,
    acousticRating,
    warranty,
    dimensions,
    "relatedProducts": relatedProducts[]-> {
      _id,
      "slug": slug.current,
      title,
      category,
      "images": images[].asset->url
    }
  }
`

// All technical documents ordered by display order
export const techDocumentsQuery = `
  *[_type == "techDocument"] | order(order asc) {
    _id,
    name,
    category,
    format,
    productType,
    "fileUrl": file.asset->url,
    "previewImage": previewImage.asset->url,
    fileSize,
    featured
  }
`

// ── Batch 3 queries ────────────────────────────────────────────────────────

// All job postings ordered by newest first
export const jobPostingsQuery = `
  *[_type == "jobPosting"] | order(_createdAt desc) {
    _id,
    title,
    department,
    type,
    location,
    experience,
    salary,
    description,
    requirements,
    responsibilities,
    benefits
  }
`

// Solution page contact info from siteSettings
export const solutionSettingsQuery = `
  *[_type == "siteSettings"][0] {
    phone,
    whatsappNumber
  }
`
