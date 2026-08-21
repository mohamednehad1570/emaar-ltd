/**
 * lib/data/index.ts
 * Barrel export for data modules still used at runtime.
 * products.ts, productDetails.ts, projects.ts deleted — Sanity is authoritative.
 * UI copy accessed via uiStrings.ts (which re-exports the individual copy files).
 */

export { NAV, isActive } from './nav';
export type { DropdownItem } from './nav';
