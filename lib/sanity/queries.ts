/**
 * lib/sanity/queries.ts
 *
 * Single source of truth for all GROQ queries.
 * Field names are verified against studio/schemaTypes/* — do not rename
 * without cross-checking the schema first.
 *
 * Localised fields (localizedString / localizedText) are projected as whole
 * objects so the frontend can read .en or .ar without a second fetch.
 * Asset references are dereferenced to CDN URLs inline via ->url.
 */

import { groq } from 'next-sanity'

// ─── SITE SETTINGS ──────────────────────────────────────────────────────────

// [0] because siteSettings is a singleton — only one document of this type exists
export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  heroTagline, heroSubtitle, heroCTAPrimary, heroCTASecondary,
  companyBio, foundedYear,
  stats[]{ label, value, icon },
  phone, whatsappNumber, email,
  address, workingHours,
  socialLinks{ instagram, facebook, linkedin, youtube },
  mapEmbedUrl,
  officeLocations[]{ name, address, phone, workingHours },
  showWarrantyBadge,
  warranty{
    upvcYears, glassYears, accessoriesYears, maintenanceYears,
    governingLaw, exclusions, footnote
  }
}`

// ─── PRODUCTS ───────────────────────────────────────────────────────────────

// All products flat — for unified catalog L1 and site-wide search
export const allProductsQuery = groq`*[_type == "product"] | order(_createdAt asc){
  _id, "slug": slug.current, material, category,
  title, description,
  "mainImage": mainImage.asset->url,
  badge, specTags,
  specs{ dimensions, thermalValue, acousticRating, glassThickness, colorOptions }
}`

// Products by material — drives L2 material landing page with per-category counts
export const productsByMaterialQuery = groq`*[_type == "product" && material == $material] | order(_createdAt asc){
  _id, "slug": slug.current, material, category,
  title, description,
  "mainImage": mainImage.asset->url,
  badge, specTags
}`

// Products by material + category — drives L3 category grid with sidebar filters
export const productsByCategoryQuery = groq`*[_type == "product" && material == $material && category == $category] | order(_createdAt asc){
  _id, "slug": slug.current, material, category,
  title, description,
  "mainImage": mainImage.asset->url,
  badge, specTags,
  specs{ dimensions, thermalValue, acousticRating, glassThickness, colorOptions }
}`

// Single product by slug — L4 detail page; no material filter because casement-window
// and tilt-turn-window exist in both materials and the display layer handles disambiguation
export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0]{
  _id, "slug": slug.current, material, category,
  title, description,
  "mainImage": mainImage.asset->url,
  "gallery": gallery[].asset->url,
  badge, specTags, features, applications,
  specs{ dimensions, thermalValue, acousticRating, glassThickness, colorOptions },
  "technicalSheet": technicalSheet.asset->url,
  "relatedProducts": relatedProducts[]->{
    _id, "slug": slug.current, title,
    "mainImage": mainImage.asset->url, category, material
  },
  // SEO sub-fields are titleEn/titleAr/descriptionEn/descriptionAr in the schema —
  // distinct names prevent collision with the product's own title/description fields
  seo{ titleEn, titleAr, descriptionEn, descriptionAr }
}`

// ─── PROJECTS ───────────────────────────────────────────────────────────────
// project schema stores all photos in images[] — no separate mainImage field exists.
// coverImage is derived from images[0] for card thumbnails; images[] is the full set.
// Schema field `type` (residential | commercial) is aliased to projectType — the
// bare name `type` shadows TypeScript's built-in keyword in some destructuring contexts.
// materialsUsed is an array — a project may use both upvc and aluminum simultaneously.

// All projects — /projects listing page
export const projectsQuery = groq`*[_type == "project"] | order(year desc){
  _id, "slug": slug.current,
  title, description,
  "coverImage": images[0].asset->url,
  "images": images[].asset->url,
  "projectType": type, materialsUsed, location, year,
  client, scope
}`

// allProjectsQuery is the canonical name going forward; projectsQuery kept as the
// existing export so app/projects/* pages compile before their Batch 2 update
export const allProjectsQuery = projectsQuery

// Single project by slug — /projects/[id] detail page
// stats[] embeds label (localizedString) + value (string) for the metrics strip
export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  _id, "slug": slug.current,
  title, description,
  "coverImage": images[0].asset->url,
  "images": images[].asset->url,
  "projectType": type, materialsUsed, location, year,
  client, scope,
  stats[]{ label, value }
}`

// ─── TEAM ───────────────────────────────────────────────────────────────────

// teamMember schema has no order field — _createdAt gives a stable insertion order
export const teamMembersQuery = groq`*[_type == "teamMember"] | order(_createdAt asc){
  _id, name, role, bio,
  "photo": photo.asset->url
}`

// ─── FAQ ────────────────────────────────────────────────────────────────────

// faq schema has no order field — _createdAt gives a stable insertion order;
// popular bool is used client-side to surface highlighted answers
export const faqsQuery = groq`*[_type == "faq"] | order(_createdAt asc){
  _id, question, answer, category, popular
}`

// ─── JOBS ───────────────────────────────────────────────────────────────────

// jobPosting schema has no isActive, slug, or deadline fields — all postings are
// returned and the careers page displays them all; active filtering can be added
// to the schema later if the client requests draft/archive states
export const jobPostingsQuery = groq`*[_type == "jobPosting"] | order(_createdAt desc){
  _id, title, department, type, location,
  experience, salary, description, requirements,
  responsibilities, benefits
}`

// ─── CERTIFICATES ───────────────────────────────────────────────────────────

// certificate schema uses name (plain string) and issuedBy (localizedString) —
// the old queries file incorrectly referenced title and issuer which don't exist
export const certificatesQuery = groq`*[_type == "certificate"] | order(year desc){
  _id, name, issuedBy, year, description,
  "image": image.asset->url
}`

// ─── TESTIMONIALS ───────────────────────────────────────────────────────────

// testimonial schema uses directorName/companyName (localizedString) — not name/company;
// no photo or rating fields exist in the schema
export const testimonialsQuery = groq`*[_type == "testimonial"] | order(order asc){
  _id, quote, directorName, companyName, projectName
}`

// ─── AWARDS ─────────────────────────────────────────────────────────────────

// award schema uses name (localizedString) and issuedBy (localizedString) —
// no image or description fields exist; the award card uses text only
export const awardsQuery = groq`*[_type == "award"] | order(year desc){
  _id, name, issuedBy, year
}`

// ─── CLIENT LOGOS ───────────────────────────────────────────────────────────

// clientLogo schema uses companyName (localizedString) — no plain name or url field
export const clientLogosQuery = groq`*[_type == "clientLogo"] | order(order asc){
  _id, companyName,
  "logo": logo.asset->url
}`

// ─── TECH DOCUMENTS ─────────────────────────────────────────────────────────

// techDocument schema uses name (localizedString) and format (not fileType);
// no language field — category and productType handle filtering in TechFilters
export const techDocumentsQuery = groq`*[_type == "techDocument"] | order(order asc){
  _id, name, category, format, productType,
  "fileUrl": file.asset->url,
  "previewImage": previewImage.asset->url,
  fileSize, featured
}`
