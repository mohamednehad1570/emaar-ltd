/**
 * lib/types.ts
 * Canonical shared types for the Emaar International codebase.
 * Import from here — never redefine locally in component files.
 */

/**
 * Language-resolved (display-ready) project used by ProjectCard and
 * ProjectsGrid after Sanity/static data is flattened to the active language.
 */
export interface DisplayProject {
  id: number | string;
  title: string;
  category: string;
  location: string;
  image: string;
  year: string;
  type: string;
  material: string;
}

/**
 * Bilingual project preview — the minimal subset used in the homepage
 * ProjectsSection static data array.
 */
export interface ProjectPreview {
  id: number;
  title: { en: string; ar: string };
  location: { en: string; ar: string };
  year: string;
  image: string;
}

// ── Static-data types (replace lib/sanity/types.ts in Batches B–C) ─────────

/** Bilingual value — every user-facing string ships both languages. */
export type Localized<T> = { en: T; ar: T };

export interface Award {
  id: string;
  name: Localized<string>;
  issuedBy: Localized<string>;
  year: number;
  description?: Localized<string>;
}

export interface Certificate {
  id: string;
  name: Localized<string>;
  description?: Localized<string>;
  /** iconMap key (lib/iconMap.ts) — certificates carry no image. */
  icon: string;
}

export interface Job {
  id: string;
  title: Localized<string>;
  department: Localized<string>;
  type: 'full-time' | 'part-time' | 'contract';
  location: Localized<string>;
  experience?: Localized<string>;
  description: Localized<string>;
  responsibilities: Localized<string[]>;
  requirements: Localized<string[]>;
  benefits?: Localized<string[]>;
}

export type TechDocumentCategory = 'profile-systems' | 'glass' | 'accessories' | 'certificates';

/** No file URL — documents are "Available on request" only. */
export interface TechDocument {
  id: string;
  title: Localized<string>;
  category: TechDocumentCategory;
}

export interface SiteSettings {
  phone: string;
  freeLine: string;
  customerService: string;
  emails: { info: string; general: string };
  /** Digits only, no "+" — format expected by wa.me links. */
  whatsappNumber: string;
  poBox: Localized<string>;
  address: Localized<string>;
}
