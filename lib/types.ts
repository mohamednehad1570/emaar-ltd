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
