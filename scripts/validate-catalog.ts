/**
 * scripts/validate-catalog.ts
 *
 * Structural integrity check for lib/data/catalog. Run: npx tsx scripts/validate-catalog.ts
 * Exits 1 on any failed assertion so it can gate CI later.
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import {
  PRODUCT_TYPES, PROFILE_SYSTEMS, BRANDS, ACCESSORIES, GLASS, COLOURS, DESIGNS, MATERIAL_IDS,
  getTypesByMaterial, getAccessories, getAccessoryKinds, getAccessoriesByKind,
  getColourGroups, getColours, MECHANISM_HOTSPOTS, type Mechanism, getDesignSubtypes, getDesigns, getGlass,
} from '../lib/data/catalog';

const failures: string[] = [];
let passed = 0;

function check(ok: boolean, label: string): void {
  if (ok) passed++;
  else failures.push(label);
}

// ── Product types ─────────────────────────────────────────
check(PRODUCT_TYPES.length === 22, `expected 22 types, got ${PRODUCT_TYPES.length}`);
const slugs = PRODUCT_TYPES.map((t) => t.slug);
check(new Set(slugs).size === slugs.length, 'type slugs are not unique');
// upvc/aluminum/glass are old /products/{material} URLs that now redirect — a type slug
// with those names would be shadowed by the redirect and never render
const RESERVED_SLUGS = ['upvc', 'aluminum', 'glass'];
for (const s of slugs) check(!RESERVED_SLUGS.includes(s), `slug "${s}" collides with a reserved route segment`);

const systemById = new Map(PROFILE_SYSTEMS.map((s) => [s.id, s]));
for (const t of PRODUCT_TYPES) {
  check(t.availability.length >= 1, `${t.slug}: no availability entry`);
  // Gallery row patterns are defined for 3–6 images only (components/catalog/type/galleryLayout.ts)
  if (!t.placeholder) {
    check(t.gallery.length >= 3 && t.gallery.length <= 6, `${t.slug}: gallery has ${t.gallery.length} entries (expected 3–6)`);
  }
  for (const a of t.availability) {
    for (const id of a.profileSystemIds) {
      const sys = systemById.get(id);
      check(Boolean(sys), `${t.slug}: unknown profile system "${id}"`);
      if (sys) check(sys.material === a.material, `${t.slug}: system ${id} is ${sys.material}, listed under ${a.material}`);
    }
  }
}

// ── Hotspots: 4 per mechanism (none for 'unspecified'), positions inside the frame ──
for (const [mech, points] of Object.entries(MECHANISM_HOTSPOTS) as [Mechanism, typeof MECHANISM_HOTSPOTS[Mechanism]][]) {
  const expected = mech === 'unspecified' ? 0 : 4;
  check(points.length === expected, `hotspots ${mech}: expected ${expected}, got ${points.length}`);
  for (const p of points) {
    check(p.x >= 0 && p.x <= 100 && p.y >= 0 && p.y <= 100, `hotspots ${mech} #${p.n}: x/y outside 0–100`);
  }
}

// ── Accessories ───────────────────────────────────────────
const brandIds = new Set(BRANDS.map((b) => b.id));
for (const a of ACCESSORIES) {
  if (a.brandId) check(brandIds.has(a.brandId), `${a.id}: unknown brand "${a.brandId}"`);
}
check(new Set(ACCESSORIES.map((a) => a.id)).size === ACCESSORIES.length, 'accessory ids are not unique');

// ── Placeholders: colours & designs ───────────────────────
for (const m of MATERIAL_IDS) {
  for (const g of getColourGroups(m)) {
    const n = getColours(m, g.en).length;
    check(n === 10, `colours ${m}/${g.en}: expected 10, got ${n}`);
  }
  for (const s of getDesignSubtypes(m)) {
    const n = getDesigns(m, s.en).length;
    check(n === 10, `designs ${m}/${s.en}: expected 10, got ${n}`);
  }
}
check(COLOURS.every((c) => c.placeholder === true), 'a colour is missing placeholder: true');
check(DESIGNS.every((d) => d.placeholder === true), 'a design is missing placeholder: true');

// ── Empty Localized strings (allowed only inside placeholder records) ──
function isLocalized(v: object): v is { en: unknown; ar: unknown } {
  return 'en' in v && 'ar' in v;
}
function scanEmpty(value: unknown, path: string, out: string[]): void {
  if (Array.isArray(value)) { value.forEach((v, i) => scanEmpty(v, `${path}[${i}]`, out)); return; }
  if (value === null || typeof value !== 'object') return;
  if (isLocalized(value) && (value.en === '' || value.ar === '')) out.push(path);
  for (const [k, v] of Object.entries(value)) scanEmpty(v, `${path}.${k}`, out);
}
const records: { id: string; placeholder?: true }[] = [
  ...PRODUCT_TYPES.map((t) => ({ ...t, id: t.slug })), ...PROFILE_SYSTEMS, ...BRANDS,
  ...ACCESSORIES, ...GLASS, ...COLOURS, ...DESIGNS,
];
for (const r of records) {
  const empties: string[] = [];
  scanEmpty(r, r.id, empties);
  if (!r.placeholder) for (const p of empties) check(false, `empty Localized at ${p}`);
  else passed++;
}

// ── No `any` in catalog sources ───────────────────────────
function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.ts') ? [p] : [];
  });
}
const files = walk(join(process.cwd(), 'lib/data/catalog'));
for (const f of files) {
  const src = readFileSync(f, 'utf8');
  check(!/(:\s*any\b|<any>|as any\b|any\[\])/.test(src), `\`any\` found in ${f}`);
  check(src.split('\n').length < 150, `${f} is ≥150 lines`);
}

// ── Summary ───────────────────────────────────────────────
console.log('\nCatalog summary');
for (const m of MATERIAL_IDS) {
  const kinds = getAccessoryKinds(m).map((k) => `${k} ${getAccessoriesByKind(m, k).length}`).join(', ');
  console.log(`  ${m.padEnd(9)} types ${getTypesByMaterial(m).length} · accessories ${getAccessories(m).length} (${kinds})`);
  console.log(`  ${''.padEnd(9)} glass ${GLASS.length} (shared) · colours ${getColours(m).length} · designs ${getDesigns(m).length}`);
}
console.log(`  glass: performance ${getGlass('performance').length} · decorative ${getGlass('decorative').length}`);
console.log(`  profile systems ${PROFILE_SYSTEMS.length} · brands ${BRANDS.length} · files ${files.length}`);
console.log(`  placeholder types: ${PRODUCT_TYPES.filter((t) => t.placeholder).map((t) => t.slug).join(', ') || 'none'}`);

console.log(`\n${passed} checks passed, ${failures.length} failed`);
if (failures.length) {
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
