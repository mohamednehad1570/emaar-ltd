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
