/**
 * lib/data/index.ts
 * Barrel export for data modules still used at runtime.
 * All content is static — these files replace the former CMS document types
 * and will later be written by the custom CMS.
 * UI copy accessed via uiStrings.ts (which re-exports the individual copy files).
 */

export { NAV } from './nav';
export { IMAGES } from './images';
export { AWARDS } from './awards';
export { CERTIFICATES } from './certificates';
export { JOBS } from './jobs';
export { TECH_DOCUMENTS, TECH_DOCUMENT_CATEGORIES } from './techDocuments';
export { SITE_SETTINGS } from './siteSettings';
