/**
 * scripts/verify-ui/checks-mirror.ts
 * Batch R: Arabic is the mirror of English. For each probe the same element is measured
 * on the EN page and its /ar twin at 1440 / 900 / 390, and AR must sit at the mirrored
 * x: AR = W − EN (±2px), W = the layout viewport width (clientWidth, scrollbar excluded).
 *  • 'center' — fixed-size boxes (logo plate, hero image, cards, pins, columns).
 *  • 'start'  — boxes whose width follows the language's text (a tab label): the
 *    inline-start edge mirrors (EN left edge ↔ AR right edge); centres can't, by design.
 * Also: drawings carry the RTL flip (computed scale "-1 1") in AR and none in EN.
 */

import type { Browser, Page } from 'playwright';
import type { CheckResult } from './runner';
import { goto } from './runner';

type Mode = 'center' | 'start';
interface Probe { name: string; path: string; sel: string; mode: Mode; minWidth?: number; maxWidth?: number; all?: boolean }

const PROBES: Probe[] = [
  { name: 'logo plate',          path: '/upvc', sel: '[data-logo-plate]', mode: 'center' },
  { name: 'first nav item',      path: '/upvc', sel: 'header nav a', mode: 'center', minWidth: 1024 },
  { name: 'Request Quote',       path: '/upvc', sel: 'header a[href$="/contact"]', mode: 'center', minWidth: 1024 },
  { name: 'burger',              path: '/upvc', sel: 'header button[aria-controls="mobile-nav"]', mode: 'center', maxWidth: 1023 },
  { name: 'hero image',          path: '/products/single-sash-windows', sel: '[data-hero-image]', mode: 'center' },
  { name: 'hero text block',     path: '/products/single-sash-windows', sel: '[data-hero-panel]', mode: 'center' },
  { name: 'Available-in legend', path: '/products/single-sash-windows', sel: '[data-hero-legend]', mode: 'center' },
  { name: 'material hero image', path: '/upvc', sel: '[data-hero-image]', mode: 'center' },
  { name: 'first material tab',  path: '/upvc', sel: '[role="tab"][data-tab]', mode: 'start' },
  { name: 'first type card',     path: '/upvc', sel: 'a[data-testid="type-card"]', mode: 'center' },
  { name: 'footer Brand column', path: '/upvc', sel: '[data-footer-brand]', mode: 'center' },
  { name: 'hotspot pins',        path: '/products/single-sash-windows', sel: '[data-hotspot-pin]', mode: 'center', all: true },
];
const WIDTHS = [1440, 900, 390];

// Measures every match (or the first visible one); string form avoids esbuild's __name helper
const MEASURE = `(function(a){ var w=document.documentElement.clientWidth;
  var els=Array.from(document.querySelectorAll(a.sel)).filter(function(e){var r=e.getBoundingClientRect();return r.width>0&&r.height>0;});
  if(!a.all) els=els.slice(0,1);
  return { w:w, boxes: els.map(function(e){var r=e.getBoundingClientRect();return {l:r.left,r:r.right,c:(r.left+r.right)/2};}) }; })`;

type Measure = { w: number; boxes: { l: number; r: number; c: number }[] };
async function measure(page: Page, url: string, sel: string, all = false): Promise<Measure> {
  await goto(page, url);
  return (await page.evaluate(`${MEASURE}(${JSON.stringify({ sel, all })})`)) as Measure;
}

export async function checkMirrorGeometry(browser: Browser, base: string): Promise<CheckResult[]> {
  const results: CheckResult[] = [];
  for (const width of WIDTHS) {
    // Reduced motion: entrance transforms settle instantly, so boxes are at rest when measured
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    for (const p of PROBES) {
      if ((p.minWidth && width < p.minWidth) || (p.maxWidth && width > p.maxWidth)) continue;
      const en = await measure(page, `${base}${p.path}`, p.sel, p.all);
      const ar = await measure(page, `${base}/ar${p.path}`, p.sel, p.all);
      const n = Math.min(en.boxes.length, ar.boxes.length);
      const errs: string[] = [];
      if (n === 0 || en.boxes.length !== ar.boxes.length) errs.push(`found EN ${en.boxes.length} / AR ${ar.boxes.length}`);
      for (let i = 0; i < n; i++) {
        const [e, a] = [en.boxes[i], ar.boxes[i]];
        // start mode: EN inline-start = left edge, AR inline-start = right edge
        const [want, got] = p.mode === 'center' ? [en.w - e.c, a.c] : [en.w - e.l, a.r];
        if (Math.abs(want - got) > 2) errs.push(`#${i + 1} want ${want.toFixed(1)} got ${got.toFixed(1)}`);
      }
      results.push({
        name: `mirror ${width}: ${p.name} (${p.mode})`,
        passed: errs.length === 0,
        detail: errs.join('; ') || undefined,
      });
    }
    await ctx.close();
  }
  return results;
}

/** Pictograms + hotspot diagrams: flipped in AR (computed scale -1 1), untouched in EN. */
export async function checkDrawingsMirrored(page: Page, base: string): Promise<CheckResult[]> {
  const results: CheckResult[] = [];
  for (const [path, want] of [['/ar/products/single-sash-windows', '-1 1'], ['/products/single-sash-windows', 'none']] as const) {
    await goto(page, `${base}${path}`);
    const scales = await page.$$eval('svg[data-rtl-mirror]', (els) => els.map((e) => getComputedStyle(e).scale));
    const bad = scales.filter((s) => s !== want);
    results.push({
      name: `drawings ${want === 'none' ? 'not flipped' : 'flipped (scale -1 1)'} on ${path}`,
      // ≥2: the "How it opens" pictogram + the hotspot diagram
      passed: scales.length >= 2 && bad.length === 0,
      detail: `${scales.length} drawings, scales ${JSON.stringify([...new Set(scales)])}`,
    });
  }
  return results;
}
