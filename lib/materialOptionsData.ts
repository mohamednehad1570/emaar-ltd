/**
 * lib/materialOptionsData.ts
 *
 * Server-side builder for the material page's Options module (Colours · Designs · Glass ·
 * Accessories). Turns catalog records into serializable OptionTabView cards — sub-tab id,
 * card lines and the Lightbox details — so the client tabs never import the catalog.
 */

import {
  getAccessories, getAccessoryKinds, getBrand, getColourGroups, getColours, getDesignSubtypes,
  getDesigns, getDisplayCodes, getGlass, type AccessoryItem, type ColourDot, type Localized, type MaterialId,
} from '@/lib/data/catalog';
import { MATERIAL_PAGE_COPY as COPY } from '@/lib/data/uiStrings';
import type { PlaceholderTag } from '@/lib/data/placeholderPhotos';
import type { LightboxDetail } from '@/components/ui/lightboxTypes';
import type { OptionCardView, OptionDot, OptionTabView } from '@/components/catalog/types';

const D = COPY.detail;

// Sub-tab ids come from EN labels ("Wood-look" → "wood-look") — stable while labels are Localized
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const same = (s: string): Localized => ({ en: s, ar: s });

// Display fills for the RAL references printed on catalog pp.174–178 (RAL first, then name).
// Approximations for a 12px dot only — the RAL number in the tooltip stays the source of truth.
const DOT_HEX: Record<string, string> = {
  '9016': '#F6F6F4', '8017': '#45322E', '8019': '#3F3A3A', '9005': '#141414', '1015': '#E6D2B5',
  '901.1': '#C0C6CA', White: '#F6F6F4', Brown: '#45322E', Black: '#141414', Ivory: '#E6D2B5',
  Red: '#A52A22', Green: '#3D6B45',
};
const dot = (c: ColourDot): OptionDot => ({ ...c, hex: DOT_HEX[c.ral ?? ''] ?? DOT_HEX[c.name.en] ?? '#C0C6CA' });

// What a visitor expects to see for each design subtype (TEMPORARY review photos only)
const DESIGN_TAG: Record<string, PlaceholderTag> = {
  doors: 'interior', windows: 'window', pergola: 'outdoor', handrails: 'outdoor', security: 'exterior',
};

function colourTab(material: MaterialId): OptionTabView {
  const items: OptionCardView[] = getColours(material).map((c) => ({
    id: c.id, sub: slug(c.group.en), name: c.name, code: c.code,
    media: { kind: 'swatch', hex: c.hex },
    details: [{ label: D.collection, value: c.group }, { label: D.code, value: c.code }],
  }));
  return { id: 'colours', label: COPY.tabs.colours, subs: getColourGroups(material).map((g) => ({ id: slug(g.en), label: g })), items };
}

function designTab(material: MaterialId): OptionTabView {
  const items: OptionCardView[] = getDesigns(material).map((d) => ({
    id: d.id, sub: slug(d.subtype.en), name: d.name, meta: d.colour,
    media: {
      kind: 'image', src: d.image, ratio: '4/3',
      placeholderKey: `${material}-design-${d.id}`, placeholderTag: DESIGN_TAG[slug(d.subtype.en)] ?? 'window',
    },
    details: [{ label: D.category, value: d.subtype }, { label: D.colour, value: d.colour }],
  }));
  return { id: 'designs', label: COPY.tabs.designs, subs: getDesignSubtypes(material).map((s) => ({ id: slug(s.en), label: s })), items };
}

function glassTab(): OptionTabView {
  const items: OptionCardView[] = getGlass().map((g) => {
    const type: LightboxDetail = { label: D.type, value: COPY.glassGroups[g.group] };
    if (g.group === 'performance' && g.hex) {
      return {
        id: g.id, sub: g.group, name: g.name, ...(g.supplier ? { meta: same(g.supplier) } : {}),
        media: { kind: 'swatch', hex: g.hex },
        details: [type, ...(g.supplier ? [{ label: D.supplier, value: g.supplier }] : []), { label: D.note, value: g.note }],
      };
    }
    return {
      // Only stained glass carries a card line ("Made in-house"); the rest keep notes for the lightbox
      id: g.id, sub: g.group, name: g.name, ...(g.id === 'stained-glass' ? { meta: g.note } : {}),
      media: { kind: 'image', src: g.image, ratio: '4/3', placeholderKey: `glass-${g.id}`, placeholderTag: 'window' },
      details: [type, { label: D.note, value: g.note }],
    };
  });
  const subs = (['performance', 'decorative'] as const).map((id) => ({ id, label: COPY.glassGroups[id] }));
  return { id: 'glass', label: COPY.tabs.glass, subs, items };
}

function accessoryCard(a: AccessoryItem): OptionCardView {
  const brand = a.brandId ? getBrand(a.brandId) : undefined;
  const origin = brand?.origin ?? a.origin;
  // "Schüring · Germany" — brand names are printed Latin in both languages
  const meta: Localized | undefined = brand && origin
    ? { en: `${brand.name} · ${origin.en}`, ar: `${brand.name} · ${origin.ar}` }
    : brand ? same(brand.name) : origin;
  const codes = getDisplayCodes(a);
  const code = codes.length > 0 ? codes.join(' · ') : a.spec;
  const colours: Localized = {
    en: a.colours.map((c) => (c.ral ? `${c.name.en} (RAL ${c.ral})` : c.name.en)).join(', '),
    ar: a.colours.map((c) => (c.ral ? `${c.name.ar} (RAL ${c.ral})` : c.name.ar)).join('، '),
  };
  const details: LightboxDetail[] = [
    ...(brand ? [{ label: D.brand, value: brand.name }] : []),
    ...(origin ? [{ label: D.origin, value: origin }] : []),
    ...(codes.length > 0 ? [{ label: D.code, value: codes.join(' · ') }] : []),
    ...(a.spec ? [{ label: D.spec, value: a.spec }] : []),
    ...(a.colours.length > 0 ? [{ label: D.colours, value: colours }] : []),
    ...(a.note ? [{ label: D.note, value: a.note }] : []),
  ];
  return {
    id: a.id, sub: a.kind, name: a.name, ...(meta ? { meta } : {}), ...(code ? { code } : {}),
    ...(a.colours.length > 0 ? { dots: a.colours.map(dot) } : {}), ...(a.note ? { note: a.note } : {}),
    media: { kind: 'image', src: a.image, ratio: '1/1', placeholderKey: `acc-${a.id}`, placeholderTag: 'hardware' },
    details,
  };
}

function accessoryTab(material: MaterialId): OptionTabView {
  const subs = getAccessoryKinds(material).map((k) => ({ id: k, label: COPY.kinds[k] }));
  return { id: 'accessories', label: COPY.tabs.accessories, subs, items: getAccessories(material).map(accessoryCard) };
}

/** Tab order is fixed: Colours · Designs · Glass · Accessories. */
export function buildOptionTabs(material: MaterialId): OptionTabView[] {
  return [colourTab(material), designTab(material), glassTab(), accessoryTab(material)];
}
